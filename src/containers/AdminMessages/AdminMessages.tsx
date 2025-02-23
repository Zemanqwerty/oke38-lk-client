import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import styles from './AdminMessages.module.css'
import { Context } from "../..";
import { UsersResponse } from "../../models/response/UsersResponse";
import UsersService from "../../services/UsersService";
import stepArrow from '../../resources/images/stepArrow.png'
import reloadImg from '../../resources/images/reload.png'
import useModal from "../../hooks/useModal";
import ModalWindow from "../../components/ModalWindow";
import UserSetRoleModal from "../../components/userSetRoleModal";
import UserSetNameModal from "../../components/userSetNameModal";
import UserSetPhoneNumberModal from "../../components/userSetPhoneNumberModal";
import CreateNewUserModal from "../../components/createNewUserModal";
import cross from '../../resources/images/cross.png';
import edit from '../../resources/images/edit.png';
import { UsersRelationsResponse } from "../../models/response/UsersRelationsResponse";
import MessagesService from "../../services/MessagesService";
import { LastMessages } from "../../models/response/LastMessagesResponse.dto";
import { useNavigate } from "react-router";

// interface UsersProps {
//     setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
// }

// const AdminUsers: FC<UsersProps> = (props: UsersProps) => {
const AdminMessages: FC = () => {
    const {store} = useContext(Context)

    const navigate = useNavigate();

    const [messages, setMessages] = useState<LastMessages[]>([]);
    const [messagesCount, setMessagesCount] = useState<number>();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [customPageNumber, setCustomPageNumber] = useState<number>(1);

    const [searchPageNumber, setSearchPagenumber] = useState<number>(1);

    const getLastMessages = async (pageNumber: number) => {
        await MessagesService.getLastMessages(pageNumber).then((response) => {
            if (response.status === 200) {
                setMessages(response.data);
            }
            else {
                console.log('get messages error');
            }
        })
    }

    const getAllMessagesCount = async () => {
        await MessagesService.getAllMessagesCount().then((response) => {
            if (response?.status === 200) {
                return setMessagesCount(response?.data);
            }
        })
    }

    const handleApplicationClick = (applicationId: string) => {
        navigate(`/application/${applicationId}`);
    };

    useEffect(() => {
        getLastMessages(searchPageNumber);
        getAllMessagesCount();
    }, [searchPageNumber])

    const getMessagesFromNextPage = () => {
        handleChangePagenumber(pageNumber + 1)
    }

    const getMessagesFromPrevPage = () => {
        handleChangePagenumber(pageNumber - 1)
    }

    const handleChangePagenumber = (pn: number) => {
        if (Number.isNaN(pn)) {
            return setCustomPageNumber(pn)
        }
        setSearchPagenumber(pn);
        setPageNumber(pn);
        setCustomPageNumber(pn);
    }

    return (
        <div className={styles.applicationsWrapper}>
            <div className={styles.applicationsTitle}>
                <h1 className={styles.applicationsTitleText}>Все сообщения</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getLastMessages(pageNumber)} />
            </div>
            <div className={styles.selectPageWrapper}>
                <div className={styles.switchPageBlock}>
                    {pageNumber === 1
                    ? null
                    : <img src={stepArrow} alt="назад" className={styles.prevPageImg} onClick={() => getMessagesFromPrevPage()}/>}
                    <p>Страница {pageNumber} {messagesCount ? <>... {Math.round(messagesCount / 20)}</> : null}</p>
                    {messages.length < 20
                    ? null
                    : <img src={stepArrow} alt="вперёд" className={styles.nextPageImg} onClick={() => getMessagesFromNextPage()}/>}
                </div>
                <div className={styles.selectPageBlock}>
                    <p>Введите номер страницы</p>
                    <div className={styles.selectPage}>
                        <input className={styles.selectPageInput} type="number" value={customPageNumber} onChange={e => handleChangePagenumber(parseInt(e.target.value, 10))}/>
                        {/* <button className={styles.selectPageBtn} onClick={() => getAllUsers(customPageNumber)}>Показать</button> */}
                    </div>
                </div>
            </div>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>
                        <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Получено
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Заявитель
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Отправитель
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Филиал ОКЭ
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Номер заявки
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Дата заявки
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Сообщение
                                </div>
                            </div>
                        </th>
                    </tr>
                    {messages.map((message) => {
                        return (
                            <tr key={message.messageClientId} className={styles.applicationBlock}>
                                <td className={styles.tableFields}>
                                    {  
                                        message.sendDate !== null
                                        ? message.sendDate.toString().split('T')[0].replace(/-/g, ".")
                                        : ''
                                    }
                                </td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`} onClick={() => handleApplicationClick(message.application.uuid)}>
                                    {
                                        message.user.firstname ?
                                        <>
                                            {message.user.lastname} {message.user.firstname} {message.user.surname}
                                        </> :
                                        <>
                                            {message.user.yl_shortname}
                                        </>
                                    }
                                </td>
                                <td className={styles.tableFields}>
                                    {message.user.roles}
                                </td>
                                <td className={styles.tableFields}>
                                    {message.application.filial}
                                </td>
                                <td className={styles.tableFields}>
                                    {message.application.applicationNumber}
                                </td>
                                <td className={styles.tableFields}>
                                    {
                                        message.application.applicationDate !== null
                                        ? message.application.applicationDate.toString().split('T')[0].replace(/-/g, ".")
                                        : ''
                                    }
                                </td>
                                <td className={styles.tableFields}>
                                    {
                                        message.isFile ?
                                        'Добавлены файлы' :
                                        null
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};

export default observer(AdminMessages);