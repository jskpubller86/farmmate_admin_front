import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import { Button, Input } from "../../components/ui";
import { useAlert, useAPI } from '../../hooks';
import styles from './board.module.css';
import { useForm } from 'react-hook-form';
import { appConsole } from '../../utils';

interface BoardVO {
    id: string;
    title?: string;
    creId?: string;
    conts: string;
}

const schema = yup
            .object({
                id: yup.string().required(),
                title: yup.string().required("제목은 필수입니다."),
                contents: yup.string().required("내용은 필수입니다.")
            })
            .required();

const BoardDetail: React.FC = () => {
    const [detail, setDetail] = useState<BoardVO | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const api = useAPI();
    const {alertError, alertSuccess} = useAlert();
    const {register, handleSubmit, watch, formState: {errors}} = useForm({resolver: yupResolver(schema)});
    const [mod, setMod] = useState<'D' |'U'>('D');
    
    useEffect(() => {
        const detailServer = async () => {
            try {
                const resp = await api.get(`board/detail/${id}`);
                const {code, data} = resp.data;
                
                if(code === '0000'){
                    setDetail(data);
                } else {
                    alertError();
                }
            } catch (error) {
                alertError({error});
            }
        };

        detailServer();
    }, []);

    const handleDeleteClick = async () => {      
        try {
            await api.get(`/board/delete/${id}`);
            alert("삭제되었습니다")
            navigate('/');
        } catch (error) {
            alertError({error});
        }
    };

    const submit = async (data:any)=>{
        try{
            const resp = await api.put(`/board/update`, data);
            alertSuccess({message: resp.data.message, onClose:()=>{navigate('/board/boardList')}});
        } catch(error){
            alertError({error});
        }
    }

    return (
        <div className={styles.container}>
            <h2>공지</h2>

            <form onSubmit={handleSubmit(submit)}  className={styles.form_wrap}>
                <Input type="hidden" {...register('id', {value: id})} />
                
                <div className={styles.input_box}>
                    <div><label><b>제목</b></label></div>
                    <div>{mod==='U' ? <Input {...register('title', {value: detail?.title})} /> : detail?.title}</div>
                </div>

                <div className={styles.input_box}>
                    <div><label><b>내용</b></label></div>
                    <div>{mod==='U' ? <Input {...register('contents', {value: detail?.title})} /> : detail?.conts}</div>
                </div>

                <div className={styles.button_group}>
                    <Button type="button" onClick={handleDeleteClick}>삭제</Button>
                    {appConsole(mod)}
                    {mod === 'U' ? <Button type="submit">수정</Button> :  <Button type="button" onClick={(e:MouseEvent)=>{e.stopPropagation();e.preventDefault(); setMod('U')}}>수정</Button>}
                    {mod === 'U' && <Button type="button" onClick={()=>navigate(`/board/detail/${id}`)}>취소</Button>}
                    <Button type="button" onClick={()=> navigate(`/board/boardList`)}>목록으로</Button>
                </div>
            </form>           
        </div>
    )
}

export default BoardDetail