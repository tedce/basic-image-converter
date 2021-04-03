const uploadsController = require('../controllers/uploads.js');
const fileController = require('../controllers/files.js');
const photoController = require('../controllers/photo.js');

module.exports = (app) => {
    app.get('/api/file/:filename/:s3version', (req, res) => {
        // update uploads table to log what step of the process was achieved
        // uploads record get inserted in previous step (lambda function)
        uploadsController.update({status: 'step 2', filename: req.params.filename,version: req.params.s3version});

        // get zip file from s3
        fileController.getFile({type: 'aws', filename: req.params.filename, version: req.params.s3version});

        // run imagemagick convert command to convert from png to jpg and jpg to png 
        photoController.process(req.params.filename, req.params.s3version);

        // update uploads table with next step achieved as status 
        uploadsController.update({status: 'step 3', filename: req.params.filename,version: req.params.s3version});

        res.status(200).send({message: req.params.filename});
    });
};
