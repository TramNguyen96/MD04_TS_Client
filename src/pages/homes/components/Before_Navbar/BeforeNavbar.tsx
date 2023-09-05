import './BeforeNavbar.scss';
import { useTranslation } from 'react-i18next';


export default function BeforeNavbar() {
    const { t } = useTranslation();

    return (
        <div>
            <section className="before_nav">
                <div className="before_nav_content">
                    <p className="before_nav_content_left">{t("leftContent")}</p>

                    <div className="feature">
                        <div className="feature_textname">
                            <div className="feature_item_login_register">
                                <a href="/login" className="feature_item" >{t("loginn")}</a>
                                <a href="/register" className="feature_item" >{t("register")}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
