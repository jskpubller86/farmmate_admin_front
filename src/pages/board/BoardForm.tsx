import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { Button, Error, Input, TextArea } from "../../components/ui";
import { useAlert, useAPI } from '../../hooks';
import styles from './board.module.css';

interface BoardProps {
    id?: string;
    title: string;
    creId: string;
    conts: string;
    creDatetime?: string;
}

// 폼검증에 사용할 스키마
const schema = yup
    .object({
        title: yup.string().required("제목은 필수입니다."),
        contents: yup.string().required("내용은 필수입니다.")
    })
    .required();

const BoardForm: React.FC = () => {
    const api = useAPI();
    const {register, handleSubmit, watch, formState: {errors}} = useForm({resolver: yupResolver(schema)});
    const navigate = useNavigate();
    const {alertError, alertSuccess} = useAlert();

    /**
     * 서브밋 핸들러
     * @param data 
     */
    const submit = async (data: any) => {
        try {
            const res = await api.post('/board/add', data);
            
            if(res.data.code === '0000'){
                alertSuccess({message: res.data.message, onClose:()=> navigate('/board/boardList')});
            } else {
                alertError()
            }
        } catch (error) {
            alertError({error});
        }
    }

    return (
        <div className={styles.container}>
            <h2>공지사항 등록</h2>
            <form onSubmit={handleSubmit(submit)} className={styles.form_wrap}>
                <div className={styles.input_box}>
                    <div><label><b>제목</b></label></div>
                    <div><Input type="text" {...register('title')}/></div>
                    <Error isError={Boolean(errors.title)}>{errors.title && errors.title.message?.toString()}</Error>
                </div>

                <div className={styles.input_box}>
                    <div><label><b>내용</b></label></div>
                    <div><TextArea {...register('contents')}></TextArea></div>
                    <Error isError={Boolean(errors.contents)}>{errors.contents && errors.contents.message?.toString()}</Error>
                </div>

                <div>
                    <Button type="submit" className={styles.submitbutton}>등록하기</Button>
                    <Button type='button' onClick={()=>navigate('/board/boardList')} className={styles.submitbutton}>취소</Button>
                </div>
            </form>
        </div>
    )
}

export default BoardForm