import React, { FC, useContext, useEffect, useState } from "react";
import styles from './SendApplication.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";


const SendApplication: FC = () => {
    const {store} = useContext(Context);

    return (
        <div className="">

        </div>
    )
};

export default observer(SendApplication);

