import React, {FC, memo, useContext} from "react";
import Store from "../../store/store";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Link, BrowserRouter, useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import logo from '../../resources/images/logo_oguep_main.png';

interface HeaderProps {
    isMain?: boolean;
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {

    const {store} = useContext(Context);

    const navigate = useNavigate();

    return (
        <>
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="Логотип ОГУЭП ОБЛКОМУНЭНЕРГО" className={styles.logo} onClick={() => navigate('/')}/>
                </div>
                <div className={styles.dataWrapper}>
                    <div className={styles.data}>
                        <p className={styles.dataText}>Личный кабинет по технологическому присоединению</p>
                    </div>
                </div>
                <div className={styles.logoutWrapper}>
                    {store.isAuth
                    ? <div className={styles.logoutBtn} onClick={() => store.logout()}>Выйти</div>
                    : null}
                </div>
            </div>
        </div>
        <hr className={styles.headerHr} />
        </>
    )
};

export default observer(Header);