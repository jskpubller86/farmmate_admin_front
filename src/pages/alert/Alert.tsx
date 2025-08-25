import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./alert.module.css";
import { Button, Badge } from "../../components/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faFilter,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

type AlertItem = {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
  category: "fund" | "land" | "system" | "general";
};

const Alert: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // 더미 알림 데이터 생성
  useEffect(() => {
    const dummyAlerts: AlertItem[] = [
      {
        id: 1,
        title: "펀드 참여 완료",
        message: "깻잎과 관련된 펀딩에 성공적으로 참여했습니다.",
        type: "success",
        isRead: false,
        createdAt: "2025-01-15T10:30:00",
        category: "fund",
      },
      {
        id: 2,
        title: "새로운 펀드 알림",
        message: "새로운 농작물 펀드가 등록되었습니다. 확인해보세요!",
        type: "info",
        isRead: false,
        createdAt: "2025-01-15T09:15:00",
        category: "fund",
      },
      {
        id: 3,
        title: "임대 신청 승인",
        message: "땅 임대 신청이 승인되었습니다.",
        type: "success",
        isRead: true,
        createdAt: "2025-01-14T16:45:00",
        category: "land",
      },
      {
        id: 4,
        title: "시스템 점검 안내",
        message:
          "2025년 1월 20일 새벽 2시부터 4시까지 시스템 점검이 예정되어 있습니다.",
        type: "warning",
        isRead: true,
        createdAt: "2025-01-14T14:20:00",
        category: "system",
      },
      {
        id: 5,
        title: "펀드 마감 임박",
        message: "참여 중인 펀드가 3일 후 마감됩니다.",
        type: "warning",
        isRead: false,
        createdAt: "2025-01-14T11:30:00",
        category: "fund",
      },
      {
        id: 6,
        title: "환영합니다!",
        message:
          "FarmMate에 오신 것을 환영합니다. 다양한 농작물 펀드에 참여해보세요.",
        type: "info",
        isRead: true,
        createdAt: "2025-01-13T10:00:00",
        category: "general",
      },
    ];
    setAlerts(dummyAlerts);
    setFilteredAlerts(dummyAlerts);
  }, []);

  // 필터링 함수
  const filterAlerts = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredAlerts(alerts);
    } else if (filter === "unread") {
      setFilteredAlerts(alerts.filter((alert) => !alert.isRead));
    } else {
      setFilteredAlerts(alerts.filter((alert) => alert.category === filter));
    }
  };

  // 알림 읽음 처리
  const markAsRead = (alertId: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
    setFilteredAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })));
    setFilteredAlerts((prev) =>
      prev.map((alert) => ({ ...alert, isRead: true }))
    );
  };

  // 알림 삭제
  const deleteAlert = (alertId: number) => {
    if (window.confirm("정말로 이 알림을 삭제하시겠습니까?")) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
      setFilteredAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    }
  };

  // 알림 타입에 따른 아이콘과 색상
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  const getAlertTypeClass = (type: string) => {
    switch (type) {
      case "success":
        return styles.alert_success;
      case "warning":
        return styles.alert_warning;
      case "error":
        return styles.alert_error;
      default:
        return styles.alert_info;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "fund":
        return "펀드";
      case "land":
        return "임대/임차";
      case "system":
        return "시스템";
      default:
        return "일반";
    }
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case "fund":
        return styles.category_fund;
      case "land":
        return styles.category_land;
      case "system":
        return styles.category_system;
      default:
        return styles.category_general;
    }
  };

  // 읽지 않은 알림 개수
  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  return (
    <div className={styles.alert_container}>
      {/* 헤더 */}
      <div className={styles.alert_header}>
        <div className={styles.header_left}>
          <h1 className={styles.page_title}>알림</h1>
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

      {/* 필터 영역 */}
      {showFilters && (
        <div className={styles.filter_area}>
          <div className={styles.filter_buttons}>
            <button
              className={`${styles.filter_btn} ${
                activeFilter === "all" ? styles.filter_active : ""
              }`}
              onClick={() => filterAlerts("all")}
            >
              전체
            </button>
            <button
              className={`${styles.filter_btn} ${
                activeFilter === "unread" ? styles.filter_active : ""
              }`}
              onClick={() => filterAlerts("unread")}
            >
              읽지 않음
            </button>
            <button
              className={`${styles.filter_btn} ${
                activeFilter === "fund" ? styles.filter_active : ""
              }`}
              onClick={() => filterAlerts("fund")}
            >
              펀드
            </button>
            <button
              className={`${styles.filter_btn} ${
                activeFilter === "land" ? styles.filter_active : ""
              }`}
              onClick={() => filterAlerts("land")}
            >
              임대/임차
            </button>
            <button
              className={`${styles.filter_btn} ${
                activeFilter === "system" ? styles.filter_active : ""
              }`}
              onClick={() => filterAlerts("system")}
            >
              시스템
            </button>
          </div>
        </div>
      )}

      {/* 알림 목록 */}
      <div className={styles.alerts_list}>
        {filteredAlerts.length === 0 ? (
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
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`${styles.alert_item} ${
                !alert.isRead ? styles.alert_unread : ""
              }`}
            >
              {/* 알림 타입 아이콘 */}
              <div className={styles.alert_icon}>
                <span className={getAlertTypeClass(alert.type)}>
                  {getAlertIcon(alert.type)}
                </span>
              </div>

              {/* 알림 내용 */}
              <div className={styles.alert_content}>
                <div className={styles.alert_header_row}>
                  <h3 className={styles.alert_title}>{alert.title}</h3>
                  <div className={styles.alert_meta}>
                    <span
                      className={`${styles.category_badge} ${getCategoryClass(
                        alert.category
                      )}`}
                    >
                      {getCategoryText(alert.category)}
                    </span>
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
