import styles from "./joined-tabs.module.scss";

export interface TabOption {
  id: string;
  label: string;
}

interface JoinedTabsProps {
  options: TabOption[];
  activeId: string | null;
  onChange: (id: string) => void;
  size?: "small" | "medium";
  disabled?: boolean;
}

export const JoinedTabs = ({
  options,
  activeId,
  onChange,
  size = "medium",
  disabled = false,
}: JoinedTabsProps) => {
  return (
    <div className={styles.tabsWrapper} data-size={size}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.tabButton}
          data-active={activeId === option.id ? "true" : "false"}
          onClick={() => onChange(option.id)}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
