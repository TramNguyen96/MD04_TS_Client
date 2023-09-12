import './BeforeNavbar.scss';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from "../../../../stores";
import api from '@/services/apis';
import { userAction } from '@/stores/slices/user.slice';


export default function BeforeNavbar() {
  const { t } = useTranslation();

  const store = useSelector(store => store) as StoreType;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [role, setRole] = useState()


  useEffect(() => {
    // Kiểm tra xem có token trong localStorage hay không
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setIsLoggedIn(true);
        // setUsername(username);
      } catch (error) {
        console.error('Invalid token format');
      }
    } else {
      setIsLoggedIn(false);
      //   setUsername('');
    }
  }, []);

  useEffect(() => {
    api.userApi.authentication({
      token: localStorage.getItem("token")
    }).then(res => {
      setRole(res.data.data.isAdmin)
    }).catch(err => {
      // console.log("err", err);
    })
  }, [])

  return (
    <div>
      <section className="before_nav">
        <div className="before_nav_content">
          <p className="before_nav_content_left">{t("leftContent")}</p>

          <div className="feature">
            <div className="feature_textname">
              {
                isLoggedIn ? (
                  <div>
                    <a href="/profile">
                      <img src="https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png" className="avatar_login" />
                    </a>

                    <p>Hi, {store.userStore.data?.firstName} {store.userStore.data?.lastName}
                      {role === true ? (
                        <a href="/admin" className="feature_textname_a">
                          <i className="fa-solid fa-user-shield"></i>
                        </a>
                      ) : null}

                      <a href="#" className="feature_textname_a"
                        onClick={() => {
                          window.confirm("Are you sure want to logout?")
                          // dispatch(userActions.logOut())
                          // dispatch(userAction.logOut(store.userStore.data))
                          localStorage.removeItem("token")
                          // localStorage.removeItem("carts")
                          window.location.reload()
                        }}
                      ><i className="fa-solid fa-arrow-right-from-bracket"></i></a></p>

                  </div>
                )
                  :
                  (
                    <div className="feature_item_login_register">
                      <a href="/login" className="feature_item" >{t("loginn")}</a>
                      <a href="/register" className="feature_item" >{t("register")}</a>
                    </div>
                  )

              }

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
