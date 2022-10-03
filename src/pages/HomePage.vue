<template>
  <div>
    <form @submit.prevent="getUsers()">
      <div class="form-floating m-2 d-flex">
        <input type="text" class="form-control" v-model="editable.query" required>
        <label for="floatingInput">Users</label>
        <button class="submit"><i class="mdi mdi-magnify"></i></button>
      </div>
    </form>

    <div v-if="users.length">
      <h4><strong>People</strong></h4>
      <ProfileDetail v-for="u in users" :profile="u" />
    </div>
    <div v-else-if="posts.length">
      <h4><strong>Posts</strong></h4>
      <Post v-for="p in posts" :post="p" :creator="p.creator" />
    </div>

    <div v-else class="d-flex justify-content-center">
      <h1>404 No Users Found</h1>
    </div>

    <div v-if="posts.length" class="d-flex justify-content-around align-items-center px-5 my-2">
      <button :class="page == 1 ? 'rounded' : 'selectable rounded'" @click="getNewerPosts()" :disabled="page == 1">&lt;
        Newer</button>
      <p>Page {{page}} of {{totalPages}}</p>
      <button :class="page == totalPages ? 'rounded' : 'selectable rounded'" @click="getOlderPosts()"
        :disabled="page == totalPages">Older
        ></button>
    </div>
  </div>


</template>

<script>
import { ref } from 'vue';
import { onMounted } from "vue";
import Post from "../components/Post.vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import PostForm from "../components/PostForm.vue";
import { profilesService } from '../services/ProfilesService.js';
import ProfileDetail from '../components/ProfileDetail.vue';


export default {

  setup() {
    const editable = ref({})

    AppState.activeProfile = null;
    async function getPosts(page) {
      try {
        await postsService.getPosts(page);
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => getPosts(AppState.page));



    return {
      editable,
      posts: computed(() => AppState.posts),
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      user: computed(() => AppState.account._id),
      users: computed(() => AppState.users),

      getNewerPosts() {
        console.log("getting Newer");
        AppState.page--;
        getPosts(this.page)
      },
      getOlderPosts() {
        console.log("getting Older");
        AppState.page++;
        getPosts(this.page)
      },

      async getUsers() {
        try {
          const formData = editable.value
          await profilesService.getUsers(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error, '[GETTING USERS]')
        }
      }
    };


  },
  components: { Post, PostForm, ProfileDetail }
}
</script>

<style scoped lang="scss">

</style>
