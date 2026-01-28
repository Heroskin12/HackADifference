import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { ModalContext } from "../../Reusables/Modal/ModalContext.jsx";

export default function NavbarContainer({ isExpanded, setIsExpanded }) {
  function handleCollapse() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <div
      className={`transition-all duration-300 h-full ${
        isExpanded ? "w-56" : "w-20"
      }`}
    >
      <Navbar collapseHandler={handleCollapse} isExpanded={isExpanded} />
    </div>
  );
}
