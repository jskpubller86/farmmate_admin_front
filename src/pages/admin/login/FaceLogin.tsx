//numpy/FaceCompareSendService.tsx.tsx
//PS D:\ICTPassword02\5_spring\springboot\reactws\myreact0501> yarn add react-webcam   
import React, { useRef, useState, useCallback } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import { appConsole } from '../../../utils';
import { Button } from '../../../components/ui';
import { useAlert, useAPI, useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
/*
{
    "success": true,
    "similarity": 0.6572,
    "result": "같은 사람",
    "bbox": [
        120,
        97,
        346,
        411
    ]
} 보고 인터페이스를 정의  -> bbox는 POST맨에서 응답받은  ROI 
*/

interface FaceCompareResult {
  success: boolean;
  similarity: number;
  result: string;
  bbox: number[];
  authToken: string;
}

const FaceLogin: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [captured, setCaptured] = useState<boolean>(false);
    const [result, setResult] = useState<FaceCompareResult | null>(null);
    const {api, aiApi} = useAPI();
    const { alertSuccess, alertError } = useAlert();
    const navigate = useNavigate();
    const { login } = useAuth();

    // 카운트다운 시작
    const startCountdown = () => {
      if (countdown !== null) return; 

      let counter = 5;
      setCountdown(counter);
      
      //settimeout을 재귀함수처럼 사용해도 됨
      const interval = setInterval(() => {
        counter -= 1;
        setCountdown(counter);
        if (counter === 0) {
          clearInterval(interval); // 인터벌을 종료
          capture();
          setCountdown(null);
        }
      }, 1000);
    };

    // 웹캠을 사용해서 
    const capture = useCallback(() => {
      if (!webcamRef.current) return;
      //스크린 샷을 찍은 값
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        //Django서버로 전송함.
        sendToServer(imageSrc);
      }
    }, []);

    // Django POST 방식으로 스클셧으로 찍은 사진을 비동기식으로 보내는..
    const sendToServer = async (imageSrc: string) => {
      try {
        const res = await fetch(imageSrc);
        const blob = await res.blob();
        const formData = new FormData();
        //파라미터가 image 아까 postman에서 실습한 것 
        formData.append('image', blob, 'capture.jpg');

        console.log("인증 요청");
        const response = await aiApi.postWithMultiPart<FaceCompareResult>("/faceunlock/compare_face", formData);
        console.log("인증 요청 완료");

        // 인증 성공이면 백엔드로 로그인 시도
        if(response.data.success && response.data.similarity > 0.6) {
            handleLogin()
        }
        setResult(response.data);
        setCaptured(true);
      } catch (error) {
        console.error("Error sending to server:", error);
      }
    };

    /**
     * 토큰을 가지고 로그인 요청
     */
    const handleLogin = async () => {
      try {
          const resp = await api.get(`/auth/face?face_auth_token=${result?.authToken}`);
          
          // 오류 처리
          if (resp.data.code !== "0000") {
              alertError({
                    message: resp.data.mssg,
              });
              return;
          }

          // 성공 처리
          alertSuccess({
              message: "로그인 성공했습니다.",
              onClose: () => {
                  login(resp.data.data);
                  navigate("/");
              },
          });
      } catch (error) {
            alertError({
                error,
            });
            return;
      }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Face Compare</h1>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                height={360}
                style={{ borderRadius: '8px' }}
              />
              {/* ROI */}
              <div style={{
                position: 'absolute',
                top: '90px', left: '140px',
                width: '200px', height: '180px',
                border: '2px solid red'
              }}></div>
              
              {/* 카운트다운 UI*/}
              {countdown !== null && (
                <div style={{
                  position: 'absolute',
                  top: '10px', left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '48px', color: 'yellow'
                }}>
                  {countdown}
                </div>
              )}
            </div>

            {/*  스크린샷을 찍는 버튼이 되겠다. */}
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => startCountdown()}
                disabled={countdown !== null}
                style={{ padding: '10px 20px', fontSize: '18px' }}
              >
                얼굴 비교 시작
              </button>
            </div>

            {result && (
              <div style={{ marginTop: '20px' }}>
                <h2>결과: {result.result}</h2>
                <p>Similarity: {result.similarity}</p>
                <p>BBox: [{result.bbox.join(', ')}]</p>
              </div> 
            )}
        </div>
    );
};

export default FaceLogin;