const shell = require('shelljs');

module.exports = {

    // use imagemagick convert function to convert image files to and from png/jpg
    // format should be zip folder containing 1 of either png or jpg
    process(zipfolder,s3version) {
        try {
            shell.exec('unzip -d pics/' + s3version + '/' + zipfolder);
        } catch (err) {
            throw new Error(err);
        }

        // there should only be 1 of either png or jpg
        let count = parseInt(shell.exec("cd pics/" + s3version + " && ls | egrep -c '*.(png|jpg)'"));
        if (count === 1) {
            let filename = shell.exec("cd pics/" + s3version + " && ls | egrep '*.(png|jpg)' | tr '\\n' ' '").trim();
            let basename = filename.split('.')[0];
            let extension = filename.split('.')[1];

            // this works for the current implmentation, but it is not very flexible
            let newextension = extension == "png" ? "jpg" : "png";

            // run imagemagick convert command
            try {
                shell.exec("convert " + filename + " " + basename + "." + newextension);  
            } catch (err) {
                throw new Error(err);
            }
        }

        return 'success';
    }
};
