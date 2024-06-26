import React, { FC, useContext, useState } from "react";
import styles from './applicationDraft.module.css'
import { FilesResponse } from "../../models/response/FilesResponse";
import ApplicationsService from "../../services/ApplicationsService";
import downloadIcon from '../../resources/images/download_icon.png';
import showIcon from '../../resources/images/show_icon.png';
import deleteItem from '../../resources/images/delete.png';
import { API_URL } from "../../http";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { Context } from "../..";

interface ApplicationDraftData {
    files: FilesResponse[];
    setFiles: React.Dispatch<React.SetStateAction<FilesResponse[]>>;
    application: ApplicationsResponse;
}

const ApplicationDraft: FC<ApplicationDraftData> = (props: ApplicationDraftData) => {

    const {store} = useContext(Context)

    // const deleteFile = async (fileId: number) => {
    //     await ApplicationsService.deleteApplicationFiles(props.application.uuid, fileId).then((response) => {
    //         props.setFiles(props.files.filter((file) => file.id !== fileId));
    //     });
    // }

    const setFileType = (fileType: string) => {
        switch(fileType) {
            case 'applicationCopy':
                return 'заявка на ТП';
            case 'passportCopy':
                return 'документ, удостоверяющий личность заявителя';
            case 'planeCopy':
                return 'план расположения энергопринимающих устройств';
            case 'ownDocsCopy':
                return 'право собственности';
            case 'powerOfAttorneyCopy':
                return 'полномочия представителя заявителя';
            case 'constituentDocsCopy':
                return 'учредительные документы';
            case 'otherDocs':
                return 'прочие документы';
        }
    }

    return (
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
            {props.files.map((file) => {
                return (
                    <div className={styles.fileInfoWrapper}>
                        <div className={styles.fileDataInfo}>
                            {/* {file.fileType} */}
                            {setFileType(file.fileType)}
                        </div>
                        <div className={styles.fileDataInfo}>
                            {file.fileName}
                        </div>
                        <div className={styles.fileDataInfoToDo}>
                            <img src={downloadIcon} alt="Скачать" onClick={() => ApplicationsService.downloadImage(file.filePath, file.fileName)} />
                            <a href={`${API_URL}/${file.filePath}`}>
                                <img src={showIcon} alt="Показать" />
                            </a>
                            {/* {
                                props.application.status === 'Принята' && store.role === 'client'
                                ? <img src={deleteItem} alt="Удалить" onClick={() => deleteFile(file.id)} />
                                : null
                            } */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default ApplicationDraft;