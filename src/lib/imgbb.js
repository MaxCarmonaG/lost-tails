import { message } from 'antd';

const apiURL = 'https://api.imgbb.com/1/upload';

export const uploadImage = async (imageBase64, name) => {
  const formData = new FormData();

  formData.append('image', imageBase64);
  formData.append('name', name);

  try {
    const response = await fetch(
      apiURL + '?expiration=2592000&key=' + import.meta.env.VITE_IMGBB_API_KEY,
      {
        method: 'POST',
        body: formData,
      },
    );

    const { data } = await response.json();

    return data.url;
  } catch (e) {
    message.error('Error on saving image! ' + e);
    return null;
  }
};
