import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { useGetAllBoards } from '@hooks/useGetAllBoards';
import Pagination from '@components/Pagination';

const List = () => {
  const { data, currentPage, pages, onPageChange } = useGetAllBoards();

  return (
    <main className="p-10 min-w-80">
      <div className="py-4 text-center">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            location.href = '';
          }}
        >
          <input
            className="p-1 bg-gray-100 rounded dark:bg-gray-600"
            type="text"
            name="keyword"
          />
          <button
            type="submit"
            className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
          >
            검색
          </button>
        </form>

        <button
          type="button"
          className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
          onClick={() => (location.href = '/info/new')}
        >
          글작성
        </button>
      </div>
      <section className="pt-10">
        <table className="w-full border-collapse table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600 border-solid">
              <th className="p-2 font-semibold whitespace-nowrap">번호</th>
              <th className="p-2 font-semibold whitespace-nowrap">제목</th>
              <th className="p-2 font-semibold whitespace-nowrap">글쓴이</th>
              <th className="hidden p-2 font-semibold whitespace-nowrap sm:table-cell">
                조회수
              </th>
              <th className="hidden p-2 font-semibold whitespace-nowrap sm:table-cell">
                댓글수
              </th>
              <th className="hidden p-2 font-semibold whitespace-nowrap sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            {/*
          <tr>
            <td colSpan="6" className="py-20 text-center">로딩중...</td>
          </tr>
        */}

            {/* 에러 메세지 출력 */}
            {/*
          <tr>
            <td colSpan="6" className="py-20 text-center">에러 메세지</td>
          </tr>
        */}

            {/* 본문 출력 */}
            {data?.map((item) => (
              <ListItem key={item._id} item={item} />
            ))}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <Pagination currentPage={currentPage} pages={pages} onPageChange={onPageChange} />
      </section>
    </main>
  );
};

export default List;
