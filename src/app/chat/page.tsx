"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "../components/Container/Container";
import Message from "../components/Message/Message";
import socket from "../socket";
import Button from "../components/Button/Button";
import decodeToken from "../api/middleware/userConnected";
import { v4 as uuid } from "uuid";
import usersService from "../api/services/users.Service";
import UserNav from "../components/UserNav/UserNav";
import NavMsg from "../components/NavMsg/NavMsg";

interface IMessage {
  msgID?: string;
  userID?: number;
  name?: string;
  email?: string;
  text?: string;
  isOwner?: boolean;
}

interface IUserLists {
  _id: string;
  name?: string;
  email?: string;
}

export default function Page() {
  const [socketInstance] = useState(socket());
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userLists, setUserLists] = useState<IUserLists[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const [userRoom, setUserRoom] = useState<string | null>(null);
  const [userIsConnected, setUserIsConnected] = useState(false);
  const router = useRouter();
  const userInfoToken = decodeToken();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (!storedToken) {
      router.push("/");
      return;
    }

    setToken(storedToken);

    socketInstance.connect();

    socketInstance.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("Message received", message);
    });

    socketInstance.on("room-users", (users) => {
      console.log("Users in room:", users);
    });

    return () => {
      socketInstance.off("message");
      socketInstance.off("room-users");
      socketInstance.disconnect();
    };
  }, [router]);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (token) {
        try {
          const userList = await usersService(token);
          setUserLists(userList);
        } catch (error) {
          setError("An error occurred while fetching the user list");
        }
      }
    };

    fetchUserLists();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Current room: ${currentRoom}`);
    if (currentRoom && message.trim() !== "") {
      const newMessage = {
        msgID: uuid(),
        userID: userInfoToken?.id,
        name: userInfoToken?.userName,
        email: userInfoToken?.userEmail,
        text: message,
      };

      socketInstance.emit("new-message", currentRoom, newMessage);
      console.log("Message sent", newMessage);
      setMessage("");
    } else {
      console.error("No room selected or message is empty");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const joinRoom = (userEmail: string) => {
    const room = [userInfoToken?.userEmail, userEmail].sort().join("-");
    console.log(`Joining room: ${room}`);
    setCurrentRoom(room);
    socketInstance.emit("join-room", room);
    setMessages([]); // Clear messages when joining a new room
  };

  return (
    <>
      <Container>
        <div className="w-5/6 h-[750px] bg-white rounded-[20px]">
          <UserNav
            userName={userInfoToken?.userName}
            userEmail={userInfoToken?.userEmail}
          />
          <div className="flex">
            <aside className="z-40 w-[400px] h-[674px] rounded-bl-[17px] border-r boder-[#F2F2F2] sm:translate-x-0 bg-white flex flex-col items-center overflow-auto">
              {userLists.length > 0 ? (
                userLists.map((userList, index) => (
                  <div
                    className="bg-[#CDE6F5] w-10/12 h-[75px] rounded-[20px] mt-[20px] hover:cursor-pointer"
                    key={index}
                    onClick={() => {
                      setUserRoom(userList.name!);
                      setUserIsConnected(socketInstance.active);
                      joinRoom(userList.email!);
                    }}
                  >
                    <div className="flex flex-col mt-[20px] ml-[20px]">
                      <p className="font-semibold">{userList.name}</p>
                      <p className="text-[#ADB9C6] text-[14px]">ultima msg</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#CDE6F5] w-10/12 h-[75px] rounded-[20px] mt-[20px]">
                  <div className="flex flex-col mt-[20px] ml-[20px]">
                    <p className="font-semibold">Nenhum Usuário encontrado</p>
                  </div>
                </div>
              )}
            </aside>
            <div className="w-screen">
              <NavMsg
                userName={userRoom ?? userInfoToken?.userName}
                active={userIsConnected}
              />
              <section className="bg-[#F5F5F5] h-[599px] rounded-br-[20px] flex flex-col justify-end">
                {currentRoom ? (
                  <>
                    <div className="overflow-auto">
                      {messages.map((message, index) => (
                        <Message
                          key={index}
                          isOwner={message.userID === userInfoToken?.id}
                          text={message.text}
                        />
                      ))}
                    </div>
                    <div className="relative w-full flex justify-center mb-4">
                      <textarea
                        onChange={handleChangeTextArea}
                        onKeyDown={handleKeyDown}
                        value={message}
                        className="resize-none w-11/12 h-[100px] p-2 rounded-md border border-[#E2E2E2] focus:outline-none"
                        placeholder="Digite sua mensagem aqui"
                      ></textarea>
                      <Button
                        name="Enviar"
                        id="registerBtn"
                        type="submit"
                        onClick={handleSubmit}
                        className="absolute right-[45px] bottom-3 w-[75px] h-[50px] text-black font-semibold rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                      >
                        Enviar -&gt;
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">
                      Nenhuma conversa selecionada
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
