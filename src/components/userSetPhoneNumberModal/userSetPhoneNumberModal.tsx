import React, { FC, useState } from "react";
import styles from './userSetRoleModal.module.css';
import UsersService from "../../services/UsersService";

interface UserData {
    email?: string;
    currentPhoneNumber?: string;
}

const UserSetPhoneNumberModal: FC<UserData> = (props: UserData) => {
    const [phoneNumber, setPhoneNumber] = useState<string>(props.currentPhoneNumber ? props.currentPhoneNumber : '');
    const [response, setResponse] = useState<string | null>(null);

    const setUserRole = async () => {
        await UsersService.setUserPhoneNumber(props.email, phoneNumber).then((response) => {
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
                <h2>Изменить номер телефона для {props.email}</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <div className={styles.formElement}>
                    <p>Номер телефона</p>
                    <input className={styles.inputFilialData} type="text" placeholder="89001001234..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setUserRole()}>Сохранить</button>
            </div>
        </div>
    )
}

export default UserSetPhoneNumberModal;