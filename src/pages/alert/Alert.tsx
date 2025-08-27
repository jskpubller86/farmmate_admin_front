import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./alert.module.css";
import { Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faFilter,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

// 타입 정의
type AlertType = "info" | "success" | "warning" | "error";

interface AlertItem {
  id: number;
  title: string;
  message: string;
  type: AlertType;
  isRead: boolean;
  createdAt: string;
}

// 상수 정의
const ALERT_ICONS = {
  success: "✅",
  warning: "⚠️",
  error: "❌",
  info: "ℹ️",
} as const;

// 더미 데이터
const DUMMY_ALERTS: AlertItem[] = [
  {
    id: 1,
    title: "거래 완료",
    message: "농부123님과 깻잎거래가 성공적으로 완료되었습니다.",
    type: "success",
    isRead: false,
    createdAt: "2025-01-15T10:30:00",
  },
  {
    id: 2,
    title: "새로운 거래 알림",
    message: "거래 신청이 들어왔습니다. 확인해보세요!",
    type: "info",
    isRead: false,
    createdAt: "2025-01-15T09:15:00",
  },
  {
    id: 3,
    title: "임대 신청 승인",
    message: "땅 임대 신청이 승인되었습니다.",
    type: "success",
    isRead: true,
    createdAt: "2025-01-14T16:45:00",
  },
  {
    id: 4,
    title: "시스템 점검 안내",
    message:
      "2025년 1월 20일 새벽 2시부터 4시까지 시스템 점검이 예정되어 있습니다.",
    type: "warning",
    isRead: true,
    createdAt: "2025-01-14T14:20:00",
  },
  {
    id: 5,
    title: "거래 마감 임박",
    message: "딸기 거래가 3일 후 마감됩니다.",
    type: "warning",
    isRead: false,
    createdAt: "2025-01-14T11:30:00",
  },
  {
    id: 6,
    title: "환영합니다!",
    message:
      "FarmMate에 오신 것을 환영합니다. 다양한 농작물 펀드에 참여해보세요.",
    type: "info",
    isRead: true,
    createdAt: "2025-01-13T10:00:00",
  },
];

const Alert: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"time" | "priority">("time");

  // 초기 데이터 로드
  useEffect(() => {
    setAlerts(DUMMY_ALERTS);
    setFilteredAlerts(DUMMY_ALERTS);
  }, []);

  // 읽지 않은 알림 개수
  const unreadCount = useMemo(
    () => alerts.filter((alert) => !alert.isRead).length,
    [alerts]
  );

  // 필터링 및 정렬된 알림
  const processedAlerts = useMemo(() => {
    let filtered = alerts;

    // 카테고리/상태 필터링
    if (activeFilter !== "all") {
      if (activeFilter === "unread") {
        filtered = filtered.filter((alert) => !alert.isRead);
      }
    }
    return filtered;
  }, [alerts, activeFilter]);

  // 필터링 함수
  const handleFilter = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  // 알림 읽음 처리
  const markAsRead = useCallback((alertId: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  }, []);

  // 모든 알림 읽음 처리
  const markAllAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })));
  }, []);

  // 알림 삭제
  const deleteAlert = useCallback((alertId: number) => {
    if (window.confirm("정말로 이 알림을 삭제하시겠습니까?")) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    }
  }, []);

  // 유틸리티 함수들
  const getAlertIcon = (type: AlertType) => ALERT_ICONS[type];

  // 필터 옵션들
  const filterOptions = [
    { key: "all", label: "전체" },
    { key: "unread", label: "읽지 않음" },
    { key: "market", label: "마켓" },
    { key: "land", label: "임대/임차" },
    { key: "system", label: "시스템" },
  ];

  return (
    <div className={styles.alert_container}>
      {/* 헤더 */}
      <div className={styles.alert_header}>
        <div className={styles.header_left}>
          <h1 className={styles.page_title}>
            <FontAwesomeIcon icon={faBell} className={styles.title_icon} />
            알림
          </h1>
          {unreadCount > 0 && (
            <Badge className={styles.unread_badge}>{unreadCount}</Badge>
          )}
        </div>
        <div className={styles.header_right}>
          <Button
            className={styles.filter_toggle_btn}
            onClick={() => setShowFilters(!showFilters)}
            color="secondary"
          >
            <FontAwesomeIcon icon={faFilter} />
            필터
          </Button>
          {unreadCount > 0 && (
            <Button
              className={styles.mark_all_read_btn}
              onClick={markAllAsRead}
              color="point2"
            >
              모두 읽음
            </Button>
          )}
        </div>
      </div>

      {/* 정렬 선택 */}
      <div className={styles.sort_area}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "time" | "priority")}
          className={styles.sort_select}
        >
          <option value="time">시간순</option>
          <option value="priority">우선순위순</option>
        </select>
      </div>

      {/* 필터 영역 */}
      {showFilters && (
        <div className={styles.filter_area}>
          <div className={styles.filter_buttons}>
            {filterOptions.map(({ key, label }) => (
              <button
                key={key}
                className={`${styles.filter_btn} ${
                  activeFilter === key ? styles.filter_active : ""
                }`}
                onClick={() => handleFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 알림 목록 */}
      <div className={styles.alerts_list}>
        {processedAlerts.length === 0 ? (
          <div className={styles.empty_state}>
            <div className={styles.empty_icon}>🔔</div>
            <h3 className={styles.empty_title}>알림이 없습니다</h3>
            <p className={styles.empty_description}>
              {activeFilter === "all"
                ? "새로운 알림이 도착하면 여기에 표시됩니다."
                : "해당 조건의 알림이 없습니다."}
            </p>
          </div>
        ) : (
          processedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`${styles.alert_item} ${
                !alert.isRead ? styles.alert_unread : ""
              }`}
            >
              {/* 알림 아이콘 */}
              <div className={styles.alert_icon}>
                <span
                  className={`${styles.alert_type} ${
                    styles[`alert_${alert.type}`]
                  }`}
                >
                  {getAlertIcon(alert.type)}
                </span>
              </div>

              {/* 알림 내용 */}
              <div className={styles.alert_content}>
                <div className={styles.alert_header_row}>
                  <h3 className={styles.alert_title}>{alert.title}</h3>
                  <div className={styles.alert_meta}>
                    <span className={styles.alert_time}>
                      {new Date(alert.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className={styles.alert_message}>{alert.message}</p>
              </div>

              {/* 액션 버튼들 */}
              <div className={styles.alert_actions}>
                {!alert.isRead && (
                  <Button
                    className={styles.mark_read_btn}
                    onClick={() => markAsRead(alert.id)}
                    color="point2"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    읽음
                  </Button>
                )}
                <Button
                  className={styles.delete_btn}
                  onClick={() => deleteAlert(alert.id)}
                  color="danger"
                  size="sm"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  삭제
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 뒤로가기 버튼 */}
      <div className={styles.back_button_container}>
        <Button
          className={styles.back_button}
          onClick={() => navigate(-1)}
          color="secondary"
        >
          뒤로가기
        </Button>
      </div>
    </div>
  );
};

export default Alert;
