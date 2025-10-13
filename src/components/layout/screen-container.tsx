import { ReactNode, useEffect, useState } from "react";
import styles from "./screen-container.module.css";

interface ScreenContainerProps {
  children: ReactNode,
  style?: React.CSSProperties,
  useMinHeight?: boolean,
  id?: string,
  className?: string,
  documentTitle?: string
}

const ScreenContainer = ({ children, style, useMinHeight = true, id, className, documentTitle }: ScreenContainerProps) => {
  const [minHeight, setMinHeight] = useState("0");
  const [locationChange, setLocationChange] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const header = document.getElementById('header');
      const headerOffset = header ? header.offsetHeight : 0;
      const footer = document.getElementById('footer');
      const footerOffset = footer ? footer.offsetHeight : 0;
      setMinHeight(
        useMinHeight ? `calc(100vh - ${headerOffset + footerOffset + 1}px)` : "0"
      );
    }

    handleResize();
    setLocationChange(false)
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [useMinHeight, locationChange]);

  useEffect(() => {
    if (documentTitle) {
      document.title = documentTitle;
    }
  }, []);

  return (
    <div id={id} style={{ minHeight: minHeight }} className={className}>
      <div className={styles.screenContainer} style={style}>
        <div className={styles.screenContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export { ScreenContainer };
