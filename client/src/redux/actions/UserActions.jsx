import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;


const getUser = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
