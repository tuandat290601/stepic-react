import axios from "axios";

export default axios.create({
    baseURL: "https://stepic.herokuapp.com/api",
});
