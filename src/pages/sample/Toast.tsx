import React, { FormEventHandler, useState } from 'react'
import uploadFile from '../../utils/file_upload';
import { toast } from 'react-toastify';

const Toast: React.FC = () => {

    return (
        <button type='button' onClick={()=>toast.error("Wow so easy!")} style={{width: '200px', height: '200px', backgroundColor: 'yellow'}}>토스트</button>
    )
}

export default Toast