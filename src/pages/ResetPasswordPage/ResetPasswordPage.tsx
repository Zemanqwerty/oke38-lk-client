import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../..";
import AuthService from "../../services/AuthService";
import styles from './ResetPasswordPage.module.css'
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>('');
  const [acceptPassword, setAcceptPassword] = useState<string>('');

  const navigate = useNavigate();

  const [response, setResponse] = useState<string | null>(null);

  const {store} = useContext(Context)

  let { link } = useParams();

  const resetPassword = () => {
    if (password !== acceptPassword) {
        setResponse('Пароли не совпадают');
    }

    const loginResponse = AuthService.resetPassword(password, link).then((response) => {
        console.log(response);
        if(response?.status == 201){
            setResponse('Пароль успешно изменён')
        } else {
            setResponse('Что-то пошло не так...')
        }
    })
  }

  if (response) {
    return (
        <>
            <div className={styles.responseMessageWrapper}>
                <div className={styles.responseMessage}>{response}</div>
                <Link className={styles.regisrationLink} to='/sign-in'>Войти в личный кабинет</Link>
            </div>
        </>
    )
  }

  return (
    <>
        <div className={styles.loginWrapper}>
            <div className={styles.loginBlock}>
                <div className={styles.pageData}>
                    <div className={styles.pageDataText}>
                        <b>Восстановление пароля</b>
                    </div>
                    <div className={styles.redirectText}>
                        Введите новый пароль
                    </div>
                </div>
                <div className={styles.inputBlock}>
                    <input type="password"  className={styles.inputUserData}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Новый пароль"
                        value={password}/>
                    <input type="password"  className={styles.inputUserData}
                        onChange={e => setAcceptPassword(e.target.value)}
                        placeholder="Повторите пароль"
                        value={acceptPassword}/>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.sendBtn} onClick={() => {
                                // UploadService.upload(firstName, lastName, report, age, sex, file);
                                resetPassword();
                                }
                            }>Изменить пароль</button>
                        </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default observer(ResetPasswordPage);