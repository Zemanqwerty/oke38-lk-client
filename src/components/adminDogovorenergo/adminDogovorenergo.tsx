import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import styles from './adminDogovorenergo.module.css'
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
import ApplicationsService from "../../services/ApplicationsService";
import { DogovorEnergoResponse } from "../../models/response/DogovorEnergoResponse";

interface Dogovorenergo {
    setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const AdminDogovorenergo: FC<Dogovorenergo> = (props: Dogovorenergo) => {

    const [dogovorEnergoList, setDogovorEnergoList] = useState<DogovorEnergoResponse[]>([]);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [customPageNumber, setCustomPageNumber] = useState<number>(1);


    const getAllDogovorEnergo = async (pageNumber: number) => {
        ApplicationsService.getAllDogovorEnergo(pageNumber).then((response) => {
            if (response.status === 200) {
                setDogovorEnergoList(response.data);
            }
            else {
                console.log('get apply error');
            }
        })
    }

    useEffect(() => {
        getAllDogovorEnergo(pageNumber);
    }, [])

    const getUsersFromNextPage = async () => {
        await getAllDogovorEnergo(pageNumber + 1)
        setPageNumber(pageNumber + 1)
    }

    const getUsersFromPrevPage = () => {
        getAllDogovorEnergo(pageNumber - 1)
        setPageNumber(pageNumber - 1)
    }

    // const showUserRole = (role: string) => {
    //     switch (role) {
    //         case 'admin':
    //             return 'Администратор'
            
    //         case 'client':
    //             return 'Заявитель'
    //     }
    // }

    // const deleteUser = async (userEmail: string) => {
    //     await UsersService.deleteUser(userEmail).then((response) => {
    //         if (response?.status == 201) {
    //            getAllDogovorEnergo( users.filter((user) => user.email !== userEmail));
    //         }
    //     })
    // }

    return (
        <div className={styles.applicationsWrapper}>
            <div className={styles.applicationsTitle}>
                <h1 className={styles.applicationsTitleText}>Все договоры энергоснабжения</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getAllDogovorEnergo(pageNumber)} />
            </div>
            <div className={styles.selectPageWrapper}>
                <div className={styles.switchPageBlock}>
                    {pageNumber === 1
                    ? null
                    : <img src={stepArrow} alt="назад" className={styles.prevPageImg} onClick={() => getUsersFromPrevPage()}/>}
                    <p>Страница {pageNumber}</p>
                    {dogovorEnergoList.length < 20
                    ? null
                    : <img src={stepArrow} alt="вперёд" className={styles.nextPageImg} onClick={() => getUsersFromNextPage()}/>}
                </div>
                <div className={styles.selectPageBlock}>
                    <p>Введите номер страницы</p>
                    <div className={styles.selectPage}>
                        <input className={styles.selectPageInput} type="number" value={customPageNumber} onChange={e => setCustomPageNumber(parseInt(e.target.value, 10))}/>
                        <button className={styles.selectPageBtn} onClick={() => getAllDogovorEnergo(customPageNumber)}>Показать</button>
                    </div>
                </div>
            </div>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>
                            Дата создания
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Потребитель
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchApplicationId(e.target.value)} value={searchApplicationId}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Дата подачи заявки
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchCity(e.target.value)} value={searchCity}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Номер заявки присв.
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchAddress(e.target.value)} value={searchAddress}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Дата заявки присв.
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchUser(e.target.value)} value={searchUser}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Статус заявки
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Адрес ЭПУ
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Номер договора энергоснабжения
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Номер лицевого счёта
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Номер электроустановки
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                    </tr>
                    {dogovorEnergoList.map((dogovor) => {
                        return (
                            <tr key={dogovor.dogovorNumber} className={styles.applicationBlock}>
                                <td className={styles.tableFields}>
                                    {  
                                        dogovor.dateOfCreateDogovor !== null
                                        ? dogovor.dateOfCreateDogovor.toString().split('T')[0].replace(/-/g, ".")
                                        : ''
                                    }
                                </td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`}>
                                    {
                                        dogovor.user.firstname
                                        ? <>
                                            {dogovor.user.lastname} <br />
                                            {dogovor.user.firstname} <br />
                                            {dogovor.user.surname}
                                        </>
                                        : <>
                                            {dogovor.user.yl_fullname}
                                        </>}
                                </td>
                                <td className={`${styles.tableFields} ${styles.canChange}`}>
                                    {
                                        dogovor.dateOfCreateApplication !== null
                                        ? dogovor.dateOfCreateApplication.toString().split('T')[0].replace(/-/g, ".")
                                        : ''
                                    }
                                </td>
                                <td className={styles.tableFields}>{dogovor.applicationNumber}</td>
                                <td className={`${styles.tableFields} ${styles.canChange}`}>
                                    {
                                        dogovor.applicationDate !== null
                                        ? dogovor.applicationDate.toString().split('T')[0].replace(/-/g, ".")
                                        : ''
                                    }
                                </td>
                                <td className={styles.tableFields}>{dogovor.application_status}</td>
                                <td className={styles.tableFields}>{dogovor.address_epu}</td>
                                <td className={styles.tableFields}>{dogovor.dogovorNumber}</td>
                                <td className={styles.tableFields}>{dogovor.schetNumber}</td>
                                <td className={styles.tableFields}>{dogovor.epuNumber}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};

export default observer(AdminDogovorenergo);