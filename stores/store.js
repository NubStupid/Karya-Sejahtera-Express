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
    login: (userData) => {
        if (typeof window !== "undefined") {
            const { username, role, profpic } = userData;
            console.log(profpic);
            
            const smallUserData = { username, role, profpic };

            try {
                localStorage.setItem("user", JSON.stringify(smallUserData));
                set({ user: smallUserData });
            } catch (error) {
                console.error("Error saving to localStorage:", error);
            }
        }
    },
    logout: () => {
        if (typeof window !== "undefined") {
            console.log(localStorage.getItem("user"));
            
            localStorage.clear();
            sessionStorage.removeItem("user");
            console.log("hapus user");
            
            console.log(localStorage.getItem("user"));
        }
        set({ user: null });
    },
}));

export default useAuth;
