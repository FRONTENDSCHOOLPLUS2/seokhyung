import { apiURL } from '../apiURL';

export const uploadFilesApi = async (formData) => {
  const res = await fetch(`${apiURL}/files/`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return data;
};
