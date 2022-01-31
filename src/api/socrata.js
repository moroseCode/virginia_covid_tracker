import qs from 'qs';
import axios from 'axios';
const ROOT_URL =
  'https://data.virginia.gov/resource/bre9-aqqr.json?$$app_token=S9lLLe9oUwwchcETbYZdOsPvO';

export default {
  fetchCovidData() {
    return axios.get(`${ROOT_URL}`, {
        headers: {
            X-App-Token: "S9lLLe9oUwwchcETbYZdOsPvO",
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
//           'https://data.virginia.gov/resource/bre9-aqqr.json?$$app_token=S9lLLe9oUwwchcETbYZdOsPvO'
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
