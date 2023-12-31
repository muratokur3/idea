import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifBoxIcon from "@mui/icons-material/GifBox";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import "./scss/new-post.scss";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Button, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { addIdea } from "../../../store/IdeaSlice";
import { useState } from "react";
const NewPost = () => {
  const[content,setContent] = useState("");
  const [hashtags,setHashtags] = useState([]);
 
  const Textarea = styled(BaseTextareaAutosize)(
    () => `
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    max-height: 500px;
    resize: none;
    background: none;
    overflow:hidden;
    &::placeholder{
        font-size: 1rem;
    }
  `
  );

  const hashtag =  [
      "#react",
      "#javascript", 
      "#materialui", 
      "#java" ,
      "#paython" ,
      "#go" ,
      "#.net" ,
      "#asp.net" ,
      "#mongodb" ,
      "#sql" ,
      "#mysql" ,
      "#oracle" ,
      "#sqlserver" ,
      "#postgresql" ,
      "#c#" ,
      "#c++" ,
      "#c" ,
      "#swift" ,
      "#flutter" ,
      "#dart" ,
      "#bulma" ,
      "#wordpress" ,
      "#joomla" ,
      "#drupal" ,
      "#magento" ,
      "#opencart" ,
      "#prestashop" ,
      "#shopify" ,
      "#woocommerce" ,
      "#vuejs" ,
      "#angular" ,
      "#reactjs" ,
      "#nextjs" ,
      "#nuxtjs" ,
      "#svelte" ,
      "#emberjs" ,
      "#backbonejs" ,
      "#jquery" ,
      "#nodejs" ,
      "#expressjs" ,
      "#nestjs" ,
      "#deno" ,
  ];

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIdea({
         id:10,
        userId: 1,
        content,
        createDate: "October 1, 2023",
        likes: [],
        isDeleted: false,
        hashtags,
      })
    );
    setContent("");
    setHashtags([]);
  }
  
  return (
    <div id="share-container">
      <Avatar
        alt="Remy Sharp"
        src="src/assets/muratokur.jpeg"
        sx={{ width: 80, height: 80}}
      />
      <form onSubmit={handleSubmit} id="new-post-form">
        <Textarea
          value={content}
          onChange={(e) => {setContent(e.target.value);e.target.focus();}}
          aria-label="minimum height"
          minRows={3}
          placeholder="Ne buldun acaba?"
          sx={{ marginBottom: "20px",fontFamily:"monospace",fontSize:".9rem"}}
        />
        <Autocomplete
          onChange={(e,value) => {setHashtags(value);console.log(value);}}
          className="new-post-hashtag"
          sx={{color:"white"}}
          value={hashtags}
          multiple
          limitTags={3}
          id="multiple-limit-tags"
          options={hashtag}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="#hashtag" 
              placeholder="#"
              sx={{ 
                '& .MuiInputBase-input::placeholder': { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          )}
          PaperComponent={({ children }) => (
            <Paper sx={{ backgroundColor: 'black' }}>{children}</Paper>
          )}
        />
        {/* <hr className="new-post-hr" /> */}
        <div className="new-post-media">
          <div className="new-post-media-icons">
            <AddAPhotoIcon sx={{ fontSize: 30 }} />
            <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
            <GifBoxIcon sx={{ fontSize: 30 }} />
            <AddLocationAltIcon sx={{ fontSize: 30 }} />
          </div>
          <Button type="submit" id="new-post-submit" variant="outlined">Paylaş</Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
