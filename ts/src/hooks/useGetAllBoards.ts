import { getAllBoardsApi } from '../api/board/getAllBoards';
import { useEffect, useState } from 'react';

export const useGetAllBoards = () => {
  type dataForm = {
    content: string;
    createdAt: string;
    repliesCount: number;
    title: string;
    type: string;
    updatedAt: string;
    user: {
      _id: number;
      name: string;
      profile: {
        item: { name: string; originalname: string; path: string }[];
        ok: number;
      };
      views: number;
    };
    _id: number;
  };
  type paginationForm = {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
  const [data, setData] = useState<dataForm[]>();
  const [pagination, setPagination] = useState<paginationForm>();
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT_NUMBER = 10;

  useEffect(() => {
    fetchBoardData(currentPage);
  }, [currentPage]);

  const fetchBoardData = (page: number) => {
    getAllBoardsApi(page, LIMIT_NUMBER).then((rs) => {
      setData(rs.item);
      setPagination(rs.pagination);
    });
  };

  let totalPage;
  if (pagination !== undefined) {
    totalPage = pagination.totalPages;
  } else {
    totalPage = 0;
  }

  // const totalPage = pagination.totalPages || 0;
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSetData = (value: dataForm) => {
    if (data !== undefined) {
      setData([...data, value]);
    }
  };
  return { data, onSetData, pagination, currentPage, pages, onPageChange };
};
