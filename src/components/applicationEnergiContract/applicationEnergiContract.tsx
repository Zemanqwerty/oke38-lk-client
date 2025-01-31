import React, { FC, useContext, useEffect, useState } from "react";
import styles from './applicationEnergiContract.module.css'
import { useNavigate } from "react-router-dom";
import { DogovorEnergoResponse } from "../../models/response/DogovorEnergoResponse";
import ApplicationsService from "../../services/ApplicationsService";
import { ContractDocsResponse } from "../../models/response/ContractDocsResponse";
import downloadIcon from '../../resources/images/download_icon.png';
import showIcon from '../../resources/images/show_icon.png';
import { API_URL } from "../../http";
import { Context } from "../..";

interface ApplicationData {
    id: string;
}

const ApplicationEnergiContract: FC<ApplicationData> = (props: ApplicationData) => {

    const [dogovor, setDogovor] = useState<DogovorEnergoResponse>();
    const [contractFiles, setContractFiles] = useState<ContractDocsResponse[]>([]);

    const {store} = useContext(Context);

    const navigate = useNavigate()

    useEffect(() => {
        const getDogovor = async (id: string) => {
            await ApplicationsService.getDogovorEnergoByApplicationId(id).then((response) => {
                if (response?.status == 200) {
                    setDogovor(response.data);
                }
            })
        }

        const getContractFiles = async (id: string) => {
            await ApplicationsService.getDogovorFilesByApplication(id).then((response) => {
                if (response?.status == 200) {
                    setContractFiles(response?.data);
                }
            })
        }

        getDogovor(props.id);
        getContractFiles(props.id);
    }, [props.id])

    if (!props.id) {
        return (
            <></>
        )
    }

    const editClickHandler = () => {
        navigate(`/application/${props.id}/dogovorenergo`);
    }

    return (
        <div className={styles.applicationContractDataWrapper}>
            <div className={styles.applicationTextDataWrapper}>
                <div className={styles.DataTitle}>
                    <p>Информация о договоре энергоснабжения</p>
                </div>
                <div className={styles.applicationTitles}>
                    <div className={styles.title}>
                        <p>Номер лицевого счёта</p>
                    </div>
                    <div className={styles.title}>
                        <p>Номер договора энергоснабжения</p>
                    </div>
                    <div className={styles.title}>
                        <p>Номер электроустановки</p>
                    </div>
                    
                    <div className=""></div>
                </div>
                <div className={styles.applicationTitles}>
                        <div className={styles.titleB}>
                            {dogovor?.schetNumber}
                        </div>
                        <div className={styles.titleB}>
                            {dogovor?.dogovorNumber}
                        </div>
                        <div className={styles.titleB}>
                            {dogovor?.epuNumber}
                        </div>

                        <div className=""></div>
                    </div>
            </div>

            {
                store.role == 'администратор'
                ? <button className={styles.sendMessageBtn} onClick={() => editClickHandler()}>Редактировать</button>
                : null
            }


            <div className={styles.applicationTextDataWrapper}>
                <div className={styles.DataTitle}>
                    <p>Документы договора энергоснабжения</p>
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

                {contractFiles.map((file) => {
                    return (
                        <div className={styles.applicationTitlesBottom}>
                            <div className={styles.titleB}>
                                <p>{file.file_name}</p>
                            </div>
                            <div className={styles.titleB}>
                                <p>{file.doctype}</p>
                            </div>
                            <div className={styles.fileDataInfoToDo}>
                                <img src={downloadIcon} alt="Скачать" onClick={() => ApplicationsService.downloadImage(file.file_path, file.file_name)} />
                                <a href={`${API_URL}/${file.file_path}`}>
                                    <img src={showIcon} alt="Показать" />
                                </a>
                                </div>
                            <div className={styles.titleB}>
                                <p>{file.dateOfCreate ? file.dateOfCreate.toString().split('T')[0] : null}</p>
                            </div>
                            
                            <div className=""></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default ApplicationEnergiContract;