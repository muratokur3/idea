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
    createDate: "12.3.2023",
    },
    {
      id: 1,
      user: {
        id: 1,
        name: "Mahir KURŞUN",
        username: "mahirkursun",
        avatar: "https://picsum.photos/200/300",
      },
      title: "Post 2",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    createDate: "1.3.2024",
    },
    {
      id: 1,
      user: {
        id: 1,
        name: "Ali VELİ",
        username: "aliveli",
        avatar: "https://picsum.photos/200/300",
      },
      title: "Post 3",
      content: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    createDate: "12.3.2023",
    },
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
