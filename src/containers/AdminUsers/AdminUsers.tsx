import { observer } from "mobx-react-lite";
import React, { FC, useContext, useEffect, useState } from "react";
import styles from './AdminUsers.module.css'
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

// interface UsersProps {
//     setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
// }

// const AdminUsers: FC<UsersProps> = (props: UsersProps) => {
const AdminUsers: FC = () => {
    const {store} = useContext(Context)

    const { isOpen: setRoleIsOpen, toggle: setRoleToggle } = useModal();
    const { isOpen: setNameIsOpen, toggle: setNameToggle } = useModal();
    const { isOpen: setPhoneNumberIsOpen, toggle: setPhoneNumberToggle } = useModal();
    const { isOpen: createNewUserIsOpen, toggle: createNewUserToggle } = useModal();

    const [users, setUsers] = useState<UsersResponse[]>([]);
    const [usersCount, setUsersCount] = useState<number>();
    const [userRoles, setUserRoles] = useState<UsersRelationsResponse[]>([]);
    const [userTypes, setUserTypes] = useState<UsersRelationsResponse[]>([]);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [customPageNumber, setCustomPageNumber] = useState<number>(1);

    const [currentUser, setCurrentUser] = useState<UsersResponse>();

    const [searchUser, setSearchUser] = useState<string>('');
    const [searchEmail, setSearchEmail] = useState<string>('');
    const [searchPhone, setSearchPhone] = useState<string>('');
    const [searchRole, setSearchRole] = useState<number>();
    const [searchType, setSearchType] = useState<number>();

    const [searchPageNumber, setSearchPagenumber] = useState<number>(1);

    const getAllUsers = async (pageNumber: number, filters?: any) => {
        await UsersService.getAllUsers(pageNumber, filters).then((response) => {
            if (response.status === 200) {
                setUsers(response.data);
            }
            else {
                console.log('get apply error');
            }
        })
    }

    const getAllUsersCount = async () => {
        await UsersService.getAllUsersCount().then((response) => {
            if (response?.status === 200) {
                return setUsersCount(response?.data);
            }
        })
    }

    const getUserRoles = async () => {
        await UsersService.getUserRoles().then((response) => {
            if (response?.status === 200) {
                return setUserRoles(response?.data);
            }
        })
    }

    const getUserTypes = async () => {
        await UsersService.getUserTypes().then((response) => {
            if (response?.status === 200) {
                return setUserTypes(response?.data);
            }
        })
    }

    useEffect(() => {
        getUserRoles();
        getUserTypes();
    }, [])

    useEffect(() => {
        const filters = {
            user: searchUser,
            email: searchEmail,
            phone: searchPhone,
            type: searchType,
            role: searchRole
        };
        getAllUsers(searchPageNumber, filters);
        getAllUsersCount();
    }, [searchPageNumber, searchUser, searchEmail, searchPhone, searchRole, searchType])

    const getUsersFromNextPage = () => {
        handleChangePagenumber(pageNumber + 1)
    }

    const getUsersFromPrevPage = () => {
        handleChangePagenumber(pageNumber - 1)
    }

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchRole(event.target.value === '' ? undefined : parseInt(event.target.value));
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(event.target.value);
        setSearchType(event.target.value === '' ? undefined : parseInt(event.target.value));
    };

    // const showUserRole = (role: string) => {
    //     switch (role) {
    //         case 'admin':
    //             return 'Администратор'
            
    //         case 'client':
    //             return 'Заявитель'
    //     }
    // }

    const setCurrentUserForModal = (userData: UsersResponse, modalToggle: () => void) => {
        setCurrentUser(userData);
        modalToggle();
    }

    const deleteUser = async (userEmail: string) => {
        await UsersService.deleteUser(userEmail).then((response) => {
            if (response?.status == 201) {
               setUsers( users.filter((user) => user.email !== userEmail));
            }
        })
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
                <h1 className={styles.applicationsTitleText}>Все пользователи</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getAllUsers(pageNumber)} />
            </div>
            <div className={styles.selectPageWrapper}>
                <div className={styles.switchPageBlock}>
                    {pageNumber === 1
                    ? null
                    : <img src={stepArrow} alt="назад" className={styles.prevPageImg} onClick={() => getUsersFromPrevPage()}/>}
                    <p>Страница {pageNumber} {usersCount ? <>... {Math.round(usersCount / 20)}</> : null}</p>
                    {users.length < 20
                    ? null
                    : <img src={stepArrow} alt="вперёд" className={styles.nextPageImg} onClick={() => getUsersFromNextPage()}/>}
                </div>
                <div className={styles.selectPageBlock}>
                    <p>Введите номер страницы</p>
                    <div className={styles.selectPage}>
                        <input className={styles.selectPageInput} type="number" value={customPageNumber} onChange={e => handleChangePagenumber(parseInt(e.target.value, 10))}/>
                        {/* <button className={styles.selectPageBtn} onClick={() => getAllUsers(customPageNumber)}>Показать</button> */}
                    </div>
                </div>
            </div>
            <button className={styles.createNewUserBtn} onClick={() => createNewUserToggle()}>
                Создать пользователя
            </button>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>
                            <div className={styles.tableTitleBlock}>
                                Дата регистрации
                            </div>
                            <hr className={styles.tableTitleHr} />
                            <div className={styles.tableTitleBlock}></div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Электронная почта
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <input type="text" className={styles.tableSearchInput} placeholder="Поиск..." onChange={e => setSearchEmail(e.target.value)} value={searchEmail}/>
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Номер телефона
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <input type="text" className={styles.tableSearchInput} placeholder="Поиск..." onChange={e => setSearchPhone(e.target.value)} value={searchPhone}/>
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Тип
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchType} onChange={handleTypeChange} className={styles.tableSearchInput}>
                                        <option value=''>Выбрать...</option>
                                        {
                                            userTypes?.length ?
                                            userTypes.map((type) => {
                                                return (
                                                    <option value={type.idClient}>{type.caption}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchAddress(e.target.value)} value={searchAddress}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    ФИО
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <input type="text" className={styles.tableSearchInput} placeholder="Поиск..." onChange={e => setSearchUser(e.target.value)} value={searchUser}/>
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Роль
                                </div>
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchRole} onChange={handleRoleChange} className={styles.tableSearchInput}>
                                        <option value=''>Выбрать...</option>
                                        {
                                            userRoles?.length ?
                                            userRoles.map((role) => {
                                                return (
                                                    <option value={role.idClient}>{role.caption}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                        <th className={`${styles.tableTitles} ${styles.delete}`}>
                            Действие
                        </th>
                    </tr>
                    {users.map((user) => {
                        return (
                            <tr key={user.email} className={styles.applicationBlock}>
                                <td className={styles.tableFields}>
                                    {  
                                        user.createdAt !== null
                                        ? user.createdAt.toString().split('T')[0].replace(/-/g, ".")
                                        : ''
                                    }
                                </td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`}>{user.email}</td>
                                <td className={`${styles.tableFields} ${styles.canChange}`} onClick={() => setCurrentUserForModal(user, setPhoneNumberToggle)}>
                                    <div className={styles.changeble}>
                                        {user.phoneNumber}
                                        <img src={edit} alt="Изменить" className={styles.changeImg} />
                                    </div>
                                </td>
                                <td className={styles.tableFields}>{user.type}</td>
                                <td className={`${styles.tableFields} ${styles.canChange}`} onClick={() => setCurrentUserForModal(user, setNameToggle)}>
                                    <div className={styles.changeble}>
                                        <div className={styles.fieldBlock}>
                                            {user.lastname}
                                            <br />
                                            {user.firstname}
                                            <br />
                                            {user.surname}
                                        </div>
                                        <img src={edit} alt="Изменить" className={styles.changeImg} />
                                    </div>
                                </td>
                                <td className={`${styles.tableFields} ${styles.canChange}`} onClick={() => setCurrentUserForModal(user, setRoleToggle)}>
                                    <div className={styles.changeble}>
                                        {/* {showUserRole(user.roles)} */}
                                        {user.roles}
                                        <img src={edit} alt="Изменить" className={styles.changeImg} />
                                    </div>
                                </td>
                                <td className={styles.tableFields}>
                                    <div className={styles.imageWrapper}>
                                        <img src={cross} alt="Удалить" onClick={() => deleteUser(user.email)} />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
            <ModalWindow isOpen={setRoleIsOpen} toggle={setRoleToggle}>
                <UserSetRoleModal email={currentUser?.email} currentRole={currentUser?.roles}/>
            </ModalWindow>
            <ModalWindow isOpen={setNameIsOpen} toggle={setNameToggle}>
                <UserSetNameModal email={currentUser?.email} currentFirstName={currentUser?.firstname} currentLastName={currentUser?.lastname} cirrentSurname={currentUser?.surname} />
            </ModalWindow>
            <ModalWindow isOpen={setPhoneNumberIsOpen} toggle={setPhoneNumberToggle}>
                <UserSetPhoneNumberModal email={currentUser?.email} currentPhoneNumber={currentUser?.phoneNumber} />
            </ModalWindow>
            <ModalWindow isOpen={createNewUserIsOpen} toggle={createNewUserToggle}>
                <CreateNewUserModal />
            </ModalWindow>
        </div>
    )
};

export default observer(AdminUsers);