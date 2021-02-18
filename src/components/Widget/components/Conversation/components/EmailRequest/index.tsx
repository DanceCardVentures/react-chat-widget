import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { GlobalState } from "src/store/types";

import { toggleShowEmailRequestPopup } from "src/store/dispatcher";

import { defineWidgetHeight } from "src/components/Widget/components/Conversation/components/Messages";

import malboxIconSrc from "../../../../../../../assets/mailbox.png";
import doneIconSrc from "../../../../../../../assets/done-icon.svg";

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
      duration: 0,
      delay: 0.25,
    },
  },
};

const animationVariantsThanks = {
  visible: {
    opacity: 1,
    visibility: "visible",
    transition: {
      duration: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    visibility: "hidden",
    transition: {
      duration: 0.1,
    },
  },
};

function EmailRequest() {
  const { parameters, activeMessage, showPopup } = useSelector(
    (state: GlobalState) => ({
      activeMessage: state.dialogConfig.activeMessage,
      parameters: state.dialogConfig.parameters,
      showPopup: state.behavior.showEmailRequestPopup,
    })
  );

  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThanksPage, setShowThanksPage] = useState(false);

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
        setShowThanksPage(true);
        setIsLoading(false);
        dispatch(toggleShowEmailRequestPopup);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const style = {
    width: parameters?.chatbotWidth,
    height: parameters?.chatbotHeight
      ? defineWidgetHeight(parameters?.chatbotHeight) + 278
      : 500,
  };

  return (
    <React.Fragment>
      <motion.div
        className="rcw-email-request-holder"
        style={style}
        initial={false}
        variants={animationVariants}
        animate={
          showPopup && activeMessage?.shouldRequestForEmail
            ? "visible"
            : "hidden"
        }
      >
        <div className="rcw-mailbox-icon-holder">
          <img src={malboxIconSrc} alt="Mailbox" />
        </div>

        <p className="rcw-email-request-description">
          {activeMessage?.message}
        </p>

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
              {isLoading ? "Sending..." : "Send"}
            </button>
            <button
              onClick={() => dispatch(toggleShowEmailRequestPopup())}
              type="button"
            >
              Cancel
            </button>
          </section>
        </form>
      </motion.div>

      <motion.div
        className="rcw-email-request-holder"
        style={style}
        initial={false}
        variants={animationVariantsThanks}
        animate={showThanksPage ? "visible" : "hidden"}
      >
        <div className="rcw-mailbox-icon-holder">
          <img src={doneIconSrc} alt="Done" />
        </div>

        <p className="rcw-email-request-description">Thanks!</p>

        <form>
          <section>
            <button
              type="button"
              className="rcw-email-request-submit-button"
              onClick={() => setShowThanksPage(false)}
            >
              Done
            </button>
          </section>
        </form>
      </motion.div>
    </React.Fragment>
  );
}

export default EmailRequest;
