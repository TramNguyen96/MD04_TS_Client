import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lazy from '@utils/lazies/Lazy';
import Home from "@/pages/homes/Home";

/* Route Setup */
import RouteProduct from "./RouteProduct";
import RouteCart from "./RouteCart";
import RouteAuth from "./RouteAuth";


export default function RouteSetup() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home */}
                <Route path="/" element={<Home />}>
                    <Route path="about" element={Lazy(() => import("@components/Test"))()}></Route>
                    <Route path="/" element={Lazy(() => import("./HomeBody"))()}></Route>
                    {RouteProduct}
                    {RouteCart}
                    {RouteAuth}
                </Route>
            </Routes >
        </BrowserRouter >
    )
}
