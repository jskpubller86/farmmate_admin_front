import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./fund.module.css";
// 서버 연동 시 사용
// import { Fund } from "./fund";
// import { useAlert, useAPI } from "../../hooks";
import { Link } from "react-router-dom";
import { FundCard, DUMMY_FUND_CARD, Pagination } from "../../components/sets";
import type { PageInfoProps } from "../../components/sets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Input, Select } from "../../components/ui";

// 한번에 가져올 펀드 카드 개수
const PAGE_SIZE = 6;
// 전체 아이템 수 (더미 데이터용)
const TOTAL_ITEMS = 120;
// 전체 페이지 수 (더미 데이터용)
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

// 상단 카테고리 필터 데이터 (텍스트만)
const CROPS = [
  { id: "all", name: "전체" },
  { id: "cabbage", name: "배추" },
  { id: "radish", name: "무" },
  { id: "apple", name: "사과" },
  { id: "banana", name: "바나나" },
  { id: "carrot", name: "당근" },
  { id: "eggplant", name: "가지" },
];

type FundItem = {
  id: number;
  fundName: string;
  files?: { url: string }[];
  farmownerFiles?: { url: string }[];
  farmownerName: string;
  startDatetime: string;
  endDatetime: string;
  curMemberCnt: number;
  maxMemberCnt: number;
};

const FundList: React.FC = () => {
  // 훅 / 상태 선언
  // 현재 화면에 보여줄 데이터 목록
  const [funds, setFunds] = useState<FundItem[]>([]);
  // 로딩 상태
  const [isFetching, setIsFetching] = useState(false);
  // 무한 스크롤 관련 상태
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // NEW: StrictMode 초기 로딩 2회 방지용
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const didInitRef = useRef(false);

  // 홈 화면 슬라이더
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  // 스크롤 관련 refs
  const sentinelRef = useRef<HTMLDivElement>(null);

  const settings = useMemo(
    () => ({
      fade: true,
      waitForAnimate: false,
      infinite: true, // 무한 반복
      speed: 500,
      slidesToShow: 1, // 한번에 보여줄 슬라이드 수
      slidesToScroll: 1, // 한번에 넘길때 몇개씩 넘길 수
      autoplay: true, // 자동 시작
      autoplaySpeed: 2000, // 넘기는 속도
      arrows: true, // 화살표 좌우
      accessibility: false, // aria-hidden 포커스 경고 방지
      pauseOnHover: false,
      pauseOnFocus: false,
      beforeChange: () => {
        // 슬라이더 내부 요소에 포커스가 있을 때만 해제
        const activeEl = document.activeElement as HTMLElement | null;
        const container = sliderContainerRef.current;
        if (
          activeEl &&
          typeof activeEl.blur === "function" &&
          container &&
          container.contains(activeEl)
        ) {
          activeEl.blur();
        }
      },
    }),
    []
  );

  // 홈 화면 슬라이더 더미 데이터
  const homefakeData = [
    { id: 1, img: "/images/xcb0.jpg" },
    { id: 2, img: "/images/xcb1.jpg" },
    { id: 3, img: "/images/xcb2.jpg" },
    { id: 4, img: "/images/xcb3.jpg" },
    { id: 5, img: "/images/xcb4.jpg" },
  ];

  // 더미 데이터 생성기(프론트만 적용, 서버 연결하면 변경)
  const makeDummy = (pageNum: number, size: number): FundItem[] =>
    Array.from({ length: size }).map((_, i) => {
      const id = (pageNum - 1) * size + i + 1;
      return {
        id,
        fundName: "깻잎과 관련된 펀딩 내용 제목",
        files: [{ url: "/images/fundcard_img.svg" }],
        farmownerFiles: [{ url: "/images/farmowner_img.svg" }],
        farmownerName: "테스형",
        startDatetime: "2025-05-31T07:00:10",
        endDatetime: "2025-06-01T07:00:10",
        curMemberCnt: 80,
        maxMemberCnt: 15,
      };
    });

  /** 카드 로딩 */
  const fetchFunds = async (pageNum: number, append = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsFetching(true);

    await new Promise((r) => setTimeout(r, 200)); // 로딩감

    const offset = (pageNum - 1) * PAGE_SIZE;
    const remain = Math.max(TOTAL_ITEMS - offset, 0);
    const size = Math.min(PAGE_SIZE, remain);
    const pageData = size > 0 ? makeDummy(pageNum, size) : [];

    setFunds((prev) => (append ? [...prev, ...pageData] : pageData));

    // 다음 로딩 가능 여부
    if (pageNum >= TOTAL_PAGES || size < PAGE_SIZE) setHasMore(false);

    setIsFetching(false);
    loadingRef.current = false;
  };

  // 초기 로딩 (StrictMode 2회 방지)
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    pageRef.current = 1;
    setPage(1);
    fetchFunds(1, false);
  }, []);

  // 무한 스크롤 (viewport 기준)
  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (!hasMore || loadingRef.current) return;

        const next = pageRef.current + 1;
        if (next <= TOTAL_PAGES) {
          pageRef.current = next; // ★ 먼저 올려 중복 방지
          setPage(next);
          fetchFunds(next, true);
        } else {
          setHasMore(false);
        }
      },
      {
        root: null, // viewport
        threshold: 0.05,
        rootMargin: "300px 0px", // 미리 당겨 로드
      }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [hasMore]); // 의존성 최소화 (page/isFetching에 반응하지 않음)
  // -------------------------------------------------------------------------
  // 기존----------------------------------------------------------------------
  // 페이지 단위로 팀 데이터를 서버에서 호출해 pageNum 페이지 데이터를 가져오고 teams 배열에 누적
  // const fetchFunds = async (pageNum: number) => {
  //   try {
  //     ///Get방식으로 fund/list?page={pageNum}&size={PAGE_SIZE}
  //     const res = await api.get("/fund/readFundList", {
  //       // page: pageNum,
  //       // size: PAGE_SIZE,
  //     });
  //     const data: Fund[] = res.data.data;

  //     // 기존 목록 뒤에 신규 데이터 추가
  //     if (data) {
  //       setFunds((prev) => [...prev, ...data]);
  //       }

  //     //받아온 갯수가 PAGE_SIZE 미만이면 더 이상 불러올 데이터가 없음. -> 무한스크롤 끝
  //     if (data.length < PAGE_SIZE) {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     alertError({ error, onClose: () => setHasMore(false) });
  //       }
  // };
  // ----------------------------------------------------------------------

  // 기존 ----------------------------------------------------------------------
  //2. 데이터 패칭 로직 - 사용자가 리스트 하단에 도달시 데이터가 추가 로드 된다.
  // useEffect(() => {
  //   if (inView && hasMore) {
  //     setTimeout(() => {
  //       fetchFunds(page + 1); // 카드 더 추가
  //       setPage((prev) => prev + 1); // 페이지 넘버도 추가
  //     }, 100);
  //   }
  // }, [inView]);
  // ----------------------------------------------------------------------

  // 렌더링
  return (
    <div className={styles.fund_container}>
      {/* 상단 슬라이더 컨테이너 + 검색 / 필터 - 고정 영역 */}
      <div className={styles.header_area}>
        <div className={styles.container}>
          <div className={styles.main_slider}>
            <Slider {...settings}>
              {homefakeData.map((h, idx) => (
                <div key={`slide-${h.id}-${idx}`}>
                  <div
                    style={{
                      position: "relative",
                      height: "229px",
                      background: `url(${h.img}) center/cover no-repeat`,
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    className={`${styles.main_slide} ${styles.main_slide_fallback}`}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* 필터 + 검색 */}
          <div className={styles.fund_filter_box}>
            {/* 필터 */}
            <div className={styles.filter_scroll_container}>
              <ul className={styles.fund_filter}>
                {CROPS.map((c, i) => (
                  <li key={`crop-${i}-${c.id}`} className={styles.pill}>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* 검색 */}
            <div className={styles.search_row}>
              <Select className={styles.search_sel}>
                <option value="전체">전체</option>
                <option value="배추">배추</option>
                <option value="무">무</option>
                <option value="사과">사과</option>
                <option value="바나나">바나나</option>
                <option value="당근">당근</option>
                <option value="가지">가지</option>
              </Select>
              <Input
                className={styles.search_input}
                placeholder="검색어를 입력하세요"
              />
              <Button type="button" className={styles.search_btn}>
                검색
              </Button>
            </div>

            {/* 선택 탭 */}
            <div className={styles.fund_choosetab}>
              <Button type="button" className={styles.tab}>
                달성률순
              </Button>
              <Button
                type="button"
                className={`${styles.tab} ${styles.tab_active}`}
              >
                최신순
              </Button>
              <Button type="button" className={styles.tab}>
                마감임박순
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 카드 그리드 영역 - 스크롤 가능 */}
      <section className={styles.cards_scroll} aria-label="펀드 카드 목록">
        <div className={styles.fundlist_group}>
          {/* 임시 */}
          {funds.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <Link
                  key={`placeholder-${i}`}
                  to={`/fund_detail/${DUMMY_FUND_CARD.id}`}
                >
                  <FundCard {...DUMMY_FUND_CARD} />
                </Link>
              ))
            : funds.map((f) => (
                <Link key={`fund-${f.id}`} to={`/fund_detail/${f.id}`}>
                  <FundCard
                    id={f.id}
                    fundName={f.fundName}
                    fundImageUrl={f.files?.[0]?.url ?? null}
                    farmOwnerImageUrl={f.farmownerFiles?.[0]?.url ?? null}
                    farmOwnerName={f.farmownerName}
                    fundContents={f.startDatetime}
                    startDatetime={f.startDatetime}
                    endDatetime={f.endDatetime}
                    currentPercent={f.curMemberCnt}
                    currentMember={f.maxMemberCnt}
                  />
                </Link>
              ))}
        </div>

        {/* sentinel & 로더 */}
        {hasMore && <div ref={sentinelRef} className={styles.sentinel} />}
        {isFetching && <div className={styles.loader}>불러오는 중…</div>}
      </section>
    </div>
  );
};

export default FundList;
