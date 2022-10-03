import { parseStringStyle } from "@vue/shared"
import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { api } from "./AxiosService.js"


class PostsService {
  async getPosts(page) {
    const res = await api.get(`/api/posts?page=${page}`)
    AppState.totalPages = res.data.totalPages;
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.users = []
    // console.log(AppState.account._id)
  }

  async getPostsByCreatorId(creatorId) {
    AppState.posts = []
    const res = await api.get('api/posts', {
      params: {
        creatorId
      }
    })
    AppState.totalPages = res.data.totalPages;

    AppState.posts = res.data.posts.map(p => new Post(p))
    console.log(AppState.posts)
  }

  async likePost(post) {
    const res = await api.post(`/api/posts/${post.id}/like`)
    if (AppState.activeProfile == null) {
      this.getPosts(AppState.page)
    } else {
      this.getPostsByCreatorId(AppState.activeProfile.id)
    }
    console.log(post)
  }

  async createPost(formData) {
    console.log(formData)
    const res = await api.post('/api/posts', formData)
    AppState.posts.push(new Post(res.data))
    this.getPosts(AppState.page)
  }

  async deletePost(postId) {
    console.log(postId)
    const res = await api.delete(`/api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }
}

export const postsService = new PostsService()