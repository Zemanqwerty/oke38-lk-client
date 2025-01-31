import React, { FC, useContext, useEffect, useState } from "react";
import styles from './application.module.css'
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
import EditApplicationModal from "../editApplicationModal";
import { useParams } from "react-router-dom";

// interface ApplicationProps {
//     application: ApplicationsResponse;
// }

const Application: FC = () => {

    const { id } = useParams<{ id: string }>();
    
    const [application, setApplication] = useState<ApplicationsResponse | null>(null)
    const {store} = useContext(Context);
    const [files, setFiles] = useState<FilesResponse[]>([]);
    const [workingFiles, setWorkingFiles] = useState<FilesResponse[]>([]);

    const { isOpen: setFilialIsOpen, toggle: setFilialToggle } = useModal();
    const { isOpen: createInOneSIsOpen, toggle: createInOneSToggle } = useModal();
    const { isOpen: setNumberIsOpen, toggle: setNumberToggle } = useModal();
    const { isOpen: editApplicationDataIsOpen, toggle: editApplicationDataToggle } = useModal();

    const [currentMenuElement, setCurrentMenuElement] = useState<number>(0);

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

        getApplicationById(id)
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
                    {
                        application.status === 'Принята' && store.role === 'client'
                        ? <button onClick={() => editApplicationDataToggle()}>Редактировать</button>
                        : null 
                    }
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
                        <p>{application.maxPower}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.powerLevel}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{application.paymentOption === 'Оплата 100%' ? '100%' : '10% / 90%'}</p>
                    </div>
                </div>
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
                {/* <SetFilialModal id={props.application.id}/> */}
            </ModalWindow>
            <ModalWindow isOpen={createInOneSIsOpen} toggle={createInOneSToggle}>
                {/* <CreateNewLessonModal toggle={createLessonToggle} setLessons={props.setLessons} lessons={props.lessons} /> */}
            </ModalWindow>
            <ModalWindow isOpen={setNumberIsOpen} toggle={setNumberToggle}>
                {/* <SetNumberStatusModal id={props.application.id}/> */}
            </ModalWindow>
            <ModalWindow isOpen={editApplicationDataIsOpen} toggle={editApplicationDataToggle}>
                <EditApplicationModal application={application}/>
            </ModalWindow>
        </div>
    )
};

export default observer(Application);
