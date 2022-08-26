const Auth = require("../models/auth");

exports.getFiles = (req, res, next) => {
  Auth.find()
    .then((result) => {
      if (result.length == 0) {
        return res.status(200).json({
          message: "No file found!",
        });
      }
      res.status(200).json({
        message: "success",
        totalFiles: result.length,
        files: result,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.getOneFile = (req, res, next) => {
  Auth.findOne({ _id: req.params.fileId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "No file exits woth the geven id",
        });
      }
      res.json({
        message: "Success",
        file: result,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.uploadFiles = (req, res, next) => {
  const fileUrl = req.file.path.replace("\\", "/");

  const file = new Auth({
    fileUrl: fileUrl,
  });
  file
    .save()
    .then((result) => {
     res.status(200).json({
        message: "File created",
        createdFile: result,
      });
    })
    .catch((err) => {
      if(!err){
        err.status = 500;
      }
      next(err);
    });
};


exports.deleteFiles = (req, res, next) =>{
  const fileId = req.params.fileId;

  File.findByIdAndDelete(fileId).then(result => {
    if(!result){
      res.status(404).json({
        message: "No files found with this id"
      })
    }
    fileHelper.deleteFile(result.fileUrl);
    res.status(200).json({
      message: "File Deleted",
    });
  }).catch(err => {
    if(!err.status){
      err.status = 500;
    }
    next(err);
  });
}