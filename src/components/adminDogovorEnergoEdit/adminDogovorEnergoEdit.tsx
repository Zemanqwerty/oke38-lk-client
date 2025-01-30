import React, { FC, useEffect, useRef, useState } from "react";
import styles from './adminDogovorEnergoEdit.module.css';
import { useNavigate, useParams } from "react-router-dom";
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { DogovorEnergoResponse } from "../../models/response/DogovorEnergoResponse";
import addFile from '../../resources/images/add_file.png';

const AdminDogovoeEnergoEdit: FC = () => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate()

    const [nomerLS, setNomerLS] = useState<string | undefined>();
    const [nomerDogovora, setNomerDogovora] = useState<string | undefined>();
    const [nomerEPU, setNomerEPU] = useState<string | undefined>();
    const [date, setDate] = useState<string | undefined>();

    const [application, setApplication] = useState<ApplicationsResponse>();
    const [dogovorEnergo, setDogovorEnergo] = useState<DogovorEnergoResponse>();

    const [paymentFile, setPaymentFile] = useState<File>();
    const paymentFileInputRef = useRef<HTMLInputElement>(null);

    const [dogovorFile, setDogovorFile] = useState<File>();
    const dogovorFileInputRef = useRef<HTMLInputElement>(null);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    useEffect(() => {
        const getApplicationData = async (id: string | undefined) => {
            if (id) {
                await ApplicationsService.getById(id).then((response) => {
                    if (response?.status === 200) {
                        setApplication(response.data);
                    }
                });
            }
        };

        const getDogovorEnergo = async (id: string | undefined) => {
            if (id) {
                await ApplicationsService.getDogovorEnergoByApplicationId(id).then((response) => {
                    if (response?.status === 200) {
                        setDogovorEnergo(response.data);
                    }
                });
            }
        };

        getApplicationData(id);
        getDogovorEnergo(id);
    }, [id]);

    // Обновляем состояние только при изменении dogovorEnergo
    useEffect(() => {
        if (dogovorEnergo) {
            setNomerLS(dogovorEnergo.schetNumber);
            setNomerDogovora(dogovorEnergo.dogovorNumber);
            setNomerEPU(dogovorEnergo.epuNumber);
            setDate(dogovorEnergo.dateOfCreateDogovor ? dogovorEnergo.dateOfCreateDogovor.toString().split('T')[0] : undefined); // Преобразуем дату в формат YYYY-MM-DD
        }
    }, [dogovorEnergo]);

    if (!id) {
        return <>Данные о заявке не найдены</>;
    }

    const setDogovorData = async () => {
        await ApplicationsService.setDogovorEnergoData(id, nomerLS, nomerDogovora, nomerEPU, date).then((response) => {
            if (response?.status == 201) {
                console.log('updated');
            }
        })
    }

    const navigateToApplication = () => {
        return navigate(`/application/${id}`)
    }

    const setFiles = () => {
        ApplicationsService.setDogovorFiles(id, paymentFile, dogovorFile).then((response) => {
            if (response?.status == 201) {
                console.log('files setted');
            }
        })
    }

    const handleFilesListChange = (
        setFile: React.Dispatch<React.SetStateAction<File | undefined>>, 
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFiles();
        } else {
            setFile(undefined); // Обнуляем состояние, если файлы не выбраны
        }
    };
        
    const handleAddFile = (fileInputRef: any) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.dataWrapper}>
            <button className={styles.btn} onClick={() => navigateToApplication()}>К заявке</button>
            <div className={styles.dogovorEditValues}>
                <div className={styles.inputDataWrapper}>
                    <p className={styles.inputAnnotation}>Номер лицевого счёта</p>
                    <input className={styles.inputData} type="text" value={nomerLS || ''} onChange={(e) => setNomerLS(e.target.value)} />
                </div>

                <div className={styles.inputDataWrapper}>
                    <p className={styles.inputAnnotation}>Номер договора энергоснабжения</p>
                    <input className={styles.inputData} type="text" value={nomerDogovora || ''} onChange={(e) => setNomerDogovora(e.target.value)} />
                </div>

                <div className={styles.inputDataWrapper}>
                    <p className={styles.inputAnnotation}>Номер электроустановки</p>
                    <input className={styles.inputData} type="text" value={nomerEPU || ''} onChange={(e) => setNomerEPU(e.target.value)} />
                </div>

                <div className={styles.inputDataWrapper}>
                    <p className={styles.inputAnnotation}>Дата создания</p>
                    <input className={styles.inputData} type="date" value={date || ''} onChange={handleDateChange} />
                </div>
            </div>
            <button className={styles.btn} onClick={() => setDogovorData()}>Сохранить</button>
            <div className={styles.inputFilesWrapper}>
            <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Загрузить платежные реквизиты:</p>
                    <input
                        type="file"
                        ref={paymentFileInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(setPaymentFile, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(paymentFileInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        <div className={styles.fileDataWrapper}>
                            <div className={styles.fileElementDot}></div>
                            {paymentFile?.name ? paymentFile?.name : null}
                        </div>
                    </div>
                </div>
                <div className={styles.inputFileWrapper}>
                    <p className={styles.documentDescription}>Загрузить договор энергоснабжения:</p>
                    <input
                        type="file"
                        ref={dogovorFileInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(setDogovorFile, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={() => handleAddFile(dogovorFileInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        <div className={styles.fileDataWrapper}>
                            <div className={styles.fileElementDot}></div>
                            {dogovorFile?.name ? dogovorFile?.name : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDogovoeEnergoEdit;