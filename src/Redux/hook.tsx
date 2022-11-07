import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootDispatch, RootSelector } from "./store";

export const useAppSelector:TypedUseSelectorHook<RootSelector>=useSelector
export const useAppDispatch=()=>useDispatch<RootDispatch>()