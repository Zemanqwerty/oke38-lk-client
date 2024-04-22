import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import ApplicationsService from "../../services/ApplicationsService";
import styles from './AdminDashboard.module.css'
import Application from "../../components/application";
import reloadImg from '../../resources/images/reload.png'
import AdminApplicationView from "../../components/adminApplicationView";
import stepArrow from '../../resources/images/stepArrow.png';

interface ApplicationsProps {
    setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const AdminDasboard: FC<ApplicationsProps> = (props: ApplicationsProps) => {

    const {store} = useContext(Context)

    const [applications, setApplications] = useState<ApplicationsResponse[]>([]);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [customPageNumber, setCustomPageNumber] = useState<number>(1);

    const getAllApplications = async (pageNumber: number) => {
        ApplicationsService.getAll(pageNumber).then((response) => {
            if (response.status === 200) {
                setApplications(response.data);
            }
            else {
                console.log('get apply error');
            }
        })
    }

    useEffect(() => {
        getAllApplications(pageNumber);
    }, [])

    const getApplicationsFromNextPage = () => {
        getAllApplications(pageNumber + 1)
        setPageNumber(pageNumber + 1)
    }

    const getApplicationsFromPrevPage = () => {
        getAllApplications(pageNumber - 1)
        setPageNumber(pageNumber - 1)
    }

    const [searchApplicationId, setSearchApplicationId] = useState<string>('');
    const [searchCity, setSearchCity] = useState<string>('');
    const [searchAddress, setSearchAddress] = useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('');
    const [searchMaxPower, setSearchMaxPower] = useState<string>('');
    const [searchPowerLevel, setSearchPowerLevel] = useState<string>('');

    return (
        <div className={styles.applicationsWrapper}>
            <div className={styles.applicationsTitle}>
                <h1 className={styles.applicationsTitleText}>Все заявки</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getAllApplications(pageNumber)} />
            </div>
            <div className={styles.selectPageWrapper}>
                <div className={styles.switchPageBlock}>
                    {pageNumber === 1
                    ? null
                    : <img src={stepArrow} alt="назад" className={styles.prevPageImg} onClick={() => getApplicationsFromPrevPage()}/>}
                    <p>Страница {pageNumber}</p>
                    {applications.length < 20
                    ? null
                    : <img src={stepArrow} alt="вперёд" className={styles.nextPageImg} onClick={() => getApplicationsFromNextPage()}/>}
                </div>
                <div className={styles.selectPageBlock}>
                    <p>Введите номер страницы</p>
                    <div className={styles.selectPage}>
                        <input className={styles.selectPageInput} type="number" value={customPageNumber} onChange={e => setCustomPageNumber(parseInt(e.target.value, 10))}/>
                        <button className={styles.selectPageBtn} onClick={() => getAllApplications(customPageNumber)}>Показать</button>
                    </div>
                </div>
            </div>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>
                            Дата подачи
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Номер заявки
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchApplicationId(e.target.value)} value={searchApplicationId}/>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Населённый пункт / район
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchCity(e.target.value)} value={searchCity}/>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Адрес
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchAddress(e.target.value)} value={searchAddress}/>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Заявитель
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchUser(e.target.value)} value={searchUser}/>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Максимальная мощность
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Уровень напряжения
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchPowerLevel(e.target.value)} value={searchPowerLevel}/>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                Статус заявки
                                <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchCity(e.target.value)} value={searchCity}/>
                            </div>
                        </th>
                    </tr>
                    {applications.map((application) => {
                        return (
                            <tr key={application.id} className={styles.applicationBlock}>
                                <td className={styles.tableFields}>{application.createdAt.toString().split('T')[0].replace(/-/g, ".")}</td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`} onClick={() => props.setActiveBlock(<AdminApplicationView application={application}/>)}>{application.id}</td>
                                <td className={styles.tableFields}>{application.city}</td>
                                <td className={styles.tableFields}>{application.address}</td>
                                <td className={styles.tableFields}>
                                    {application.userLastName}
                                    <br />
                                    {application.userFirstName}
                                    <br />
                                    {application.userSurname}
                                </td>
                                <td className={styles.tableFields}>{application.maxPower}</td>
                                <td className={styles.tableFields}>{application.powerLevel}</td>
                                <td className={styles.tableFields}>{application.status}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default AdminDasboard