import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from './SendApplication.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";
import addFile from '../../resources/images/add_file.png';


const SendApplication: FC = () => {
    const {store} = useContext(Context);

    const [applicationCopy, setApplicationCopy] = useState<File[]>([]);
    const [passportCopy, setPassportCopy] = useState<File[]>([]);
    const [planeCopy, setPlaneCopy] = useState<File[]>([]);
    const [ownDocsCopy, setOwnDocsCopy] = useState<File[]>([]);
    const [powerOfAttorneyCopy, setPowerOfAttorneyCopy] = useState<File[]>([]);
    const [constituentDocsCopy, setConstituentDocsCopy] = useState<File[]>([]);
    const [otherDocs, setOtherDocs] = useState<File[]>([]);

    const [reason, setReason] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [maxPower, setMaxPower] = useState<string>('');
    const [powerLevel, setPowerLevel] = useState<string>('');
    const [paymentsOption, setPaymentsOption] = useState<string>('');
    const [provider, setProvider] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleApplicationCopyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (applicationCopy.length >= 5) {
                return
            }
            setApplicationCopy(Array.from(e.target.files).concat(applicationCopy));
        }
    };
    
    const handleAddApplicationCopy = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.sendFormWrapper}>
            <div className={styles.applicationForm}>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setReason(e.target.value)}
                        placeholder="..."
                    value={reason}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setCity(e.target.value)}
                        placeholder="..."
                    value={city}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="..."
                    value={address}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setMaxPower(e.target.value)}
                        placeholder="..."
                    value={maxPower}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setPowerLevel(e.target.value)}
                        placeholder="..."
                    value={powerLevel}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setPaymentsOption(e.target.value)}
                        placeholder="..."
                    value={paymentsOption}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setProvider(e.target.value)}
                        placeholder="..."
                    value={provider}/>
                </div>
                <div className={styles.formInputContainer}>
                    <p className={styles.inputDescriptions}>Причина подачи заявки</p>
                    <input type="text"  className={styles.inputUserData}
                        onChange={e => setReason(e.target.value)}
                        placeholder="..."
                    value={reason}/>
                </div>
                <h2 className={styles.documentsTitle}>Необходимые документы</h2>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>

                <div>
                    <p className={styles.documentDescription}>Скан-копия документа на технологическое присоединение</p>
                    <input
                        type="file" 
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleApplicationCopyChange}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={handleAddApplicationCopy}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                </div>
            </div>
        </div>
    )
};

export default observer(SendApplication);

