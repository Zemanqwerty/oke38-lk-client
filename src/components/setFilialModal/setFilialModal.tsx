import React, { FC, useEffect, useState } from "react";
import styles from './setFilialModal.module.css';
import { observer } from "mobx-react-lite";
import ApplicationsService from "../../services/ApplicationsService";
import { FilialsResponse } from "../../models/response/FilialsResponse";

interface applicationData {
    id: string;
}

const SetFilialModal: FC<applicationData> = (props: applicationData) => {

    const filials = ['Филиал 1', 'Филиал 2', 'Филиал 3']
    const [response, setResponse] = useState<string | null>(null);
    const [realFilials, setRealFilials] = useState<FilialsResponse[]>([])
    const [filial, setFilial] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ApplicationsService.getFilialsForApplication();
                setRealFilials(res.data);
                if (res.data.length > 0) {
                    setFilial(res.data[0].id_filial);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [])

    const setApplicationFilial = async () => {
        if (filial !== undefined) {
            await ApplicationsService.setFilial(props.id, filial).then((response) => {
                if (response.status === 201) {
                    setResponse('Филиал успешно задан')
                } else {
                    setResponse('Что-то пошло не так...')
                }
            })
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.modalTitleWrapper}>
                <h2>Закрепить за филиалом</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <p>Выбрать филиал</p>
                {realFilials.length > 0 ? (
                    <select value={filial} onChange={(e) => setFilial(Number(e.target.value))} className={styles.inputFilialData}>
                        {realFilials.map((filialValue) => {
                            return (
                                <option key={filialValue.id_filial} value={filialValue.id_filial}>{filialValue.caption_filial} ({filialValue.caption_filial_short})</option>
                            )
                        })}
                    </select>
                ) : (
                    <p>Загрузка филиалов...</p>
                )}
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setApplicationFilial()}>Закрепить</button>
            </div>
        </div>
    )
};

export default observer(SetFilialModal)