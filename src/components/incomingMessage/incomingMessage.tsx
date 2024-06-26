import React, { FC } from "react";
import styles from './incomingMessage.module.css';
import { API_URL } from "../../http";

interface MessageData {
    message: string | null;
    fileName: string | null;
    fileUrl: string | null;
}

const IncomingMessage: FC<MessageData> = (props: MessageData) => {
    return (
        <div className={styles.InMessageBlock}>
            <div className={styles.InMessage}>
                {/* {props.message ? props.message : <a href={props.fileUrl}>{props.fileName}</a>} */}
                {props.fileUrl ? <a target="_blank" href={`${API_URL}/${props.fileUrl}`}>{props.fileName}</a> : props.message}
            </div>
        </div>
    )
}

export default IncomingMessage;