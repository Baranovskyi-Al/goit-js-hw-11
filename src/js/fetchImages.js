import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '25741965-3317c7c17dbaed9fd9692b5d9';

async function fetchImages(query, page, perPage) {
  const response = await axios.get(
    `?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response;
}
