<template>
  <header class="text-center bg-red-900 text-white p-4 mb-10">
    <div class="text-3xl md:text-5xl font-bold mb-3">
      <i class="fa fa-viruses"></i>Virginia COVID-19 Tracker
    </div>
    <p>
      Data from
      <a class="text-blue-300" href="data.virginia.gov">data.virginia.gov</a> at
      <a
        class="text-blue-300"
        href="https://dev.socrata.com/foundry/data.virginia.gov/bre9-aqqr"
        >Socrata</a
      >
    </p>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped></style>
