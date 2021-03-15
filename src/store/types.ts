import { ElementType } from "react";

type BaseMessage = {
  type: string;
  component: ElementType;
  sender: string;
  showAvatar: boolean;
  timestamp: Date;
  unread: boolean;
  customId?: string;
  props?: any;
  wistiaMatcher?: string;
};

export interface Message extends BaseMessage {
  text: string;
}

export type QuickButton = {
  label: string;
  value: string | number;
  component: ElementType;
};

export interface Link extends BaseMessage {
  title: string;
  link: string;
  target: string;
}

export interface LinkParams {
  link: string;
  title: string;
  target?: string;
}

export interface CustomCompMessage extends BaseMessage {
  props: any;
}

export interface DialogQuickResponse {
  label: string;
  value: string;
}

export interface DialogActiveMessage {
  message: string;
  quickResponses: DialogQuickResponse[];
  shouldRequestForEmail?: boolean;
}

export type Testimonial = {
  author: string;
  text: string;
};

export interface DialogConfig {
  firstStepId: string;
  script: object;
  credibilityBuilders: string[];
  testimonials: Testimonial[];
  phoneNumberParameters: {
    phoneNumber: string;
    delayInSeconds: number;
  };
}

export interface WidgetParameters {
  titleFontColor: string;
  titleBackgroundColor: string;
  robotBackgroundColor: string;
  robotTextColor: string;
  userBackgroundColor: string;
  userTextColor: string;
  chatOptionButtonBackgroundColor: string;
  chatOptionButtonTextColor: string;
  openButtonColor: string;
  linkColor: string;
  phoneIconColor: string;
  fontSize: number;
  title: string;
  subTitle: string;
  chatbotWidth: number;
  chatbotHeight: number;
  autoopenChatbot: boolean;
  css?: string;
}

export interface DialogConfigState {
  config: DialogConfig | undefined;
  activeMessage: DialogActiveMessage | undefined;
  parameters: WidgetParameters | undefined;
}

export interface BehaviorState {
  showChat: boolean;
  disabledInput: boolean;
  messageLoader: boolean;
  showEmailRequestPopup: boolean;
  phoneNumberIsVisible: boolean;
}

export interface MessagesState {
  messages: (Message | Link | CustomCompMessage)[];
  badgeCount: number;
}

export interface QuickButtonsState {
  quickButtons: QuickButton[];
}

export interface ImageState {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export interface FullscreenPreviewState extends ImageState {
  visible?: boolean;
  videoMatcher: string;
}

export interface GlobalState {
  dialogConfig: DialogConfigState;
  messages: MessagesState;
  behavior: BehaviorState;
  quickButtons: QuickButtonsState;
  preview: FullscreenPreviewState;
}
