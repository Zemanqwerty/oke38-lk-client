import React, { FC, useContext, useEffect, useState } from "react";
import styles from './ClientApplications.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";
import reloadImg from '../../resources/images/reload.png';
import Application from "../application";

interface ApplicationsProps {
    setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const ClientApplications: FC<ApplicationsProps> = (props: ApplicationsProps) => {
    const {store} = useContext(Context);

    const [applications, setApplications] = useState<ApplicationsResponse[]>([])

    const getAllApplications = async () => {
        await ApplicationsService.getAllByUser().then((response) => {
            response?.data ? setApplications(response?.data) : setApplications([])
        })
    }

    useEffect(() => {
        getAllApplications();
    }, [])
    
    return (
        <div className={styles.applicationsWrapper}>
            <div className={styles.applicationsTitle}>
                <h1 className={styles.applicationsTitleText}>Мои заявки</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getAllApplications()} />
            </div>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>Дата подачи</th>
                        <th className={styles.tableTitles}>Номер заявки</th>
                        <th className={styles.tableTitles}>Населённый пункт / район</th>
                        <th className={styles.tableTitles}>Адрес</th>
                        <th className={styles.tableTitles}>Поставщик</th>
                        <th className={styles.tableTitles}>Максимальная мощность</th>
                        <th className={styles.tableTitles}>Уровень напряжения</th>
                        <th className={styles.tableTitles}>Статус заявки</th>
                    </tr>
                    {applications.map((application) => {
                        return (
                            <tr key={application.id} className={styles.applicationBlock}>
                                <td className={styles.tableFields}>{application.createdAt.toString().split('T')[0]}</td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`} onClick={() => props.setActiveBlock(<Application application={application}/>)}>{application.id}</td>
                                <td className={styles.tableFields}>{application.city}</td>
                                <td className={styles.tableFields}>{application.address}</td>
                                <td className={styles.tableFields}>{application.provider}</td>
                                <td className={styles.tableFields}>{application.maxPower}</td>
                                <td className={styles.tableFields}>{application.powerLevel}</td>
                                <td className={styles.tableFields}>{application.status}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};

export default observer(ClientApplications);

