import { Conversation } from "@/app/page";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { AlignJustify, SquarePen } from "lucide-react";

type Props = {
  history: Conversation[];
  currentIndex: number;
  setCurrentIndex: (currentIndex: number) => void;
  setHistory: (history: Conversation[]) => void;
};
export default function PopOver(props: Props) {
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
