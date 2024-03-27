import { useEffect } from "react";
import ListPost from "../../components/post/ListPost";
import { getFavorites } from "../../redux/actions/ProfileAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ProfileFavorites = () => {
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    dispatch(getFavorites({ page: 1, hasMore: true }, username));
  }, [username, dispatch]);
  const favoriteData = useSelector((state) => state.profile.favorites);
  return (
    <ListPost
      data={favoriteData}
      getPosts={() =>
        dispatch(getFavorites(favoriteData?.pagination, username))
      }
    />
  );
};

export default ProfileFavorites;
