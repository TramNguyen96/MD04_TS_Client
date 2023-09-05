import { Route } from "react-router-dom";
import Lazy from '@utils/lazies/Lazy';

export default

    <>
        <Route path="/register" element={Lazy(() => import("@pages/homes/auths/registers/Register.tsx"))()}></Route>
        <Route path="/login" element={Lazy(() => import("@pages/homes/auths/logins/Login"))()}></Route>
    </>




