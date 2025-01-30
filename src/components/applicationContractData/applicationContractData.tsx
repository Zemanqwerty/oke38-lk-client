import React, { FC, useEffect, useState } from "react";
import styles from './applicationContractData.module.css'
import { FilesResponse } from "../../models/response/FilesResponse";
import ApplicationsService from "../../services/ApplicationsService";
import downloadIcon from '../../resources/images/download_icon.png';
import showIcon from '../../resources/images/show_icon.png';
import { API_URL } from "../../http";
import { ContractResponse } from "../../models/response/ContractResponse";
import { useNavigate } from "react-router-dom";

interface ContractData {
    id: string;
}

const ApplicationContractData: FC<ContractData> = (props: ContractData) => {

    const [contract, setContract] = useState<ContractResponse>();
    
        const navigate = useNavigate()
    
        useEffect(() => {
            const getContract = async (id: string) => {
                await ApplicationsService.getContractDataByApplicationId(id).then((response) => {
                    if (response?.status == 200) {
                        setContract(response.data)
                    }
                })
            }
    
            getContract(props.id)
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
                    <p>Информация о договоре ТП</p>
                </div>
                <div className={styles.applicationTitles}>
                    <div className={styles.title}>
                        <p>Номер договора</p>
                    </div>
                    <div className={styles.title}>
                        <p>Дата договора</p>
                    </div>
                    <div className={styles.title}>
                        <p>Статус договора</p>
                    </div>
                    
                    <div className=""></div>
                </div>
                <div className={styles.applicationTitles}>
                    <div className={styles.titleB}>
                        <p>{contract?.contractNumber}</p>
                    </div>
                    <div className={styles.titleB}>
                        <p>{contract?.contractDate ? contract?.contractDate.toString().split('T')[0] : null}</p>
                    </div>
                    <div className={styles.titleB}>
                        <p>{contract?.contractStatus}</p>
                    </div>
                    
                    <div className=""></div>
                </div>
            </div>


            <div className={styles.applicationTextDataWrapper}>
                <div className={styles.DataTitle}>
                    <p>Документы договора</p>
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

export default ApplicationContractData;