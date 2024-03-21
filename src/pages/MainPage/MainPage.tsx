import React, {FC, memo, useContext, useEffect, useState} from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import ClientApplications from "../../components/clientApplications";
import Header from "../../containers/Header";
import styles from './MainPage.module.css'
import MainHeader from "../../containers/MainHeader";
import SendApplication from "../../components/sendApplication";
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";

const MainPage: FC = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context)

    const [activeBlock, setActiveBlock] = useState<React.ReactNode>()
    

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return navigate("/sign-in");
        }
        
        setActiveBlock(<ClientApplications setActiveBlock={setActiveBlock}/>);
    }, [store.isAuth, store.email, navigate]);

    if (store.role === 'admin') {
        return (
            <>
            <MainHeader />
            admin
            </>
        )
    }    

    return (
        <>
            <MainHeader />
            <div className={styles.containerWrapper}>
                <div className={styles.container}>
                    <div className={styles.topWrapper}>
                        <div className={styles.lkApplicationsNav}>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => setActiveBlock(<ClientApplications setActiveBlock={setActiveBlock}/>)}>Мои заявки</button>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => setActiveBlock(<SendApplication />)}>Подать заявку</button>
                        </div>
                        <div className="">
                            <button className={styles.lkNavInfoBtn}>Справка</button>
                        </div>
                    </div>
                    {activeBlock}
                </div>
            </div>
        </>
    )
}

export default observer(MainPage);
