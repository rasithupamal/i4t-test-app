<script setup>
import { useAuthStore } from "@/stores/authStore";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";



const authStore = useAuthStore();
const router = useRouter();

let validationErrors = reactive({});
let errorMessage = ref("");

const registerForm = reactive({
    name: "",
    email: "",
    password: ""
});

const userSignUp = async () => {
    try {
        validationErrors = {};
        const response = await authStore.register(registerForm);
        if (response.status == 201) {
            router.replace({ name: 'task.list' })
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status == 422) {
                validationErrors = error.response.data.errors;
            }
        }
        errorMessage.value = error.response.data.message
        setTimeout(() => {
            errorMessage.value = ""
        }, 5000);
        console.log(error, "catch Error");
    }
}
</script>
<template>
    <div>
        <h2>
            Register
        </h2>
        <div>
            <p v-if="errorMessage != ''">{{ errorMessage }}</p>
            {{ validationErrors }}
        </div>
        <div>
            <form @submit.prevent="userSignUp">
                <div style="margin-bottom: 10px;">
                    <label for="name">Name *</label>
                    <input type="text" id="name" required v-model="registerForm.name1">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="email">Email *</label>
                    <input type="email" id="email" required v-model="registerForm.email">
                </div>

                <div style="margin-bottom: 10px;">
                    <label for="password">Password *</label>
                    <input type="password" id="password" required v-model="registerForm.password">
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>