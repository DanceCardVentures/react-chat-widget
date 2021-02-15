import React, { useState } from "react";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { GlobalState } from "src/store/types";

import malboxIconSrc from "../../../../../../../assets/mailbox.png";

import "./style.scss";

/* - - - - - - - - - - - - - - - - - - - - - */

const animationVariants = {
  visible: {
    opacity: 1,
    visibility: "visible",
    transition: {
      duration: 0.4,
      delay: 0.25,
    },
  },
  hidden: {
    opacity: 0,
    visibility: "hidden",
    transition: {
      duration: 0.2,
    },
  },
};

function EmailRequest() {
  const { parameters, activeMessage } = useSelector((state: GlobalState) => ({
    activeMessage: state.dialogConfig.activeMessage,
    parameters: state.dialogConfig.parameters,
  }));

  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();

    const integrationId = "1d20328f-b6ef-4ead-a535-90c7e912f725";
    const URL = `https://cs-back-dev.dancecardrx.com/consumer-api/v1/chatbot/widget/send-marketing-pdf/`;

    setIsLoading(true);

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: integrationId,
        recipientEmail: emailValue,
      }),
    })
      .then(() => {
        setIsComplete(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const style = {
    width: parameters?.chatbotWidth,
    height: parameters?.chatbotHeight ? parameters?.chatbotHeight + 80 : 500,
  };

  return (
    <motion.div
      className="rcw-email-request-holder"
      style={style}
      initial={false}
      variants={animationVariants}
      animate={
        !isComplete && activeMessage?.shouldRequestForEmail
          ? "visible"
          : "hidden"
      }
    >
      <div className="rcw-mailbox-icon-holder">
        <img src={malboxIconSrc} alt="Mailbox" />
      </div>

      <p className="rcw-email-request-description">{activeMessage?.message}</p>

      <form onSubmit={handleSendEmail}>
        <input
          required
          type="email"
          placeholder="Email address"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <section>
          <button type="submit" className="rcw-email-request-submit-button">
            <span>{isLoading ? "Sending..." : "Send"}</span>
          </button>
          <button onClick={() => setIsComplete(true)} type="button">
            Cancel
          </button>
        </section>
      </form>
    </motion.div>
  );
}

export default EmailRequest;
