import { Route } from "react-router-dom";
import Lazy from '@utils/lazies/Lazy';

export default

    <>
        <Route path="/products/detail/:productId" element={Lazy(() => import("@pages/products/productDetails/ProductDetail"))()}>

        </Route>

    </>




