<template>
  <div class="card my-3">
    <div class="card-body">

      <div class="d-flex justify-content-between">
        <router-link :to="{name: 'Profile', params: {id: creator.id}}">
          <div class="d-flex align-items-center">
            <div class="accountImageContainer">
              <img :src="creator.picture" :alt="creator.name" class="accountImage profile-pic">
              <i class="mdi mdi-account-school fs-5 graduatedIcon bg-white text-dark" v-if="creator.graduated"></i>
            </div>

            <p><strong>{{creator.name}}</strong></p>
          </div>
        </router-link>

        <i v-if="creator.id == userId" class="mdi mdi-delete fs-2 selectable" @click="deletePost(post.id)"></i>
      </div>
      <p>Posted {{post.createdAt}}</p>
      <!-- {{creator}} -->



      <p>{{post.body}}</p>
      <div class="img-container">
        <img v-if="post.imgUrl" :src="post.imgUrl" alt="Image" class="img-fluid"
          onerror="this.onerror=null; this.src='https://comnplayscience.eu/app/images/notfound.png'">
      </div>

      <div class="d-flex justify-content-end align-items-center">
        <i class="mdi fs-1 text-success me-2"
          :class="!post.likes.find(i => i == userId) ? ' mdi-cards-heart-outline' : 'mdi-cards-heart'"
          @click="userId ? likePost(post) : login()"></i>
        <p class="m-0 fs-5 text-secondary">{{post.likes.length}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { Post } from '../models/Post.js';
import { AuthService } from '../services/AuthService.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    post: { type: Post, required: true },
    creator: { type: Account, required: true }
  },
  setup(props) {

    return {
      userId: computed(() => AppState.account._id),

      async likePost(post) {
        try {
          await postsService.likePost(post)
        } catch (error) {
          Pop.error(error, '[LIKING POST]')
        }
      },

      async deletePost(postId) {
        try {
          const yes = await Pop.confirm('Delete this post?')
          if (!yes) { return }
          await postsService.deletePost(postId)
        } catch (error) {
          Pop.error(error, '[Delete Post]')
        }
      },

      login() {
        AuthService.loginWithPopup()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-pic {
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
}

.accountImageContainer {
  position: relative;
}

.accountImage {
  border-radius: 50%;
}

.graduatedIcon {
  position: absolute;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  border: 1px solid rgba(126, 218, 207, 1);
  bottom: -2px;
  right: -2px;
}
</style>