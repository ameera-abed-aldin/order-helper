import { useEffect } from "react";
import {useAuth} from "./AuthContext";
import { useNavigate } from "react-router";

export function ProtectedRoute(props){
const {accessToken}=useAuth();
console.log(accessToken);
const nevigate=useNavigate();

    if(!accessToken){
       useEffect(()=>{return nevigate("/login")},[nevigate]);
       
    }
    return props.children;
}