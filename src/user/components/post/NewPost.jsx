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
    {id:1, title: "#react" },
    {id:2, title: "#javascript" },
    {id:3, title: "#materialui" },
    {id:4, title: "#java" },
    {id:5, title: "#paython" },
    {id:6, title: "#go" },
    {id:7, title: "#.net" },
    {id:8, title: "#asp.net" },
    {id:9, title: "#mongodb" },
    {id:10, title: "#sql" },
    {id:11, title: "#mysql" },
    {id:12, title: "#oracle" },
    {id:13, title: "#sqlserver" },
    {id:14, title: "#postgresql" },
    {id:15, title: "#c#" },
    {id:16, title: "#c++" },
    {id:17, title: "#c" },
    {id:18, title: "#swift" },
    {id:19, title: "#flutter" },
    {id:20, title: "#dart" },
    {id:21, title: "#bulma" },
    {id:22, title: "#wordpress" },
    {id:23, title: "#joomla" },
    {id:24, title: "#drupal" },
    {id:25, title: "#magento" },
    {id:26, title: "#opencart" },
    {id:27, title: "#prestashop" },
    {id:28, title: "#shopify" },
    {id:29, title: "#woocommerce" },
    {id:30, title: "#vuejs" },
    {id:31, title: "#angular" },
    {id:32, title: "#reactjs" },
    {id:33, title: "#nextjs" },
    {id:34, title: "#nuxtjs" },
    {id:35, title: "#svelte" },
    {id:36, title: "#emberjs" },
    {id:37, title: "#backbonejs" },
    {id:38, title: "#jquery" },
    {id:39, title: "#nodejs" },
    {id:40, title: "#expressjs" },
    {id:41, title: "#nestjs" },
    {id:42, title: "#deno" },
  ];

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIdea({
        id: 10,
        userId: 1,
        content,
        createDate: "October 1, 2023",
        likesUserId: [],
        isDeleted: false,
        hashtags,
      })
    );

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
          onChange={(e) => setContent(e.target.value)}
          aria-label="minimum height"
          minRows={3}
          placeholder="Ne buldun acaba?"
          sx={{ marginBottom: "20px",fontFamily:"monospace",fontSize:".9rem"}}

        />
        <Autocomplete
          onChange={(e, value) => setHashtags(value)}
          className="new-post-hashtag"
          multiple
          limitTags={3}
          id="multiple-limit-tags"
          options={hashtag}
          getOptionLabel={(option) => option.title}
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
