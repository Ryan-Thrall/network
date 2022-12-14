import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Account.js').Account | null} */
  activeProfile: null,

  users: [],


  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  page: 1,
  totalPages: null,

  /** @type {import('./models/Advert.js').Advert[]} */
  adverts: []
})
