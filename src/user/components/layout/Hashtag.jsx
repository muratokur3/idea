import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import "./scss/hashtag.scss";
import HashtagCardList from '../hashtag/HashtagCardList';
const Hashtag = () => {

  return (
    <div id="hashtag-container">
       <Paper
      component="form"
      sx={{background:"none", p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%",height:"50px" }}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1,color:"white",fontSize:".7rem" }}
        placeholder="Ara"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '3px' }} aria-label="search">
        <SearchIcon fontSize="3px" />
      </IconButton>
    </Paper>
      <HashtagCardList />
    </div>
  );
};
export default Hashtag;
