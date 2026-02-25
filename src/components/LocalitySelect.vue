<template>
  <select
    @change="onChange"
    v-model="selected"
    class="form-select mt-10 block w-full border p-3 rounded"
  >
    <option value="0">Select Locality</option>
    <option
      v-for="locality in resultData"
      :value="locality.fips"
      :key="locality.fips"
    >
      {{ locality.locality }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'LocalitySelect',
  props: ['resultData'],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onChange() {
      const place = this.resultData.find((item) => item.fips === this.selected);

      this.$emit('get-locality', place);
    },
  },
};
</script>

<style></style>
