import React, { useEffect, useMemo, useState } from "react";
import styles from "./qna-sentiment.module.css";
import { Button, Badge, Select } from "../../../components/ui";
import useAPI from "../../../hooks/useAPI";


type Sentiment = "angry" | "fear" | "happy" | "tender" | "sad";

// 감정별 이모티콘 매핑
const EMOTION_ICONS = {
  angry: "😠",      // :분노:
  fear: "😨",       // :무서운:
  happy: "😊",      // :미소짓는_상기된_얼굴:
  tender: "🥰",     // :하트_3개가_있는_웃는_얼굴:
  sad: "😢"         // :울다:
} as const;

// 감정별 색상 매핑
const getSentimentColor = (sentiment: Sentiment) => {
  switch(sentiment) {
    case 'angry': return 'danger';
    case 'fear': return 'point3';
    case 'happy': return 'point2';
    case 'tender': return 'point';
    case 'sad': return 'secondary';
    default: return 'secondary';
  }
};

interface QnaItem {
  id: string;
  title: string;
  content: string;
  sentiment: Sentiment;
  score: number; // 0~1
  keywords: string[];
  createdAt: string; // ISO
}

const QnaSentiment: React.FC = () => {
  const api = useAPI();

  // 필터 상태
  const [range, setRange] = useState<string>("7d");
  const [sentiment, setSentiment] = useState<string>("all");

  const [category, setCategory] = useState<string>("all");


  // 데이터 상태
  const [items, setItems] = useState<QnaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 상세 패널 제거: 단일 리스트 뷰만 사용

 
  // KPI 계산
  const stats = useMemo(() => {
    const total = items.length;
    const angry = items.filter(i => i.sentiment === "angry").length;
    const fear = items.filter(i => i.sentiment === "fear").length;
    const happy = items.filter(i => i.sentiment === "happy").length;
    const tender = items.filter(i => i.sentiment === "tender").length;
    const sad = items.filter(i => i.sentiment === "sad").length;
    const avg = total === 0 ? 0 : Math.round((items.reduce((a, b) => a + b.score, 0) / total) * 100) / 100;
    return { total, angry, fear, happy, tender, sad, avg };
  }, [items]);

  // 키워드 집계
  // 키워드/차트 섹션 비활성화 상태
  const keywords = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach(i => i.keywords.forEach(k => map.set(k, (map.get(k) || 0) + 1)));
    return Array.from(map.entries()).sort((a,b)=>b[1]-a[1]).slice(0,30);
  }, [items]);

  // 간단 차트 데이터 (CSS 막대/도넛용)
  const sentimentRatio = useMemo(() => {
    const total = Math.max(1, stats.total);
    return {
      angry: Math.round((stats.angry / total) * 100),
      fear: Math.round((stats.fear / total) * 100),
      happy: Math.round((stats.happy / total) * 100),
      tender: Math.round((stats.tender / total) * 100),
      sad: Math.round((stats.sad / total) * 100),
    };
  }, [stats]);

  // KPI 계산(현재 화면 표시 비활성화)
  // const stats = useMemo(() => {
  //   const total = items.length;
  //   const pos = items.filter(i => i.sentiment === "positive").length;
  //   const neu = items.filter(i => i.sentiment === "neutral").length;
  //   const neg = items.filter(i => i.sentiment === "negative").length;
  //   const avg = total === 0 ? 0 : Math.round((items.reduce((a, b) => a + b.score, 0) / total) * 100) / 100;
  //   return { total, pos, neu, neg, avg };
  // }, [items]);

  // 키워드 집계
  // 키워드/차트 섹션 비활성화 상태
  // const keywords = useMemo(() => {
  //   const map = new Map<string, number>();
  //   items.forEach(i => i.keywords.forEach(k => map.set(k, (map.get(k) || 0) + 1)));
  //   return Array.from(map.entries()).sort((a,b)=>b[1]-a[1]).slice(0,30);
  // }, [items]);

  // 간단 차트 데이터 (CSS 막대/도넛용)
  // const sentimentRatio = useMemo(() => {
  //   const total = Math.max(1, stats.total);
  //   return {
  //     pos: Math.round((stats.pos / total) * 100),
  //     neu: Math.round((stats.neu / total) * 100),
  //     neg: Math.round((stats.neg / total) * 100),
  //   };
  // }, [stats]);


  const fetchData = async () => {
    try {
      setLoading(true);
      // 1) 우선 QNA 전용 관리자 엔드포인트 호출 시도
      try {
        const r = await api.get('/admin/qna');
        if (r?.data?.code === '0000' && Array.isArray(r.data.data)) {
          const list = r.data.data;
          const mapped: QnaItem[] = list.map((it: any, idx: number) => {
            const title = it.title || '';
            const content = it.content || '';
            const eRaw = String(it.emotionType || '').trim();

            const mapEmotion = (e: string, text: string): Sentiment => {
              const lower = e.toLowerCase();
              // DB 라벨 매핑 (예: 궁금해요/도움돼요/화나요)
              if (e === '화나요') return 'angry';
              if (e === '궁금해요') return 'tender'; // 중립/호기심 → 부드러운 톤으로 표시
              if (e === '도움돼요') return 'happy';

              // 한글 일반 감정 키워드
              if (/분노|화남|화가|짜증|최악/.test(e) || /분노|화남|화가|짜증|최악/.test(text)) return 'angry';
              if (/두려움|무섭|걱정|불안/.test(e) || /두려움|무섭|걱정|불안/.test(text)) return 'fear';
              if (/행복|기쁨|좋아요|만족|감사/.test(e) || /행복|기쁨|좋아요|만족|감사/.test(text)) return 'happy';
              if (/사랑|감동|고마움/.test(e) || /사랑|감동|고마움/.test(text)) return 'tender';
              if (/슬픔|속상|우울/.test(e) || /슬픔|속상|우울/.test(text)) return 'sad';

              // 영어 키워드 보조
              if (lower.includes('angry')) return 'angry';
              if (lower.includes('fear')) return 'fear';
              if (lower.includes('happy')) return 'happy';
              if (lower.includes('tender') || lower.includes('love')) return 'tender';
              if (lower.includes('sad')) return 'sad';

              // 기본값: tender(중립에 가까운 긍정)로 설정
              return 'tender';
            };

            return {
              id: String(it.postId || idx + 1),
              title,
              content,
              sentiment: mapEmotion(eRaw, `${title} ${content}`),
              score: 0.5,
              keywords: (it.keywords || '').split(',').map((s: string)=>s.trim()).filter(Boolean),
              createdAt: it.createdDate ? new Date(it.createdDate).toISOString() : new Date().toISOString(),
            };
          });
          
          setItems(mapped);
          return;
        }
      } catch (e) {
        // 무시하고 다음 시도로 진행
      }

      // 2) 실패 시 게시판 리스트 연동 시도 (대체 데이터)
      //    BoardController: GET /api/board/boardList (expects currPage)
      try {
        const res = await api.get('/api/board/boardList', { currPage: 1 });
        if (res?.data?.code === '0000') {
          const list = Array.isArray(res.data.data) ? res.data.data : [];
          // 필드 추론 매핑: id/title/contents/creDatetime 등
          const mapped: QnaItem[] = list.map((it: any, idx: number) => {
            const title = it.title || it.subject || it.boardTitle || `게시글 ${idx+1}`;
            const content = it.contents || it.content || it.boardContents || '';
            const created = it.creDatetime || it.regDate || it.createdAt || new Date().toISOString();
            return {
              id: String(it.id || it.boardId || it.seq || idx+1),
              title,
              content,
              // 감정 값은 백엔드에 없으므로 간단 히유리스틱(긍/부 키워드)로 라벨링
              sentiment: ((): Sentiment => {
                const text = `${title} ${content}`;
                if (/화남|화가|짜증|불만|최악|분노/i.test(text)) return 'angry';
                if (/무서|두려|걱정|불안/i.test(text)) return 'fear';
                if (/행복|좋아요|만족|감사|기쁨|잘됨|ㅎㅎ|^^/i.test(text)) return 'happy';
                if (/사랑|고마|감동|💕|❤/i.test(text)) return 'tender';
                if (/슬픔|속상|우울|ㅠㅠ|ㅜㅜ/i.test(text)) return 'sad';
                return 'sad';
              })(),
              score: 0.5,
              keywords: [],
              createdAt: new Date(created).toISOString(),
            };
          });
          setItems(mapped);
          return; // 성공 시 더미 생략
        }
      } catch (e) {
        // 무시하고 더미로 대체
      }

      // 3) 모두 실패 시 데모 더미로 대체
      const demo: QnaItem[] = [
        { id: "1", title: "사과 잘 자라고 있어요 ㅎㅎ 더 잘 키우고 싶은데 영양제좀 추천해주시면 감사하겠습니다.", content: "만족", sentiment: "happy", score: 0.92, keywords:["잘","감사"], createdAt: new Date().toISOString() },
        { id: "2", title: "나무가 죽기 일보직전이에요 너무 속상한데 어떻게 해야하나요", content: "불만", sentiment: "angry", score: 0.18, keywords:["죽기","속상"], createdAt: new Date().toISOString() },
        { id: "3", title: "그럭저럭 자라긴 자라는거 같은데 열매가 작네요", content: "그럭저럭", sentiment: "sad", score: 0.5, keywords:["보통"], createdAt: new Date().toISOString() },
        { id: "4", title: "벌레가 너무 무서워요... 어떻게 해야 할까요?", content: "두려움", sentiment: "fear", score: 0.25, keywords:["벌레","무서워"], createdAt: new Date().toISOString() },
        { id: "5", title: "정말 사랑스러운 토마토가 자라고 있어요 💕", content: "사랑", sentiment: "tender", score: 0.88, keywords:["사랑스러운","토마토"], createdAt: new Date().toISOString() },
      ];
      setItems(demo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [range, sentiment]);


  const filteredItems = useMemo(() => {
    let arr = items;
    if (sentiment !== "all") arr = arr.filter(i => i.sentiment === sentiment);
    return arr;
  }, [items, sentiment]);

  const exportCsv = () => {
    const header = ["id","title","sentiment","score","keywords","createdAt"]; 
    const rows = filteredItems.map(i => [i.id, i.title, i.sentiment, i.score, i.keywords.join("|"), i.createdAt]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff"+csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "qna_sentiment.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>

        <h1 className={styles.title}>Q&A 감정 대시보드</h1>

        <div className={styles.actions}>
          <Button size="sm" color="secondary" onClick={exportCsv}>CSV</Button>
          <Button size="sm" color="point" onClick={fetchData}>
            {loading ? "로딩..." : "새로고침"}
          </Button>
        </div>
      </div>


      

      {/* KPI */}
       <div className={styles.kpis}>
        <div className={styles.card}><div className={styles.cardTitle}>전체 Q&A</div><div className={styles.cardNumber}>{stats.total}</div></div>
        <div className={styles.card}><div className={styles.cardTitle}>😠 분노</div><div className={styles.cardNumber}><Badge color="danger">{stats.angry}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>😨 두려움</div><div className={styles.cardNumber}><Badge color="point3">{stats.fear}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>😊 행복</div><div className={styles.cardNumber}><Badge color="point2">{stats.happy}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>🥰 사랑</div><div className={styles.cardNumber}><Badge color="point">{stats.tender}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>😢 슬픔</div><div className={styles.cardNumber}><Badge color="secondary">{stats.sad}</Badge></div></div>
        {/* <div className={styles.card}><div className={styles.cardTitle}>평균 점수</div><div className={styles.cardNumber}>{stats.avg}</div></div> */}
      </div> 

      

      {/* 간단 차트 */}
      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>감정 비율</div>
          <div className={styles.ratioBar}>
            <div className={styles.angry} style={{width: `${sentimentRatio.angry}%`}} />
            <div className={styles.fear} style={{width: `${sentimentRatio.fear}%`}} />
            <div className={styles.happy} style={{width: `${sentimentRatio.happy}%`}} />
            <div className={styles.tender} style={{width: `${sentimentRatio.tender}%`}} />
            <div className={styles.sad} style={{width: `${sentimentRatio.sad}%`}} />
          </div>
          <div className={styles.legend}>
            <span className={styles.angryBox}/> 😠 분노 {sentimentRatio.angry}%
            <span className={styles.fearBox}/> 😨 두려움 {sentimentRatio.fear}%
            <span className={styles.happyBox}/> 😊 행복 {sentimentRatio.happy}%
            <span className={styles.tenderBox}/> 🥰 사랑 {sentimentRatio.tender}%
            <span className={styles.sadBox}/> 😢 슬픔 {sentimentRatio.sad}%

          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>키워드</div>
          <div className={styles.keywords}>
            {keywords.length===0 && <div className={styles.empty}>키워드 없음</div>}
            {keywords.map(([k,c]) => (
              <Badge key={k} size="sm" color={c>2? 'point2': 'secondary'} className={styles.kw}>{k} ({c})</Badge>
            ))}
          </div>
        </div>
      </div>

{/* 필터바 */}
<div className={styles.filters}>
        <div className={styles.filterGroup}>
        <div className={styles.filterGroup}>
          <Button size="xs" color={range==='1d'? 'point2':'secondary'} onClick={()=>setRange('1d')}>오늘</Button>
          <Button size="xs" color={range==='7d'? 'point2':'secondary'} onClick={()=>setRange('7d')}>7일</Button>
          <Button size="xs" color={range==='30d'? 'point2':'secondary'} onClick={()=>setRange('30d')}>30일</Button>
        </div>
          <Select value={sentiment} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setSentiment(e.target.value)}>
            <option value="all">전체</option>
            <option value="angry">😠 분노</option>
            <option value="fear">😨 두려움</option>
            <option value="happy">😊 행복</option>
            <option value="tender">🥰 사랑</option>
            <option value="sad">😢 슬픔</option>
          </Select>
        </div>
        {/* <div className={styles.filterGroup}>
          <Select value={category} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setCategory(e.target.value)}>
            <option value="all">카테고리 전체</option>
            <option value="delivery">배송</option>
            <option value="refund">환불</option>
            <option value="etc">기타</option>
          </Select>
        </div> */}
      </div>


      {/* 리스트 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>최근 이슈 Q&A</h3>
        </div>
        <div className={styles.list}>
          {filteredItems.length === 0 && (<div className={styles.empty}>데이터가 없습니다</div>)}
          {filteredItems.map((it) => (
            <div key={it.id} className={styles.item}>
              <div className={styles.itemMain}>
                <div className={styles.itemTitle}>{it.title}</div>
                <div className={styles.itemMeta}>

                  <Badge size="sm" color={getSentimentColor(it.sentiment)}>
                    {EMOTION_ICONS[it.sentiment]} {it.sentiment}
                  </Badge>
                  <span className={styles.dot}>•</span>
                  {/* <span className={styles.score}>점수 {it.score}</span>
                  <span className={styles.dot}>•</span> */}

                  <span className={styles.score}>{new Date(it.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className={styles.itemActions}>
                <Button size="xs" color="secondary" onClick={(e: React.MouseEvent)=>{e.stopPropagation();}}>답변</Button>
                {/* <Button size="xs" color="danger" onClick={(e: React.MouseEvent)=>{e.stopPropagation();}}>제재</Button> */}
                <Button size="xs" color="point3" onClick={(e: React.MouseEvent)=>{e.stopPropagation();}}>보류</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 패널 제거됨 */}
    </div>
  );
};

export default QnaSentiment;
