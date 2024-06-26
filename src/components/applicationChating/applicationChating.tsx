import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from './applicationChating.module.css';
import { io, Socket } from "socket.io-client";
// import $api, { API_URL } from "../../http";
import { API_URL } from "../../httpLocalNetwork";
import { Context } from "../..";
import MyMessage from "../myMessage";
import IncomingMessage from "../incomingMessage";
import MessagesService from "../../services/MessagesService";
import { Message } from "../../models/response/MessageResponse";
import addFile from '../../resources/images/add_file.png'

interface ApplicationId {
    id: number;
}

const ApplicationChating: FC<ApplicationId> = (props: ApplicationId) => {
    const {store} = useContext(Context);

    const [messages, setMessages] = useState<Message[]>([]);

    const [message, setMessage] = useState<string>('');
    
    const [applicationCopy, setApplicationCopy] = useState<File[]>([]);
    const applicationCopyInputRef = useRef<HTMLInputElement>(null);

    const [socket, setSocket] = useState<Socket | null>(null);

    const getAllMessages = (chatId: string) => {
        const messages = MessagesService.getAllInChat(chatId).then((response) => {
            console.log(response.data);
            setMessages(response.data);
        })
    }

    useEffect(() => {
        const newSocket = io(API_URL, {
            query: {
              roomId: props.id.toString(),
            },
          });
        setSocket(newSocket);
    
        newSocket.on('connect', () => {
            console.log('Connected');
            newSocket.emit('joinRoom', props.id.toString());
        });
    
        newSocket.on('disconnect', () => {
          console.log('Disconnected');
        });
    
        newSocket.on('message', (message) => {
            console.log(message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        getAllMessages(props.id.toString());
    
        return () => {
          newSocket.off('connect');
          newSocket.off('disconnect');
          newSocket.off('message');
        };
      }, []); // Добавьте props.id в зависимости useEffect

      // const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, message: string, files: File[]) => {
      //   event.preventDefault();
      //   if (socket) {
      //     setMessage('');
      //     if (files) {
      //       // Здесь вы можете отправить файл на сервер
      //       // После этого вы можете отправить этот путь к файлу вместе с сообщением
      //       try {
      //         socket.emit('message', { user: store.email, message: message, userRole: store.role, room: props.id.toString(), files: files[0] });
      //       } catch (e) {
      //         console.log(e);
      //       }
      //     } else {
      //       socket.emit('message', { user: store.email, message: message, userRole: store.role, room: props.id.toString() });
      //     }
      //   }
      // }

      const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, message: string, files: File[]) => {
        event.preventDefault();
        if (socket) {
          setMessage('');
          if (files) {
            MessagesService.sendFiles(props.id.toString(), store.email, store.role, files)
            setApplicationCopy([])
          }
          if (message !== '') {
            socket.emit('message', { user: store.email, message: message, userRole: store.role, room: props.id.toString() });
          }
        }
      }

      const handleFilesListChange = (filesList: File[], setFile: React.Dispatch<React.SetStateAction<File[]>>, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files).concat(filesList));
        }
    };
    
    const handleAddFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, fileInputRef: any) => {
      e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    
    return (
        <div className={styles.applicationChatingWrapper}>
            <div className={styles.chatField}>
                {messages.map((message) => (
                    message.userRole === store.role ? (
                        <MyMessage message={message.message} fileName={message.fileName} fileUrl={message.fileUrl}/>
                    ) : (
                        <IncomingMessage message={message.message} fileName={message.fileName} fileUrl={message.fileUrl}/>
                    )
                ))}
            </div>
            <form className={styles.chatSendBlock}>
                {store.role === 'admin'
                ? <textarea
                  className={styles.chatingTextareaInput}
                  placeholder="Введите текст сообщения..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}>
              </textarea>
              : null}
                
                <input
                        type="file"
                        ref={applicationCopyInputRef}
                        style={{ display: 'none' }}
                        onChange={(event) => handleFilesListChange(applicationCopy, setApplicationCopy, event)}
                        multiple
                    />
                    <button className={styles.addFilesBtn} onClick={(e) => handleAddFile(e, applicationCopyInputRef)}>
                        <img className={styles.addFileImg} src={addFile} alt="Выбор файла" />
                        Выберите файл
                    </button>
                    <div className="">
                        {applicationCopy.map((file) => {
                            return (
                                <div className={styles.fileDataWrapper}>
                                    <div className={styles.fileElementDot}></div>
                                    {file.name}
                                </div>
                            )
                        })}
                    </div>

                <button className={styles.sendMessageBtn} onClick={(e) => handleSendMessage(e, message, applicationCopy)}>Отправить</button>
            </form>
        </div>
    )
}

export default ApplicationChating;