import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    userId: 1,
    content:
      "React ile yapılabilir bir proje önerisi diye çok arama yapılıyo. Bende bir tane yapayım dedim. Sizce nasıl olmuş? Yorumlarınızı bekliyorum.",
    createDate: "September 14, 2023",
    likesUserId:[1,2,3,4],
    isDeleted: false,
    hashtags: ["#react", "#redux", "#javascript", "#nodejs"],
  },
  {
    id: 2,
    userId: 2,
    content:
    "E-ticaret sitesi yapmak istiyorum. Çok farklı olacağından eminim. Şöyle böyle olacak...",
    createDate: "october 4, 2023",
    likesUserId:[1,3],
    isDeleted: false,
    hashtags: ["#eticaret", "#yeniproje", "#yazılım"],
  },
{
id: 3,
userId: 3,
content:
"Yeni başlayanlar için Python ile web scraping projeleri yapmak harika bir deneyim olabilir. Önerilerinizi bekliyorum!",
createDate: "November 22, 2023",
likesUserId: [2, 4],
isDeleted: false,
hashtags: ["#python", "#web scraping", "#beginner", "#project"],
},
{
id: 4,
userId: 1,
content:
"Mobil uygulama geliştirme konusunda deneyimi olan arkadaşlar, benimle fikir alışverişinde bulunabilir mi? Kotlin veya Swift kullanarak bir proje planlıyorum.",
createDate: "December 10, 2023",
likesUserId: [2, 3, 4],
isDeleted: false,
hashtags: ["#mobileapp", "#kotlin", "#swift", "#appdevelopment"],
},
{
id: 5,
userId: 4,
content:
"Yapay Zeka ile ilgili yeni bir proje üzerinde çalışıyorum. TensorFlow ve Python kullanarak neler başarabileceğimi görmek istiyorsanız, takipte kalın!",
createDate: "January 5, 2024",
likesUserId: [1, 3],
isDeleted: false,
hashtags: ["#artificialintelligence", "#tensorflow", "#python", "#project"],
}
];

export const ideaSlice = createSlice({
    name: "ideas",
    initialState,
    reducers: {
        addIdea: (state, action) => {
        state.push(action.payload);
        },
        deleteIdea: (state, action) => {
        const index = state.findIndex((idea) => idea.id === action.payload);
        state[index].isDeleted = true;
        },
        likeIdea: (state, action) => {
        const index = state.findIndex((idea) => idea.id === action.payload);
        state[index].likesUserId.push(1);
        },
        unlikeIdea: (state, action) => {
        const index = state.findIndex((idea) => idea.id === action.payload);
        state[index].likesUserId.pop(1);
        },
    },
    });

    export const { addIdea, deleteIdea, likeIdea, unlikeIdea } = ideaSlice.actions;
    export default ideaSlice.reducer;