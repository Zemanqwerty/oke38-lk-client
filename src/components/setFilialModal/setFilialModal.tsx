import React, { FC, useState } from "react";
import styles from './setFilialModal.module.css';
import { observer } from "mobx-react-lite";
import ApplicationsService from "../../services/ApplicationsService";

interface applicationData {
    id: number;
}

const SetFilialModal: FC<applicationData> = (props: applicationData) => {

    const filials = ['Филиал 1', 'Филиал 2', 'Филиал 3']
    const [filial, setFilial] = useState<string>(filials[0]);
    const [response, setResponse] = useState<string | null>(null);

    const setApplicationFilial = async () => {
        await ApplicationsService.setFilial(props.id, filial).then((response) => {
            if (response.status === 201) {
                setResponse('Филиал успешно задан')
            } else {
                setResponse('Что-то пошло не так...')
            }
        })
    }

    return (
        <div className={styles.content}>
            <div className={styles.modalTitleWrapper}>
                <h2>Закрепить за филиалом</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <p>Выбрать филиал</p>
                <select value={filial} onChange={(e) => setFilial(e.target.value)} className={styles.inputFilialData}>
                    {filials.map((filialValue) => {
                        return (
                            <>
                                <option value={filialValue}>{filialValue}</option>
                            </>
                        )
                    })}
                </select>
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setApplicationFilial()}>Закрепить</button>
            </div>
        </div>
    )
};

export default observer(SetFilialModal)