import React from "react";
import { useSelector } from "react-redux";

import cn from "classnames";
import { motion } from "framer-motion";

import { GlobalState } from "../../../../store/types";

import Testimonials from "src/components/Widget/components/Conversation/components/Testimonials";

import "./style.scss";

import closeIconSrc from "../../../../../assets/close-icon.svg";
import avatarImageSrc from "../../../../../assets/avatar.png";

type Props = {
  toggle: () => void;
  chatId: string;
  openLabel: string;
  closeLabel: string;
};

function Launcher({ toggle }: Props) {
  const { showChat, parameters } = useSelector((state: GlobalState) => ({
    showChat: state.behavior.showChat,
    parameters: state.dialogConfig.parameters,
  }));

  const buttonVarianst = {
    fullWidth: {
      width: window.innerWidth < 600 ? 235 : 275,
      height: window.innerWidth < 600 ? 40 : 42,
      transition: {
        delayChildren: 0.1,
      },
    },
    collapsed: {
      width: 52,
      height: 52,
      borderRadius: 26,
      transition: {},
    },
  };

  const contentHolderVariants = {
    fullWidth: { opacity: 1, transition: { duration: 0.2 } },
    collapsed: { opacity: 0, transition: { duration: 0 } },
  };

  return (
    <div
      className={cn("rcw-laucner-button-holder", {
        "rcw-laucner-button-holder-chat-is-open": showChat,
      })}
    >
      <motion.button
        style={{ background: parameters?.openButtonColor }}
        className="rcw-launcher-animated-button"
        initial={false}
        onClick={toggle}
        animate={showChat ? "collapsed" : "fullWidth"}
        variants={buttonVarianst}
      >
        {showChat ? (
          <img className="rcw-close-icon" src={closeIconSrc} alt="Close" />
        ) : (
          <motion.div variants={contentHolderVariants}>
            <img
              className="rcw-launcher-avatar-image"
              src={avatarImageSrc}
              alt="Avatar image"
            />
          </motion.div>
        )}

        <motion.div
          style={{ textAlign: "left" }}
          variants={contentHolderVariants}
        >
          <Testimonials isLaunerEmbdded />
        </motion.div>
      </motion.button>
    </div>
  );
}

export default Launcher;
