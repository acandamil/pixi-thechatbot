"use client";

import { useState } from "react";
import { LoaderCircle, ArrowUp, AlignJustify, SquarePen } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

type Conversation = { type: string; text: string }[];

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<Conversation[]>([[]]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const send = async () => {
    setIsLoading(true);
    const currentConversation = history[currentIndex];
    const temporalMessage = message;
    const newConversation = [
      ...currentConversation,
      { type: "user", text: temporalMessage },
    ];
    const historiesCopyOne = [...history];
    historiesCopyOne[currentIndex] = newConversation;
    setHistory(historiesCopyOne);
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
    const historiesCopy = [...history];
    historiesCopy[currentIndex] = updatedConversation;
    setHistory(historiesCopy);
  };
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-100 dark:bg-slate-950 items-center">
      <div className="flex-none p-4 font-bold shadow  w-full">
        <div className="flex justify-between items-center px-8 ">
          <div />
          <img
            src="https://framerusercontent.com/images/QkIRNQNrgeQBQ84TUFiTmH2vpo.png"
            alt="Voltquant Logo"
            className="dark:invert h-20"
          />
          <PopOver
            history={history}
            setCurrentIndex={setCurrentIndex}
            setHistory={setHistory}
            currentIndex={currentIndex}
          />
        </div>
      </div>
      <div className=" flex-1 p-4 overflow-auto dark:bg-slate-950  max-w-3xl w-full">
        {history[currentIndex].map((entry, index) => (
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

type Props = {
  history: Conversation[];
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  setHistory: (history: Conversation[]) => void;
};
function PopOver(props: Props) {
  return (
    <Popover className="h-fit">
      <PopoverButton className="focus:outline-none">
        <AlignJustify className="text-black  dark:text-white" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className="p-4 divide-black rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 w-56 dark:bg-black dark:text-white"
      >
        <ul className="space-y-2">
          {props.history.map((item, index) => (
            <li
              key={index}
              className={`block rounded-lg py-2 px-3 transition hover:bg-slate-300 dark:hover:bg-slate-800 ${
                index === props.currentIndex
                  ? "bg-slate-200 font-bold dark:bg-slate-700"
                  : ""
              }`}
              onClick={() => props.setCurrentIndex(index)}
            >
              {item[0] == undefined
                ? "empty..."
                : item[0].text.slice(0, 20) + "..."}
            </li>
          ))}
        </ul>
        <button
          className="flex w-full gap-2 rounded-lg my-2 py-2 px-3 transition hover:bg-slate-300 dark:hover:bg-slate-800"
          onClick={() => {
            const newIndex = props.history.length;
            const newHistory = [...props.history, []];
            props.setHistory(newHistory);
            props.setCurrentIndex(newIndex);
          }}
          //disabled={props.history[props.history.length - 1][0] == undefined}
        >
          <SquarePen className="w-4" />
          New chat
        </button>
      </PopoverPanel>
    </Popover>
  );
}
