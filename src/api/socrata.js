import axios from 'axios';

const APP_TOKEN = process.env.APP_TOKEN;
const ROOT_URL = 'https://data.virginia.gov/resource/bre9-aqqr.json';

export default {
  fetchCovidData(params = {}) {
    return axios.get(ROOT_URL, {
      headers: {
        'X-App-Token': APP_TOKEN,
      },
      params,
    });
  },
};
