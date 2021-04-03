const aws = require('aws-sdk');
const fs = require('fs');
const credentials = new aws.SharedIniFileCredentials({profile: 'default'});
const s3 = new aws.S3({ 
    region: 'us-east-1',
    credentials: credentials
});

module.exports = {

    // this could potentially get files from other locations
    // only supported currently is s3
    getFile(params) {
        switch(params.type) {
            case "aws":
                return exports.getS3Object(params);
            default:
                throw new Error("action not supported");
        }
    },
    getS3Object(params) {
        let filename = params.filename;
        const aws_info = {
            Bucket: 'file-converter',
            Key: filename
        }

        s3.getObject(aws_info, function(err, data) {
            if(err){
                throw new Error(err);
            }else{

                // write file to pics/s3version for uniqueness
                fs.writeFileSync('pics/' + params.version + '/' + filename, data.Body, function(err) {
                    if (err) {
                        throw new Error(err);
                    } else {
                        return filename
                    }
                });
            }
        });

        return filename;
    }
};
