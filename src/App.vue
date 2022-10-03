<template>
  <header class="container-fluid">
    <section class="row justify-content-end">
      <Navbar />
    </section>
  </header>
  <main class="container-fluid">
    <div class="row">
      <Sidebar />
      <div class="col-2"></div>
      <div class="col-8">
        <router-view />
      </div>
      <div class="col-2">
        <Advert v-for="a in adverts" :advert="a" />
      </div>
    </div>

    <PostForm />
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Advert from './components/Advert.vue'
import { advertsService } from './services/AdvertsService.js'
import Pop from './utils/Pop.js'
import PostForm from './components/PostForm.vue'

export default {

  setup() {
    async function getAdverts() {
      try {
        await advertsService.getAdverts()
      } catch (error) {
        Pop.error(error, '[GETTING ADS]')
      }
    }

    onMounted(() => { getAdverts() })

    return {
      adverts: computed(() => AppState.adverts),
    }
  },
  components: { Navbar, Sidebar, Advert, PostForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
