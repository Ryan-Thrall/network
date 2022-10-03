import { AppState } from "../AppState.js";
import { Account } from "./Account.js";


export class Post {
  constructor(data) {
    this.id = data._id;
    this.body = data.body;
    this.imgUrl = data.imgUrl;
    this.creatorId = data.creatorId;
    this.creator = new Account(data.creator);
    this.likes = data.likeIds;
    this.createdAt = new Date(data.createdAt).toLocaleDateString('en-us', { month: "short", day: "2-digit", year: "2-digit" })
    // this.userLiked = data.likeIds.find(l => l == AppState.account._id) ? true : false
  }
}