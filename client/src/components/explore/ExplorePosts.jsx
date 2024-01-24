import {  useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExploreHashtagPosts } from '../../redux/actions/PostActions';
import ListPost from '../post/ListPost';
import { useParams } from 'react-router-dom';
const ExploreLayout = () => {
  const explorePosts=useSelector((state)=>state.posts.explore);
  const dispatch=useDispatch();
  const {hashtag}=useParams();
  useEffect(() => {
    dispatch(getExploreHashtagPosts(hashtag));
  }, [hashtag]);
  return (
  <>
  <ListPost posts={explorePosts} />
  </>
  )
}

export default ExploreLayout;