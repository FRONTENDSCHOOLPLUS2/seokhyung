import { useGetAllBoards } from '@hooks/useGetAllBoards';
import { uploadBoardApi } from '../../api/board/uploadBoard';
import useUserStore from '@/zustand/store';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const { data, onSetData } = useGetAllBoards();
  const navigate = useNavigate();
  const { profileImgGlobal, accessTokenGlobal } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const form = {
        title: data.title,
        content: data.content,
        image: profileImgGlobal.name,
        tag: '혼자,떠나요,제주도',
      };
      const rs = await uploadBoardApi(form, accessTokenGlobal);
      onSetData(rs.item);
      navigate('/info');
    } catch (error) {
      console.error(error);
    } finally {
      await new Promise((r) => setTimeout(r, 1500));
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="py-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="p-4 mb-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="content-center block text-lg" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              // 스크린 리더
              aria-invalid={isSubmitted ? (errors.title ? 'true' : 'false') : undefined}
              {...register('title', {
                required: '필수 입력입니다.',
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.title && (
              <small
                className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400"
                role="alert"
              >
                {errors.title.message}
              </small>
            )}
          </div>
          <div className="my-4">
            <label className="content-center block text-lg" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              // 스크린 리더
              aria-invalid={isSubmitted ? (errors.content ? 'true' : 'false') : undefined}
              {...register('content', {
                required: '필수 입력입니다.',
              })}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {errors.content && (
              <small
                className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400"
                role="alert"
              >
                {errors.content.message}
              </small>
            )}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
              disabled={isSubmitting}
            >
              등록
            </button>
            <button
              type="reset"
              className="px-4 py-1 ml-2 text-base font-semibold text-white bg-gray-900 rounded hover:bg-amber-400"
              onClick={() => history.back()}
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default New;
