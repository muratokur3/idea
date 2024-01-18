import axios from "axios";
import { getUsers } from "../slices/UserSlice";

const url = "http://localhost:3005";

const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get(`${url}/users`);
        await dispatch(getUsers(response.data));
        //console.log(response.data);
    }
    catch (err) {
        console.log(err);
    }

};
// const getUser =(id) => async (dispatch) => {
//     try {
//         const response = await axios.get(`${url}/users`, { params: { id:id } });
//         await dispatch(getFollowers(response.data));
//         //console.log(response.data);
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

export { fetchUsers };
