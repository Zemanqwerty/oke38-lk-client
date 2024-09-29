import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import AuthService from "../../services/AuthService";
import styles from './createNewUserModal.module.css'
import { Link, useNavigate } from "react-router-dom";
import Header from "../../containers/Header";
import UsersService from "../../services/UsersService";

const RegistrationPage: FC = () => {

  const [type, setType] = useState<string>('физическое лицо');
  const [role, setRole] = useState<string>('заявитель')
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [response, setResponse] = useState<string | null>(null);

  const createNewUser = () => {
    const createNewUserResponse = UsersService.createNewUser(type, role, lastname, firstname, surname, email, phoneNumber, password).then((response) => {
        console.log(response);
        if(response?.status == 201){
            console.log(response.data.status);
            if (response.data.status === 400) {
                return setResponse('Пользователь с такой почтой уже зарегистрирован');
            }
            setResponse('Пользователь успешно зарегистрирован')
        } else {
            setResponse('Что-то пошло не так...')
        }
    })
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  }

  return (
      <>
          <div className={styles.loginWrapper}>
            <div className={styles.loginBlock}>
                <div className={styles.inputBlock}>
                    {response}
                    {/* <input type="text" className={styles.inputUserData}
                        onChange={e => setType(e.target.value)}
                        
                        value={type}/> */}
                    <select value={type} onChange={handleTypeChange} className={styles.inputUserData}>
                        <option value="физическое лицо">физическое лицо</option>
                        <option value="юридическое лицо">юридическое лицо</option>
                        <option value="индивидуальный предприниматель">индивидуальный предприниматель</option>
                    </select>
                    <select value={role} onChange={handleRoleChange} className={styles.inputUserData}>
                        <option value="заявитель">заявитель</option>
                        <option value="администратор">администратор</option>
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
                                createNewUser();
                                }
                            }>Создать пользователя</button>
                        </div>
                </div>
            </div>
          </div>
      </>
  )
}

export default observer(RegistrationPage);