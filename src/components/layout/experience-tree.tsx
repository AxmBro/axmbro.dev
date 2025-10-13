import { ReactNode } from "react";
import styles from "./experience-tree.module.css";
import { ScreenSectionList } from "./screen-section";

interface ExperienceTreeContainerProps {
  children?: ReactNode;
}

const ExperienceTreeContainer = ({ children }: ExperienceTreeContainerProps) => {
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

const ExperienceTree = ({ role, date, company, items = [], children, id, index }: ExperienceTreeProps) => {
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
  };

  return (
    <div className={styles.container} id={id}>
      <div className={styles.header}>
        <h2>{`#${index} ${role}`} <span style={{ color: "var(--text-color-2)", fontWeight: 500 }}>@{company}</span></h2>
      </div>
      <p className="mb-4">{`${date}`}</p>
      <ScreenSectionList
        style={ScreenSectionListStyle}
        items={items}
      />
      {children}
    </div>
  )
};

export { ExperienceTree, ExperienceTreeContainer };