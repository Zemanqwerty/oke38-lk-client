import React, {FC, memo, useContext, useEffect, useState} from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const MainPage: FC = () => {
    const navigate = useNavigate();

    const {store} = useContext(Context);

    useEffect(() => {
        if (!store.isAuth) {
            navigate("/sign-in");
        }
    }, [store.isAuth, store.email, navigate]);

    return (
        <>
            {store.isAuth ? `User ${store.email}` : 'u'}
            MAIN
        </>
    )
}

export default observer(MainPage);
