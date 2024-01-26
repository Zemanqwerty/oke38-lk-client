import React, {FC, memo, useContext, useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import { Context } from "../..";
import { AxiosResponse } from "axios";
import { observer } from "mobx-react-lite";
import styles from './LoginPage.module.css';
import { Link, useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const [response, setResponse] = useState<string | null>(null);

  const {store} = useContext(Context)

  store.setAuth(false);

  const login = () => {
    const loginResponse = store.login(email, password).then((response) => {
        console.log(response);
        console.log(store.email);
        console.log(store.isAuth);
        if(response?.status == 201){
            if (store.isAuth) {
                navigate("/")
            } else if (response.data?.status == 400) {
                setResponse('Неправильный логин или пароль')
            }
        } else {
            setResponse('Что-то пошло не так...')
        }
    })
  }

  return (
      <>
          <div className={styles.loginWrapper}>
            <div className={styles.loginBlock}>
                <div className={styles.pageData}>
                    <div className={styles.pageDataText}>
                        <b>Вход в личный кабинет</b>
                    </div>
                    <div className={styles.redirectText}>
                        В случае отсутствия аккаунта <Link className={styles.regisrationLink} to='/sign-up'>зарегистрируйтесь</Link>
                    </div>
                </div>
                <div className={styles.inputBlock}>
                    <div className={styles.responseText}>{response}</div>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Электронная почта"
                        value={email}/>
                    <input type="password"  className={styles.inputUserData}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Пароль"
                        value={password}/>

                        <div className={styles.redirectText}>
                            Забыли пароль? <Link className={styles.regisrationLink} to='/request-for-reset'>Восстановить</Link>
                        </div>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.sendBtn} onClick={() => {
                                // UploadService.upload(firstName, lastName, report, age, sex, file);
                                login();
                                }
                            }>Войти</button>
                        </div>
                </div>
            </div>
          </div>
      </>
  )
};

export default observer(LoginPage);