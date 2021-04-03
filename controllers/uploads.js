const uploads = require('../models').uploads;

module.exports = {

    // update status based on composite key of filename, verison
    update(params) {
        return uploads.update({status: params.status}, {
            where: {
                filename: params.filename,
                version: params.version
            }
        });
    },
};
