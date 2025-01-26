import axios from "axios";


const api=axios.create({
    baseURL:'http://localhost:8080/api/v1',
    timeout: 10000,  
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
    }
});
export default api;