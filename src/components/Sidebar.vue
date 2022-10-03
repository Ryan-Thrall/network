<template>
  <div class="col-2 position-fixed sidebar p-0">
    <div class="card" v-if="user.isAuthenticated">
      <div class="card-body pt-5">
        <div class="mt-5 d-flex flex-column align-items-center">

          <div class="accountImageContainer">
            <img :src="account.picture" :alt="account.name" class="accountImage profile-pic">
            <i class="mdi mdi-account-school fs-3 graduatedIcon bg-white text-dark" v-if="account.graduated"></i>
          </div>

          <div>
            <p class="pt-4 m-0" v-if="account.class">{{account.class}}</p>
            <div class="d-flex flex-column align-items-center">
              <p class="mt-1"><strong>{{user.nickname}}</strong></p>
              <a :href="account.github" v-if="account.github" class="text-dark"><i
                  class="mdi mdi-github fs-1 mx-2"></i></a>
              <a :href="account.linkedin" v-if="account.linkedin" class="text-dark"><i
                  class="mdi mdi-linkedin fs-1 mx-2"></i></a>
              <a :href="account.resume" v-if="account.resume" class="text-dark"><i
                  class="mdi mdi-file-account fs-1 mx-2"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js'
import Login from './Login.vue';
export default {
  setup() {

    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    };
  },
  components: { Login }
}
</script>


<style lang="scss" scoped>
.sidebar {
  top: 0;
}

.card {
  height: 100vh;
}

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
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid rgba(126, 218, 207, 1);
  bottom: 0px;
  right: 2px;
}
</style>