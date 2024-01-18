import axios from "axios";
import { setProfile } from "../slices/ProfileSlice";

const getProfile = (Username) => async (dispatch) =>{
        try {
        const response = await axios.get(`http://localhost:3005/users`,{params:{username:Username}});
        dispatch(setProfile(response.data[0]));
        } catch (error) {
        console.log(error);
        }
    };

export { getProfile };