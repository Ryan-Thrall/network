<template>
  <div v-if="profile">
    <ProfileDetail :profile="profile" />
  </div>
  <div v-if="posts.length">
    <Post v-for="p in posts" :post="p" :creator="p.creator" />
  </div>
  <div v-else class="d-flex justify-content-center">
    <h1>This User Doesn't have any Posts :(</h1>
  </div>

  <div v-if="posts.length" class="d-flex justify-content-around align-items-center px-5 my-2">
    <button :class="page == 1 ? 'rounded' : 'selectable rounded'" @click="getNewerPosts()" :disabled="page == 1">&lt;
      Newer</button>
    <p>Page {{page}} of {{totalPages}}</p>
    <button :class="page == totalPages ? 'rounded' : 'selectable rounded'" @click="getOlderPosts()"
      :disabled="page == totalPages">Older
      ></button>
  </div>

</template>


<script>
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import ProfileDetail from '../components/ProfileDetail.vue';
import Post from '../components/Post.vue';
import { postsService } from '../services/PostsService.js';

export default {
  setup() {
    AppState.page = 1;
    const route = useRoute();

    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[GET PROFILE]");
      }
    }

    async function getPostsByCreatorId() {
      try {
        await postsService.getPostsByCreatorId(route.params.id)
      } catch (error) {
        Pop.error(error, '[GET POSTS BY CREATOR ID]')
      }
    }


    onMounted(() => {
      getProfileById();
      getPostsByCreatorId();
    });
    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),

      getNewerPosts() {
        console.log("getting Newer");
        AppState.page--;
        getPostsByCreatorId(this.page)
      },
      getOlderPosts() {
        console.log("getting Older");
        AppState.page++;
        getPostsByCreatorId(this.page)
      }
    };
  },
  components: { ProfileDetail, Post }
}
</script>


<style lang="scss" scoped>

</style>