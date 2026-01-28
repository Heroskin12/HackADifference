import { useContext } from "react";
import { ModalContext } from "../Modal/ModalContext.jsx";
export default function ModalButton({ type, children }) {
  const { openModal } = useContext(ModalContext);
  // Determine the classes based on the `type` prop
  let classes = "";
  if (type === "login" || type === "logout") {
    classes =
      "bg-orange-accent text-light-primary px-3 py-2 rounded-[12px] cursor-pointer font-fun font-medium text-sm whitespace-nowrap";
  } else if (type === "signup") {
    classes =
      "border border-dark-primary text-dark-primary px-3 py-2 rounded-[12px] cursor-pointer font-fun font-medium text-sm whitespace-nowrap";
  } else if (type === "deleteAccount") {
    classes =
      "underline text-orange-accent text-[14px] py-2 cursor-pointer font-fun";
  }

  return (
    <button
      className={classes}
      onClick={type === "signup" ? undefined : () => openModal(type)}
      disabled={type === "signup"}
      style={type === "signup" ? { opacity: 0.5, pointerEvents: "none" } : {}}
    >
      {children || "Header Button"}
    </button>
  );
}
