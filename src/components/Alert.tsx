import React, { useEffect, ReactElement } from "react";
import { useGlobalContext } from "../state/context";
import { TodoAppContext } from "../types/todos";

const Alert = (): ReactElement => {
  const { alert, showAlert } =
    useGlobalContext() as TodoAppContext;

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert(false, "", "");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [alert.show]);

  return (
    <div style={{ height: "3.5rem" }}>
      {alert.show && (
        <div className={`alertDiv alert-${alert.type}`}>{alert.msg}</div>
      )}
    </div>
  );
};
export default Alert;
