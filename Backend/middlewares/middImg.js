const multer = require('multer');
const path = require('path');
const { v4:uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ 
    storage: storage,
    dest: 'uploads',
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return callback(null, true);
        } else {
            callback(new Error ('Archivo no válido, inténtelo de nuevo'));
        }
    }
}).single('myFile');

module.exports = upload;