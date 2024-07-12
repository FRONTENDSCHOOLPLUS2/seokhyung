import React from 'react';
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import { LoginAPI } from '@/api/user/LoginApi';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@zustand/store';
const Login = () => {
  // 로그인할때, 프로필이미지 주소를 서버로 부터 받아와서 사용해야함
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  const { setAccessToken, setRefreshToken, setUserName, setUserId, setProfileImg } =
    useUserStore();
  const onSubmit = async (data) => {
    try {
      const result = await LoginAPI({
        email: data.email,
        password: data.password,
      });

      console.log(result);
      setAccessToken(result.item.token.accessToken);
      setRefreshToken(result.item.token.refreshToken);
      setUserName(result.item.name);
      setUserId(result.item._id);
      setProfileImg(result.item.profileImage);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      await new Promise((r) => setTimeout(r, 1500));
    }
  };

  return (
    <main className="flex items-center justify-center flex-grow min-w-80">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg dark:bg-gray-600 dark:border-0">
        <div className="py-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              // 스크린 리더에 폼 제출 및 에러 여부 전달
              aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && (
              <small role="alert">
                <p className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400">
                  {errors.email.message}
                </p>
              </small>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-gray-700 dark:text-gray-200"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              autoComplete="off"
              aria-invalid={
                isSubmitted ? (errors.password ? 'true' : 'false') : undefined
              }
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '8자리 이상 비밀번호를 사용하세요',
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && (
              <small
                className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400"
                role="alert"
              >
                {errors.password.message}
              </small>
            )}

            <a
              href="#"
              className="block mt-6 ml-auto text-sm text-gray-500 dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              type="submit"
              className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
              disabled={isSubmitting}
            >
              로그인
            </button>
            <a href="/user/signup" className="ml-8 text-gray-800 hover:underline">
              회원가입
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
