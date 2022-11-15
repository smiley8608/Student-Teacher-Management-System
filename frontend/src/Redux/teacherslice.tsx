
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const InitialState:UpdatedTeacherProps={
    Teacher:null,
    Auth:false
}

const TeacherSlice=createSlice({
    name:'Teacher',
    initialState:InitialState,
    reducers:{
        SetInitialState:(state:UpdatedTeacherProps,action:PayloadAction<UpdatedTeacherProps>)=>{
            state.Teacher=action.payload.Teacher
            state.Auth=action.payload.Auth

        }
    }
})
export const {SetInitialState} =TeacherSlice.actions
export default TeacherSlice.reducer