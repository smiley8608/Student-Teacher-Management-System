
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const InitialState:UpdatedStudentProps={
    Student:null,
    Auth:false
}
const StudentSlice=createSlice({
    name:'student',
    initialState:InitialState,
    reducers:{
        SetInitialStudentState:(state:UpdatedStudentProps,action:PayloadAction<UpdatedStudentProps>)=>{
            state.Student=action.payload.Student
            state.Auth=action.payload.Auth
        }
    }
})

export const {SetInitialStudentState} =StudentSlice.actions
export default StudentSlice.reducer