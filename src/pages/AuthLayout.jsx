import { Outlet } from "react-router";
import leftImg from "../assets/left.jpg"

export function AuthLayout(){
    return(
        <main className="layout d-flex justify-content-center align-items-center">
        <div className="Custum-container row border rounded-3 shadow">
            <section className="col-md-6 left">        
            </section>
            
            <section className="col-md-6 p-5">
            <h2 className="mb-4  text-col">Eleena Website</h2>
            
            <Outlet/>
            </section>
        </div>
        </main>
    )

}