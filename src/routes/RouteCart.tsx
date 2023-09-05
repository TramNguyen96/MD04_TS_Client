import { Route } from "react-router-dom";
import Lazy from '@utils/lazies/Lazy';

export default

    <Route path="/carts" element={Lazy(() => import("@pages/carts/Cart"))()}>
        <Route path=":id" element={Lazy(() => import("@pages/carts/cartDetails/cartDetail"))()}></Route>

    </Route>



