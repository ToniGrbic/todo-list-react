import React , {ReactElement}from 'react'
import  { ModalProps, TodoAppContext } from '../types/todos'
import { useGlobalContext } from '../state/context'

const Modal = ({ select, setShowModal}:ModalProps):ReactElement => {
  
  const { deleteTodos } = useGlobalContext() as TodoAppContext
  
  const handleConfirmClick = ()=>{
    setShowModal(false)
    deleteTodos()
  }
  return (
    <div className='modal'>
        <div className='modal-content'>
            <h3>Are you sure to delete {select}?</h3>
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