import { defineStore } from 'pinia'
import AuthService from "@/services/authService";
export const useAuthStore = defineStore('auth', {
    state: () => ({ user: {}, token: null }),
    getters: {
        getAuthUser: () => { return JSON.parse(window.localStorage.getItem('user')) },
        getToken: () => { return window.localStorage.getItem('token') },
    },
    actions: {
        async register(data) {
            try {
                const response = await AuthService.register(data);
                if (response.status == 201) {
                    window.localStorage.setItem("token", response.data.accessToken)
                }
                return response;
            } catch (error) {
                console.log(error, "try error");
                throw error;
            }
        },
        async login(data) {
            try {
                const response = await AuthService.login(data);
                if (response.status == 200) {
                    window.localStorage.setItem("token", response.data.accessToken)
                }
                return response;
            } catch (error) {
                console.log(error, "try error");
                throw error;
            }
        },
        async authUser() {
            try {
                const response = await AuthService.authUser();
                if (response.status == 200) {
                    window.localStorage.setItem("user",JSON.stringify(response.data))
                }
            } catch (error) {
                console.log(error, "try error");
                throw error;
            }
        },
        async userLogout() {
            try {
                const response = await AuthService.logout();
                window.localStorage.removeItem('token')
                return response;
            } catch (error) {
                console.log(error, "try error");
                throw error;
            }
        },
    }
})