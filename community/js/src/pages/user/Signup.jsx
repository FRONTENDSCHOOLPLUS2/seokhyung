import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpApi } from '../../api/user/SignUpApi';
import { useNavigate } from 'react-router-dom';
import { uploadFilesApi } from '../../api/file/uploadFiles';
import useUserStore from '@zustand/store';

const Signup = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const { setProfileImg } = useUserStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('attach', data.profileImage[0]);
      const rs = await uploadFilesApi(formData);
      const profileImgUrl = rs.item[0];
      console.log(profileImgUrl);
      await SignUpApi({
        email: data.email,
        password: data.password,
        name: data.name,
        profileImage: profileImgUrl,
        type: data.type,
      });
      // console.log(profileImgGlobal);
      navigate('/');

      // console.log('uploadFilesApi 결과 : ', rs);
    } catch (error) {
      console.error(error);
    } finally {
      // 중복 제출 방지
      // 로그인폼에서 제출 이벤트 처리가 미처 종료되기 전에 사용자가 다시 로그인 버튼을 클릭할 경우 양식이 중복해서 제출되는 문제가 발생할 수 있습니다. 따라서 사용자가 로그인 버튼을 클릭하지 마자, 해당 버튼을 비활성화 시켰다가, 이벤트 처리가 완료되었을 때, 제출 버튼을 다시 활성화 시켜주는 것이 안전합니다.
      await new Promise((r) => setTimeout(r, 1500));
    }
  };

  return (
    <main className="flex items-center justify-center flex-grow min-w-80">
      <div className="w-full max-w-md p-8 border border-gray-200 rounded-lg dark:bg-gray-600 dark:border-0">
        <div className="py-4 text-center">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-gray-200" htmlFor="type">
              유저 타입
            </label>
            <div>
              <label htmlFor="user" className="">
                구매회원
              </label>
              <input
                type="radio"
                id="user"
                className="px-3 py-2 mb-4 ml-2 mr-4 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="type"
                value="user"
                {...register('type', {
                  required: '타입은 필수 입력입니다.',
                })}
              />

              <label htmlFor="seller" className="">
                판매회원
              </label>
              <input
                type="radio"
                id="seller"
                className="px-3 py-2 ml-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                name="type"
                value="seller"
                {...register('type', {
                  required: '이름',
                })}
              />
            </div>

            <label className="block mb-2 text-gray-700 dark:text-gray-200" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
              {...register('name', {
                required: '이름은 필수 입력입니다.',
                pattern: {
                  value: /[a-zA-Zㄱ-ㅎ가-힣]+/,
                  message: '숫자는 입력할 수 없습니다!',
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && (
              <small role="alert">
                <p className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              </small>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-gray-700 dark:text-gray-200"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              autoComplete="off"
              name="password"
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
              <small role="alert">
                <p className="mt-1 ml-2 text-sm text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              </small>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-gray-700 dark:text-gray-200"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              onInput={handleImgChange}
              {...register('profileImage')}
            />
            {selectedImg && (
              <div>
                <img
                  src={URL.createObjectURL(selectedImg)}
                  alt="Preview Image"
                  className="max-w-52 "
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mt-10">
            <button
              type="submit"
              className="px-4 py-1 ml-2 text-base font-semibold text-white bg-orange-500 rounded hover:bg-amber-400"
              disabled={isSubmitting}
            >
              회원가입
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
      </div>
    </main>
  );
};

export default Signup;
