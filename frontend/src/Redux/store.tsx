

import { configureStore } from "@reduxjs/toolkit";
import studentslice from "./studentslice";

import teacherslice from "./teacherslice";

const Store =configureStore({
    reducer:{
        Teacher:teacherslice,
        Student:studentslice

    }
})

export type RootDispatch =typeof Store.dispatch 
export type RootSelector= ReturnType<typeof Store.getState>
export default Store