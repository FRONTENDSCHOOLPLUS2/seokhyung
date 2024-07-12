import { apiURL } from '../apiURL';

export const SignUpApi = async (formData) => {
  const res = await fetch(`${apiURL}/users/`, {
    method: 'POST',
    body: JSON.stringify(formData),
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
