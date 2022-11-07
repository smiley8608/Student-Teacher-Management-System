
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const InitialState:UpdatedTeacherProps={
    Teacher:null,
    TeacherAuth:false
}

const TeacherSlice=createSlice({
    name:'Teacher',
    initialState:InitialState,
    reducers:{
        SetInitialState:(state:UpdatedTeacherProps,action:PayloadAction<UpdatedTeacherProps>)=>{
            state.Teacher=action.payload.Teacher
            state.TeacherAuth=action.payload.TeacherAuth

        }
    }
})
export const {SetInitialState} =TeacherSlice.actions
export default TeacherSlice.reducer