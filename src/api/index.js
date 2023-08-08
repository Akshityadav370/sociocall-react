import { LOCALSTORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
    // stringify converts JSON object to string we need to do this to make the API URL call
  }

  try {
    const response = await fetch(url, config);
    const data = response.json();
    // .json() function reads the response body and parses it as JSON

    if (response.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('*** ERROR ***');

    return {
      message: error.message,
      success: false,
    };
  }
};

const getPosts = (page, limit) => {
  return customFetch();
};
