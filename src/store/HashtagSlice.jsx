import { createSlice } from "@reduxjs/toolkit";


const initialState = [
    "#react",
    "#javascript",
    "#materialui",
    "#java",
    "#paython",
    "#go",
    "#.net",
    "#asp.net",
    "#mongodb",
    "#sql",
    "#mysql",
    "#oracle",
    "#sqlserver",
    "#postgresql",
    "#c#",
    "#c++",
    "#c",
    "#swift",
    "#flutter",
    "#dart",
    "#bulma",
    "#wordpress",
    "#joomla",
    "#drupal",
    "#magento",
    "#opencart",
    "#prestashop",
    "#shopify",
    "#woocommerce",
    "#vuejs",
    "#angular",
    "#reactjs",
    "#nextjs",
    "#nuxtjs",
    "#svelte",
    "#emberjs",
    "#backbonejs",
    "#jquery",
    "#nodejs",
    "#expressjs",
    "#nestjs",
    "#deno",
  ];

export const hashtagSlice = createSlice({
    name: "hashtags",
    initialState,
    reducers: {
        addHashtag: (state, action) => {
        state.push(action.payload);
        },
        removeHashtag: (state, action) => {
        state.filter((hashtag) => hashtag !== action.payload);
        },
    },
    });

export const { addHashtag, removeHashtag } = hashtagSlice.actions;

export default hashtagSlice.reducer;
