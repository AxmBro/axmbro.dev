import styles from "./popover.module.css";

interface PopoverProps {
  children: React.ReactNode;
}

const Popover = ({ children }: PopoverProps) => {
  return (
    <div className={styles.popover}>
      {children}
    </div>
  );
};

export { Popover };
