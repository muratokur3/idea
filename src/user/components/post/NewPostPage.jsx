import { Button } from "@mui/material";
import NewPost from "./NewPost";
import { useDispatch } from "react-redux";
import { setNewIdeaPage } from "../../../store/UiSlice";
import './scss/new-post-page.scss'

const NewPostPage = () => {
    const dispatch = useDispatch();
  return (
    <div id='new-post-page'>
    <div id='box-new-post'>
        <NewPost/>
    <Button  className='close-new-post-page' onClick={()=>dispatch(setNewIdeaPage(false))}>X</Button>
    </div>
    </div>
  )
}

export default NewPostPage