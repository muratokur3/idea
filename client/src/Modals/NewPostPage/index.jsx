import { Button } from "@mui/material";
import NewPost from "../../components/post/NewPost";
import { useDispatch } from "react-redux";
import { setNewPostPage } from "../../redux/slices/UiSlice"
import './new-post-page.scss'

const NewPostPage = () => {
    const dispatch = useDispatch();
  return (
    <div id='new-post-page'>
      <div id="modal-overlay" onClick={()=>dispatch(setNewPostPage(false))}></div>
    <div id='box-new-post'>
        <NewPost/>
    <Button  className='close-new-post-page' onClick={()=>dispatch(setNewPostPage(false))}>X</Button>
   
    </div>
    </div>
  )
}

export default NewPostPage