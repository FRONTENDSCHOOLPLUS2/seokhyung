import useUserStore from '@zustand/store';
import { postReplyApi } from '../../api/board/postReply';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { detailFetch } from '@hooks/detailFetch';

const CommentNew = ({ boardId, onSetDetailData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  const { accessTokenGlobal } = useUserStore();

  const onsubmit = async (data) => {
    try {
      const newComment = await postReplyApi(boardId, data.comment, accessTokenGlobal);
      console.log('코멘트 : ', newComment);
      onSetDetailData(newComment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            aria-invalid={isSubmitted ? (errors.comment ? 'true' : 'false') : undefined}
            {...register('comment', {
              required: '필수 입력입니다',
              minLength: {
                value: 1,
                message: '내용을 입력해주세요',
              },
            })}
          ></textarea>

          {/* 에러 메세지 출력 */}
          {errors.comment && (
            <small role="alert">
              <p className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400">
                {errors.comment.message}
              </p>
            </small>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-1 ml-2 text-sm font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
        >
          댓글 등록
        </button>
      </form>
    </div>
  );
};

export default CommentNew;
