import React, { FC, useContext, useEffect, useState } from "react";
import styles from './application.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";

interface ApplicationProps {
    application: ApplicationsResponse;
}

const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
    const {store} = useContext(Context);

    return (
        <div className={styles.applicationWrapper}>
            <div className={styles.mainInfoWrapper}>
                <div className={styles.infoBlock}>
                    <p>Номер обращения - </p>{props.application.id}
                </div>
                <div className={styles.infoBlock}>
                    <p>Город - </p>{props.application.city}
                </div>
                <div className={styles.infoBlock}>
                    <p>Адрес - </p>{props.application.address}
                </div>
                <div className={styles.infoBlock}>
                    <p>Дата подачи заявки - </p>{props.application.createdAt.toString().split('T')[0]}
                </div>
                <div className={styles.infoBlock}>
                    <p>Адрес - </p>{props.application.maxPower}
                </div>
                <div className={styles.infoBlock}>
                    <p>Адрес - </p>{props.application.powerLevel}
                </div>
                <div className={styles.infoBlock}>
                    <p>Адрес - </p>{props.application.provider}
                </div>
                <div className={styles.infoBlock}>
                    <p>Адрес - </p>{props.application.status}
                </div>
            </div>
        </div>
    )
};

export default observer(Application);

