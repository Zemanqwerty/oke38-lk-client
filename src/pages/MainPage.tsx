import React, {FC, memo, useContext, useState} from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
// import { Redirect } from 'react-router-dom';

const MainPage: FC = () => {
    const navigate = useNavigate();

    const {store} = useContext(Context);

    if (!store.isAuth || store.email == undefined) {
        return <>{navigate("/sign-in")}</>
    }

    return (
        <>
            {store.isAuth ? `User ${store.email}` : 'u'}
            MAIN
        </>
    )
}

export default observer(MainPage);
