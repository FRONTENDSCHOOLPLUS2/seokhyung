import { getAllBoardsApi } from '../api/board/getAllBoards';
import { useEffect, useState } from 'react';

export const useGetAllBoards = () => {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT_NUMBER = 10;

  useEffect(() => {
    fetchBoardData(currentPage);
  }, [currentPage]);

  const fetchBoardData = (page) => {
    getAllBoardsApi(page, LIMIT_NUMBER).then((rs) => {
      setData(rs.item);
      setPagination(rs.pagination);
    });
  };

  const totalPage = pagination?.totalPages || 0;
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onSetData = (value) => {
    setData([...data, value]);
  };
  return { data, onSetData, pagination, currentPage, pages, onPageChange };
};
