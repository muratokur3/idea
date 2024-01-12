import axios from "axios";
import { setProfile } from "../slices/ProfileSlice";

const getProfile = (Username) => async (dispatch) =>{
        try {
        const response = await axios.get(`http://localhost:3005/users`,{params:{username:Username}});
        console.log(response.data[0]);
        dispatch(setProfile(response.data[0]));
        } catch (error) {
        console.log(error);
        }
    };

export { getProfile };