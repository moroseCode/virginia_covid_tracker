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
    <main v-else-if="error" class="flex flex-col align-center justify-center text-center">
      <div class="text-red-700 text-3xl mt-10">{{ error }}</div>
    </main>
    <main class="flex flex-col align-center justify-center text-center" v-else>
      <div class="text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
      <img :src="loadingImage" class="w-24 m-auto" alt="" />
    </main>
  </div>
</template>

<script>
import { format, isWeekend, previousFriday } from 'date-fns';
import DataTitle from '@/components/DataTitle.vue';
import DataBoxes from '@/components/DataBoxes.vue';
import LocalitySelect from '@/components/LocalitySelect.vue';
import socrata from '@/api/socrata.js';
import loadingImage from '../assets/hourglass.gif';
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
      if (isWeekend(today)) {
        today = previousFriday(today);
      }
      const dateString = format(today, 'yyyy-MM-dd');
      try {
        const response = await socrata.fetchCovidData({ report_date: dateString });
        return response.data;
      } catch (error) {
        this.error = 'Failed to fetch COVID data. Please try again later.';
        this.loading = false;
        return null;
      }
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
      error: null,
      title: 'Virginia',
      dataDate: '',
      stats: {
        total_cases: null,
        deaths: null,
        hospitalizations: null,
      },
      localities: [],
      resultData: [],
      loadingImage,
    };
  },
  async created() {
    const data = await this.fetchCovidData();
    if (!data) return;
    this.resultData = data;
    this.stats.total_cases = this.totalCases;
    this.stats.hospitalizations = this.totalHospitalizations;
    this.stats.deaths = this.totalDeaths;
    this.dataDate = this.resultData[0]?.report_date;
    this.localities = this.all_localities;
    this.loading = false;
  },
  computed: {
    totalCases() {
      let total = 0;
      for (const { total_cases } of this.resultData) {
        total += parseInt(total_cases, 10);
      }
      return total;
    },
    totalDeaths() {
      let total = 0;
      for (const { deaths } of this.resultData) {
        total += parseInt(deaths, 10);
      }
      return total;
    },
    totalHospitalizations() {
      let total = 0;
      for (const { hospitalizations } of this.resultData) {
        total += parseInt(hospitalizations, 10);
      }
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
