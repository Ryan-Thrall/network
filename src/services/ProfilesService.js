import { useSSRContext } from "vue"
import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { api } from "./AxiosService.js"


class ProfilesService {
  async getProfileById(id) {
    const res = await api.get(`/api/profiles/${id}`)
    AppState.activeProfile = new Account(res.data)
  }

  async getUsers(query) {
    AppState.users = []
    console.log("HELLO?", query)
    const res = await api.get('/api/profiles', {
      params: {
        query: query.query,
      }
    })
    AppState.users = res.data.map(u => new Account(u))
    AppState.posts = []
  }
}

export const profilesService = new ProfilesService()