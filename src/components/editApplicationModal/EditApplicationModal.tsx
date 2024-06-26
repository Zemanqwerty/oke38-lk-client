import React, { FC, useContext, useRef, useState } from "react";
import styles from './EditApplicationModal.module.css'
import UsersService from "../../services/UsersService";
import { SendApplicationModel } from "../../models/requests/SendApplicationModel";
import ApplicationsService from "../../services/ApplicationsService";
import addFile from '../../resources/images/add_file.png';
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { EditApplicationData } from "../../models/requests/EditApplicationData";

interface ApplicationData {
    application: ApplicationsResponse
}

const EditApplicationModal: FC<ApplicationData> = (props: ApplicationData) => {
    // const [reason, setReason] = useState<string>(props.application.reason);
    // const [city, setCity] = useState<string>(props.application.city);
    const [address, setAddress] = useState<string>(props.application.address);
    const [maxPower, setMaxPower] = useState<string>(props.application.maxPower);
    const [powerLevel, setPowerLevel] = useState<string>(props.application.powerLevel);
    const [paymentsOption, setPaymentsOption] = useState<string>(props.application.paymentOption);
    const [provider, setProvider] = useState<string>(props.application.provider);

    const [response, setResponse] = useState<string>('');

    // const sendApplication = () => {
    //     const application = new EditApplicationData(
    //         reason,
    //         city,
    //         address,
    //         maxPower,
    //         powerLevel,
    //         paymentsOption,
    //         provider
    //     )

    //     ApplicationsService.editApplicationData(application, props.application.uuid).then((response) => {
    //         if (response?.status === 201) {
    //             setResponse('Информация о заявке успешно обновлена');
    //         } else {
    //             setResponse('Что-то пошло не так...');
    //         }
    //     })
    // }

    const handlePaymentsOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentsOption(event.target.value);
      };

    return (
        <div className={styles.sendFormWrapper}>
            <div className={styles.applicationForm}>
                {/* <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setReason(e.target.value)}
                        placeholder="..."
                    value={reason}/>
                </div> */}
                {/* <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Район (город) расположения энергопринимающего устройства:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setCity(e.target.value)}
                        placeholder="..."
                    value={city}/>
                </div> */}
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Адрес энергопринимающего устройства:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="..."
                    value={address}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Максимальная мощность (присоединяемых и ранее присоединенных) энергопринимающих устройств, кВт:</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setMaxPower(e.target.value)}
                        placeholder="..."
                    value={maxPower}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Уровень напряжения:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setPowerLevel(e.target.value)}
                        placeholder="..."
                    value={powerLevel}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Вариант оплаты:*</p>
                    <select value={paymentsOption} onChange={handlePaymentsOptionChange} className={styles.inputUserData}>
                        <option value="Оплата 100%">Оплата 100%</option>
                        <option value="Оплата 10% после подписания Договора и 90% после подписания Акта ТП">Оплата 10% после подписания Договора и 90% после подписания Акта ТП</option>
                    </select>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Гарантирующий поставщик:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setProvider(e.target.value)}
                        placeholder="..."
                    value={provider}/>
                </div>
                {response}
                {/* <button onClick={sendApplication} className={styles.sendApplicationBtn}>Сохранить</button> */}
                <button className={styles.sendApplicationBtn}>Сохранить</button>
            </div>
        </div>
    )
}

export default EditApplicationModal;