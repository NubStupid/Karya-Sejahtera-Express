import { create } from "zustand";

const useAuth = create((set) => ({
    user: (() => {
        if (typeof window !== "undefined") {
            try {
                const storedUser = localStorage.getItem("user");
                return storedUser ? JSON.parse(storedUser) : null;
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                return null;
            }
        }
        return null;
    })(),
    login: (user) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(user));
        }
        set({ user });
    },
    logout: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
        }
        set({ user: null });
    },
}));

export default useAuth;
