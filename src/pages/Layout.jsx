import NavbarHead from "../Layout/Navbar/NavbarHead";
import PromotionBanner from "../component/PromotionBanner";
import FooterSection from "../Layout/FooterSection";
import { Outlet } from "react-router";
export default function Layout(){
    return(
        <>
         <NavbarHead />
         <Outlet/>

         <PromotionBanner/>
         <FooterSection/>
        </>
    )
}


