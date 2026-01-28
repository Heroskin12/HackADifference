import LevelModal from "./LevelModal";
import { useContext } from "react";
import { ModalContext } from "../ModalContext";

export default function LevelModalContainer({ selectedLevel }) {
  const { closeModal, isOpen, type } = useContext(ModalContext);

  if (!isOpen || type !== "level") return null;

  return <LevelModal closeModal={closeModal} selectedLevel={selectedLevel} />;
}
