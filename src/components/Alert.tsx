import React, { useEffect, ReactElement } from 'react'
import { useGlobalContext } from '../state/context';
import { TodoAppContext } from '../types/todos';

const Alert:React.FC = ():ReactElement => {
  const { alert, todos, showAlert} = useGlobalContext() as TodoAppContext

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert(false, '', '');
    }, 1100);
    return () => clearTimeout(timeout);
  }, [todos, showAlert]);
  
  return <div className={`alertDiv alert-${alert.type}`}>{alert.msg}</div>;
}

export default Alert
