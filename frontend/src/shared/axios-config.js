import axios from 'axios'

axios.create({
    baseURL: 'http://yoursite.com'
})

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = 'http://localhost'    
}

export const axiosInstance = axios
