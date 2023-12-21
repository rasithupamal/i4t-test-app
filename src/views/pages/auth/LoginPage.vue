<script setup>
import { useAuthStore } from "@/stores/authStore";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";



const authStore = useAuthStore();
const router = useRouter();

let validationErrors = reactive({});
let errorMessage = ref("");
const loginForm = reactive({
    email: "",
    password: ""
});

const userSignIn = async () => {
    try {
        validationErrors = {};
        const response = await authStore.login(loginForm);
        if (response.status == 200) {
            router.replace({ name: 'task.list' })
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status == 422) {
                validationErrors = error.response.data.errors;
            }
            errorMessage.value = error.response.data.message
            setTimeout(() => {
                errorMessage.value = ""
            }, 5000);
        }
    }
}
</script>
<template>
    <div>
        <h2>
            Login
        </h2>
        <div>
            <p v-if="errorMessage != ''">{{ errorMessage }}</p>
            {{ validationErrors }}
        </div>
        <div>
            <form @submit.prevent="userSignIn">
                <div style="margin-bottom: 10px;">
                    <label for="email">Email *</label>
                    <input type="email" id="email" required v-model="loginForm.email">
                </div>

                <div style="margin-bottom: 10px;">
                    <label for="password">Password *</label>
                    <input type="password" id="password" required v-model="loginForm.password">
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>