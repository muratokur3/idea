import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import "./Explore.scss"
import ListPost from '../post/ListPost';
import HashtagCardList from '../hashtag/HashtagCardList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/PostActions';
const Explore = () => {
  const dispatch = useDispatch();
  const filterExplorer=useSelector((state)=>state.filterPosts.filterExplore);
 useEffect(() => {
    document.title = "Explore";
    dispatch(getPosts({q:filterExplorer}));

  }, [filterExplorer]);
  return (
  <div id="explore-container">
  <div id="search-box">
  <Paper
      component="form"
      sx={{background:"none", p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%",height:"100px" }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      
      <InputBase
        sx={{ ml: 1, flex: 1,color:"white" }}
        placeholder="Kişi konu veya hashtag ara"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  </div>
  <HashtagCardList/>
  <ListPost/>
  </div>
  )
}

export default Explore;