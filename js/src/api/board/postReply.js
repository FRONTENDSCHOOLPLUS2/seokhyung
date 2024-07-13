import { apiURL } from '../apiURL';

export const postReplyApi = async (_id, comment, token) => {
  const res = fetch(`${apiURL}/posts/${_id}/replies`, {
    method: 'POST',
    body: JSON.stringify({ content: comment }),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('네트워크 에러!');
  }
  console.log(res);
  return res;
};
