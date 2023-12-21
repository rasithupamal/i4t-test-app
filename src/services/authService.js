

import Apiclient from "./api";

const API_URL = `${import.meta.env.VITE_API_URL}/`;

class AuthService {
    async login(user) {
        return await Apiclient
            .post(API_URL + 'login', user);
    }
    
    async logout() {
        return await Apiclient
            .get(API_URL + 'logout');
    }

    async register(user) {
        return await Apiclient.post(API_URL + 'register', user);
    }

    async authUser() {
        return await Apiclient.get(API_URL + 'user');
    }
}

export default new AuthService();