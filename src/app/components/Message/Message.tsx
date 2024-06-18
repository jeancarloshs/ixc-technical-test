import { Component } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IMessage {
  msgID?: string;
  userID?: number;
  name?: string;
  email?: string;
  sendToID?: string;
  receivedID?: string;
  text?: string;
  isOwner?: boolean;
  timestamp?: Date | any;
}

class Message extends Component<IMessage> {
  render() {
    const { msgID, userID, name, email, text, isOwner, timestamp } = this.props;

    const formattedTime = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

    return (
      <div
      className={`m-2 flex w-auto rounded-[20px] h-auto text-black ${
        isOwner ? "self-start bg-[#3282D7]" : "self-end bg-gray-200"
      }`}
        key={msgID}
      >
        <div className="m-4 flex flex-col items-center">
          <span className="text-[14px]">{text}</span>
          <span className="text-[10px] text-gray-600 mr-1 py-1">
            {formattedTime ? format(formattedTime, "dd/MM/yyyy HH:mm:ss", { locale: ptBR }) : ""}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;
