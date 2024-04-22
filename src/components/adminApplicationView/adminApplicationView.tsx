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

interface ApplicationProps {
    application: ApplicationsResponse;
}

const AdminApplicationView: FC<ApplicationProps> = (props: ApplicationProps) => {
    const {store} = useContext(Context);
    const [files, setFiles] = useState<FilesResponse[]>([]);

    const { isOpen: setFilialIsOpen, toggle: setFilialToggle } = useModal();
    const { isOpen: createInOneSIsOpen, toggle: createInOneSToggle } = useModal();
    const { isOpen: setNumberIsOpen, toggle: setNumberToggle } = useModal();

    interface MenuElement {
        title: string;
        body: React.ReactNode;
    }
    
    const menuElements: MenuElement[] = [
      { title: 'Заявка (черновик)', body: <ApplicationDraft files={files} /> },
      { title: 'Заявка (рабочая)', body: <ApplicationWorking /> },
      { title: 'Договор ТП', body: <ApplicationContractData /> },
      { title: 'Счет (оплата)', body: <ApplicationBillPaying /> },
      { title: 'Договор Энергоснабжения', body: <ApplicationEnergiContract /> },
      { title: 'Переписка', body: <ApplicationChating /> },
    ];

    const [currentMenuElement, setCurrentMenuElement] = useState<number>(0);

    const handleMenuElementClick = (id: number) => {
        setCurrentMenuElement(id)
    }

    useEffect(() => {
        const getFilesByApplicationId = async (id: number) => {
            await ApplicationsService.getFilesByApplication(id).then((response) => {
                setFiles(response.data);
            })
        }
        getFilesByApplicationId(props.application.id);
    }, [])

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
                    <p>{props.application.uuid}</p>
                </div>
            </div>
            <div className={styles.clientDataWrapper}>
                <div className={styles.clientTitleBlock}>
                    <p>Информация о заявителе (контактном лице)</p>
                </div>
                <div className={styles.clientDataBlock}>
                    <p>{props.application.userLastName} {props.application.userFirstName} {props.application.userSurname}</p>
                    <p>{props.application.userType}</p>
                    <p>{props.application.userPhoneNumber}</p>
                    <p>{props.application.userEmail}</p>
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
                        <p>{props.application.createdAt.toString().split('T')[0].replace(/-/g, ".")}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p></p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.userLastName} {props.application.userFirstName} {props.application.userSurname}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.filial}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.applicationNumber}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p></p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.status}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p></p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.city}, {props.application.address}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.maxPower}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.powerLevel}</p>
                    </div>
                    <div className={styles.applicationInfoText}>
                        <p>{props.application.paymentOption === 'Оплата 100%' ? '100%' : '10% / 90%'}</p>
                    </div>
                </div>
            </div>
            <div className={styles.optionsWrapper}>
                <button onClick={() => setFilialToggle()}>Закрепить за филиалом</button>
                <button onClick={() => createInOneSToggle()}>Создать заявку в 1С</button>
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
                {/* <CreateNewLessonModal toggle={createLessonToggle} setLessons={props.setLessons} lessons={props.lessons} /> */}
                <SetFilialModal id={props.application.id}/>
            </ModalWindow>
            <ModalWindow isOpen={createInOneSIsOpen} toggle={createInOneSToggle}>
                {/* <CreateNewLessonModal toggle={createLessonToggle} setLessons={props.setLessons} lessons={props.lessons} /> */}
            </ModalWindow>
            <ModalWindow isOpen={setNumberIsOpen} toggle={setNumberToggle}>
                {/* <CreateNewLessonModal toggle={createLessonToggle} setLessons={props.setLessons} lessons={props.lessons} /> */}
                <SetNumberStatusModal id={props.application.id}/>
            </ModalWindow>
        </div>
    )
};

export default observer(AdminApplicationView);
