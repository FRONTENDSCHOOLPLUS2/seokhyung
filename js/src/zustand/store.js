import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
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
