<template>
  <div class="home">
    Virginia COVID Cases
    {{ totalCases }}
  </div>
</template>

<script>
// import previousFriday from 'date-fns/previousFriday'
import { format, isWeekend, previousFriday, parseISO } from 'date-fns';
export default {
  name: 'Home',
  components: {},
  methods: {
    async fetchCovidData() {
      let today = format(new Date(), 'yyyy-MM-dd');
      today = parseISO(today);
      console.log(today);
      console.log(isWeekend(today));
      console.log(previousFriday(today));
      if (isWeekend(today)) {
        return today === previousFriday(today);
      }
      format(today, 'yyyy-MM-dd');
      const res = await fetch(
        `https://data.virginia.gov/resource/bre9-aqqr.json?report_date=2022-01-28&$$app_token=S9lLLe9oUwwchcETbYZdOsPvO`
      );
      console.log(res);
      const data = res.json();
      console.log(data);
      return data;
    },
  },
  data() {
    return {
      resultData: [],
    };
  },
  async created() {
    this.resultData = await this.fetchCovidData();
  },
  computed: {
    totalCases() {
      let total = 0;
      for (const { total_cases } of this.resultData) {
        total += parseInt(total_cases);
      }
      console.log(total);
      return total;
      // 11,160,816
    },
  },
};
</script>
