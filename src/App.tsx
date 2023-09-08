import RouteSetup from "@/routes/RouteSetup";
import './main.scss';
import './i18n/config';
import DropDown from "./components/ChooseLanguage";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "./stores";
import api from "@services/apis";
import { useEffect } from 'react'
import { userAction } from "./stores/slices/user.slice";


function App() {
  const dispatch = useDispatch();

  const store = useSelector(store => store) as StoreType;


  useEffect(() => {
    if (localStorage.getItem("token")) {
      api.userApi.authentication()
        .then(res => {
          console.log("res nnnn", res);

          if (res.status == 200) {
            dispatch(userAction.setLoginData(res.data.data))
          }
        })
        .catch(err => {
          console.log("err", err);

        })
    }

  }, [])

  return (
    <>
      {/* Routing Setup */}
      <RouteSetup />
      <DropDown />
      {/* End Routing Setup */}
    </>
  )
}

export default App;
