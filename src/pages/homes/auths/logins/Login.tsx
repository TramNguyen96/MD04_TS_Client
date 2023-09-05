import './Login.scss'
import { useTranslation } from 'react-i18next'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Modal } from 'antd';
import { memo, useState, FormEvent } from 'react'
import api from '@services/apis'
import Loading from '../loadings/Loading';


function Login() {
    const { t } = useTranslation();
    const [load, setLoad] = useState(false);

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );

    async function login(event: FormEvent) {
        event.preventDefault();

        if (load) return;

        let data = {
            userName: (event.target as any).userName.value,
            password: (event.target as any).password.value,
        }

        setLoad(true);

        await api.userApi.login(data)
            .then(res => {
                if (res.status !== 200) {
                    Modal.confirm({
                        content: res.data.message,
                        okText: "Again"
                    })
                } else {
                    Modal.success({
                        content: res.data.message,
                        onOk: () => {
                            localStorage.setItem("token", res.data.token)
                            window.location.href = "/";
                        },
                    })
                }
            })
            .catch(err => {
                Modal.success({
                    content: "Server Network!",
                    okText: "Again"
                })
            })

        setLoad(false);
    }
    return (
        <div className='register'>
            <div className='register_main'>
                {/* Header */}
                <div className='register_header'>
                    <h1>{t("login")}</h1>
                </div>

                {/* Form Register */}

                <div className='register_form'>
                    <form onSubmit={(e) => {
                        login(e)
                    }}  >
                        <label htmlFor="">User Name</label><br />
                        <input type="text" name="userName" /><br />

                        <label htmlFor="">Password</label><br />
                        <input type="password" name="password" /><br />

                        <div>
                            {
                                load ?? <Loading />
                            }
                            <button className={`${load && 'active'} btn_submit register_form_btn `}>
                                {t("signin")}

                                <div className='btn_loading'>
                                    <Spin indicator={antIcon} />
                                </div>

                            </button>
                        </div>

                        <p className="text-center text-muted mt-2 mb-0"> {t("directRegister")} <a href="/register"
                            className="fw-bold text-body"><u> {t("registerHere")}</u></a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default memo(Login);