import { apiURL } from '../apiURL';
export const getAllBoardsApi = async (page, LimitNumber) => {
  const res = await fetch(`${apiURL}/posts?page=${page}&limit=${LimitNumber}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};
