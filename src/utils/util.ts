import { HOST } from '@/config';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const generateOTP = () => {
  const digits = '0123456789';
  const otpID = Math.round(new Date().getTime() / 1000) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return { otp: OTP.toString(), otpID };
};

export const convertPostHashtag = (content: string) => {
  const result = content.replace(/(#\S*)/g, hashtag => {
    const hash = hashtag.substr(1);
    return `<a href='${HOST}/api/v1/posts/tag/${hash}' target='_blank'>#${hash}</a>`;
  });

  return result;
};
