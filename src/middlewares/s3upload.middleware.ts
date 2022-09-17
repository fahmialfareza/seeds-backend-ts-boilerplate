import * as path from 'path';
require('dotenv').config();
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: { secretAccessKey: process.env.AWSSecretKey, accessKeyId: process.env.AWSAccessKeyId },
  region: process.env.AWS_REGION,
});

const s3Upload = (fileLimit: number, fileName: string, allowedExtensions: string[], mimeTypeAllowed: string[]) => {
  return multer({
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: `${process.env.AWS_BUCKET_NAME}`,
      cacheControl: 'max-age=31536000',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `${fileName}-${new Date().getTime().toString()}${path.extname(file.originalname)}`);
      },
    }),
    limits: { fileSize: fileLimit },
    fileFilter(req, file, callback) {
      const extension: boolean = allowedExtensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
      const mimeType: boolean = mimeTypeAllowed.indexOf(file.mimetype) >= 0;
      if (extension && mimeType) {
        return callback(null, true);
      }
      callback(new Error(`Invalid file type. Only ${mimeTypeAllowed.join(', ')} are allowed!`));
    },
  });
};

export default s3Upload;
