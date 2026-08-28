import styles from "./joined-tabs.module.scss";

interface TabOption {
  id: string;
  label: string;
}

interface JoinedTabsProps {
  options: TabOption[];
  activeId: string | null;
  onChange: (id: string) => void;
  size?: "small" | "medium";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const JoinedTabs = ({
  options,
  activeId,
  onChange,
  size = "medium",
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: JoinedTabsProps) => {
  return (
    <div
      className={styles.tabsWrapper}
      data-size={size}
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {options.map((option) => {
        const isActive = activeId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            className={styles.tabButton}
            data-active={isActive ? "true" : "false"}
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            disabled={disabled}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
