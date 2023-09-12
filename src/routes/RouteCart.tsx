import { Route } from "react-router-dom";
import Lazy from '@utils/lazies/Lazy';

export default

    <>
        <Route path="/carts" element={Lazy(() => import("@pages/carts/Cart"))()}>
            <Route path=":id" element={Lazy(() => import("@pages/carts/cartDetails/cartDetail"))()}></Route>
        </Route>
        <Route path="/get-info" element={Lazy(() => import("@pages/carts/getInfo/GetInfo"))()}></Route>
        <Route path="/check-order" element={Lazy(() => import("@pages/carts/checkOrders/CheckOrder"))()}></Route>
        <Route path="/paid" element={Lazy(() => import("@pages/carts/Paid/Paid"))()}></Route>


    </>



