import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import AuthService from "../../services/AuthService";
import styles from './RegistrationPage.module.css'
import { Link, useNavigate } from "react-router-dom";
import Header from "../../containers/Header";

const RegistrationPage: FC = () => {
  const [type, setType] = useState<string>('Физическое лицо');
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [shortName, setShortName] = useState<string>('');
  const [inn, setInn] = useState<string>('');
  const [contactFirstname, setContactFirstname] = useState<string>('');
  const [contactLastname, setContactLastname] = useState<string>('');
  const [contactSurname, setContactSurname] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({}); // Состояние для ошибок

  const navigate = useNavigate();
  const [response, setResponse] = useState<string | null>(null);
  const { store } = useContext(Context);

  useEffect(() => {
    if (store.isAuth) {
      return navigate("/");
    }
  }, [store.isAuth, store.email, navigate]);

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};

    // Общие поля для всех типов
    if (!email) newErrors.email = true;
    if (!phoneNumber) newErrors.phoneNumber = true;
    if (!password) newErrors.password = true;

    // Поля для "Индивидуальный предприниматель"
    if (type === "Индивидуальный предприниматель") {
      if (!lastname) newErrors.lastname = true;
      if (!firstname) newErrors.firstname = true;
      if (!surname) newErrors.surname = true;
      if (!inn) newErrors.inn = true;
    }

    // Поля для "Юридическое лицо"
    if (type === "Юридическое лицо") {
      if (!fullName) newErrors.fullName = true;
      if (!shortName) newErrors.shortName = true;
      if (!inn) newErrors.inn = true;
      if (!contactLastname) newErrors.contactLastname = true;
      if (!contactFirstname) newErrors.contactFirstname = true;
      if (!contactSurname) newErrors.contactSurname = true;
    }

    // Поля для "Физическое лицо"
    if (type === "Физическое лицо") {
        if (!lastname) newErrors.lastname = true;
        if (!firstname) newErrors.firstname = true;
        if (!surname) newErrors.surname = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращает true, если ошибок нет
  };

  const registration = () => {
    if (!validateFields()) {
      return; // Если есть ошибки, не отправляем запрос
    }

    AuthService.registration(
      type,
      lastname,
      firstname,
      surname,
      email,
      phoneNumber,
      password,
      fullName,
      shortName,
      inn,
      contactFirstname,
      contactLastname,
      contactSurname
    ).then((response) => {
      console.log(response);
      if (response?.status === 201) {
        console.log(response.data.status);
        if (response.data.status === 400) {
          return setResponse('Пользователь с такой почтой уже зарегистрирован');
        }
        setResponse('На указанную вами почту отправлено письмо для её подтверждения, если вы не получили письмо, проверьте папку "Спам", Если вы не получили письмо, повторите процедуру регистрации и проверьте указанную вами электронную почту');
      } else {
        setResponse('Что-то пошло не так...');
      }
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
    setErrors({}); // Сбрасываем ошибки при изменении типа
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
    );
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
              Если у вас уже есть аккаунт - <Link className={styles.regisrationLink} to='/sign-in'>войдите</Link>
            </div>
          </div>
          <div className={styles.inputBlock}>
            <select value={type} onChange={handleTypeChange} className={styles.inputUserData}>
              <option value="Физическое лицо">Физическое лицо</option>
              <option value="Юридическое лицо">Юридическое лицо</option>
              <option value="Индивидуальный предприниматель">Индивидуальный предприниматель</option>
            </select>

            {type === 'Индивидуальный предприниматель' && (
              <>
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.lastname ? styles.error : ''}`}
                  onChange={e => setLastname(e.target.value)}
                  placeholder="Фамилия заявителя"
                  value={lastname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.firstname ? styles.error : ''}`}
                  onChange={e => setFirstname(e.target.value)}
                  placeholder="Имя заявителя"
                  value={firstname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.surname ? styles.error : ''}`}
                  onChange={e => setSurname(e.target.value)}
                  placeholder="Отчество заявителя"
                  value={surname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.inn ? styles.error : ''}`}
                  onChange={e => setInn(e.target.value)}
                  placeholder="ИНН"
                  value={inn}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.email ? styles.error : ''}`}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Электронная почта"
                  value={email}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.phoneNumber ? styles.error : ''}`}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Номер телефона"
                  value={phoneNumber}
                />
                <input
                  type="password"
                  className={`${styles.inputUserData} ${errors.password ? styles.error : ''}`}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Пароль"
                  value={password}
                />
              </>
            )}

            {type === 'Физическое лицо' && (
              <>
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.lastname ? styles.error : ''}`}
                  onChange={e => setLastname(e.target.value)}
                  placeholder="Фамилия заявителя"
                  value={lastname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.firstname ? styles.error : ''}`}
                  onChange={e => setFirstname(e.target.value)}
                  placeholder="Имя заявителя"
                  value={firstname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.surname ? styles.error : ''}`}
                  onChange={e => setSurname(e.target.value)}
                  placeholder="Отчество заявителя"
                  value={surname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.email ? styles.error : ''}`}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Электронная почта"
                  value={email}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.phoneNumber ? styles.error : ''}`}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Номер телефона"
                  value={phoneNumber}
                />
                <input
                  type="password"
                  className={`${styles.inputUserData} ${errors.password ? styles.error : ''}`}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Пароль"
                  value={password}
                />
              </>
            )}

            {type === 'Юридическое лицо' && (
              <>
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.fullName ? styles.error : ''}`}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Полное наименование"
                  value={fullName}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.shortName ? styles.error : ''}`}
                  onChange={e => setShortName(e.target.value)}
                  placeholder="Сокращённое наименование"
                  value={shortName}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.inn ? styles.error : ''}`}
                  onChange={e => setInn(e.target.value)}
                  placeholder="ИНН"
                  value={inn}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.email ? styles.error : ''}`}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Электронная почта"
                  value={email}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.phoneNumber ? styles.error : ''}`}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Номер телефона"
                  value={phoneNumber}
                />
                <p className={styles.formSubtitle}><b>Контактное лицо</b></p>
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.contactLastname ? styles.error : ''}`}
                  onChange={e => setContactLastname(e.target.value)}
                  placeholder="Фамилия"
                  value={contactLastname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.contactFirstname ? styles.error : ''}`}
                  onChange={e => setContactFirstname(e.target.value)}
                  placeholder="Имя"
                  value={contactFirstname}
                />
                <input
                  type="text"
                  className={`${styles.inputUserData} ${errors.contactSurname ? styles.error : ''}`}
                  onChange={e => setContactSurname(e.target.value)}
                  placeholder="Отчество"
                  value={contactSurname}
                />
                <input
                  type="password"
                  className={`${styles.inputUserData} ${errors.password ? styles.error : ''}`}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Пароль"
                  value={password}
                />
              </>
            )}

            <div className={styles.buttonWrapper}>
              <button className={styles.sendBtn} onClick={registration}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(RegistrationPage);