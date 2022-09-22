import React from 'react'
import  { ModalProps } from '../types/todos'

const Modal:React.FC<ModalProps> = ({description, setShowModal, deleteTodos}:ModalProps) => {

  const handleConfirmClick = ()=>{
    setShowModal(false)
    deleteTodos()
  }
  return (
    <div className='modal'>
        <div className='modal-content'>
            <h3>{description}</h3>
            <button className="modalBtn confirmBtn"
                    onClick={()=>handleConfirmClick()}>
                    Confirm
            </button>
            <button className="modalBtn cancelBtn"
                    onClick={()=>setShowModal(false)}>
                    Cancel
            </button>
        </div>
    </div>
  )
}

export default Modal