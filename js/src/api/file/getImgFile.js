import { apiURL } from '../apiURL';

export const getImgFileApi = async (fileName) => {
  const res = await fetch(`${apiURL}/00-sample/${fileName}`);
  return res;
};
