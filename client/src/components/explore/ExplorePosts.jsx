import {  useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExploreData } from '../../redux/actions/PostActions';
import ListPost from '../post/ListPost';
import { useParams } from 'react-router-dom';
const ExploreLayout = () => {
  const exploreData=useSelector((state)=>state.posts.explore);
  const dispatch=useDispatch(exploreData.pagination);
  const {hashtag}=useParams();
  useEffect(() => {
    // dispatch(getExploreData(hashtag));
  }, [hashtag]);
  return (
  <>
  <ListPost posts={exploreData} getPosts={dispatch(getExploreData(exploreData.pagination))}/>
  </>
  )
}

export default ExploreLayout;