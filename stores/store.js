import { create } from "zustand";

const useAuth = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    login: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },
    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));

export default useAuth;
