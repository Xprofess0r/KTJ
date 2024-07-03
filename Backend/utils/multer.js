const multer = require('multer');
const {v4} = require('uuid');
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'images');
    },
    filename :(req,file,cb)=>{
      cb(null,v4());
    }
  })

  const Multer = multer({storage:fileStorage,fileFilter:fileFilter});
  module.exports = Multer;