import React, { FC, useContext, useEffect, useState } from "react";
import styles from './application.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";
import { FilesResponse } from "../../models/response/FilesResponse";
import showIcon from '../../resources/images/show_icon.png';
import downloadIcon from '../../resources/images/download_icon.png';
import { API_URL } from "../../http";

interface ApplicationProps {
    application: ApplicationsResponse;
}

const Application: FC<ApplicationProps> = (props: ApplicationProps) => {
    const {store} = useContext(Context);
    const [files, setFiles] = useState<FilesResponse[]>([]);

    useEffect(() => {
        const getFilesByApplicationId = async (id: number) => {
            await ApplicationsService.getFilesByApplication(id).then((response) => {
                setFiles(response.data);
            })
        }

        getFilesByApplicationId(props.application.id);
    }, [])

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
            <div className={styles.filesWrapper}>
                <div className={styles.fileTitlesWrapper}>
                    <div className={styles.fileDataTitle}>
                        Вид документа
                    </div>
                    <div className={styles.fileDataTitle}>
                        Документ
                    </div>
                    <div className={styles.fileDataTitleToDo}>
                        Действия
                    </div>
                </div>
                {files.map((file) => {
                    return (
                        <div className={styles.fileInfoWrapper}>
                            <div className={styles.fileDataInfo}>
                                {file.fileType}
                            </div>
                            <div className={styles.fileDataInfo}>
                                {file.fileName}
                            </div>
                            <div className={styles.fileDataInfoToDo}>
                                <img src={downloadIcon} alt="Скачать" onClick={() => ApplicationsService.downloadImage(file.filePath, file.fileName)} />
                                <a href={`${API_URL}/${file.filePath}`}>
                                    <img src={showIcon} alt="Показать" />
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default observer(Application);
