const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    region: 'ap-northeast-2',
    accessKeyId: 'AKIAYGD46I7CYY6R4BMT',
    secretAccessKey: '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',
    debug: true,
});

const s3 = new aws.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

const fileFilter = (req, file, next) => {
    console.log('File:', file);

    // 파일 이름에서 확장자 추출
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
        bucket: 'onelinght',
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, 'uploads/' + Date.now() + '_' + file.originalname);
        }
    })
});

upload.single('image');

module.exports = upload;
