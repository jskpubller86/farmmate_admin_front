import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faSearch,
  faPlus,
  faUserTie,
  faUser,
  faCalendarAlt,
  faEye,
  faThumbsUp,
  faComment,
  faCheckCircle,
  faClock,
  faFilter,
  faSort,
  faBookmark,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Select, Badge } from "../../../components/ui";
import { useAuth, useAlert } from "../../../hooks";
import styles from "./qanda.module.css";

// ===== 타입 정의 =====
interface QandAItem {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    isExpert: boolean;
    avatar?: string;
    expertise?: string[];
  };
  category: string;
  status: "pending" | "answered" | "closed";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  answerCount: number;
  isBookmarked: boolean;
  priority: "low" | "medium" | "high";
}

interface Answer {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    isExpert: boolean;
    avatar?: string;
    expertise?: string[];
  };
  createdAt: string;
  isAccepted: boolean;
  likeCount: number;
  isLiked: boolean;
}

// ===== 상수 정의 =====
const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "priority", label: "우선순위순" },
] as const;

const QandA: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { alertSuccess, alertError } = useAlert();

  // ===== 상태 관리 =====
  const [qandaList, setQandaList] = useState<QandAItem[]>([]);
  const [filteredList, setFilteredList] = useState<QandAItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "priority">(
    "latest"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ===== 더미 데이터 =====
  const dummyQandAList: QandAItem[] = [
    {
      id: "1",
      title: "깻잎 재배 시 병충해 방제 방법이 궁금합니다",
      content:
        "깻잎을 재배하고 있는데 최근 잎에 노란 반점이 생기고 있습니다. 어떤 병충해인지, 어떻게 방제해야 하는지 전문가의 조언을 구합니다.",
      author: {
        id: "user1",
        name: "김농부",
        isExpert: false,
        avatar: "/images/img_profile.svg",
      },
      category: "재배기술",
      status: "answered",
      tags: ["깻잎", "병충해", "방제", "재배기술"],
      createdAt: "2025-01-15T10:30:00",
      updatedAt: "2025-01-16T14:20:00",
      viewCount: 156,
      likeCount: 23,
      answerCount: 3,
      isBookmarked: false,
      priority: "high",
    },
    {
      id: "2",
      title: "유기농 인증을 위한 토양 관리 방법",
      content:
        "유기농 인증을 받고 싶은데, 토양을 어떻게 관리해야 하는지 궁금합니다. 특히 화학비료 사용을 줄이는 방법을 알고 싶습니다.",
      author: {
        id: "user2",
        name: "이농장주",
        isExpert: false,
        avatar: "/images/img_profile.svg",
      },
      category: "유기농",
      status: "pending",
      tags: ["유기농", "토양관리", "인증", "화학비료"],
      createdAt: "2025-01-14T15:45:00",
      updatedAt: "2025-01-14T15:45:00",
      viewCount: 89,
      likeCount: 12,
      answerCount: 0,
      isBookmarked: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "스마트팜 시스템 도입 시 고려사항",
      content:
        "스마트팜 시스템을 도입하려고 하는데, 초기 비용과 운영 방법, 그리고 어떤 시스템이 우리 농장에 적합한지 궁금합니다.",
      author: {
        id: "user3",
        name: "박농업인",
        isExpert: false,
        avatar: "/images/img_profile.svg",
      },
      category: "스마트팜",
      status: "answered",
      tags: ["스마트팜", "시스템", "도입", "비용"],
      createdAt: "2025-01-13T09:15:00",
      updatedAt: "2025-01-15T11:30:00",
      viewCount: 234,
      likeCount: 45,
      answerCount: 5,
      isBookmarked: true,
      priority: "high",
    },
    {
      id: "4",
      title: "농작물 보험 가입 조건과 혜택",
      content:
        "농작물 보험에 가입하고 싶은데, 가입 조건과 보장 범위, 그리고 보험금 청구 방법에 대해 알고 싶습니다.",
      author: {
        id: "user4",
        name: "최농부",
        isExpert: false,
        avatar: "/images/img_profile.svg",
      },
      category: "농업정책",
      status: "closed",
      tags: ["농작물보험", "보험", "정책", "보장"],
      createdAt: "2025-01-12T16:20:00",
      updatedAt: "2025-01-14T10:15:00",
      viewCount: 178,
      likeCount: 34,
      answerCount: 2,
      isBookmarked: false,
      priority: "medium",
    },
  ];

  // ===== 전문가 목록 (더미) =====
  const expertList = [
    {
      id: "expert1",
      name: "김전문",
      expertise: ["재배기술", "병충해방제"],
      avatar: "/images/farmowner_img.svg",
    },
    {
      id: "expert2",
      name: "이박사",
      expertise: ["유기농", "토양학"],
      avatar: "/images/farmowner_img.svg",
    },
    {
      id: "expert3",
      name: "박교수",
      expertise: ["스마트팜", "농업기술"],
      avatar: "/images/farmowner_img.svg",
    },
  ];

  // ===== 카테고리 목록 =====
  const categories = [
    { value: "all", label: "전체" },
    { value: "재배기술", label: "재배기술" },
    { value: "병충해방제", label: "병충해방제" },
    { value: "유기농", label: "유기농" },
    { value: "스마트팜", label: "스마트팜" },
    { value: "농업정책", label: "농업정책" },
    { value: "농기계", label: "농기계" },
    { value: "농산물유통", label: "농산물유통" },
  ];

  // ===== 상태 목록 =====
  const statusList = [
    { value: "all", label: "전체" },
    { value: "pending", label: "답변대기" },
    { value: "answered", label: "답변완료" },
    { value: "closed", label: "해결완료" },
  ];

  // ===== 초기 데이터 로드 =====
  useEffect(() => {
    loadQandAList();
  }, []);

  // ===== 필터링 및 정렬 적용 =====
  useEffect(() => {
    applyFiltersAndSort();
  }, [qandaList, selectedCategory, selectedStatus, searchTerm, sortBy]);

  // ===== 데이터 로드 함수 =====
  const loadQandAList = async () => {
    try {
      setIsLoading(true);
      // API 호출 (현재는 더미 데이터 사용)
      // const response = await api.get('/qanda/list');
      // setQandaList(response.data);

      // 더미 데이터 사용
      setQandaList(dummyQandAList);
    } catch (error) {
      alertError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  // ===== 필터링 및 정렬 함수 =====
  const applyFiltersAndSort = () => {
    let filtered = [...qandaList];

    // 카테고리 필터
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // 상태 필터
    if (selectedStatus !== "all") {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "popular":
          return b.viewCount - a.viewCount;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    setFilteredList(filtered);
  };

  // ===== 이벤트 핸들러들 =====
  const handleSearch = () => {
    applyFiltersAndSort();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBookmark = (qandaId: string) => {
    setQandaList((prev) =>
      prev.map((item) =>
        item.id === qandaId
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      )
    );
  };

  const handleLike = (qandaId: string) => {
    setQandaList((prev) =>
      prev.map((item) =>
        item.id === qandaId ? { ...item, likeCount: item.likeCount + 1 } : item
      )
    );
  };

  // ===== 유틸리티 함수들 =====
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "어제";
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return date.toLocaleDateString("ko-KR");
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "답변대기", color: "point3", icon: faClock };
      case "answered":
        return { label: "답변완료", color: "point2", icon: faCheckCircle };
      case "closed":
        return { label: "해결완료", color: "point", icon: faCheckCircle };
      default:
        return {
          label: "알 수 없음",
          color: "secondary",
          icon: faQuestionCircle,
        };
    }
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case "high":
        return { label: "높음", color: "danger" };
      case "medium":
        return { label: "보통", color: "point3" };
      case "low":
        return { label: "낮음", color: "point2" };
      default:
        return { label: "알 수 없음", color: "secondary" };
    }
  };

  return (
    <div className={styles.qanda_container}>
      {/* ===== 헤더 영역 ===== */}
      <div className={styles.qanda_header}>
        <div className={styles.header_content}>
          <h1 className={styles.page_title}>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className={styles.title_icon}
            />
            Q&A 전문가 답변 시스템
          </h1>
          <p className={styles.page_description}>
            농업 전문가들이 답변하는 질문과 답변 게시판입니다
          </p>
        </div>
      </div>

      {/* ===== 전문가 소개 영역 ===== */}
      <div className={styles.experts_section}>
        <h2 className={styles.section_title}>
          <FontAwesomeIcon icon={faUserTie} />
          전문가 소개
        </h2>
        <div className={styles.experts_list}>
          {expertList.map((expert) => (
            <div key={expert.id} className={styles.expert_card}>
              <img
                src={expert.avatar}
                alt={expert.name}
                className={styles.expert_avatar}
              />
              <div className={styles.expert_info}>
                <h3 className={styles.expert_name}>{expert.name}</h3>
                <div className={styles.expert_expertise}>
                  {expert.expertise.map((exp, index) => (
                    <Badge
                      key={index}
                      color="point2"
                      className={styles.expertise_badge}
                    >
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== 검색 및 필터 영역 ===== */}
      <div className={styles.search_filter_area}>
        <div className={styles.search_section}>
          <div className={styles.search_box}>
            <Input
              type="text"
              placeholder="질문을 검색해보세요..."
              value={searchTerm}
              //   onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.search_input}
            />
            <Button
              onClick={handleSearch}
              className={styles.search_button}
              color="point2"
            >
              <FontAwesomeIcon icon={faSearch} />
              검색
            </Button>
          </div>
        </div>

        <div className={styles.filter_section}>
          <div className={styles.filter_controls}>
            <Select
              value={selectedCategory}
              //   onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filter_select}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>

            <Select
              value={selectedStatus}
              //   onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.filter_select}
            >
              {statusList.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Select>

            <Select
              value={sortBy}
              //   onChange={(e) =>
              //     setSortBy(e.target.value as "latest" | "popular" | "priority")
              //   }
              className={styles.filter_select}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* ===== 질문 목록 영역 ===== */}
      <div className={styles.qanda_list_area}>
        {isLoading ? (
          <div className={styles.loading_state}>
            <div className={styles.loading_spinner}></div>
            <p>질문을 불러오는 중...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className={styles.empty_state}>
            <div className={styles.empty_icon}>❓</div>
            <h3 className={styles.empty_title}>질문이 없습니다</h3>
            <p className={styles.empty_description}>
              {searchTerm ||
              selectedCategory !== "all" ||
              selectedStatus !== "all"
                ? "검색 조건에 맞는 질문이 없습니다."
                : "첫 번째 질문을 작성해보세요!"}
            </p>
            {!searchTerm &&
              selectedCategory === "all" &&
              selectedStatus === "all" && (
                <Button
                  onClick={() => navigate("/community/qanda/write")}
                  className={styles.empty_action_button}
                  color="point2"
                >
                  질문하기
                </Button>
              )}
          </div>
        ) : (
          <div className={styles.qanda_cards}>
            {filteredList.map((item) => {
              const statusInfo = getStatusInfo(item.status);
              const priorityInfo = getPriorityInfo(item.priority);

              return (
                <div key={item.id} className={styles.qanda_card}>
                  {/* ===== 카드 헤더 ===== */}
                  <div className={styles.card_header}>
                    <div className={styles.header_left}>
                      <Badge
                        color={statusInfo.color as any}
                        className={styles.status_badge}
                      >
                        <FontAwesomeIcon icon={statusInfo.icon} />
                        {statusInfo.label}
                      </Badge>
                      <Badge
                        color={priorityInfo.color as any}
                        className={styles.priority_badge}
                      >
                        {priorityInfo.label}
                      </Badge>
                    </div>
                    <div className={styles.header_right}>
                      <button
                        onClick={() => handleBookmark(item.id)}
                        className={`${styles.bookmark_button} ${
                          item.isBookmarked ? styles.bookmarked : ""
                        }`}
                      >
                        <FontAwesomeIcon icon={faBookmark} />
                      </button>
                      <button className={styles.share_button}>
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                  </div>

                  {/* ===== 카드 내용 ===== */}
                  <div className={styles.card_content}>
                    <h3 className={styles.question_title}>
                      <Link to={`/community/qanda/detail/${item.id}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className={styles.question_excerpt}>
                      {item.content.length > 150
                        ? `${item.content.substring(0, 150)}...`
                        : item.content}
                    </p>

                    {/* ===== 태그 ===== */}
                    <div className={styles.tags}>
                      {item.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ===== 카드 푸터 ===== */}
                  <div className={styles.card_footer}>
                    <div className={styles.author_info}>
                      <img
                        src={item.author.avatar || "/images/img_profile.svg"}
                        alt={item.author.name}
                        className={styles.author_avatar}
                      />
                      <div className={styles.author_details}>
                        <span className={styles.author_name}>
                          {item.author.name}
                          {item.author.isExpert && (
                            <FontAwesomeIcon
                              icon={faUserTie}
                              className={styles.expert_icon}
                            />
                          )}
                        </span>
                        <span className={styles.post_date}>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.card_stats}>
                      <div className={styles.stat_item}>
                        <FontAwesomeIcon icon={faEye} />
                        <span>{item.viewCount}</span>
                      </div>
                      <div className={styles.stat_item}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span>{item.likeCount}</span>
                      </div>
                      <div className={styles.stat_item}>
                        <FontAwesomeIcon icon={faComment} />
                        <span>{item.answerCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* ===== 액션 버튼들 ===== */}
                  <div className={styles.card_actions}>
                    <Button
                      onClick={() => handleLike(item.id)}
                      className={styles.like_button}
                      color="secondary"
                      size="sm"
                    >
                      <FontAwesomeIcon icon={faThumbsUp} />
                      좋아요
                    </Button>
                    <Button
                      to={`/community/qanda/detail/${item.id}`}
                      className={styles.view_button}
                      color="point2"
                      size="sm"
                    >
                      보기
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== 질문하기 버튼 영역 ===== */}
      <div className={styles.write_button_area}>
        <Button
          to="/community/qanda/write"
          className={styles.write_button}
          color="point2"
        >
          <FontAwesomeIcon icon={faPlus} />
          질문하기
        </Button>
      </div>
    </div>
  );
};

export default QandA;
