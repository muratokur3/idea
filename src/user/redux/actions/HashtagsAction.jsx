import axios from "axios";
import {setHashtags} from '../slices/HashtagSlice';

const getHashtags=()=> async (dispatch)=>{
   const url='http://localhost:3005';
        try{
            const response = await axios.get(`${url}/hashtags`, {
                params: {
                  _sort:'postCount',
                }
              });
              
          await dispatch(setHashtags(response.data.reverse().slice(0,5)));
        }catch(err){
            console.log(err);
        }
    }




export  {getHashtags};