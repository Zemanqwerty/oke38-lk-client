import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { ApplicationsResponse } from "../../models/response/ApplicationsResponse";
import ApplicationsService from "../../services/ApplicationsService";
import styles from './AdminDashboard.module.css'
import Application from "../../components/application";
import reloadImg from '../../resources/images/reload.png'
import AdminApplicationView from "../../components/adminApplicationView";
import stepArrow from '../../resources/images/stepArrow.png';
import { useNavigate } from "react-router-dom";
import { StreamState } from "http2";
import AdminUsers from "../AdminUsers";
import AdminDogovorenergo from "../../components/adminDogovorenergo";
import AdminDogovoeEnergoEdit from "../../components/adminDogovorEnergoEdit";
import { FilialsResponse } from "../../models/response/FilialsResponse";
import { VidRassrochki } from "../../models/response/VidRassrochkiResponse";
import { UsersRelationsResponse } from "../../models/response/UsersRelationsResponse";
import { stat } from "fs";
import AdminMessages from "../AdminMessages";
import onecicon from '../../resources/images/1c.png';
import webIcon from '../../resources/images/web.png';
import { ContractStatusResponse } from "../../models/response/ContractStatusResponse";

interface ApplicationsProps {
    setActiveBlock: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    type: string;
}

const AdminDasboard: FC<ApplicationsProps> = (props: ApplicationsProps) => {

    const navigate = useNavigate();

    const {store} = useContext(Context)

    const [applications, setApplications] = useState<ApplicationsResponse[]>([]);
    const [applicationsCount, setApplicationsCount] = useState<number>();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [customPageNumber, setCustomPageNumber] = useState<number>(1);
    const [filials, setFilials] = useState<FilialsResponse[]>();
    const [vidrassrochki, setVidrassrochki] = useState<UsersRelationsResponse[]>();
    const [statusOplaty, setStatusOplaty] = useState<UsersRelationsResponse[]>();
    const [applicationStatus, setApplicationStatus] = useState<UsersRelationsResponse[]>();
    const [contractStatus, setContractStatus] = useState<ContractStatusResponse[]>();

    const [searchAddress, setSearchAddress] = useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('');
    const [searchFilial, setSearchFilial] = useState<string>('');
    const [searchNumber, setSearchNumber] = useState<string>('');
    const [searchVidRassrochki, setSearchVidRassrochki] = useState<number>();
    const [searchStatusOplaty, setSearchStatusOplaty] = useState<number>();
    const [searchApplicationStatus, setSearchApplicationStatus] = useState<number>();
    const [searchContractStatus, setSearchContractStatus] = useState<number>();
    const [searchPageNumber, setSearchPagenumber] = useState<number>(1);

    const getAllApplications = async (pageNumber: number, filters?: any) => {
        ApplicationsService.getAll(pageNumber, filters).then((response) => {
            if (response.status === 200) {
                setApplications(response.data);
            } else {
                console.log('get apply error');
            }
        });
    };

    const getAllStatusOplaty = async () => {
        await ApplicationsService.getAllStatusOplaty().then((response) => {
            if (response?.status === 200) {
                return setStatusOplaty(response?.data);
            }
        })
    }

    const getAllContractStatus = async () => {
        await ApplicationsService.getAllContractStatuses().then((response) => {
            if (response?.status === 200) {
                return setContractStatus(response?.data);
            }
        })
    }

    const getFilials = async () => {
        await ApplicationsService.getFilialsForApplication().then((response) => {
            if (response?.status === 200) {
                return setFilials(response?.data)
            }
        })
    }

    const getApplicationsCount = async () => {
        await ApplicationsService.getApplicationsCount().then((response) => {
            if (response?.status === 200) {
                return setApplicationsCount(response?.data);
            }
        })
    }

    const getVidRassrochki = async () => {
        await ApplicationsService.getAllVidRassrochki().then((response) => {
            if (response?.status === 200) {
                return setVidrassrochki(response?.data);
            }
        })
    }

    const getAllApplicationStatus = async () => {
        await ApplicationsService.getAllApplicationStatus().then((response) => {
            if (response?.status === 200) {
                return setApplicationStatus(response?.data);
            }
        })
    }

    useEffect(() => {
        getFilials();
        getVidRassrochki();
        getAllStatusOplaty();
        getAllContractStatus();
        getApplicationsCount();
        getAllApplicationStatus();
    }, [])

    useEffect(() => {
        if (props.type == 'application') {
            return props.setActiveBlock(<AdminApplicationView />)
        } else if (props.type == 'users') {
            return props.setActiveBlock(<AdminUsers />)
        } else if (props.type == 'dogovorenergo') {
            return props.setActiveBlock(<AdminDogovorenergo />)
        } else if (props.type == 'dogovorenergoEdit') {
            return props.setActiveBlock(<AdminDogovoeEnergoEdit />)
        } else if (props.type == 'messages') {
            return props.setActiveBlock(<AdminMessages />)
        }
        const filters = {
            address: searchAddress,
            user: searchUser,
            filial: searchFilial,
            number: searchNumber,
            vidrassrochki: searchVidRassrochki,
            statusoplaty: searchStatusOplaty,
            applicationstatus: searchApplicationStatus,
            contractstatus: searchContractStatus
        };
        getAllApplications(searchPageNumber, filters);
    }, [searchPageNumber, searchAddress, searchUser, searchFilial, searchNumber, searchVidRassrochki, searchStatusOplaty, searchApplicationStatus, searchContractStatus])

    const getApplicationsFromNextPage = () => {
        // getAllApplications(pageNumber + 1)
        // setPageNumber(pageNumber + 1)
        handleChangePagenumber(searchPageNumber + 1)
    }

    const getApplicationsFromPrevPage = () => {
        // getAllApplications(pageNumber - 1)
        // setPageNumber(pageNumber - 1)
        handleChangePagenumber(searchPageNumber - 1)
    }

    const handleApplicationClick = (applicationId: string) => {
        navigate(`/application/${applicationId}`);
    };

    const handleSearchFilialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilial(event.target.value);
    };

    const handleSearchStatusOplatyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchStatusOplaty(event.target.value ? parseInt(event.target.value) : undefined);
    };

    const handleSearchVidRassrochkiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchVidRassrochki(event.target.value ? parseInt(event.target.value) : undefined);
    };

    const handleSearchApplicationStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchApplicationStatus(event.target.value ? parseInt(event.target.value) : undefined);
    };

    const handleSearchContractStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSearchContractStatus(event.target.value ? parseInt(event.target.value) : undefined);
    };

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
                <h1 className={styles.applicationsTitleText}>Все заявки</h1>
                <img className={styles.applicationsReloadImg} src={reloadImg} alt="Обновить список" onClick={() => getAllApplications(pageNumber)} />
            </div>
            <div className={styles.selectPageWrapper}>
                <div className={styles.switchPageBlock}>
                    {pageNumber === 1
                    ? null
                    : <img src={stepArrow} alt="назад" className={styles.prevPageImg} onClick={() => getApplicationsFromPrevPage()}/>}
                    <p>Страница {pageNumber} {applicationsCount ? <>... {Math.round(applicationsCount / 20)}</> : null}</p>
                    {applications.length < 20
                    ? null
                    : <img src={stepArrow} alt="вперёд" className={styles.nextPageImg} onClick={() => getApplicationsFromNextPage()}/>}
                </div>
                <div className={styles.selectPageBlock}>
                    <p>Введите номер страницы</p>
                    <div className={styles.selectPage}>
                        <input className={styles.selectPageInput} type="number" value={customPageNumber} onChange={e => handleChangePagenumber(parseInt(e.target.value, 10))}/>
                        {/* <button className={styles.selectPageBtn} onClick={() => getAllApplications(customPageNumber)}>Показать</button> */}
                    </div>
                </div>
            </div>
            <div className={styles.applicationsBlockWrapper}>
                <table className={styles.applicationsTable}>
                    <tr>
                        <th className={styles.tableTitles}>
                            <div className={styles.tableTitleBlock}>
                                Дата подачи
                            </div>
                            <hr className={styles.tableTitleHr} />
                            <div className={styles.tableTitleBlock}>

                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.tableTitleBlock}>
                                Откуда
                            </div>
                            <hr className={styles.tableTitleHr} />
                            <div className={styles.tableTitleBlock}>

                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Вид заявки
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>

                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchApplicationId(e.target.value)} value={searchApplicationId}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Заявитель
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
                                    Филиал
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchFilial} onChange={handleSearchFilialChange} className={styles.tableSearchInput}>
                                        {
                                            filials?.length ?
                                            filials.map((filial) => {
                                                return (
                                                    <option value={filial.caption_filial}>{filial.caption_filial_short}</option>
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
                                    Номер заявки
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <input type="text" className={styles.tableSearchInput} placeholder="Поиск..." onChange={e => setSearchNumber(e.target.value)} value={searchNumber}/>
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Дата присвоения заявки
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>

                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="" onChange={e => setSearchNumber(e.target.value)} value={searchNumber}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Адрес ЭПУ
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <input type="text" className={styles.tableSearchInput} placeholder="Поиск..." onChange={e => setSearchAddress(e.target.value)} value={searchAddress}/>
                                </div>
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Статус оплаты
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchStatusOplaty} onChange={handleSearchStatusOplatyChange} className={styles.tableSearchInput}>
                                        <option value={undefined}></option>
                                        {
                                            statusOplaty?.length ?
                                            statusOplaty.map((status) => {
                                                return (
                                                    <option value={status.idClient}>{status.caption}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchUser(e.target.value)} value={searchUser}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                Вариант оплаты
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchVidRassrochki} onChange={handleSearchVidRassrochkiChange} className={styles.tableSearchInput}>
                                        <option value={undefined}></option>
                                        {
                                            vidrassrochki?.length ?
                                            vidrassrochki.map((object) => {
                                                return (
                                                    <option value={object.idClient}>{object.caption}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchUser(e.target.value)} value={searchUser}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Pmax
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>

                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchMaxPower(e.target.value)} value={searchMaxPower}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    U
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>

                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchPowerLevel(e.target.value)} value={searchPowerLevel}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Статус договора
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchContractStatus} onChange={handleSearchContractStatusChange} className={styles.tableSearchInput}>
                                        <option value={undefined}></option>
                                        {
                                            contractStatus?.length ?
                                            contractStatus.map((object) => {
                                                return (
                                                    <option value={object.clientId}>{object.caption}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchPowerLevel(e.target.value)} value={searchPowerLevel}/> */}
                            </div>
                        </th>
                        <th className={styles.tableTitles}>
                            <div className={styles.th_wrapper_block}>
                                <div className={styles.tableTitleBlock}>
                                    Статус заявки
                                </div>
                                <hr className={styles.tableTitleHr} />
                                <div className={styles.tableTitleBlock}>
                                    <select value={searchApplicationStatus} onChange={handleSearchApplicationStatusChange} className={styles.tableSearchInput}>
                                        <option value={undefined}></option>
                                        {
                                            applicationStatus?.length ?
                                            applicationStatus.map((object) => {
                                                return (
                                                    <option value={object.idClient}>{object.caption}</option>
                                                )
                                            }) : null
                                        }
                                    </select>
                                </div>
                                {/* <input type="text" className={styles.tableSearchInput} placeholder="Поиск по полю..." onChange={e => setSearchCity(e.target.value)} value={searchCity}/> */}
                            </div>
                        </th>
                    </tr>
                    {applications[0] ? applications.map((application) => {
                        return (
                            
                            <tr key={application.uuid} className={`${styles.applicationBlock} ${application.isViewed ? null : styles.notViewed}`}>
                                <td className={`${styles.tableFields} ${styles.smallTableField}`}>{application.createdAt.toString().split('T')[0].replace(/-/g, ".")}</td>
                                <td className={`${styles.tableFields} ${styles.smallTableField} ${styles.centerField}`}>
                                    {
                                        application.isFrom1c ?
                                        <img src={onecicon} className={styles.whereFromImg} alt="1c" /> :
                                        <img src={webIcon} className={styles.whereFromImg} alt="web" />
                                    }
                                </td>
                                <td className={`${styles.tableFields} ${styles.smallTableField}`}>{application.vidzayavki}</td>
                                <td className={`${styles.tableFields} ${styles.applicationId}`} onClick={() => handleApplicationClick(application.uuid)}>
                                    {
                                        application.userFirstName ?
                                        `${application.userLastName} ${application.userFirstName} ${application.userSurname}` :
                                        `${application.yl_fullname ? application.yl_fullname : '---------'}`
                                    }
                                    {/* {application.userLastName !== null ?
                                    application.userLastName : application.yl_fullname}
                                    <br />
                                    {application.userFirstName}
                                    <br />
                                    {application.userSurname} */}
                                </td>
                                <td className={styles.tableFields}>{application.filial}</td>
                                <td className={`${styles.tableFields} ${styles.smallTableField}`}>{application.applicationNumber}</td>
                                <td className={styles.tableFields}>{application.applicationDate ? application.applicationDate.toString().split('T')[0].replace(/-/g, ".") : null}</td>
                                <td className={styles.tableFields}>{application.address}</td>
                                <td className={styles.tableFields}>{application.ststusoplaty}</td>
                                <td className={styles.tableFields}>{application.paymentOption === 'Оплата 100 %' ? '100%' : '10% / 90%'}</td>
                                <td className={styles.tableFields}>{application.maxPower}</td>
                                <td className={styles.tableFields}>{application.powerLevel}</td>
                                <td className={`${styles.tableFields} ${styles.smallTableField}`}>{application.statusDogovora}</td>
                                <td className={`${styles.tableFields} ${styles.smallTableField}`}>{application.status}</td>
                            </tr>
                        )
                    }) : null}
                </table>
            </div>
        </div>
    )
}

export default AdminDasboard