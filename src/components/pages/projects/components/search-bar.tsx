
import styles from "../projects.module.css"
import { Button, ButtonColor } from "../../../common/button/button";
import { useEffect, useState } from "react";
import { Popover } from "../../../common/popover/popover";
import global_styles from "../../../common/global/global-styles.module.css";
import settings_icon from "../../../../assets/settings_icon.png";

interface ProjectsSearchbarProps {
  search: string;
  setSearch: (value: string) => void;
  buttonsActionsArray: { ref: boolean; text1: string; text2: string; action: () => void }[];
}

export const ProjectsSearchbar: React.FC<ProjectsSearchbarProps> = ({ search, setSearch, buttonsActionsArray }) => {
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [showPopover, setShowPopover] = useState(false); // State to manage popover visibility

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setSearch(target.value);
  }

  useEffect(() => {
    const texts = ["Title", "Description", "Tags"];
    let currentIndex = 1;

    setAnimatedPlaceholder(texts[0]);
    const intervalId = setInterval(() => {
      setAnimatedPlaceholder(texts[currentIndex]);
      currentIndex = (currentIndex + 1) % texts.length;
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.searchBarWrapper}>
      <input type="text" className={global_styles.formInputText} placeholder={`Search by: ${animatedPlaceholder}`} value={search} onChange={handleChangeInput} />
      <div style={{ position: "relative" }}>
        <Button
          style={{ minWidth: "2.75rem", whiteSpace: "nowrap" }}
          // text="Options"
          buttonColor={ButtonColor.defaultEmpty2}
          onClick={() => setShowPopover(!showPopover)}>
          <img src={settings_icon} alt="settings_icon" style={{ height: "1.25rem" }} />
          {/* <p>Options</p> */}
        </Button>
        {showPopover && (
          <Popover>
            {buttonsActionsArray.map((buttonAction, index) => {
              return (
                <Button
                  key={`buttonAction${index}`}
                  text={buttonAction.ref ? buttonAction.text1 : buttonAction.text2}
                  onClick={buttonAction.action}
                  buttonColor={index === 0 ? ButtonColor.blue : ButtonColor.default}
                />
              )
            })}
          </Popover>
        )}
      </div>
      {search && (<div onClick={() => setSearch("")}>
        <Button style={{ width: "2.75rem", minWidth: "0" }} text="X" buttonColor={ButtonColor.defaultEmpty2}></Button>
      </div>)}
    </div>
  )
}