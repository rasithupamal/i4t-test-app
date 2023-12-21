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
let task = reactive({
    title: "",
    description: "",
    status: "",
    updated_at: ""
});

const getTaskById = async () => {
    let res = await taskStore.findById(props.id);
    task.title = res.data.title;
    task.description = res.data.description;
    task.status = res.data.status
    task.updated_at = res.data.updated_at
}

onMounted(() => {
    getTaskById();
});
</script>
<template>
    <h2>
        View Task
    </h2>

    <div>
        {{ task }}
        <h3>Title : {{ task.title }}</h3>
        <p>Description : {{ task.description }}</p>
        <p>Status : {{ task.status }}</p>
        <p>Last Update : {{ new Date(task.updated_at).toUTCString() }}</p>

    </div>
</template>