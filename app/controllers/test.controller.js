exports.testUpload = (req, res) => {
    console.log(req.file);
    if(!req.file) {
      res.status(500);
      return next(err);
    }
    res.json({ fileUrl: 'http://localhost:8081/images/' + req.file.filename });
};