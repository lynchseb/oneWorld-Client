import axios from 'axios';
const KEY = 'AIzaSyCuPWQiKkYwa8pbCPmdmCJJVm53jMAsQ0A';

export default axios.create({

  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
})