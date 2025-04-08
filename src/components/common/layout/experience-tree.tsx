import React, { ReactNode } from "react";
import styles from "./experience-tree.module.css";
import { ScreenSectionList } from "./screen-section";

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
  index?: number;
}

const ExperienceTree: React.FC<ExperienceTreeProps> = ({ role, date, company, items = [], children, id, index }) => {
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
  };

  return (
    <div className={styles.container} id={id}>
      <div className={styles.header}>
        <h2 className={styles.role}>{`#${index} ${role}`}</h2>
        {index && (<p>{date}</p>)}
      </div>
      <p className="mb-4" style={{ color: "var(--text-color-2)", fontWeight: 600 }}>{` ${company}`}</p>
      <ScreenSectionList
        style={ScreenSectionListStyle}
        items={items}
      />
      {children}
    </div>
  )
};

export { ExperienceTree, ExperienceTreeContainer };