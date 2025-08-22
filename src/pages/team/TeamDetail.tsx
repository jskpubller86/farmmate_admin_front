import React, { useState, useEffect, useRef } from 'react';
import styles from './team.module.css'
import { Avatar, Button, File } from '../../components/ui';
import { useNavigate, useParams } from 'react-router-dom';
import {appConsole } from '../../utils';
import { useAuth, useAlert, useModal, useAPI } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Chat from '../../madals/chat/Chat';
import SelectMemberOpts from '../../madals/member_reco/SelectMemberOpts';

interface TeamDetailProps {
    id:string;
    teamName:string;
    conts:string;
    addr:string;
    detailAddr?:string;
    categoryCd:string;
    leader:TeamMemberProps;
    startDatetime:string;
    endDatetime:string;
    isLiked:boolean;
    isLeader:boolean;
    isMember:boolean;
    isApplied:boolean;
    isUser:boolean;
    files?:ImgProps[];
    members:TeamMemberProps[];
}

interface TeamMemberProps {
    userId:string;
    userAccount:string;
    userName:string;
    addr:string;
    age:number;
    imgUrls?:ImgProps[];
}

interface ImgProps {
  url:string;
  fileName:string;
}

interface TeamReviewDTO {
	teamId:string;
	conts:string;
	creId:string;
  images:File[];
}

interface TeamReviewVO {
  id:string;
	teamId:string;
	parentId:string;
	conts:string;
	goodCnt:number;
  userName:string;
	creId:string;
  creDatetime:string;
  reviewImages?:ImgProps[];
  userImages?:ImgProps[];
}

interface ReviewGoodProps {
  reviewId:string;
  goodYn:'Y'|null;
}

const TeamDetail: React.FC = () => {
  const {teamId} = useParams<{teamId:string}>();
  const {user, logout} = useAuth();
  const {openModal, closeModal} =  useModal();
  const {alertWarn, alertSuccess, alertError} = useAlert();
  const api = useAPI();

  const getTimeLeft = (deadline:string) => {
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const difference = deadlineTime - now;

    if (difference <= 0) return '00:00:00';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

    return `${days}일 ${hours}:${minutes}:${seconds}`;
  };

  const [formData,setFormData]=useState<TeamReviewDTO>({
    teamId:'',
    conts:'',
    creId:'',
    images:[]
  });

  const [timeLeft, setTimeLeft] = useState('');
  const [details, setDetails]=useState<TeamDetailProps>();
  const [reviews, setReviews]=useState<TeamReviewVO[]>([]);
  const [previews,setPreviews]=useState<string[]>([]);
  const [conts,setConts]=useState('');
  const [goods, setGoods] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement | null>(null);

  /**
   * 타이머
   */
  useEffect(() => {
    const timer = setInterval(() => {
        details && setTimeLeft(getTimeLeft(details.endDatetime));
    }, 1000); // 1초마다 갱신
    return () => clearInterval(timer); // 종료시 타이머 제거
  },[details])

  useEffect(() => {
    getTeamDetail();
    getTeamReview();
    getReviewGood();
  }, []);

  /**
   * 팀 상세 조회
   */
  const getTeamDetail = async() => {
    try {
        const response = await api.get('/team/readTeamDetail', {teamId});
        if(response.data.code === '0000'){
            const data = response.data.data;
            loadNaverMap(data.addr);
            
            if(data){
              !data.isUser && logout();
              setDetails(data);
            }
        } else {
            alertError();
        }
    } catch(error){
        alertError({error});
    }
  }

  /**
   * 좋아요?
   */
  const getReviewGood = async()=>{
    try{
        if(user){
            const response = await api.get('/review/goodList', {userId: user.id});
            console.log(`getReviewGood res.data: ${JSON.stringify(response.data, null, 2)}`);
            const states: Record<string, boolean> = {};
            const {code, data} = response.data;
            if(code === '0000'){
              data.forEach((item: { reviewId: string; goodYn: string }) => {
                  states[item.reviewId] = item.goodYn === 'Y';
              });
              setGoods(states);
            } else {
              alertError();
            }
        }
    } catch(error){
        alertError({error});
    }
  }

  const getTeamReview = async() => {
    try {
        const response = await api.get(`/review/list`, {teamId});
        const {code, data} = response.data;
        if(code === '0000'){
          setReviews(data);
        } else {
          alertError();
        }
    } catch(error){
        alertError({error});
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {name,value} = e.target;
    setConts(value);
    setFormData({...formData,[name]:value});
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value,files} = e.target;
    console.log(`image : ${name} : ${value}`);

    if (name === 'images' && files) {
      console.log(`Image Name : ${name} : ${value} | ${files[0]}, ${files[1]}`);
      console.log(`type of File => ${typeof(files)}`);
      const fileArray = Array.from(files);

      const filePreviews = fileArray.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => {
            resolve(reader.result as string);
          }
        });
      });

      Promise.all(filePreviews).then(pUrls => {
        setPreviews(pUrls);
      });

      setFormData({...formData,images:fileArray})
    }else{
      setFormData({...formData,[name]:value});
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const myFormData = new FormData();
    myFormData.append('teamId',teamId!);
    // myFormData.append('creId',user?.id);
    myFormData.append('conts',formData.conts);
    if(formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        myFormData.append('files',formData.images[i]);
      }
    }

    try {
        const response = await api.postWithMultiPart('/review/add', myFormData);
        console.log(`handleSubmit response: ${response}`);
        navigate(0);
    } catch (error) {
      alertError({error});
      console.error('전송 오류: ',error);
    }
  }

  const deleteReview = async (reviewId:string) => {
    if (window.confirm('리뷰 삭제하겠습니까?')) {
      try{
        const response = await api.delete('/review/delete', {id: reviewId});
        const {code, data} = response.data;
        if(code === '0000'){
          navigate(0);  
        } else {
          alertError();
        }
      } catch(error){
          alertError({error});
      }
    }
  }

 const handleGood = async (reviewId:string) => {
    const prev = goods[reviewId] || false;
    const toggled = !prev;
    setGoods(prevState => ({
      ...prevState,
      [reviewId]: toggled
    }));

    const newGood: ReviewGoodProps = { reviewId, goodYn: toggled ? 'Y' : null };
    const response = await api.postWithJson('/review/addGood',newGood);
    console.log("response: ",response);
      navigate(0);
};

  /** 
   * 좋아요(찜)
   */
  const likeIt = async (teamId:string|undefined) => {
    if(!teamId || !teamId.trim()){
      alertError({message: '팀 아이디가 없습니다.'});
    } else {
      try {
        const resp = await api.postWithJson('/team/likeIt', {teamId});
        const data = resp.data;
        if(data.code === '0000'){
          alertSuccess({message: data.message});
          setDetails((prev) =>({...prev!, isLiked: true}));
        } else {
          alertError(); 
        }
      } catch(error) {
        alertError({error});
      }
    }
  };

  /** 
   * 싫어요(찜 취소)
   */
  const unLikeIt = async (teamId:string|undefined) => {
    if(!teamId || !teamId.trim()){
      alertError({message: '팀 아이디가 없습니다.'});
    } else {
      try {
        const resp = await api.postWithJson('/team/unLikeIt', {teamId});
        const data = resp.data;
        if(data.code === '0000'){
          alertSuccess(data.message);
          setDetails((prev) =>({...prev!, isLiked: false}));
        } else {
          alertError(); 
        }
      } catch(error) {
        alertError({error});
      }
    }
  };
  
  /**
   * 가입신청
   */
  const apply = async () => {
    try{
      const resp = await api.postWithJson('/member/apply', {teamId});
      const data = resp.data;
      if(data.code === '0000'){
        alertSuccess({message: data.message, onClose: ()=>setDetails(prev=>({...prev!, isApplied: true})) });
      } else {
        alertError();
      }
    } catch(error){
      alertError({error});
    }
  }

  /**
   * 가입취소
   */
  const cancelApplication = async() => {
    try {
      const resp = await api.postWithJson('/member/cancel', {teamId});
      const data = resp.data;
      if(data.code === '0000'){
        alertSuccess({message: data.message, onClose: ()=>setDetails(prev=>({...prev!, isApplied: false})) });
      } else {
        alertError();
      }
    } catch (error) {
      alertError({error});
    }
  }

  /**
   * 네이버 지도
   * @param address 
   */
  const loadNaverMap = (address:string) => {
    const scriptId = 'naver-map-script';
    const existingScript = document.getElementById(scriptId);

    const loadMap = () => {
      const naver = (window as any).naver;
      if (!naver || !naver.maps || !naver.maps.Service) {
        console.log('Naver Maps API 또는 geocoder 로드 중...');
        setTimeout(loadMap, 100); // 0.1초 후 재시도
        return;
      }

      naver.maps.Service.geocode(
        { query: address },
        (status: string, response: any) => {
          if (status !== naver.maps.Service.Status.OK) {
            alert('주소 변환 실패: ' + status);
            return;
          }

          const { x, y } = response.v2.addresses[0];
          const location = new naver.maps.LatLng(parseFloat(y), parseFloat(x));

          const map = new naver.maps.Map(mapRef.current!, {
            center: location,
            zoom: 16,
          });

          new naver.maps.Marker({
            position: location,
            map,
            title: address,
          });
        }
      );
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=69q0fnpna1&submodules=geocoder';
      script.async = true;
      script.onload = loadMap; // 성공 시 실행
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }

  const deleteTeam = async () => {
    try{
        const resp = await api.delete('/team/deleteTeam', {teamId});
        const {code, message} = resp.data;
        if(code === '0000'){
            alertSuccess({message});
        } else {
          alertError();
        }
    } catch(error){
        alertError({error});
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.detail_wrap}>
        
        {/*  팀원 추천, 채팅 */}
        <div className={styles.btn_group}>
          {details?.isMember && <Button type="button" size='sm' color='point2' onClick={()=>openModal(1, <Chat teamId={teamId!} />, undefined, 'none')}>채팅</Button>}
          {details?.isLeader && <Button type="button" size='sm' color='point3' onClick={()=>openModal(1, <SelectMemberOpts teamId={teamId!} modalId={1} />)}>팀원 추천</Button>}
        </div>

        {/* 팀 제목 */}
        <h3 className={styles.detail_tit}>{details?.teamName}</h3>

        {/* 팀 이미지 */}
        <div className={styles.detail_img}>
          {details?.files?
              details.files.map((file) => <img src={file.url} alt="team_detail_img"/>) 
                : <FontAwesomeIcon icon={faImage} />}
        </div>
        
        {/* 소개 */}
        <div className={styles.detail_box}>
          <h4 className={styles.detail_tit}>[ 소개 ]</h4>
          <p>{details?.conts}</p>
        </div>

        {/* 리더 프로필 */}
        <div className={styles.detail_profile_box}>
          {<><Avatar src={details?.leader?.imgUrls?.at(0)?.url} size='lg' /> <strong>{details?.leader? details.leader.userName : '팀장 없음'}</strong></>}
        </div>

        {/* 일시, 장소 */}
        <div className={styles.detail_box}>
          <p><strong>일시 : </strong>{details?.startDatetime} ~ {details?.endDatetime}</p>
          <p><strong>장소 : </strong>{details?.addr} {details?.detailAddr}</p>
          <div id="map" ref={mapRef} style={{width: '100%',height: '400px'}}/>
        </div>
        
        {/* 참여인원 */}
        <div className={styles.detail_box}>
          <p><strong>참여인원</strong> (<span className={styles.cnt_err}>{details?.members?.length ?? 0}</span>/15)</p>
          <div className={styles.detail_member_box}>
            {details?.members?.map((member, idx)=> <Avatar key={idx} src={member.imgUrls?.at(0)?.url} />)}
          </div>
        </div>

        {/* 남은 시간 */}
        <div className={styles.timer_box}>
          <strong>남은 시간</strong>
          <strong>{timeLeft}</strong>
        </div>
        
        {/* 버튼 그룹 */}
        <div className={styles.btn_group}>
          {/* 찜하기 버튼 */}
          {(!details?.isMember && details?.isUser) &&  (details?.isLiked && <Button type='button' color='danger' size='lg' onClick={()=>unLikeIt(teamId)}>찜취소</Button>)}
          {(!details?.isMember && details?.isUser) &&  (!details?.isLiked && <Button type='button' color='point' size='lg' onClick={()=>likeIt(teamId)}>찜하기</Button>)}

          {/* 참여 버튼 */}
          {appConsole(details)}
          {(!details?.isMember && details?.isUser) && (details?.isApplied && <Button type='button' size='lg' className={`${styles.apply_btn}`} onClick={cancelApplication}> 참여 취소 </Button>)}
          {(!details?.isMember && details?.isUser) && (!details?.isApplied && <Button type='button' size='lg' className={styles.apply_btn} onClick={apply}> 참여신청 </Button>)}

          {/* 삭제 버튼 */}
          {(details?.isMember && details?.isUser) && (details?.isLeader && <Button type='button' size='lg' color='danger' onClick={deleteTeam}> 팀 삭제 </Button>)}
        </div>

        {/* 리뷰 */}
        <div style={{padding:'15px',backgroundColor:'#F3F3F3',borderTop:'1px solid #ccc'}}>
          <strong>리뷰</strong>
        </div>

        <form onSubmit={handleSubmit}>
          <p><strong>내용 *</strong></p>
          <div className={styles.textarea_wrapper}>
            <textarea className={styles.conts} name="conts" id="conts" value={conts} onChange={handleTextChange}></textarea>
            {conts === '' && (
              <label htmlFor="conts" className={styles.placeholder_label}>리뷰를 입력해주세요.</label>
            )}
          </div>
          <div className={styles.write_box}>
              <label className={styles.label}>파일</label>
              <File onChange={handleInputChange} name='images' />
              <div className={styles.review_img}>
              { previews.length > 0 ? (
                  previews.map((preview,index)=>(
                    <img src={preview as string} alt="" className='' style={{ width: '4.571rem'}} />
                  ))
                ):(
                  <img src={'/images/img_default.svg'} alt="" style={{ width: '4.571rem'}} />
                )
              }
              </div>
              <p>첨부 파일은 최대 20MB까지 등록 가능합니다.</p>
          </div>
          {/* <p><strong>파일</strong></p>
          <input type="file" name="images" id="images" placeholder='이미지 URL 입력' onChange={handleInputChange} multiple/>
          <p style={{marginTop:'10px', color:'#484848'}}>첨부 파일은 최대 20MB까지 등록 가능합니다.</p>
          {
            previews.length > 0 && (
              <div className='mb-3'>
                {
                  previews.map((preview,index)=>(
                    <p key={index}>
                      <img src={preview} alt="" className='img-thumbnail' style={{marginRight:'10px',marginBottom:'10px',width:'150px',height:'150px'}} />
                      <div>
                        <span>{preview}</span>
                      </div>
                    </p>
                  ))
                }
              </div>
            )
          } */}
          <div>
            <button type="submit" style={{marginTop:'30px',padding:'7px',width:'50px',borderRadius:'6px',color:'white',backgroundColor:' #2C2C2C'}}>등록</button>
          </div>
        </form>
        <hr/>
        {
          reviews.map((review)=>(
            <div key={review.id}>
              <div className={styles.detail_profile_box}>
                {(review.userImages && review.userImages.length > 0) && <Avatar src={review.userImages[0].url} size='lg' />}
                <strong>{review.userName}</strong>
                <p>{review.creDatetime}</p>
                {
                  review.creId === user?.id && (
                    <button onClick={() => deleteReview(review.id)}>X</button>
                  )
                }
                
              </div>
              <div className={styles.review_img}>
              {
                review.reviewImages && review.reviewImages.length > 0 && (
                  review.reviewImages.map((reviewImage) => (
                      // <img src={`https://objectstorage.us-phoenix-1.oraclecloud.com/p/Td846I5FRMA7Wv-a9ZccXV9uW7fohlsu_sEfMxUmvvfhugeCAzbXGcHUovuVyway/n/axaim1ll2pmx/b/bucket-20250610-2248/o/review/${image.fileName}`}
                      //   alt="team_review_img"/>
                      <img src={reviewImage.url} alt="team_review_img"/>
                  ))
                )
              }
              </div>
              <div style={{marginTop:'20px'}}>
                <p>{review.conts}</p>
              </div>
              <div className={styles.review_good}>
                <span>{review.goodCnt}</span>
                <button className={`${styles.good_btn} ${goods[review.id] ? styles.active : ''}`}
                onClick={() => handleGood(review.id)}>좋아요</button>
              </div>
              <hr/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TeamDetail