import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from './SendApplication.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";
import addFile from '../../resources/images/add_file.png';
import { SendApplicationModel } from "../../models/requests/SendApplicationModel";


const SendApplication: FC = () => {
    const {store} = useContext(Context);

    const [applicationCopy, setApplicationCopy] = useState<File[]>([]);
    const applicationCopyInputRef = useRef<HTMLInputElement>(null);

    const [passportCopy, setPassportCopy] = useState<File[]>([]);
    const passportCopyInputRef = useRef<HTMLInputElement>(null);

    const [planeCopy, setPlaneCopy] = useState<File[]>([]);
    const planeCopyInputRef = useRef<HTMLInputElement>(null);

    const [ownDocsCopy, setOwnDocsCopy] = useState<File[]>([]);
    const ownDocsCopyInputRef = useRef<HTMLInputElement>(null);

    const [powerOfAttorneyCopy, setPowerOfAttorneyCopy] = useState<File[]>([]);
    const powerOfAttorneyCopyInputRef = useRef<HTMLInputElement>(null);

    const [constituentDocsCopy, setConstituentDocsCopy] = useState<File[]>([]);
    const constituentDocsCopyInputRef = useRef<HTMLInputElement>(null);

    const [otherDocs, setOtherDocs] = useState<File[]>([]);
    const otherDocsInputRef = useRef<HTMLInputElement>(null);

    const [reason, setReason] = useState<string>('увеличение мощности');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [maxPower, setMaxPower] = useState<string>('');
    const [powerLevel, setPowerLevel] = useState<string>('0');
    const [paymentsOption, setPaymentsOption] = useState<string>('0');
    const [provider, setProvider] = useState<string>('ООО "Иркутскэнергосбыт"');

    const [response, setResponse] = useState<string>('');

    const sendApplication = () => {
        const application = new SendApplicationModel(
            applicationCopy,
            passportCopy,
            planeCopy,
            ownDocsCopy,
            powerOfAttorneyCopy,
            constituentDocsCopy,
            otherDocs,
            reason,
            city,
            address,
            maxPower,
            powerLevel,
            paymentsOption,
            provider
        )

        ApplicationsService.sendApplication(application).then((response) => {
            if (response?.status === 201) {
                setResponse('Вы успешно подали заявку! Отслеживать её статус вы можете в личном кабинете.');
            } else {
                setResponse('Что-то пошло не так...');
            }
        })
    }

    const handleFilesListChange = (filesList: File[], setFile: React.Dispatch<React.SetStateAction<File[]>>, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // if (applicationCopy.length >= 5) {
            //     return
            // }
            setFile(Array.from(e.target.files).concat(filesList));
        }
    };
    
    const handleAddFile = (fileInputRef: any) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handlePaymentsOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentsOption(event.target.value);
    };

    const handlePowerLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPowerLevel(event.target.value);
    };

    const handleReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setReason(event.target.value);
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

                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки:*</p>
                    <select value={reason} onChange={handleReasonChange} className={styles.inputUserData}>
                        <option value="увеличение мощности">увеличение мощности</option>
                        <option value="новое технологическое присоединение">новое технологическое присоединение</option>
                        <option value="временное технологическое присоединение">временное технологическое присоединение</option>
                    </select>
                </div>

                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Район (город) расположения энергопринимающего устройства:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setCity(e.target.value)}
                        placeholder="..."
                    value={city}/>
                </div>
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
                    <select value={powerLevel} onChange={handlePowerLevelChange} className={styles.inputUserData}>
                        <option value="0">0.22 кВ</option>
                        <option value="5">35 кВ</option>
                        <option value="3">6 кВ</option>
                        <option value="6">110 кВ</option>
                        <option value="4">10 кВ</option>
                        <option value="1">0.4 кВ</option>
                        <option value="2">1 кВ</option>
                    </select>
                </div>

                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Вариант оплаты:*</p>
                    <select value={paymentsOption} onChange={handlePaymentsOptionChange} className={styles.inputUserData}>
                        <option value="0">Оплата 100%</option>
                        <option value="1">Оплата 10% после подписания Договора и 90% после подписания Акта ТП</option>
                    </select>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Гарантирующий поставщик:*</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setProvider(e.target.value)}
                        placeholder="..."
                    value={provider}/>
                </div>
                <h2 className={styles.documentsTitle}>Необходимые документы</h2>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={applicationCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(applicationCopy, setApplicationCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(applicationCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {applicationCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Копия документа, указанного в заявке, удостоверяющего личность заявителя</p>
                    <input
                        type="file"
                        ref={passportCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(passportCopy, setPassportCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(passportCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {passportCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>План расположения энергопринимающих устройств, которые необходимо присоединить к электрическим сетям сетевой организации в границах земельного участка и в масштабе, позволяющем определить расстояние от границ земельного участка до объектов электросетевого хозяйства</p>
                    <input
                        type="file"
                        ref={planeCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(planeCopy, setPlaneCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(planeCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {planeCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Копия документа, подтверждающего право собственности или иное предусмотренное законом основание на объект капитального строительства и (или) земельный участок, на котором расположены (будут располагаться) объекты заявителя, либо право собственности или иное предусмотренное законом основание на энергопринимающие устройства</p>
                    <input
                        type="file"
                        ref={ownDocsCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(ownDocsCopy, setOwnDocsCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(ownDocsCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {ownDocsCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Доверенность или иные документы, подтверждающие полномочия представителя заявителя, подающего и получающего документы (в том числе подтверждающие полномочия выдавшего доверенность лица), в случае если заявка подается в сетевую организацию представителем заявителя</p>
                    <input
                        type="file"
                        ref={powerOfAttorneyCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(powerOfAttorneyCopy, setPowerOfAttorneyCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(powerOfAttorneyCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {powerOfAttorneyCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Учредительные документы (для ЮЛ и ИП)</p>
                    <input
                        type="file"
                        ref={constituentDocsCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(constituentDocsCopy, setConstituentDocsCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(constituentDocsCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {constituentDocsCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Прочие документы</p>
                    <input
                        type="file" 
                        ref={otherDocsInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(otherDocs, setOtherDocs, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(otherDocsInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {otherDocs.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {response}
                <button onClick={sendApplication} className={styles.sendApplicationBtn}>Отправить</button>
            </div>
        </div>
    )
};

export default observer(SendApplication);

