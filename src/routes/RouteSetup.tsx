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
                    {RouteAuth}

                    <Route path="/category/:category" element={Lazy(() => import("@pages/categories/Category"))()}></Route>
                    <Route path="/profile" element={Lazy(() => import("@pages/profile/Profile"))()}></Route>

                </Route>
                {RouteCart}

                <Route path="/admin" element={Lazy(() => import("@pages/managers/Admin"))()}></Route>

            </Routes >
        </BrowserRouter >
    )
}
