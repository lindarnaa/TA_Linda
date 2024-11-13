// api.js
import axios from 'axios';

const API_KEY = 'JVvhAnsPUXRuTWnnoXFaJ42MilXsoCpccUP6DRKi';
const NEW_API_KEY = '059b62819048433d893164395cf5367d';

export const getAPOD = async () => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMarsPhotos = async (sol = 1000) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${API_KEY}`);
    return response.data.photos;
  } catch (error) {
    console.error(error);
  }
};

// Fungsi untuk mendapatkan berita
export const getSpaceNews = async () => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/news?api_key=${NEW_API_KEY}`);
    return response.data.news;
  } catch (error) {
    console.error(error);
  }
};

