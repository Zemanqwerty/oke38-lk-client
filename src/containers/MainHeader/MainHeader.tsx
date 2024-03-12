import React, {FC, memo, useContext} from "react";
import Store from "../../store/store";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Link, BrowserRouter, useNavigate } from "react-router-dom";
import styles from './MainHeader.module.css';
import logo from '../../resources/images/logo_oguep_main.png';

const MainHeader: FC = () => {

    const {store} = useContext(Context);

    const navigate = useNavigate();

    return (
        <>
        <div className={styles.headerWrapper}>
            <div className={styles.content}>
                <div className={styles.headerBlockWrapper}>
                    <img src={logo} alt="ОГУЭП Облкомунэнерго" className={styles.mainHeaderLogo} />
                    <p className={styles.headerTitleText}>
                        Личный кабинет по техническому присоединению
                    </p>
                </div>
                <div className={styles.headerBlockWrapper}>
                    <p className={styles.headerUserText}>
                        Вы вошли как <p className={styles.headerUserDataText}>{store.email}</p>
                    </p>
                    <div className={styles.logoutBtn}
                        onClick={() => store.logout()}>
                        Выйти
                    </div>
                </div>
            </div>
        </div>
        <hr className={styles.headerHr} />
        </>
    )
};

export default observer(MainHeader);