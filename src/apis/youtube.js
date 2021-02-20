import axios from 'axios';
// const KEY = process.env.API_KEY;

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 7,
    key: 5,
  }
})

