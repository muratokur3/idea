import "./scss/list-post.scss";
import Post from "./Post.jsx";
const ListPost = () => {
  const posts = [
    {
      id: 1,
      user: {
        id: 1,
        name: "Murat OKUR",
        username: "muratokur3",
        avatar: "https://picsum.photos/200/300",
      },
      title: "Post 1",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    createDate: "September 14, 2023",
    },
    {
      id: 2,
      user: {
        id: 1,
        name: "Mahir KURŞUN",
        username: "mahirkursun",
        avatar: "https://picsum.photos/200/300",
      },
      title: "Post 2",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    createDate: "October 1, 2023",
    },
    {
      id: 3,
      user: {
        id: 1,
        name: "Mehmet KAYA",
        username: "mehmetkaya1",
        avatar: "https://picsum.photos/200/300",
      },
      title: "Post 3",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    createDate: "October 1, 2023",
    }
    ];

  return (
    <div>
      {
      posts.map((post) => (
        <Post key={post.id} post={post} />
      ))
      }
    </div>
  );
};

export default ListPost;
