import React, { useEffect, useMemo, useState } from "react";
import styles from "./qna-sentiment.module.css";
import { Button, Badge, Select } from "../../../components/ui";

type Sentiment = "positive" | "neutral" | "negative";

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
  // const api = useAPI(); // 현재 외부 API 미사용

  // 필터 상태
  const [range, setRange] = useState<string>("7d");
  const [sentiment, setSentiment] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  // 데이터 상태
  const [items, setItems] = useState<QnaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 상세 패널 제거: 단일 리스트 뷰만 사용

  // KPI 계산
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
      // 실제 연동 예시
      // const { data } = await api.postWithJson('/api/admin/qna/sentiment', { range, sentiment, category });
      // setItems(data?.data ?? []);
      // 데모용 더미
      const demo: QnaItem[] = [
        { id: "1", title: "사과 잘 자라고 있어요 ㅎㅎ 더 잘 키우고 싶은데 영양제좀 추천해주시면 감사하겠습니다.", content: "만족", sentiment: "positive", score: 0.92, keywords:["잘","감사"], createdAt: new Date().toISOString() },
        { id: "2", title: "나무가 죽기 일보직전이에요 너무 속상한데 어떻게 해야하나요", content: "불만", sentiment: "negative", score: 0.18, keywords:["죽기","속상"], createdAt: new Date().toISOString() },
        { id: "3", title: "그럭저럭 자라긴 자라는거 같은데 열매가 작네요", content: "그럭저럭", sentiment: "neutral", score: 0.5, keywords:["보통"], createdAt: new Date().toISOString() },
      ];
      setItems(demo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, sentiment, category]);

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

      {/* 필터바 */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <Button size="xs" color={range==='1d'? 'point2':'secondary'} onClick={()=>setRange('1d')}>오늘</Button>
          <Button size="xs" color={range==='7d'? 'point2':'secondary'} onClick={()=>setRange('7d')}>7일</Button>
          <Button size="xs" color={range==='30d'? 'point2':'secondary'} onClick={()=>setRange('30d')}>30일</Button>
        </div>
        <div className={styles.filterGroup}>
          <Select value={sentiment} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setSentiment(e.target.value)}>
            <option value="all">전체</option>
            <option value="positive">긍정</option>
            <option value="neutral">중립</option>
            <option value="negative">부정</option>
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

      {/* KPI */}
      {/* <div className={styles.kpis}>
        <div className={styles.card}><div className={styles.cardTitle}>전체 Q&A</div><div className={styles.cardNumber}>{stats.total}</div></div>
        <div className={styles.card}><div className={styles.cardTitle}>긍정</div><div className={styles.cardNumber}><Badge color="point2">{stats.pos}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>중립</div><div className={styles.cardNumber}><Badge color="secondary">{stats.neu}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>부정</div><div className={styles.cardNumber}><Badge color="danger">{stats.neg}</Badge></div></div>
        <div className={styles.card}><div className={styles.cardTitle}>평균 점수</div><div className={styles.cardNumber}>{stats.avg}</div></div>
      </div> */}

      {/* 간단 차트 */}
      {/* <div className={styles.charts}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>감정 비율</div>
          <div className={styles.ratioBar}>
            <div className={styles.pos} style={{width: `${sentimentRatio.pos}%`}} />
            <div className={styles.neu} style={{width: `${sentimentRatio.neu}%`}} />
            <div className={styles.neg} style={{width: `${sentimentRatio.neg}%`}} />
          </div>
          <div className={styles.legend}>
            <span className={styles.posBox}/> 긍정 {sentimentRatio.pos}%
            <span className={styles.neuBox}/> 중립 {sentimentRatio.neu}%
            <span className={styles.negBox}/> 부정 {sentimentRatio.neg}%
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
      </div> */}

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
                  <Badge size="sm" color={it.sentiment === 'negative' ? 'danger' : it.sentiment === 'positive' ? 'point2' : 'secondary'}>
                    {it.sentiment}
                  </Badge>
                  <span className={styles.dot}>•</span>
                  <span className={styles.score}>점수 {it.score}</span>
                  <span className={styles.dot}>•</span>
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
