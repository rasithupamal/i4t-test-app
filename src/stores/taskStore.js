import { defineStore } from 'pinia'
import TaskService from "@/services/taskService";
export const useTaskStore = defineStore('task', {
    state: () => ({ tasks: [], archivedTasks: [] }),
    getters: {
        getAllTasks: (state) => { return state.tasks },
    },
    actions: {
        async saveTask(data) {
            try {
                const response = await TaskService.createTask(data);
                this.allTasks();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async findById(id) {
            try {
                const response = await TaskService.findById(id);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async editTask(data, id) {
            try {
                const response = await TaskService.updateTask(data, id);
                this.allTasks();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async markAsCompleted(id) {
            try {
                const response = await TaskService.markAsCompleteTask(id);
                this.allTasks();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async deleteTask(id) {
            try {
                const response = await TaskService.deleteTask(id);
                this.allTasks();
                return response;
            } catch (error) {
                throw error;
            }
        },
        async allTasks() {
            try {
                const response = await TaskService.listTasks();
                this.tasks = response.data.data;
            } catch (error) {
                throw error;
            }
        },
    }
})