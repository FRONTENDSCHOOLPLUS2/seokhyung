import { updateBoard } from '../../api/board/updateBoard';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useUserStore from '@/zustand/store';

const Edit = () => {
  type boardForm = {
    title: string;
    content: string;
  };
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const prevTitle = location.state.title;
  const prevContent = location.state.content;
  const { _id } = useParams();
  const navigate = useNavigate();
  const { accessTokenGlobal } = useUserStore();

  const onSubmit = async (data: boardForm) => {
    const form = {
      title: data.title,
      content: data.content,
    };
    await updateBoard(form, _id, accessTokenGlobal).then(() => {
      navigate(`/info/${_id}`);
    });
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="py-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="p-4 mb-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="content-center block text-lg" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              defaultValue={prevTitle}
              {...register('title', {
                required: '필수 입력사항입니다',
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <div className="my-4">
            <label className="content-center block text-lg" htmlFor="content">
              내용
            </label>
            <textarea
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              {...register('content', {
                required: '필수 입력사항입니다!',
              })}
            >
              {prevContent}
            </textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
            >
              수정
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

export default Edit;
