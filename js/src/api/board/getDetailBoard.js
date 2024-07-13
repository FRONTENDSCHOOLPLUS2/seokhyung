import { apiURL } from '../apiURL';

export const getDetailBoards = async (boardId) => {
  const res = await fetch(`${apiURL}/posts/${boardId}`, {
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
