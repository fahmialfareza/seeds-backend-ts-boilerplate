import moment from 'moment';
import NodeCache from 'node-cache';
const TTL = 0;
const cache = new NodeCache({ stdTTL: TTL, checkperiod: 0, deleteOnExpire: false });

export const generateCacheID = (title: string, value: string) => {
  return `ID:${title}_VALUE:${value.toString()}`;
};

export const setCache = ({ title, params, data, ttl }: { title: string; params: string; data: any; ttl?: number }) => {
  const cacheID = generateCacheID(title, params);
  cache.set(cacheID, data, ttl ? ttl : TTL);
};

export const getCache = <T>(title: string, params: string): T => {
  try {
    const cacheID = generateCacheID(title, params);
    if (cache.has(cacheID)) {
      console.log(' . ');
      console.log('GET CACHE => ', cacheID);
      if (cache.getTtl(cacheID)) {
        console.log('EXPIRED AT', moment(cache.getTtl(cacheID)).format('DD/MM/YYYY HH:mm:ss'));
      }
      console.log(' . ');
      return cache.get(cacheID);
    }
  } catch (error) {
    console.log(error);
  }
};
