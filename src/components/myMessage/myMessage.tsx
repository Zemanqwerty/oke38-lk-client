import React, { FC } from "react";
import styles from './myMessage.module.css';
import { API_URL } from "../../http";

interface MessageData {
    message: string | null;
    fileName: string | null;
    fileUrl: string | null;
}

const MyMessage: FC<MessageData> = (props: MessageData) => {
    props.fileUrl ? console.log(props.fileName) : console.log('dsd');
    return (
        <div className={styles.myMessageBlock}>
            <div className={styles.myMessage}>
                {/* {props.message ? props.message : props.fileName} */}
                {props.fileUrl ? <a target="_blank" href={`${API_URL}/${props.fileUrl}`}>{props.fileName}</a> : props.message}
            </div>
        </div>
    )
}

export default MyMessage;