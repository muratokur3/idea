import { useEffect, useState } from "react";
import axios from '../../../../axiosConfig';
import { DataGrid } from "@mui/x-data-grid";
const PostList = () => {
  const [data, setData] = useState([]);
  const getPosts = async () => {
    const response = await axios.get("http://localhost:7000/api/posts");
    setData(response.data);
  };
  const columns = [
    { field: "id", headerName: "id", width: 100 },
    { field: "title", headerName: "title", width: 250 },
    { field: "content", headerName: "content", width: 300 },
    { field: "hashtags", headerName: "hashtags", width: 12 },
    { field: "isDeleted", headerName: "isDeleted", width: 130 },
    { field: "delete", headerName: "action", width: 130 },
  ];
  const rows = data.map((post) => ({
    id: post._id,
    title: post.title,
    content: post.content,
    hashtags: post.hashtags,
    isDeleted: post.isDeleted,
    delete: <h1>Delete</h1>,
  }));
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <DataGrid
      style={{ width: "100%" }}
      columns={columns}
      rows={rows}
      pageSize={2}
    />
  );
};

export default PostList;
