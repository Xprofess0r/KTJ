const fs = require('fs');

module.exports.clearImage = (filepath)=>{
    fs.unlink(filepath,(error)=>{
        if(error)
            console.log(error,'error in clearing image');
        else
            console.log(filepath , "deleted successfully");
    })
}

module.exports.getFilesPath = (files)=>{
    if(files[0] ===undefined){
        return []
    }
    return files.map((file)=>{
        return file.path.replace('\\','/');
      });
}