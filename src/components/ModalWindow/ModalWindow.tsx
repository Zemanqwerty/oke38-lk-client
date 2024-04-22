import React, { memo, ReactNode, useContext } from "react";
import styles from './ModalWindow.module.css';
// import { RiCloseLine } from "react-icons/ri";
import closeModal from '../../resources/images/cross.png';
import { observer } from "mobx-react-lite";
import { Context } from "../..";


interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}


const ModalWindow = (props: ModalType) => {

  const {store} = useContext(Context);

    return (
        <>
          {props.isOpen && (
            <div className={styles.modalOverlay} onClick={props.toggle}>
              <div  className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                <div className={styles.closeBlock}>
                  <img src={closeModal} alt="close" onClick={props.toggle} />
                </div>
                {props.children}
              </div>
            </div>
          )}
        </>
      );
}

export default observer(ModalWindow);