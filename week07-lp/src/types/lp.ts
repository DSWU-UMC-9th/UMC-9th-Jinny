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

// 게시글 좋아요, 게시글 좋아요 취소
export type ResponseLikesDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

// lp 생성
export type RequestPostLpDto = {
  title: string;
  content: string;
  thumbnail?: string | null;
  tags: string[];
  published: boolean;
};

export type ResponsePostLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

// 댓글 생성
export type RequestPostCommentDto = {
  content: string;
};

export type ResponsePostCommentDto = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    name: string;
    email: string;
    bio: null | string;
    avatar: null | string;
    createdAt: Date;
    updatedAt: Date;
  };
};

// 댓글 삭제
export type ResponseDeleteCommentDto = CommonResponse<{
  message: string;
}>;

// 댓글 수정
export type ResponsePatchCommentDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    name: string;
    email: string;
    bio: null | string;
    avatar: null | string;
    createdAt: string;
    updatedAt: string;
  };
}>;
