import type { CommonResponse, CursorBasedResponse } from "./common";

// lp 목록 조회
export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type LpDto = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<LpDto[]>;

// lp 상세 조회
export type Author = {
  id: number;
  name: string;
  email: string;
  bio: null | string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type LpDetailDto = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
  author: Author;
};

export type ResponseLpDetailDto = CommonResponse<LpDetailDto>;

// 댓글 목록 조회
export type Comments = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type ResponseLpCommentsDto = CursorBasedResponse<Comments[]>;
