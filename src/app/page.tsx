"use client";

import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<
    { type: string; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    setIsLoading(true);
    const temporalMessage = message;
    const newConversation = [
      ...conversation,
      { type: "user", text: temporalMessage },
    ];
    setConversation(newConversation);
    setMessage("");
    const response = await fetch(
      "/api/chat?query=" + temporalMessage + "&email=auroracandamil",
      {
        method: "POST",
        mode: "cors",
      }
    );
    const json = await response.json();
    const updatedConversation = [
      ...newConversation,
      { type: "bot", text: json.answer },
    ];
    setIsLoading(false);
    setConversation(updatedConversation);
  };
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-100">
      <div className="flex-none p-4 bg-slate-100 font-bold shadow ">
        <div className="flex justify-center align-middle">
          <img
            src="https://framerusercontent.com/images/QkIRNQNrgeQBQ84TUFiTmH2vpo.png"
            alt="Voltquant Logo"
            className="h-20"
          />
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {conversation.map((entry, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-t-lg shadow relative max-w-md w-fit ${
              entry.type === "user"
                ? "bg-slate-200 ml-auto rounded-bl-lg text-right"
                : "bg-slate-50 mr-auto rounded-br-lg"
            }`}
          >
            <p className="break-words">{entry.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-slate-50 mr-auto rounded-br-lg flex gap-2 text-gray-500 w-fit shadow mb-4 p-4 rounded-t-lg">
            <LoaderCircle className="animate-spin" size={24} />
            <span>Loading response...</span>
          </div>
        )}
      </div>
      <div className="flex-none mb-6 p-6 bg-slate-100 text-white">
        <div className="flex gap-2">
          <input
            placeholder="Write a question"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            className="flex-1 p-2 px-4 rounded bg-white text-black"
          ></input>
          <Send
            className="p-2 rounded bg-slate-500 hover:bg-slate-800 transition text-white"
            size={40}
            onClick={() => send()}
          />
        </div>
      </div>
    </div>
  );
}
