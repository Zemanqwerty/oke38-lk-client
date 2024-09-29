import React, { FC, useState } from "react";
import styles from './applicationWorking.module.css'
import { FilesResponse } from "../../models/response/FilesResponse";
import ApplicationsService from "../../services/ApplicationsService";
import downloadIcon from '../../resources/images/download_icon.png';
import showIcon from '../../resources/images/show_icon.png';
import { API_URL } from "../../http";

// interface ApplicationWorkingData {
//     files: FilesResponse[];
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

const ApplicationWorking: FC = () => {

    const [files, setFiles] = useState<FilesResponse[]>([]);

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
            {files.map((file) => {
                return (
                    <div className={styles.fileInfoWrapper}>
                        <div className={styles.fileDataInfo}>
                            {file.doctype.caption_doctype}
                            {/* {setFileType(file.fileType)} */}
                        </div>
                        <div className={styles.fileDataInfo}>
                            {file.doc_file_name}
                        </div>
                        <div className={styles.fileDataInfoToDo}>
                            <img src={downloadIcon} alt="Скачать" onClick={() => ApplicationsService.downloadImage(file.doc_file_path, file.doc_file_name)} />
                            <a href={`${API_URL}/${file.doc_file_path}`}>
                                <img src={showIcon} alt="Показать" />
                            </a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default ApplicationWorking;