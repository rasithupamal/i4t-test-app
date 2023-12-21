import Apiclient from "./api";

const API_URL = `${import.meta.env.VITE_API_URL}/`;

class TaskService {
    async createTask(task) {
        return await Apiclient
            .post(API_URL + 'tasks', task);
    }
    async updateTask(task, id) {
        return await Apiclient
            .put(API_URL + `tasks/${id}`, task);
    }
    async markAsCompleteTask(id) {
        return await Apiclient
            .put(API_URL + `tasks/${id}/mark-as-completed`, {});
    }
    async deleteTask(id) {
        return await Apiclient
            .delete(API_URL + `tasks/${id}`);
    }
    async listTasks() {
        return await Apiclient
            .get(API_URL + `tasks`);
    }
    async findById(id) {
        return await Apiclient
            .get(API_URL + `tasks/${id}`);
    }
}

export default new TaskService();