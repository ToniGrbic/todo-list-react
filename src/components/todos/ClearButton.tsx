import React from 'react'
import { ClearBtnProps } from '../../types/todos';
const ClearButton = ({setShowModal, select}:ClearBtnProps) => {
  return (
    <button 
        className="clearBtn" 
        onClick={() => setShowModal(true)}>
      Delete {select}
    </button>
  );
}

export default ClearButton