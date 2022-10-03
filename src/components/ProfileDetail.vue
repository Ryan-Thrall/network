<template>
  <div class="card mt-2 shadow">
    <div class="card-body">
      <div class="cover-img d-flex flex-column align-items-center"
        :style="{backgroundImage: `url(${profile.coverImg})`}">

        <router-link :to="{name: 'Profile', params: {id: profile.id}}">
          <div class="profileImageContainer">
            <img :src="profile.picture" :alt="profile.name" class="profileImage" height="120" width="120">

            <i class="mdi mdi-account-school fs-3 graduatedIcon bg-white text-dark" v-if="profile.graduated"></i>

          </div>
          <p v-if="profile.class" class="text-shadow text-light">{{profile.class}}</p>
          <h3 class="text-shadow text-light">{{profile.name}}</h3>
        </router-link>
      </div>

      <div class="d-flex justify-content-end">
        <a :href="profile.github" v-if="profile.github" class="text-dark"><i class="mdi mdi-github fs-1 mx-2"></i></a>
        <a :href="profile.linkedin" v-if="profile.linkedin" class="text-dark"><i
            class="mdi mdi-linkedin fs-1 mx-2"></i></a>
        <a :href="profile.resume" v-if="profile.resume" class="text-dark"><i
            class="mdi mdi-file-account fs-1 mx-2"></i></a>
      </div>

      <div>
        <p v-if="profile.bio">{{profile.bio}}</p>
      </div>

    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';

export default {
  props: {
    profile: {
      type: Account,
      required: true
    }
  },
  setup(props) {
    console.log(props.profile)
    return {}
  }
}
</script>


<style lang="scss" scoped>
.cover-img {
  height: 50vh;
  padding: 3rem;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

.profileImageContainer {
  position: relative;
}

.profileImage {
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

.text-shadow {
  text-shadow: 2px 2px 2px salmon,
    2px 2px 2px #000;
}
</style>