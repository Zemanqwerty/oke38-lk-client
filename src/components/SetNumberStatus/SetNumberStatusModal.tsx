import React, { FC, useEffect, useState } from "react";
import styles from './SetNumberStatusModal.module.css';
import { observer } from "mobx-react-lite";
import ApplicationsService from "../../services/ApplicationsService";
import { StatusesResponse } from "../../models/response/StatusesResponse";

interface applicationData {
    id: string;
}

const SetNumberStatus: FC<applicationData> = (props: applicationData) => {

    const [statuses, setStatuses] = useState<StatusesResponse[]>([]);
    const [status, setStatus] = useState<number | undefined>(undefined);
    const [number, setNumber] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [response, setResponse] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApplicationsService.getStatusesForApplication();
                setStatuses(res.data);
                if (res.data.length > 0) {
                    setStatus(res.data[0].id_zayavkastatus);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [])

    const setApplicationData = async () => {
        await ApplicationsService.setNumberStatus(props.id, number, status, date).then((response) => {
            if (response.status === 201) {
                setResponse('Информация успешно сохранена')
            } else {
                setResponse('Что-то пошло не так...')
            }
        })
    }

    return (
        <div className={styles.content}>
            <div className={styles.modalTitleWrapper}>
                <h2>Задать номер / статус / дату</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <div className={styles.formElement}>
                    <p>Введите номер</p>
                    <input type="text" placeholder="Номер заявки..." className={styles.inputFilialData} onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <p>Выбрать стутус</p>
                    {/* <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.inputFilialData}>
                        <option value={undefined}>Не выбрано</option>
                        {statuses.map((statusValue) => {
                            return (
                                <>
                                    <option value={statusValue}>{statusValue}</option>
                                </>
                            )
                        })}
                    </select> */}


                    {statuses.length > 0 ? (
                    <select value={status} onChange={(e) => setStatus(Number(e.target.value))} className={styles.inputFilialData}>
                        {statuses.map((statusValue) => {
                            return (
                                <option key={statusValue.id_zayavkastatus} value={statusValue.id_zayavkastatus}>{statusValue.caption_zayavkastatus} ({statusValue.caption_zayavkastatus})</option>
                            )
                        })}
                    </select>
                ) : (
                    <p>Загрузка...</p>
                )}
                </div>
                <div className={styles.formElement}>
                    <p>Дата заявки (присв.)</p>
                    <input
                        type="date"
                        placeholder=""
                        className={styles.inputFilialData}
                        onChange={(e) => {
                        const dateString = e.target.value; // Получаем строку из input
                        const dateObject = new Date(dateString); // Преобразуем строку в Date
                        setDate(dateObject); // Обновляем стейт
                        }}
                    />
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setApplicationData()}>Сохранить</button>
            </div>
        </div>
    )
};

export default observer(SetNumberStatus)