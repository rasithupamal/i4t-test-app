<script setup>
import { useTaskStore } from "@/stores/taskStore.js";
import { storeToRefs } from "pinia";
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
const taskStore = useTaskStore();
const router = useRouter();

const loadTasks = async () => {
    await taskStore.allTasks();
}
let message = ref("");
const { getAllTasks } = storeToRefs(taskStore);

const deleteTask = async (id) => {

    try {
        const res = await taskStore.deleteTask(id);
        if (res.status == 204) {
            message.value = "Task Deleted Successful.";
            setTimeout(() => {
                message.value = "";
            }, 5000);
        }

    } catch (error) {
        console.log(error, "error");
    }
}

const markAsCompleteTask = async (id) => {

    try {
        const res = await taskStore.markAsCompleted(id);
        if (res.status == 200) {
            message.value = res.data.message;
            setTimeout(() => {
                message.value = "";
            }, 5000);
        }

    } catch (error) {
        console.log(error, "error");
    }
}


onMounted(() => {
    loadTasks();
});
</script>
<template>
    <div>
        <a href="/tasks/create">Add New Task</a>
    </div>
    <div style="background-color: rgb(196, 240, 131); color: green;" v-if="message != ''">
        {{ message }}
    </div>
    <div>
        <h4>Task List</h4>
        <ul>
            <li v-for="task in getAllTasks" :key="task.id">
                <p>{{ task.title }}</p>
                <p>{{ task.description }}</p>
                <p>{{ task.status }}</p>
                <a :href="`tasks/${task.id}/edit`">Edit this Task</a>
                <button v-if="!task.isCompleted" style="margin-left: 5px;" @click="markAsCompleteTask(task.id)">Mark As
                    Complete</button>
                <button style="margin-left: 5px;" @click="deleteTask(task.id)">Delete Task</button>
            </li>
        </ul>
    </div>
</template>