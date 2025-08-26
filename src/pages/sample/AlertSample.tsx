import React, { FormEventHandler, useState } from "react";
import uploadFile from "../../utils/file_upload";
import { useAlert, useModal } from "../../hooks";
import { Button } from "../../components/ui";

const AlertSample: React.FC = () => {
  const { alertError, alertSuccess, alertWarn } = useAlert();

  return <button>
    
  </button>;
};

export default AlertSample;
