import { getUsers } from "../store/UserSlice";


export const fetchUsers = () => {
    const url = "localhost:3005"

    return async (dispatch) => {
        const response = await fetch(`${url}/users`);
        const users = await response.json();

        dispatch(getUsers(users));
    };
};