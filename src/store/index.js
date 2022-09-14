import { configureStore } from "@reduxjs/toolkit";
import qurans from "./quranSlice";


export default configureStore ({
    reducer: {
        qurans,
    }
})