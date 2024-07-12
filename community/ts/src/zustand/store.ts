import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type imgForm = {
  originalname: string;
  name: string;
  path: string;
};

interface UserState {
  accessTokenGlobal: string | null;
  refreshTokenGlobal: string | null;
  userNameGlobal: string | null;
  profileImgGlobal: imgForm | null;
  userIdGlobal: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUserName: (name: string) => void;
  setProfileImg: (img: imgForm) => void;
  setUserId: (id: string) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      accessTokenGlobal: null,
      refreshTokenGlobal: null,
      userNameGlobal: null,
      profileImgGlobal: null,
      userIdGlobal: null,
      setAccessToken: (token) => set({ accessTokenGlobal: token }),
      setRefreshToken: (token) => set({ refreshTokenGlobal: token }),
      setUserName: (name) => set({ userNameGlobal: name }),
      setProfileImg: (img) => set({ profileImgGlobal: img }),
      setUserId: (id) => set({ userIdGlobal: id }),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
export default useUserStore;
