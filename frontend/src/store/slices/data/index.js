import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        list: []
    },
    reducers: {
        setDataList: (state, action) => {
            state.list = action.payload
        }
    }
});

export const {setDataList} = dataSlice.actions

export default dataSlice.reducer;

export const fetchAllData = () => {
    return (dispatch) => {
        axios.get('http://localhost:5000/files/data').then((response) => {
            console.log(response);
            dispatch(setDataList(response.data));
        }).catch((error) => {
            console.log(error);
        })
    }
}