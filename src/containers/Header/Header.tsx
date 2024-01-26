import React, {FC, memo, useContext} from "react";
import Store from "../../store/store";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Link, BrowserRouter } from "react-router-dom";
import styles from './Header.module.css';
import logo from '../../resources/images/logo_oguep_main.png';

const Header: FC = () => {

    const {store} = useContext(Context);

    return (
        <>
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="Логотип ОГУЭП ОБЛКОМУНЭНЕРГО" className={styles.logo}/>
                </div>
                <div className={styles.dataWrapper}>
                    <div className={styles.data}>
                        <p className={styles.dataText}>Личный кабинет по технологическому присоединению</p>
                    </div>
                </div>
            </div>
        </div>
        <hr className={styles.headerHr} />
        </>
    )
};

export default observer(Header);