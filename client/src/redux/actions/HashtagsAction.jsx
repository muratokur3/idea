import axios from "axios";
import {setHashtags} from '../slices/HashtagSlice';

const getHashtags=()=> async (dispatch)=>{
  // const url = "http://localhost:7000/api";
        try{
            const response = await axios.get(`http://localhost:7000/api/hashtags`);
            console.log(response.data);
              
          await dispatch(setHashtags(response.data));
        }catch(err){
            console.log(err);
        }
    }




export  {getHashtags};