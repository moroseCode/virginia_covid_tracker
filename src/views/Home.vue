<template>
  <div class="home">
    <main v-if="!loading">
      <DataTitle :text="title" :dataDate="dataDate" />
      <DataBoxes :stats="stats" />
      <LocalitySelect
        @get-locality="getLocalityData"
        :resultData="resultData"
      />
      <button
        @click="clearLocalityData"
        v-if="stats.locality"
        class="bg-green-700 text-white rounded p-3 mt-10 focus:outline-none hover:bg-green-600"
      >
        Clear Locality
      </button>
    </main>
    <main class="flex flex-col align-center justify-center text-center" v-else>
      <div class="text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
      <img :src="loadingImage" class="w-24 m-auto" alt="" />
    </main>
  </div>
</template>

<script>
import { format, isWeekend, previousFriday } from 'date-fns';
import DataTitle from '@/components/DataTitle';
import DataBoxes from '@/components/DataBoxes';
import LocalitySelect from '@/components/LocalitySelect';
export default {
  name: 'Home',
  components: {
    DataTitle,
    DataBoxes,
    LocalitySelect,
  },
  methods: {
    async fetchCovidData() {
      let today = new Date();
      console.log(today);
      console.log(isWeekend(today));
      if (isWeekend(today)) {
        today = previousFriday(today);
      }
      let dateString = format(today, 'yyyy-MM-dd');
      dateString = '2022-01-28';
      const res = await fetch(
        `https://data.virginia.gov/resource/bre9-aqqr.json?report_date=${dateString}&$$app_token=S9lLLe9oUwwchcETbYZdOsPvO`
      );

      const data = await res.json();
      return data;
    },
    getLocalityData(locality) {
      this.stats = locality;
      this.title = locality.locality;
    },
    clearLocalityData() {
      this.loading = true;
      this.title = 'Virginia';
      this.stats.total_cases = this.totalCases;
      this.stats.hospitalizations = this.totalHospitalizations;
      this.stats.deaths = this.totalDeaths;
      this.loading = false;
    },
  },
  data() {
    return {
      loading: true,
      title: 'Virginia',
      dataDate: '',
      stats: {
        total_cases: null,
        deaths: null,
        hospitalizations: null,
      },
      localities: [],
      resultData: [],
      loadingImage: require('../assets/hourglass.gif'),
    };
  },
  async created() {
    this.resultData = await this.fetchCovidData();
    this.stats.total_cases = this.totalCases;
    this.stats.hospitalizations = this.totalHospitalizations;
    this.stats.deaths = this.totalDeaths;
    this.dataDate = this.resultData.report_date;
    this.localities = this.all_localities;
    this.loading = false;
  },
  computed: {
    totalCases() {
      let total = 0;
      for (const { total_cases } of this.resultData) {
        total += parseInt(total_cases);
      }
      console.log(total);
      return total;
    },
    totalDeaths() {
      let total = 0;
      for (const { deaths } of this.resultData) {
        total += parseInt(deaths);
      }
      console.log(total);
      return total;
    },
    totalHospitalizations() {
      let total = 0;
      for (const { hospitalizations } of this.resultData) {
        total += parseInt(hospitalizations);
      }
      console.log(total);
      return total;
    },
    all_localities() {
      let places = [];
      for (const { locality } of this.resultData) {
        places.push(locality);
      }
      return places;
    },
  },
};
</script>
