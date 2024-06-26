import React, { FC, useState } from "react";
import styles from './userSetRoleModal.module.css';
import UsersService from "../../services/UsersService";

interface UserData {
    email?: string;
    currentRole?: string
}

const UserSetRoleModal: FC<UserData> = (props: UserData) => {
    const roles: string[] = ['admin', 'client'];
    const [role, setRole] = useState<string>(props.currentRole ? props.currentRole : roles[0]);
    const [response, setResponse] = useState<string | null>(null);

    const setUserRole = async () => {
        await UsersService.setUserRole(props.email, role).then((response) => {
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
                <h2>Выбрать роль для {props.email}</h2>
            </div>
            <div className={styles.formWrapper}>
                <p>{response}</p>
                <div className={styles.formElement}>
                    <p>Роль</p>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.inputFilialData}>
                        {roles.map((roleValue) => {
                            return (
                                <>
                                    <option value={roleValue}>{roleValue}</option>
                                </>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <button onClick={() => setUserRole()}>Сохранить</button>
            </div>
        </div>
    )
}

export default UserSetRoleModal;