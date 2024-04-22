import React, { FC, useState } from "react";
import styles from './SetNumberStatusModal.module.css';
import { observer } from "mobx-react-lite";
import ApplicationsService from "../../services/ApplicationsService";

interface applicationData {
    id: number;
}

const SetNumberStatus: FC<applicationData> = (props: applicationData) => {

    const statuses = ['Статус 1', 'Статус 2', 'Статус 3']
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [number, setNumber] = useState<string | undefined>(undefined)
    const [response, setResponse] = useState<string | null>(null);

    const setApplicationData = async () => {
        await ApplicationsService.setNumberStatus(props.id, number, status).then((response) => {
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
                <h2>Задать статус / номер</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <div className={styles.formElement}>
                    <p>Введите номер</p>
                    <input type="text" placeholder="Номер заявки..." className={styles.inputFilialData} onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <p>Выбрать стутус</p>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.inputFilialData}>
                        <option value={undefined}>Не выбрано</option>
                        {statuses.map((statusValue) => {
                            return (
                                <>
                                    <option value={statusValue}>{statusValue}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setApplicationData()}>Сохранить</button>
            </div>
        </div>
    )
};

export default observer(SetNumberStatus)