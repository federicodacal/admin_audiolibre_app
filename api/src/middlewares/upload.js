const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const createStorage = (conn) => {
    
    const storage = new GridFsStorage({
        db: conn,
        file: (req, file) => {
            console.log('file: ', file);
            return {
                filename: file.originalname,
                bucketName: 'images' 
            };
        }
    });
    return multer({ storage });
};

module.exports = { createStorage };
