import React, { useState } from 'react';
import styles from './Tabs.module.css';

export interface TabItemProps {
  id: string;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItemProps[];
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  showContent?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveTab,
  onTabChange,
  className,
  showContent = false,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const getClassName = (className?: string) => {
    let cls = styles.tabs;
    if (className) {
      cls += ' ' + className;
    }
    return cls;
  };

  return (
    <div className={getClassName(className)}>
      <div className={styles.tabs_container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabs_item} ${
              activeTab === tab.id ? styles.tabs_item_active : styles.tabs_item_inactive
            }`}
            onClick={() => handleTabClick(tab.id)}
            type="button"
          >
            <span className={styles.tabs_text}>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {showContent && (
        <div className={styles.tabs_content}>
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
