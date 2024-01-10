import { createSlice } from "@reduxjs/toolkit";

const initislState = [
  {
    id: 1,
    name: "Murat",
    surname: "OKUR",
    username: "muratokur3",
    email: "muratokur3@icloud.com",
    password: "123",
    avatar: "src/assets/muratokur.jpeg",
    followers: [],
    following: [],
    ideas: [],
    likes: [],
    favorites: [],
    notifications: [],
    isDeleted: false,
    createDate: "October 1, 2023",
    status: "user",
  },
  {
    id: 2,
    name: "Ayşe",
    surname: "Yılmaz",
    username: "ayseyilmaz22",
    email: "ayseyilmaz22@gmail.com",
    password: "abc123",
    avatar: "src/assets/ayseyilmaz.jpeg",
    followers: [1, 3],
    following: [4],
    ideas: [2, 4],
    likes: [1, 3],
    favorites: [2],
    notifications: [],
    isDeleted: false,
    createDate: "November 15, 2023",
    status: "user",
  },
  {
    id: 3,
    name: "Emre",
    surname: "Kara",
    username: "emrekara_87",
    email: "emrekara87@yahoo.com",
    password: "pass456",
    avatar: "src/assets/emrekara.jpeg",
    followers: [2],
    following: [1, 2],
    ideas: [1, 3],
    likes: [2, 4],
    favorites: [3],
    notifications: [],
    isDeleted: false,
    createDate: "December 5, 2023",
    status: "user",
  },
  {
    id: 4,
    name: "Zeynep",
    surname: "Demir",
    username: "zeynepdemir_55",
    email: "zeynep55@gmail.com",
    password: "zey123",
    avatar: "src/assets/zeynepdemir.jpeg",
    followers: [1, 2, 3],
    following: [1, 3],
    ideas: [2, 5],
    likes: [1, 4],
    favorites: [1],
    notifications: [],
    isDeleted: false,
    createDate: "January 20, 2024",
    status: "user",
  },
  {
    id: 5,
    name: "Ahmet",
    surname: "Yıldırım",
    username: "ahmetyildirim_99",
    email: "ahmet99@hotmail.com",
    password: "ahmet789",
    avatar: "src/assets/ahmetyildirim.jpeg",
    followers: [3],
    following: [2, 4],
    ideas: [4],
    likes: [3],
    favorites: [5],
    notifications: [],
    isDeleted: false,
    createDate: "February 8, 2024",
    status: "user",
  },
  {
    id: 6,
    name: "Fatma",
    surname: "Tekin",
    username: "fatmatekin_28",
    email: "fatma28@gmail.com",
    password: "ft1234",
    avatar: "src/assets/fatmatekin.jpeg",
    followers: [2, 4],
    following: [3, 5],
    ideas: [3],
    likes: [1, 2],
    favorites: [4],
    notifications: [],
    isDeleted: false,
    createDate: "March 12, 2024",
    status: "user",
  },
];

export const userSlice = createSlice({
  name: "users",
  initialState: initislState,
  reducers: {
    getUsers: (state, action) => {
      state = action.payload;
    },
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      state.map((user) => {
        if (user.id === action.payload.id) {
          user = action.payload;
        }
      });
    },
  },
});

export const { addUser, deleteUser, updateUser,getUsers } = userSlice.actions;
export default userSlice.reducer;
