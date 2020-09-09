const controller = require("../controllers/test.controller");
const path = require('path');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname+'../../../uploads');
    },
    filename: (req, file, callback) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      callback(null, 'image-' + Date.now()  + '.' + filetype);
    }
});
const upload = multer({storage: storage});
module.exports = function(app) {

    app.post('/upload',upload.single('file'),function(req, res, next) {
        console.log(req.file);
        if(!req.file) {
          res.status(500);
          return next(err);
        }
        res.json({ fileUrl: 'http://192.168.0.7:3000/images/' + req.file.filename });
      })
    };