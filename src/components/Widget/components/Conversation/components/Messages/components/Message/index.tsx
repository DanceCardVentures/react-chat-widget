import React from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { GlobalState, Message } from 'src/store/types';

import './styles.scss';

type Props = {
  message: Message;
  showTimeStamp: boolean;
};

function Message({ message, showTimeStamp }: Props) {
  const { parameters } = useSelector((state: GlobalState) => ({
    parameters: state.dialogConfig.parameters
  }));

  const sanitizedHTML = markdownIt()
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, {
      attrs: { target: '_blank', rel: 'noopener' }
    })
    .render(message.text);

  const messageBackground =
    message.sender === 'response' ? parameters?.robotBackgroundColor : parameters?.userBackgroundColor;
  const messageTextColor =
    message.sender === 'response' ? parameters?.robotTextColor : parameters?.userTextColor;

  return (
    <div className={`rcw-${message.sender}`}>
      <div
        style={{
          background: messageBackground,
          color: messageTextColor,
          fontSize: parameters?.fontSize
        }}
        className="rcw-message-text"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
      {showTimeStamp && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm')}</span>}
    </div>
  );
}

export default Message;
