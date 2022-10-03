import { AppState } from "../AppState.js"
import { Advert } from "../models/Advert.js"
import { api } from "./AxiosService.js"

class AdvertsService {
  async getAdverts() {
    const res = await api.get('/api/ads')
    AppState.adverts = res.data.map(a => new Advert(a))
  }

}

export const advertsService = new AdvertsService()