import React, { ReactNode } from "react";
import styles from "./experience_tree.module.css";
import { ScreenSectionList } from "./layout/screen_section";

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
}

const ExperienceTree: React.FC<ExperienceTreeProps> = ({ role, date, company, items = [], children }) => {
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
  };

  return (
    <div className={styles.container}>
      <div className={styles.roleDateContainer}>
        <h1 className={styles.role}>{role}</h1>
        <h2 className={styles.date}>{date}</h2>
      </div>
      <h2 className={styles.company} style={{ color: "var(--secondary-text-color)" }}>{company}</h2>
      <ScreenSectionList
        style={ScreenSectionListStyle}
        items={items}
      />
      {children}
    </div>
  )
};

export { ExperienceTree, ExperienceTreeContainer };