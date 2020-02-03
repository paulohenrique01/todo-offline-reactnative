import axios from './axios';

const saveTodo = (data) => axios.post('/todos', data);
const getAllTodo = () => axios.get('/todos');

export default {
    saveTodo,
    getAllTodo
};