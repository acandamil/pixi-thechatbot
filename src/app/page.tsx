"use client";

import { useState } from "react";
import { LoaderCircle, ArrowUp } from "lucide-react";

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
    <div className="flex flex-col w-screen h-screen bg-slate-100 dark:bg-slate-950 items-center">
      <div className="flex-none p-4 font-bold shadow  w-full">
        <div className="flex justify-center align-middle">
          <img
            src="https://framerusercontent.com/images/QkIRNQNrgeQBQ84TUFiTmH2vpo.png"
            alt="Voltquant Logo"
            className="dark:invert h-20"
          />
        </div>
      </div>
      <div className=" flex-1 p-4 overflow-auto dark:bg-slate-950  max-w-3xl w-full">
        {conversation.map((entry, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-t-lg shadow relative max-w-md w-fit ${
              entry.type === "user"
                ? "bg-slate-200 ml-auto rounded-bl-lg text-right dark:text-white dark:bg-slate-700"
                : "bg-slate-50 mr-auto rounded-br-lg dark:text-white dark:bg-slate-800"
            }`}
          >
            <p className="break-words">{entry.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-slate-50 mr-auto rounded-br-lg flex gap-2 text-gray-500 w-fit shadow mb-4 p-4 rounded-t-lg  dark:text-white dark:bg-slate-950">
            <LoaderCircle className="animate-spin" size={24} />
            <span>Loading response...</span>
          </div>
        )}
      </div>
      <div className="flex-none mb-6 p-6  dark:bg-slate-950 max-w-3xl  w-full">
        <div className="flex gap-2  bg-white text-black  dark:bg-slate-800 dark:text-white rounded-xl p-3">
          <input
            placeholder="Write a question"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            className="flex-1 px-3 rounded !outline-none bg-transparent"
          ></input>
          <ArrowUp
            className="p-1 rounded-full hover:bg-slate-800 bg-slate-700 text-white dark:bg-white dark:text-black w-7 h-7"
            onClick={() => send()}
          />
        </div>
      </div>
    </div>
  );
}
