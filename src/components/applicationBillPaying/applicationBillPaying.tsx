import React, { FC } from "react";
import styles from './applicationBillPaying.module.css'
import { FilesResponse } from "../../models/response/FilesResponse";
import ApplicationsService from "../../services/ApplicationsService";
import downloadIcon from '../../resources/images/download_icon.png';
import showIcon from '../../resources/images/show_icon.png';
import { API_URL } from "../../http";

const ApplicationBillPaying: FC = () => {
    return (
        <div className={styles.applicationContractDataWrapper}>
            <div className={styles.applicationTextDataWrapper}>
                <div className={styles.DataTitle}>
                    <p>Счета к оплате</p>
                </div>
                <div className={styles.applicationTitlesBottom}>
                    <div className={styles.title}>
                        <p>Документ</p>
                    </div>
                    <div className={styles.title}>
                        <p>Вид документа</p>
                    </div>
                    <div className={styles.title}>
                        <p>Действия</p>
                    </div>
                    <div className={styles.title}>
                        <p>Дата добавления</p>
                    </div>
                    
                    <div className=""></div>
                </div>
            </div>
        </div>
    )
};

export default ApplicationBillPaying;