import ListPost from '../post/ListPost';
import HashtagCardList from '../hashtag/HashtagCardList';
import { getExplorePosts } from '../../redux/actions/PostActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const ExploreMain = () => {
    const dispatch=useDispatch();
    const explorePosts=useSelector((state)=>state.posts.explore);
    useEffect(() => {
         dispatch(getExplorePosts());
       }, []);
  return (
    <div>
      <HashtagCardList />
      <ListPost posts={explorePosts} />
    </div>
  );
};

export default ExploreMain;
