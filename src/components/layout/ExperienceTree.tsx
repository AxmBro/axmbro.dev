import React, { ReactNode } from "react";
import styles from "./ExperienceTree.module.css";
import { ScreenSectionList } from "./ScreenSection";

interface ExperienceTreeContainerProps {
  children?: ReactNode;
}

const ExperienceTreeContainer: React.FC<ExperienceTreeContainerProps> = ({ children }) => {
  return (
    <div className={styles.experienceTreeContainer}>
      {children}
    </div>
  )
};

interface ExperienceTreeProps {
  role: string;
  date: string;
  company: string;
  items?: { name: string, value?: string }[];
  children?: ReactNode;
  id?: string;
}

const ExperienceTree: React.FC<ExperienceTreeProps> = ({ role, date, company, items = [], children, id }) => {
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
  };

  return (
    <div className={styles.container} id={id}>
      <h2 className={styles.role}>{role}</h2>
      <p className={styles.date}>{`${date},`}
        <span className={styles.company} style={{ color: "var(--text-color-2)", fontWeight: 600 }}>{` ${company}`}</span>
      </p>
      <ScreenSectionList
        style={ScreenSectionListStyle}
        items={items}
      />
      {children}
    </div>
  )
};

export { ExperienceTree, ExperienceTreeContainer };