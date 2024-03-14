import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import AuthService from "../../services/AuthService";
import styles from './RegistrationPage.module.css'
import { Link, useNavigate } from "react-router-dom";
import Header from "../../containers/Header";

const RegistrationPage: FC = () => {

  const [type, setType] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const [response, setResponse] = useState<string | null>(null);

  const {store} = useContext(Context)

  useEffect(() => {
    if (store.isAuth) {
        return navigate("/");
    }
  }, [store.isAuth, store.email, navigate]);

  const registration = () => {
    const registrationResponse = AuthService.registration(type, lastname, firstname, surname, email, phoneNumber, password).then((response) => {
        console.log(response);
        if(response?.status == 201){
            console.log(response.data.status);
            if (response.data.status === 400) {
                return setResponse('Пользователь с такой почтой уже зарегистрирован');
            }
            setResponse('На указанную вами почту отправлено письмо для её подтверждения, если вы не получили письмо, проверьте папку "Спам", Если вы не получили письмо, повторите процедуру регистрации и проверьте указанную вами электронную почту')
        } else {
            setResponse('Что-то пошло не так...')
        }
    })
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  if (response) {
    return (
        <>
            <Header />
            <div className={styles.responseMessageWrapper}>
                <div className={styles.responseMessage}>{response}</div>
                <div className={styles.tryAgainRegistrtion} onClick={() => setResponse(null)}>
                    Повторить регистрацию
                </div>
            </div>
        </>
    )
  }

  return (
      <>
        <Header />
          <div className={styles.loginWrapper}>
            <div className={styles.loginBlock}>
                <div className={styles.pageData}>
                    <div className={styles.pageDataText}>
                        <b>Регистрация в личном кабинете</b>
                    </div>
                    <div className={styles.redirectText}>
                        Если у вас уже есть аккуант - <Link className={styles.regisrationLink} to='/sign-in'>войдите</Link>
                    </div>
                </div>
                <div className={styles.inputBlock}>
                    {/* <input type="text" className={styles.inputUserData}
                        onChange={e => setType(e.target.value)}
                        
                        value={type}/> */}
                    <select value={type} onChange={handleTypeChange} className={styles.inputUserData}>
                        <option value="option1">Физическое лицо</option>
                        <option value="option2">Юридическое лицо</option>
                        <option value="option3">Индивидуальный предприниматель</option>
                    </select>
                    <input type="text" className={styles.inputUserData}
                        onChange={e => setLastname(e.target.value)}
                        placeholder="Фамилия"
                        value={lastname}/>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setFirstname(e.target.value)}
                        placeholder="Имя"
                        value={firstname}/>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setSurname(e.target.value)}
                        placeholder="Отчество"
                        value={surname}/>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Электронная почта"
                        value={email}/>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="Номер телефона"
                        value={phoneNumber}/>
                    <input type="password"  className={styles.inputUserData}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Пароль"
                        value={password}/>

                        <div className={styles.buttonWrapper}>
                            <button className={styles.sendBtn} onClick={() => {
                                // UploadService.upload(firstName, lastName, report, age, sex, file);
                                registration();
                                }
                            }>Зарегистрироваться</button>
                        </div>
                </div>
            </div>
          </div>
      </>
  )
}

export default observer(RegistrationPage);