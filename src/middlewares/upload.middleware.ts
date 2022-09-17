import * as path from 'path';
require('dotenv').config();
import multer from 'multer';

const upload = (fileLimit: number, fileName: string, allowedExtensions: string[], mimeTypeAllowed: string[]) => {
  return multer({
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

export default upload;
