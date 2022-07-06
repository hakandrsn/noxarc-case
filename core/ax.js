import axios from "axios";
export default axios.create({
    baseURL: "https://nox-podcast-api.vercel.app",
    headers: {
        "Content-Type": "application/json"
        }
})