import React from 'react'

const Modal = ({description, setShowModal, clearTodos}) => {

  const handleConfirmClick = ()=>{
    setShowModal(false)
    clearTodos()
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