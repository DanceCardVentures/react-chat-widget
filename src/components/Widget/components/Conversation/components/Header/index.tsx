import React from "react";
import { useSelector } from "react-redux";

const close = require("../../../../../../../assets/clear-button.svg")
  .default as string;

import "./style.scss";
import { GlobalState } from "@types";

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
};

function Header({
  title,
  subtitle,
  toggleChat,
  showCloseButton,
  titleAvatar,
}: Props) {
  const { parameters } = useSelector((state: GlobalState) => ({
    parameters: state.dialogConfig.parameters,
  }));

  return (
    <div
      style={{ background: parameters?.titleBackgroundColor }}
      className="rcw-header"
    >
      {window.innerWidth < 600 && (
        <button className="rcw-header-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      )}
      <h4 style={{ color: parameters?.titleFontColor }} className="rcw-title">
        {titleAvatar && (
          <img src={titleAvatar} className="avatar" alt="profile" />
        )}
        {title}
      </h4>
      <span style={{ color: parameters?.titleFontColor }}>{subtitle}</span>
    </div>
  );
}

export default Header;
