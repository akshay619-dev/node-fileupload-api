const fs = require('fs');
const uploadFile = require("../middleware/upload");
const baseUrl = "http://localhost:8899/files/";
const upload = async (req , res ) => {
    try {
        await uploadFile(req , res );

        //console.log(req);
        if(req.files == undefined){
            return res.status(400).send({
                message : "Please upload file"
            }) 
        }

        const datatfiles = req.files;
        res.status(200).json({
            "message": `Uploaded the file successfully`,
            "files" : datatfiles
        })

    } catch (error) {
        if(error.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
            message: `maximum file size is 2mb`,
          });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file}. ${error}`,
        });
    }
}

const getListFiles = (req , res) =>{
    const directoryPath = __basedir + "/assets/uploads/";

    fs.readdir(directoryPath , (err , files) => {
        if(err) {
            res.status(500).send({
                message: "Unable to scan files"
            });
        }

        let fileInfos = [];

        files.forEach(file => {
            fileInfos.push({
                name: file,
                url :  baseUrl + file , 
            });
        });
        
        res.status(200).send(fileInfos);
    });

}


const download = (req , res) => {
    const filename = req.params.name ;
    const directoryPath = __dirname + "/assets/uplaods";

    res.download(directoryPath + fileName , fileName , (err) => {
        if(err) {
            res.status(500).send({
                message: `could not download the file ${err}`
            });
        }
    });

}


module.exports = {
    upload,
    download,
    getListFiles
};