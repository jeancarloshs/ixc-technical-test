import { Component } from "react";

interface IMessage {
  msgID?: string;
  userID?: number;
  name?: string;
  email?: string;
  text?: string;
  isOwner?: boolean;
  key?: string | undefined;
}

class Message extends Component<IMessage> {
  render() {
    const { msgID, userID, name, email, text, isOwner, key } = this.props;
    return <div className={`m-2 pr-3 flex ${isOwner && "self-end"}`} key={msgID}>
        <div className="mr-4 flex flex-col items-center">
            <span className="text-black">{text}</span>
        </div>
    </div>;
  }
}

export default Message;