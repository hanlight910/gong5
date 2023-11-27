const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

aws.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
});

const s3 = new aws.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

const fileFilter = (req, file, next) => {
    console.log('File:', file);

    const extArray = file.originalname.split('.');
    const ext = extArray[extArray.length - 1].toLowerCase();
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    console.log('File extension:', ext);
    console.log('File MIME type:', file.mimetype);

    if (allowedExtensions.includes(`.${ext}`) && allowedMimeTypes.includes(file.mimetype)) {
        next(null, true);
    } else {
        console.error('Invalid file:', file.originalname);
        next(new Error('Invalid file type or extension. Only image files are allowed!'), false);
    }
};


const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'onelinght', // 여기에 자신의 S3 버킷 이름을 넣어주세요.
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, 'product_image/' + Date.now() + '_' + file.originalname);
        }
    })
});

module.exports = upload;
