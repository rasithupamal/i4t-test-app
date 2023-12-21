<script setup>
import { reactive } from 'vue';
import { useTaskStore } from "@/stores/taskStore.js";
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const props = defineProps({
    id: String
})
const taskStore = useTaskStore();
const router = useRouter();
let taskForm = reactive({
    title: "",
    description: "",
    status: "PENDING"
});

const getTaskById = async () => {
    let res = await taskStore.findById(props.id);
    taskForm.title = res.data.title;
    taskForm.description = res.data.description;
    taskForm.status = res.data.status
}

const statusList = [
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    {
        label: "Completed",
        value: "COMPLETED",
    }]

let formErrors = reactive([]);

const updateTask = async () => {

    try {
        formErrors = reactive([]);
        const res = await taskStore.editTask(taskForm, props.id);
        if (res.status == 200) {
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

onMounted(() => {
    getTaskById();
});
</script>
<template>
    <h2>
        Update Task
    </h2>

    <div>
        <p>{{ formErrors }}</p>
        <form @submit.prevent="updateTask">
            <div style="margin-bottom: 10px;">
                <label for="title">Title *</label>
                <input type="text" id="title" required v-model="taskForm.title">
            </div>

            <div style="margin-bottom: 10px;">
                <label for="title">Description *</label>
                <textarea type="text" id="title" required v-model="taskForm.description"></textarea>
            </div>
            <div style="margin-bottom: 10px;">
                <label for="status">status *</label>
                <select id="status" required v-model="taskForm.status">
                    <option v-for="(status, key) in statusList" :key="key" :value="status.value">{{ status.label }}</option>
                </select>
            </div>

            <button type="submit">Update Task</button>
        </form>
    </div>
</template>