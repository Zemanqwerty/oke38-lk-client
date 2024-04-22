import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import styles from './AdminUsers.module.css'
import { Context } from "../..";
import { UsersResponse } from "../../models/response/UsersResponse";
import UsersService from "../../services/UsersService";
import stepArrow from '../../resources/images/stepArrow.png'
import reloadImg from '../../resources/images/reload.png'

interface UsersProps {
    setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const AdminUsers: FC<UsersProps> = (props: UsersProps) => {
    const {store} = useContext(Context)

    const [users, setUsers] = useState<UsersResponse[]>([]);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [customPageNumber, setCustomPageNumber] = useState<number>(1);

    const getAllUsers = async (pageNumber: number) => {
        UsersService.getAllUsers(pageNumber).then((response) => {
            if (response.status === 200) {
                setUsers(response.data);
            }
            else {
                console.log('get apply error');
            }
        })
    }

    useEffect(() => {
        getAllUsers(pageNumber);
    }, [])

    const getUsersFromNextPage = () => {
        getAllUsers(pageNumber + 1)
        setPageNumber(pageNumber + 1)
    }

    const getUsersFromPrevPage = () => {
        getAllUsers(pageNumber - 1)
        setPageNumber(pageNumber - 1)
    }

    const showUserRole = (role: string) => {
        switch (role) {
            case 'admin':
                return 'Администратор'
            
            case 'client':
                return 'Заявитель'
        }
    }

    return (
        <div className={styles.applicationsWrapper}>
            <div className={styles.applicationsTitle}>
                <h1 className={styles.applicationsTitleText}>Все пользователи</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getAllUsers(pageNumber)} />
            </div>
            <div className={styles.selectPageWrapper}>
                <div className={styles.switchPageBlock}>
                    {pageNumber === 1
                    ? null
                    : <img src={stepArrow} alt="назад" className={styles.prevPageImg} onClick={() => getUsersFromPrevPage()}/>}
                    <p>Страница {pageNumber}</p>
                    {users.length < 20
                    ? null
                    : <img src={stepArrow} alt="вперёд" className={styles.nextPageImg} onClick={() => getUsersFromNextPage()}/>}
                </div>
                <div className={styles.selectPageBlock}>
                    <p>Введите номер страницы</p>
                    <div className={styles.selectPage}>
                        <input className={styles.selectPageInput} type="number" value={customPageNumber} onChange={e => setCustomPageNumber(parseInt(e.target.value, 10))}/>
                        <button className={styles.selectPageBtn} onClick={() => getAllUsers(customPageNumber)}>Показать</button>
                    </div>
                </div>
            </div>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>
                            Дата регистрации
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Электронная почта
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchApplicationId(e.target.value)} value={searchApplicationId}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Номер телефона
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchCity(e.target.value)} value={searchCity}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Тип
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchAddress(e.target.value)} value={searchAddress}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Фио
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchUser(e.target.value)} value={searchUser}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Роль
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                    </tr>
                    {users.map((user) => {
                        return (
                            <tr key={user.email} className={styles.applicationBlock}>
                                <td className={styles.tableFields}>{user.createdAt.toString().split('T')[0].replace(/-/g, ".")}</td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`}>{user.email}</td>
                                <td className={styles.tableFields}>{user.phoneNumber}</td>
                                <td className={styles.tableFields}>{user.type}</td>
                                <td className={styles.tableFields}>
                                    {user.lastname}
                                    <br />
                                    {user.firstname}
                                    <br />
                                    {user.surname}
                                </td>
                                <td className={styles.tableFields}>{showUserRole(user.roles)}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
};

export default observer(AdminUsers);