import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit/";
import axios from "axios";



export const getBooks = createAsyncThunk( 'quran/getBooks', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try{
        const res = await fetch('https://quran-endpoint.vercel.app/quran');
        const data = await res.json();
        const respons = data.data
        // console.log(respons);
        return respons
    }catch(error){
    return rejectWithValue(error.message)
}
    // axios.get('https://quran-endpoint.vercel.app/quran')
    // .then(res => res.data.data) 
    // .catch(error => rejectWithValue(error.message) )
    
} )

const quranSlice = createSlice({
    name: 'quran',
    initialState:{isLoading: false, quran: []},
    extraReducers:{

        [getBooks.pending]: (state, action) => {
            state.isLoading = true
        },
        [getBooks.fulfilled]: (state, action) => {
            state.quran = action.payload
            state.isLoading = false
            // console.log(state.quran);

        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false
            // console.log("Rejected")
        },
    }
})

export default quranSlice.reducer