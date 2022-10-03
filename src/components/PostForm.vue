<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Make a Post</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="handleSubmit()">
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="message" v-model="editable.post.body" required>
              <label for="message">Message</label>
            </div>
            <div class="form-floating">
              <input type="url" class="form-control" id="image" v-model="editable.post.imgUrl">
              <label for="image">Image URL</label>
            </div>
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Post</button>
          </div>
        </form>

      </div>
    </div>
  </div>

  <div>
    <button v-if="account._id" type="button"
      class="btn btn-primary d-flex justify-content-center align-items-center text-light post-button"
      data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="mdi mdi-pencil fs-2"></i></button>
  </div>
</template>


<script>
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({
      post: {}
    })
    return {
      account: computed(() => AppState.account),
      editable,

      async handleSubmit() {
        try {
          const formData = editable.value
          await postsService.createPost(formData.post)
          editable.value = {
            post: {}
          }
        } catch (error) {
          Pop.error(error, '[Creating Post]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.post-button {
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;

}
</style>