import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-4 pb-12 text-gray-600 duration-500 ease-in-out border-t border-t-slate-200 dark:border-t-slate-500 dark:bg-gray-600 dark:text-white transition-color">
      <div className="min-w-[320px] flex flex-wrap gap-4 justify-center items-center text-sm text-slate-400">
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          약관
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          게시판 정책
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          회사소개
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          광고
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          마이비즈니스
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          제휴 제안
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          이용약관
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          개인정보취급방침
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          청소년보호 정책
        </a>
        <a href="#" className="hover:font-semibold dark:hover:text-gray-200">
          고객센터
        </a>
      </div>
    </footer>
  );
};

export default Footer;
