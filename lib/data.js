// dependencies

const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');

// write data to fie
lib.create = function(dir,file,data,callback){
    // open file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(error,fileDescriptor)=>{
        if(!error && fileDescriptor){
            // convert data to string
            const stringData = JSON.stringify(data);

            // write file and close it
            fs.writeFile(fileDescriptor,stringData, (error)=>{
                if(!error){
                    fs.close(fileDescriptor, (error)=>{
                        if(!error){
                            callback(false);
                        }else{
                            callback("Error closing the new file");
                        }
                    })
                }else{
                    callback("Error writing to new file.")
                }
            })
        }else{
            callback('Could not create new file it may already exists!');
        }
    });
}

lib.read = (dir,file,callback)=>{
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', (err,data)=>{
        callback(err,data);
    })
}

lib.update = (dir,file,data,callback)=>{
    // file open for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            // convert the data to strung
            const stringData = JSON.stringify(data);

            // truncate file
            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    callback(false)
                                }else{
                                    callback("Error closing file")
                                }
                            })
                        }else{
                            callback("error writing file");
                        }
                    })
                }else{
                    console.log("error truncating file")
                }
            })
        }else{
            console.log('Error updating file, may not exists');
        }
    });
}

lib.delete = (dir,file,callback)=>{
    // unlink
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{
        if(!err){
            callback(false)
        }else{
            callback("Error deleting file.")
        }
    });
}

module.exports = lib;