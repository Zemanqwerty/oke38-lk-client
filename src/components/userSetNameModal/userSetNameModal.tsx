import React, { FC, useState } from "react";
import styles from './userSetRoleModal.module.css';
import UsersService from "../../services/UsersService";

interface UserData {
    email?: string;
    currentFirstName?: string;
    currentLastName?: string;
    cirrentSurname?: string;
}

const UserSetNameModal: FC<UserData> = (props: UserData) => {
    const [firstName, setFirstName] = useState<string>(props.currentFirstName ? props.currentFirstName : '');
    const [lastName, setLastName] = useState<string>(props.currentLastName ? props.currentLastName : '');
    const [surname, setSurname] = useState<string>(props.cirrentSurname ? props.cirrentSurname : '');
    const [response, setResponse] = useState<string | null>(null);

    const setUserRole = async () => {
        await UsersService.setUserName(props.email, firstName, lastName, surname).then((response) => {
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
                <h2>Изменить имя для {props.email}</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <div className={styles.formElement}>
                    <p>Имя</p>
                    <input className={styles.inputFilialData} type="text" placeholder="Имя..." value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <p>Фамилия</p>
                    <input className={styles.inputFilialData} type="text" placeholder="Фамилия..." value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <p>Отчество</p>
                    <input className={styles.inputFilialData} type="text" placeholder="Отчество..." value={surname} onChange={(e) => setSurname(e.target.value)}/>
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setUserRole()}>Сохранить</button>
            </div>
        </div>
    )
}

export default UserSetNameModal;