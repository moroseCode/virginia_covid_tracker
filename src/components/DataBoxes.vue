<template>
  <div class="grid md:grid-cols-3 gap-4">
    <!-- Box 1 -->
    <div class="shadow-md bg-blue-100 p-10 text-center rounded">
      <h3 class="text-3xl text-blue-900 font-bold mb-4">Cases</h3>
      <div class="text-2xl mb-4">
        <span class="font-bold">New:</span>
        Pending...
      </div>
      <div class="text-2xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.total_cases) }}
      </div>
    </div>
    <!-- Box 2 -->
    <div class="shadow-md bg-blue-100 p-10 text-center rounded">
      <h3 class="text-3xl text-blue-900 font-bold mb-4">Hospitalizations</h3>
      <div class="text-2xl mb-4">
        <span class="font-bold">New:</span>
        Pending...
      </div>
      <div class="text-2xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.hospitalizations) }}
      </div>
    </div>
    <!-- Box 3 -->
    <div class="shadow-md bg-blue-100 p-10 text-center rounded">
      <h3 class="text-3xl text-blue-900 font-bold mb-4">Deaths</h3>
      <div class="text-2xl mb-4">
        <span class="font-bold">New:</span>
        Pending...
      </div>
      <div class="text-2xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.deaths) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataBoxes',
  props: ['stats'],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style></style>
