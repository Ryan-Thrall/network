<template>
  <div>
    <ProfileDetail :profile="account" />
  </div>
  <AccountForm class="mt-3" />
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import ProfileDetail from '../components/ProfileDetail.vue';
import AccountForm from '../components/AccountForm.vue';
import { Account } from '../models/Account.js';
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
    };
  },
  components: { ProfileDetail, AccountForm }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
