import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styles from './RequestForResetPasswordPage.module.css'
import { useNavigate } from "react-router";
import { Context } from "../..";
import AuthService from "../../services/AuthService";
import Header from "../../containers/Header";

const RequestForResetPasswordPage = () => {
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  const [response, setResponse] = useState<string | null>(null);

  const params = new URLSearchParams(window.location.pathname);

  const {store} = useContext(Context)

  const sendRequest = () => {
    const loginResponse = AuthService.requestForResetPassword(email).then((response) => {
        console.log(response);
        if(response?.status == 201){
            setResponse('На указанную ами почту отправлено письмо со ссылкой для восстановление пароля');
        } else {
            setResponse('Что-то пошло не так...')
        }
    })
  }

  if (response) {
    return (
        <>
            <Header />
            <div className={styles.responseMessageWrapper}>
                <div className={styles.responseMessage}>{response}</div>
                <div className={styles.responseMessage}>Если вы не получили письмо, проверьте папку "Спам"</div>
                <div className={styles.responseMessage}>Если вы не получили письмо, повторите процедуру восстановления пароля и проверьте указанную вами электронную почту</div>
                <div className={styles.tryAgainRegistrtion} onClick={() => setResponse(null)}>
                    Повторить восстановление пароля
                </div>
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
                        Введите почту, указанную при регистрации
                    </div>
                </div>
                <div className={styles.inputBlock}>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setEmail(e.target.value)}
                        placeholder=""
                        value={email}/>

                    <div className={styles.buttonWrapper}>
                        <button className={styles.sendBtn} onClick={() => {
                            sendRequest();
                            }
                        }>Продолжить</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default observer(RequestForResetPasswordPage);