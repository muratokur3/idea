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
import { Paper, Typography } from "@mui/material";
const NewPost = () => {
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

  const hashtags = [
    { title: "#reactjs" },
    { title: "#javascript" },
    { title: "#materialui" },
    { title: "#react" },
    { title: "#javascript" },
    { title: "#materialui" },
    { title: "#react" },
    { title: "#javascript" },
    { title: "#materialui" },
    { title: "#react" },
    { title: "#javascript" },
    { title: "#materialui" },
    { title: "#react" },
    { title: "#java" },
    { title: "#paython" },
    { title: "#go" },
    { title: "#.net" },
    { title: "#asp.net" },
    { title: "#mongodb" },
    { title: "#sql" },
    { title: "#mysql" },
    { title: "#oracle" },
    { title: "#sqlserver" },
    { title: "#postgresql" },
    { title: "#c#" },
    { title: "#c++" },
    { title: "#c" },
    { title: "#swift" },
    { title: "#flutter" },
    { title: "#dart" },
    { title: "#php" },
    { title: "#laravel" },
    { title: "#symfony" },
    { title: "#django" },
    { title: "#ruby" },
    { title: "#rails" },
    { title: "#html" },
    { title: "#css" },
    { title: "#sass" },
    { title: "#less" },
    { title: "#bootstrap" },
    { title: "#tailwind" },
    { title: "#bulma" },
    { title: "#wordpress" },
    { title: "#joomla" },
    { title: "#drupal" },
    { title: "#magento" },
    { title: "#opencart" },
    { title: "#prestashop" },
    { title: "#shopify" },
    { title: "#woocommerce" },
    { title: "#vuejs" },
    { title: "#angular" },
    { title: "#reactjs" },
    { title: "#nextjs" },
    { title: "#nuxtjs" },
    { title: "#svelte" },
    { title: "#emberjs" },
    { title: "#backbonejs" },
    { title: "#jquery" },
    { title: "#nodejs" },
    { title: "#expressjs" },
    { title: "#nestjs" },
    { title: "#deno" },
  ];

  return (
    <div id="share-container">
      <Avatar
        alt="Remy Sharp"
        src="src/assets/muratokur.jpeg"
        sx={{ width: 80, height: 80}}
      />
      <form id="new-post-form">
        <Textarea
          aria-label="minimum height"
          minRows={5}
          placeholder="Ne buldun acaba?"
          sx={{ marginBottom: "20px",fontFamily:"monospace",fontSize:".9rem"}}

        />
        <Autocomplete
          className="new-post-hashtag"
          multiple
          limitTags={3}
          id="multiple-limit-tags"
          options={hashtags}
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
          <button className="new-post-submit">Paylaş</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
