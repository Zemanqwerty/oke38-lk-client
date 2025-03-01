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
import AdminDashboard from "../../containers/AdminDashboard";
import AdminUsers from "../../containers/AdminUsers";
import AdminDogovorenergo from "../../components/adminDogovorenergo";

interface PageData {
    type: string;
}

const MainPage: FC<PageData> = (props: PageData) => {
    const navigate = useNavigate();
    const {store} = useContext(Context)

    const [activeBlock, setActiveBlock] = useState<React.ReactNode>()
    

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return navigate("/sign-in");
        }

        console.log(store.role);
        
        if (store.role === 'администратор') {
            setActiveBlock(<AdminDashboard setActiveBlock={setActiveBlock} type={props.type} />)
        } else {
            setActiveBlock(<ClientApplications setActiveBlock={setActiveBlock} type={props.type} />);
        }
    }, [store.isAuth, store.email, navigate]);

    const handleApplicationsClick = () => {
        navigate(`/`);
    };

    const handleUsersClick = () => {
        navigate(`/users`);
    };

    const handleDogovorClick = () => {
        navigate(`/dogovorenergo`);
    };

    const handleNewApplicationnClick = () => {
        navigate(`/application/new`);
    };

    const handleMessagesClick = () => {
        navigate(`/messages`);
    };

    if (store.role === 'администратор') {
       
        return (
            <>
            <MainHeader />
            <div className={styles.containerWrapper}>
                <div className={styles.container}>
                    <div className={styles.topWrapper}>
                        <div className={styles.lkApplicationsNav}>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => handleApplicationsClick()}>Все заявки</button>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => handleUsersClick()}>Пользователи</button>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => handleDogovorClick()}>Договоры энергоснабжения</button>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => handleMessagesClick()}>Электронная переписка</button>
                        </div>
                        {/* <div className="">
                            <button className={styles.lkNavInfoBtn}>Справка</button>
                        </div> */}
                    </div>
                    {activeBlock}
                </div>
            </div>
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
                            <button className={styles.lkApplicationsNavBtn} onClick={() => handleApplicationsClick()}>Мои заявки</button>
                            <button className={styles.lkApplicationsNavBtn} onClick={() => handleNewApplicationnClick()}>Подать заявку</button>
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
