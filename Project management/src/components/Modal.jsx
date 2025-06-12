import { forwardRef, useImperativeHandle, useRef } from 'react'
import {createPortal} from 'react-dom'
import React from 'react'

const Modal = forwardRef (function Modal({children, buttonCaption}, ref) {
    const dialog = useRef()
    
    useImperativeHandle(ref,
        () => {
            return{
                open(){
                    dialog.current.showModal()
                }
            }
        }
    );

  return createPortal (
    <dialog ref={dialog} className="modal">
        <div className="modal-content">
            {children}
            <form method='dialog' className="modal-form">
                <button className="modal-button">{buttonCaption}</button>
            </form>
        </div>
    </dialog>
  , document.getElementById('modal-root'))
})

export default Modal;