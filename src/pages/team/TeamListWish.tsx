import React, { useEffect, useState } from "react";
import styles from "./team.module.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Team } from "./team";
import { FundCard } from "../../components/sets";
import { toast } from "react-toastify";
import axios from "axios";
import { useAlert, useAPI, useAuth } from "../../hooks";
import { Button } from "../../components/ui";

const PAGE_SIZE = 9; // 한번에 가져올 팀 개수

const TeamListWish: React.FC = () => {
  // 1. 훅과 상태 선언
  const [teams, setTeams] = useState<Team[]>([]); // 현재 화면에 보여줄 데이터 목록
  const [page, setPage] = useState(0); // 현재까지 불러온 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 추가 데이터의 여부 확인
  const { ref, inView } = useInView(); // **무한스크롤 용 훅** ref : 감시할 요소, inView : 요소가 화면에 보이면 true
  const { alertError } = useAlert();
  const api = useAPI();
  const { user } = useAuth();

  // 페이지 단위로 팀 데이터를 서버에서 호출해 pageNum 페이지 데이터를 가져오고 teams 배열에 누적
  const fetchTeams = async (pageNum: number) => {
    try {
      if (!user?.id) {
        setTeams([]);
        setHasMore(false);
        return;
      }

      ///Get방식으로 team/list?page={pageNum}&size={PAGE_SIZE}
      const res = await api.get("/team/selectFavoritedTeamList", {
        userId: user.id,
        page: pageNum,
        size: PAGE_SIZE,
      });

      const data: Team[] = res.data.data;

      console.log("찜한 팀 API 결과", data);

      const uniqueMap = new Map<string, Team>();

      data.forEach((team) => {
        uniqueMap.set(team.id, team);
      });

      const uniqueTeams = Array.from(uniqueMap.values());

      // 기존 목록 뒤에 신규 데이터 추가
      setTeams((prev) => [...prev, ...uniqueTeams]);

      //받아온 갯수가 PAGE_SIZE 미만이면 더 이상 불러올 데이터가 없음. -> 무한스크롤 끝
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      alertError({ error, onClose: () => setHasMore(false) });
    }
  };

  //2. 데이터 패칭 로직 - 사용자가 리스트 하단에 도달시 데이터가 추가 로드 된다.
  useEffect(() => {
    if (inView && hasMore) {
      setTimeout(() => {
        fetchTeams(page + 1); // 카드 더 추가
        setPage((prev) => prev + 1); // 페이지 넘버도 추가
      }, 100);
    }
  }, [inView]);

  // 렌더링
  return (
    <div className={styles.full_container}>
      <div className={styles.list_group}>
        {/* {teams.map((team, idx) => {
          const coverUrl = team.files?.[0]?.url || null;
          const leaderUrl = team.leaderFiles?.[0]?.url || null;
          return (
            <Link key={`${team.id}-${idx}`} to={`/team_detail/${team.id}`}>
              <FundCard
                id={team.id}
                fundName={team.teamName}
                fundImageUrl={coverUrl}
                farmOwnerName={team.leaderName}
                farmOwnerImageUrl={leaderUrl}
                fundContents={team.startDatetime}
                startDatetime={team.startDatetime}
                endDatetime={team.endDatetime}
                currentPercent={team.curMemberCnt}
                currentMember={team.maxMemberCnt}
              />
            </Link>
          );
        })} */}
        {/* {teams.length === 0 && (
          <div className={styles.no_data}>찜한 팀이 없습니다.</div>
        )} */}
        {hasMore && <div ref={ref} style={{ height: "50px" }} />}
      </div>
    </div>
  );
};

export default TeamListWish;
