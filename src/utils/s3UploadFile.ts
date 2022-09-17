require('dotenv').config();
import moment from 'moment';
import AWS from 'aws-sdk';

export const s3Upload = async (file: any): Promise<string> => {
  const s3 = new AWS.S3({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: 'seeds' + moment() + file['originalname'], // File name you want to save as in S3 UNIQUE
    Body: file.buffer,
    ACL: 'public-read',
  };

  return (
    await s3
      .upload(params, (err: Error) => {
        if (err) throw err;
      })
      .promise()
  ).Location;
};
