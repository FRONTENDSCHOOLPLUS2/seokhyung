import { apiURL } from '../apiURL';

export const deleteBoardApi = async (_id, token) => {
  const res = await fetch(`${apiURL}/posts/${_id}`, {
    method: 'DELETE',
    // fromData 객체는 자동으로 올바른 Content-type 헤더를 설정합니다
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};
