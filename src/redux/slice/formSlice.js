import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fieldType: null,
}
const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        addField:(state,action)=>{
            state.fieldType=action.payload
        }
    }

})
export const {addField}=formSlice.actions;
export default formSlice.reducer;