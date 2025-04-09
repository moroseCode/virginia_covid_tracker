import qs from 'qs';
import axios from 'axios';
const APP_TOKEN = process.env.APP_TOKEN;
const ROOT_URL =
  'https://data.virginia.gov/resource/bre9-aqqr.json?$$app_token=${APP_TOKEN}';

export default {
  fetchCovidData() {
    return axios.get(`${ROOT_URL}`, {
        headers: {
            X-App-Token: APP_TOKEN,
        },
    });
  },
};

// export default {
//     name: 'Home',
//     components: {},
//     methods: {
//       async fetchCovidData() {
//         const res = await fetch(
//           'https://data.virginia.gov/resource/bre9-aqqr.json?$$app_token=${APP_TOKEN}'
//         );
//         const data = await res.json();
//         return data;
//       },
//     },
//     data() {
//       return {
//         resultData: [],
//       };
//     },
//     async created() {
//       this.resultData = await this.fetchCovidData();
//     },
//     computed: {
//       totalCases() {
//         let total = 0;
//         for (const { total_cases } of this.data) {
//           total += total_cases;
//         }
//         console.log(total);
//         return total;
//       },
//     },
//   };
