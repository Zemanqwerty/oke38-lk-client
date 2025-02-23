import React, { FC, useContext, useEffect, useState } from "react";
import styles from './adminApplicationView.module.css'
import ApplicationsService from "../../services/ApplicationsService";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { observable } from "mobx";
import { FilesResponse } from "../../models/response/FilesResponse";
import showIcon from '../../resources/images/show_icon.png';
import downloadIcon from '../../resources/images/download_icon.png';
import { API_URL } from "../../http";
import useModal from "../../hooks/useModal";
import ModalWindow from "../ModalWindow";
import SetFilialModal from "../setFilialModal";
import SetNumberStatusModal from "../SetNumberStatus/SetNumberStatusModal";
import ApplicationDraft from "../applicationDraft";
import ApplicationWorking from "../applicationWorking";
import ApplicationContractData from "../applicationContractData";
import ApplicationBillPaying from "../applicationBillPaying";
import ApplicationEnergiContract from "../applicationEnergiContract";
import ApplicationChating from "../applicationChating";
import { useParams } from "react-router-dom";

// interface ApplicationProps {
//     application: ApplicationsResponse;
// }

// const AdminApplicationView: FC<ApplicationProps> = (props: ApplicationProps) => {
const AdminApplicationView: FC = () => {

    const { id } = useParams<{ id: string }>();

    const [application, setApplication] = useState<ApplicationsResponse | null>(null)
    const [files, setFiles] = useState<FilesResponse[]>([]);
    const [workingFiles, setWorkingFiles] = useState<FilesResponse[]>([]);

    const { isOpen: setFilialIsOpen, toggle: setFilialToggle } = useModal();
    const { isOpen: createInOneSIsOpen, toggle: createInOneSToggle } = useModal();
    const { isOpen: setNumberIsOpen, toggle: setNumberToggle } = useModal();

    const [currentMenuElement, setCurrentMenuElement] = useState<number>(0);

    const setApplicationView = async (id: string | undefined) => {
        if (id) {
            return ApplicationsService.setViewed(id);
        }
    }

    useEffect(() => {
        setApplication(null); // Сбрасываем состояние application
        const getApplicationById = async (id: string | undefined) => {
            if (id) {
                ApplicationsService.getById(id).then((response) => {
                    if (response.status === 200) {
                        setApplication(response.data);
                    }
                });
            }
        }

        const getFilesByApplicationId = async (id: string | undefined) => {
            if (id) {
                await ApplicationsService.getFilesByApplication(id).then((response) => {
                    setFiles(response.data);
                })
            }
        }

        const getWorkingFilesByApplicationId = async (id: string | undefined) => {
            if (id) {
                await ApplicationsService.getApplicationWorkingFiles(id).then((response) => {
                    setWorkingFiles(response.data);
                })
            }
        }

        setApplicationView(id);
        getApplicationById(id);
        getFilesByApplicationId(id);
        getWorkingFilesByApplicationId(id);
    }, [id])

    if (!application) {
        return <div>Загрузка данных о заявке...</div>;
    }

    interface MenuElement {
        title: string;
        body: React.ReactNode;
    }

    if (!id) {
        return <div>Заявка не найдена</div>
    }
    
    const menuElements: MenuElement[] = [
      { title: 'Заявка (черновик)', body: <ApplicationDraft files={files} application={application} setFiles={setFiles}/> },
      { title: 'Заявка (рабочая)', body: <ApplicationWorking files={workingFiles}/> },
      { title: 'Договор ТП', body: <ApplicationContractData id={id}/> },
      { title: 'Счет (оплата)', body: <ApplicationBillPaying /> },
      { title: 'Договор Энергоснабжения', body: <ApplicationEnergiContract id={id} /> },
      { title: 'Переписка', body: <ApplicationChating id={application.uuid}/> },
    ];

    const handleMenuElementClick = (id: number) => {
        setCurrentMenuElement(id)
    }

    const sendApplicationTo1c = () => {
        return ApplicationsService.sendApplicationTo1c(application.uuid);
    }

    return (
        <div className={styles.applicationWrapper}>
            {/* <div className={styles.mainInfoWrapper}>
                <div className={styles.infoBlock}>
                    <p>Номер обращения - </p>{props.application.id}
                </div>
                <div className={styles.infoBlock}>
                    <p>Город - </p>{props.application.city}
                </div>
                <div className={styles.infoBlock}>
                    <p>Адрес - </p>{props.application.address}
                </div>
                <div className={styles.infoBlock}>
                    <p>Дата подачи заявки - </p>{props.application.createdAt.toString().split('T')[0].replace(/-/g, ".")}
                </div>
                <div className={styles.infoBlock}>
                    <p>Максимальная мощность энергопринимающих устройств, кВт: - </p>{props.application.maxPower}
                </div>
                <div className={styles.infoBlock}>
                    <p>Уровень напряжения - </p>{props.application.powerLevel}
                </div>
                <div className={styles.infoBlock}>
                    <p>Гарантирующий поставщик - </p>{props.application.provider}
                </div>
                <div className={styles.infoBlock}>
                    <p>Статус заявки - </p>{props.application.status}
                </div>
            </div> */}
            <div className={styles.applicationUuidWrapper}>
                <div className={styles.applicationUuidTitle}>
                    <p>Идентификатор заявки</p>
                </div>
                <div className="">
                    <p>{application.uuid}</p>
                </div>
            </div>
            <div className={styles.clientDataWrapper}>
                <div className={styles.clientTitleBlock}>
                    <p>Информация о заявителе (контактном лице)</p>
                </div>
                <div className={styles.clientDataBlock}>
                    <p>{application.userLastName} {application.userFirstName} {application.userSurname}</p>
                    <p>{application.userType}</p>
                    <p>{application.userPhoneNumber}</p>
                    <p>{application.userEmail}</p>
                </div>
            </div>
            <div className={styles.applicationTextDataWrapper}>
                <div className={styles.DataTitle}>
                    <p>Информация о заявке</p>
                </div>
                <div className={styles.applicationTitles}>
                    <div className={styles.title}>
                        <p>Дата подачи</p>
                    </div>
                    <div className={styles.title}>
                        <p>Вид заявки</p>
                    </div>
                    <div className={styles.title}>
                        <p>Заявитель</p>
                    </div>
                    <div className={styles.title}>
                        <p>Филиал</p>
                    </div>
                    <div className={styles.title}>
                        <p>Номер заявки</p>
                    </div>
                    <div className={styles.title}>
                        <p>Дата заявки</p>
                    </div>
                    <div className={styles.title}>
                        <p>Статус заявки</p>
                    </div>
                    <div className={styles.title}>
                        <p>Статус оплаты</p>
                    </div>
                    <div className={styles.title}>
                        <p>Адрес ЭПУ</p>
                    </div>
                    <div className={styles.title}>
                        <p>Pmax</p>
                    </div>
                    <div className={styles.title}>
                        <p>U</p>
                    </div>
                    <div className={styles.title}>
                        <p>Вариант оплаты</p>
                    </div>

                    

                    <div className={styles.applicationInfoText}>
                        <p>{application.createdAt.toString().split('T')[0].replace(/-/g, ".")}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.vidzayavki}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.userLastName !== null ? application.userLastName : application.yl_fullname}
                                    <br />
                                    {application.userFirstName}
                                    <br />
                            {application.userSurname}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.filial}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.applicationNumber}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.applicationDate?.toString().split('T')[0].replace(/-/g, '.')}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.status}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.ststusoplaty}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.address}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.maxPower ? application.maxPower.split('.')[0] + '.' + application.maxPower.split('.')[1][0] : null}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.powerLevel}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.paymentOption === 'Оплата 100%' ? '100%' : '10% / 90%'}</p>
                    </div>
                </div>
            </div>
            <div className={styles.optionsWrapper}>
                <button onClick={() => setFilialToggle()}>Закрепить за филиалом</button>
                <button onClick={() => sendApplicationTo1c()}>Создать заявку в 1С</button>
                <button onClick={() => setNumberToggle()}>Присвоить номер / статус</button>
            </div>
            <div className={styles.applicationDataWrapper}>
                <div className={styles.applicationMenu}>
                    {/* <p>Заявка (черновик)</p>
                    <p>Заявка (рабочая)</p>
                    <p>Договор ТП</p>
                    <p>Счет (оплата)</p>
                    <p>Договор энергоснабжения</p>
                    <p>Переписка</p> */}

                    {menuElements.map((element, index) => {
                        return (
                            <p className={currentMenuElement === index ? styles.currentMenuEl : ''} onClick={() => handleMenuElementClick(index)}>{element.title}</p>
                        )
                    })}
                </div>
                {/* <ApplicationDraft files={files}/> */}
                {menuElements[currentMenuElement].body}
            </div>

            <ModalWindow isOpen={setFilialIsOpen} toggle={setFilialToggle}>
                <SetFilialModal id={application.uuid}/>
            </ModalWindow>

            <ModalWindow isOpen={createInOneSIsOpen} toggle={createInOneSToggle}>
            </ModalWindow>

            <ModalWindow isOpen={setNumberIsOpen} toggle={setNumberToggle}>
                <SetNumberStatusModal id={application.uuid}/>
            </ModalWindow>
        </div>
    )
};

export default observer(AdminApplicationView);
