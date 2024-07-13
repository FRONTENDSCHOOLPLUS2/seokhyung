// ...options 와 ...addOptions 나누는 이유??
// fetch api 와 나누는 이유??
// 왜 타입가드가 없어도 괜찮을까??

const API_SERVER = 'https://api.fesp.shop';

const useMutation = (url: string, options: RequestInit = {}) => {
  const send = async <T>(addOptions = {}): Promise<T> => {
    if (!url.startsWith('http')) {
      url = API_SERVER + url;
    }

    options = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      ...addOptions,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`2xx 이외의 응답: ${response.status}`);
      }
      const result: T = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  return { send };
};

export default useMutation;
