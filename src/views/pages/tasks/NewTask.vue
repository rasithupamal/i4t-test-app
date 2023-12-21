<script setup>
import { reactive } from 'vue';
import { useTaskStore } from "@/stores/taskStore.js";
import { useRouter } from 'vue-router';

const taskStore = useTaskStore();
const router = useRouter();
let taskForm = reactive({
    title: "",
    description: "",
    status: "PENDING"
});

const statusList = [
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    {
        label: "Completed",
        value: "COMPLETED",
    }]

let formErrors = reactive([]);

const submitTask = async () => {

    try {
        formErrors = reactive([]);
        const res = await taskStore.saveTask(taskForm);
        if (res.status == 201) {
            taskForm.title = "";
            taskForm.description = "";
            taskForm.status = "PENDING";
            router.push({ name: "task.list" });
        }
    } catch (error) {
        console.log(error, "error");
        if (error.response.status == 422) {
            formErrors = error.response.errors;
        }
    }

}

</script>
<template>
    <h2>
        New Task
    </h2>

    <div>
        <form @submit.prevent="submitTask">
            <div style="margin-bottom: 10px;">
                <label for="title">Title *</label>
                <input type="text" id="title" required v-model="taskForm.title">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="title">Title *</label>
                <textarea type="text" id="title" required v-model="taskForm.description"></textarea>
            </div>
            <div style="margin-bottom: 10px;">
                <label for="status">status *</label>
                <select id="status" required v-model="taskForm.status">
                    <option v-for="(status, key) in statusList" :key="key" :value="status.value">{{ status.label }}</option>
                </select>
            </div>

            <button type="submit">Add Task</button>
        </form>
    </div>
</template>