import { CategoryInfo } from "./category";
import { ConstituencyInfo } from "./constituency";
import { UserInfo } from "./user";

export interface PostType {
    _id: string;
    title: string;
    description: string;
    content: string;
    author: UserInfo;
    views: number;
    comments: CommentType[];
    commentCount: number;
    link?: string;
    like: string[]; // Array of user IDs
    dislike: string[]; // Array of user IDs
    constituency: ConstituencyInfo;
    category: CategoryInfo;
    createdAt: string;
    updatedAt: string;
    __v: number;
    tags?: string[]; // Assuming category is a string like 'education', 'health'
  }
  
 export interface PostsResponse {
    message: string;
    data: {
      posts: PostType[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalPosts: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
      };
    };
  }

  export interface CommentType {
    _id: string;
    post: string; // postId
    user: UserInfo;
    constituency?: string; // constituencyId
    parentComment?: string | null; // commentId if it's a reply
    replies?: string[]; // array of commentIds
    content: string;
    like?: string[]; // array of userIds
    dislike?: string[]; // array of userIds
    replyCount?: number;
    createdAt: string;
    updatedAt?: string;
    __v: number;
  }

export interface CommentReplyType {
    _id: string;
    post: string; // postId
    user: UserInfo;
    constituency: string; // constituencyId
    parentComment: string | null; // commentId if it's a reply
    replies: CommentType[]; // array of commentIds
    content: string;
    like: string[]; // array of userIds
    dislike: string[]; // array of userIds
    replyCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;   
}
export interface PostDetailsResponse { 
    message: string;
    post: PostType;
}

export interface ReplyDetailsResponse {
    message: string;
    comment: CommentReplyType;
}