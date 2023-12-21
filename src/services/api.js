import axios from 'axios'
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from 'pinia';

const Apiclient = axios.create({
    withcredentials: false, // this is the default
    headers: {
        accept: 'application/json',
        'content-type': 'application/json'
    }
});


Apiclient.interceptors.request.use(function (config) {
    // const authStore = useAuthStore()

    const { getToken } = storeToRefs(useAuthStore());
    // do something before request is sent
    let authkey = getToken.value;
    config.headers["authorization"] = `Bearer ${authkey}`;
    // config.headers["authorization"] = "Bearer " + "2|3qUbOxKJCYCN2mEfVS0UzcJ7EyjQVCT6snltqxuBabb36d36";
    return config;
});

export default Apiclient;