<template>
  <div>
    <img :src="advert.tall" alt="Ad" class="img-fluid mt-5">
  </div>
</template>


<script>
import { Advert } from '../models/Advert.js';

export default {
  props: {
    advert: { type: Advert, required: true }
  },
  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>