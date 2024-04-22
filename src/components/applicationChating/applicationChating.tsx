import React, { FC, useState } from "react";
import styles from './applicationChating.module.css';

const ApplicationChating: FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, message: string) => {
        event.preventDefault();
        setMessages([...messages, message]);
        setMessage('');
    }
    
    return (
        <div className={styles.applicationChatingWrapper}>
            <div className={styles.chatField}>
                {messages.map((message) => {
                    return (
                        <div className={styles.messageBlock}>
                            {message}
                        </div>
                    )
                })}
            </div>
            <form className={styles.chatSendBlock}>
                <textarea
                    className={styles.chatingTextareaInput}
                    placeholder="Введите текст сообщения..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}>
                </textarea>
                <button className={styles.sendMessageBtn} onClick={(e) => handleSendMessage(e, message)}>Отправить</button>
            </form>
        </div>
    )
}

export default ApplicationChating;