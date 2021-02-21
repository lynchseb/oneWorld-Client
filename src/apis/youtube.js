import axios from 'axios';
const KEY = process.env.API_KEY;

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {

  }
})

// export default axios.create({
//   baseURL: 'https://www.googleapis.com/youtube/v3/',
//   params: {
//     part: 'snippet',
//     maxResults: 5,
//     key: "AIzaSyCuPWQiKkYwa8pbCPmdmCJJVm53jMAsQ0A"
//   }
// })
