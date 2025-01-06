import React, { ReactNode, useEffect, useState } from "react";
import styles from "./screen_container.module.css";
import { useLocation } from "react-router-dom";

interface ScreenContainerProps {
  children: ReactNode,
  style?: React.CSSProperties
  useMinHeight?: boolean,
  id?: string
  className?: string
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style, useMinHeight = true, id, className }) => {
  const [minHeight, setMinHeight] = useState("0");
  const [locationChange, setLocationChange] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setLocationChange(true)
  }, [location]);

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
