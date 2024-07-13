import { apiURL } from '../apiURL';

export const getImgFileApi = async () => {
  const res = await fetch(`${apiURL}/00-sample/`);
};
