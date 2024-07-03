import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(){
const { pathname } = useLocation();

useEffect(( ) => { document.getElementById('App').scroll({ left: 0, top: 0, behavior: "smooth" });}, [pathname]) ;

return null;
}