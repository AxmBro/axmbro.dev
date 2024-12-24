import React, { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  buttonColor?: ButtonColor,
  text?: string,
  children?: ReactNode,
  style?: React.CSSProperties;
}

enum ButtonColor {
  defaultEmpty = "defaultEmpty",
  default = "default",
  blue = "blue",
}

const Button: React.FC<ButtonProps> = ({
  buttonColor = ButtonColor.defaultEmpty,
  text,
  children,
  style
}) => {

  return <div className="button" data-color={buttonColor} style={style}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      {text ? text : null}
      {children}
    </div>
  </div>
}

export { Button, ButtonColor };
