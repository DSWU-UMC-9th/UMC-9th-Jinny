import type { PaginationDto } from "../types/common";
import type {
  RequestPostCommentDto,
  RequestPostLpDto,
  ResponseDeleteCommentDto,
  ResponseLikesDto,
  ResponseLpCommentsDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  ResponsePostCommentDto,
  ResponsePostLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

// lp 목록 조회
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

// lp 상세 조회
export const getLpDetail = async (lpId: number): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

// 댓글 목록 조회
export const getLpComments = async (
  lpId: number,
  paginationDto: PaginationDto
): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });

  return data;
};

// 게시글 좋아요
export const postLikes = async (lpId: number): Promise<ResponseLikesDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

// 게시글 좋아요 취소
export const deleteLikes = async (lpId: number): Promise<ResponseLikesDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};

// Lp 생성
export const postLp = async (body: RequestPostLpDto): Promise<ResponsePostLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);

  return data;
};

// 댓글 생성
export const postComment = async ({
  lpId,
  body,
}: {
  lpId: number;
  body: RequestPostCommentDto;
}): Promise<ResponsePostCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);

  return data;
};

// 댓글 삭제
export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);

  return data;
};
