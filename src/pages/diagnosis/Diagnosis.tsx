import React, { useState, useRef } from 'react';
import { Button } from '../../components/ui';
import styles from './diagnosis.module.css';

interface DiagnosisResult {
    disease: string;
    confidence: number;
    description: string;
    recommendations: string[];
}

const DiagnosisPage: React.FC = () => {
    const [userImage, setUserImage] = useState<string | null>(null);
    const [similarImage, setSimilarImage] = useState<string | null>(null);
    const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);

    // 파일 업로드 처리
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 카메라 촬영 처리
    const handleCameraCapture = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    if (cameraRef.current) {
                        cameraRef.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.error('카메라 접근 오류:', err);
                    alert('카메라에 접근할 수 없습니다.');
                });
        }
    };

    // 사진 촬영
    const capturePhoto = () => {
        if (cameraRef.current) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                canvas.width = cameraRef.current.videoWidth;
                canvas.height = cameraRef.current.videoHeight;
                context.drawImage(cameraRef.current, 0, 0);
                const photoDataUrl = canvas.toDataURL('image/jpeg');
                setUserImage(photoDataUrl);
                
                // 스트림 정지
                const stream = cameraRef.current.srcObject as MediaStream;
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            }
        }
    };

    // 진단 분석 시작
    const startDiagnosis = async () => {
        if (!userImage) {
            alert('먼저 농작물 사진을 업로드하거나 촬영해주세요.');
            return;
        }

        setIsAnalyzing(true);
        
        // 실제 AI 분석 API 호출을 시뮬레이션
        setTimeout(() => {
            const mockResult: DiagnosisResult = {
                disease: '토마토 잎마름병',
                confidence: 85,
                description: '토마토 잎마름병은 세균에 의해 발생하는 질병으로, 잎에 갈색 반점이 생기고 점차 확대되어 잎이 마르는 증상을 보입니다.',
                recommendations: [
                    '감염된 식물은 즉시 제거하고 소각 처리',
                    '통풍이 잘 되도록 식물 간격 확보',
                    '물을 뿌릴 때 잎에 직접 닿지 않도록 주의',
                    '구리계 살균제 사용 (7-10일 간격)',
                    '다음 재배 시에는 저항성 품종 선택'
                ]
            };
            
            setDiagnosisResult(mockResult);
            setSimilarImage('/images/disease_example.jpg'); // 예시 이미지
            setIsAnalyzing(false);
        }, 3000);
    };

    return (
        <div className={styles.container}>
            {/* 상단 섹션: 사용자 사진과 유사한 진단 이미지 */}
            <div className={styles.image_section}>
                <div className={styles.user_image_box}>
                    <h3>사진촬영하기</h3>
                    {userImage ? (
                        <img src={userImage} alt="사용자 농작물 사진" className={styles.uploaded_image} />
                    ) : (
                        <div className={styles.upload_area}>
                            <p>사진을 업로드하거나 촬영해주세요</p>
                            <div className={styles.upload_buttons}>
                                <Button 
                                    size="lg" 
                                    color="point" 
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    갤러리에서 선택
                                </Button>
                                <Button 
                                    size="lg" 
                                    color="point2" 
                                    onClick={handleCameraCapture}
                                >
                                    카메라로 촬영
                                </Button>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </div>
                    )}
                </div>
                
                <div className={styles.similar_image_box}>
                    <h3>병충해 진단 결과</h3>
                    {similarImage ? (
                        <img src={similarImage} alt="유사한 병충해 사례" className={styles.similar_image} />
                    ) : (
                        <div className={styles.placeholder}>
                            <p>진단 후 유사한 사례가 표시됩니다</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 중간 섹션: 진단 결과 */}
            <div className={styles.diagnosis_section}>
                <h3>농작물 진단 결과</h3>
                {isAnalyzing ? (
                    <div className={styles.analyzing}>
                        <div className={styles.spinner}></div>
                        <p>농작물을 분석하고 있습니다...</p>
                    </div>
                ) : diagnosisResult ? (
                    <div className={styles.result_content}>
                        <div className={styles.disease_info}>
                            <h4>{diagnosisResult.disease}</h4>
                            <p className={styles.confidence}>정확도: {diagnosisResult.confidence}%</p>
                            <p className={styles.description}>{diagnosisResult.description}</p>
                        </div>
                    </div>
                ) : (
                    <div className={styles.no_result}>
                        <p>사진을 업로드하고 진단을 시작해주세요</p>
                        <Button 
                            size="lg" 
                            color="point" 
                            onClick={startDiagnosis}
                            disabled={!userImage}
                        >
                            진단 시작
                        </Button>
                    </div>
                )}
            </div>

            {/* 하단 섹션: 추천 조치 */}
            <div className={styles.recommendations_section}>
                <h3>추천하는 조치들</h3>
                {diagnosisResult ? (
                    <div className={styles.recommendations_list}>
                        {diagnosisResult.recommendations.map((recommendation, index) => (
                            <div key={index} className={styles.recommendation_item}>
                                <span className={styles.recommendation_number}>{index + 1}</span>
                                <p>{recommendation}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.no_recommendations}>
                        <p>진단 결과가 나오면 추천 조치가 표시됩니다</p>
                    </div>
                )}
            </div>

            {/* 카메라 모달 */}
            {cameraRef.current?.srcObject && (
                <div className={styles.camera_modal}>
                    <div className={styles.camera_container}>
                        <video
                            ref={cameraRef}
                            autoPlay
                            playsInline
                            className={styles.camera_video}
                        />
                        <div className={styles.camera_controls}>
                            <Button 
                                size="lg" 
                                color="point" 
                                onClick={capturePhoto}
                            >
                                촬영
                            </Button>
                            <Button 
                                size="lg" 
                                color="secondary" 
                                onClick={() => {
                                    const stream = cameraRef.current?.srcObject as MediaStream;
                                    if (stream) {
                                        stream.getTracks().forEach(track => track.stop());
                                    }
                                }}
                            >
                                취소
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiagnosisPage;
