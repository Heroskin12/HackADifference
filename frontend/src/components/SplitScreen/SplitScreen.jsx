import { useState } from "react";
import { Outlet } from "react-router";
import NavManager from "../Navbar/NavManager";
import GoalProvider from "../../context/GoalContext";

export default function SplitScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const filterLists = {
    filters: [
      { key: "level", values: ["Beginner", "Intermediate", "Advanced"] },
      { key: "accent", values: ["US", "UK", "AU"] },
      {
        key: "topic",
        values: [
          "Speaking",
          "Listening",
          "Pronunciation",
          "Idioms",
          "Vocabulary",
          "Business",
          "Travel",
          "Culture",
        ],
      },
    ],
  };

  return (
    <div className="md:flex h-screen">
      <NavManager isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div className="bg-dark-primary flex-1">
        <div
          className={`
            bg-light-primary
            md:rounded-tl-[15px] rounded-bl-[15px]
            p-4 
            transition-all duration-300
            ${isExpanded ? "md:ml-56" : "md:ml-20"}
          `}
        >
          <div className="relative">
            <GoalProvider>
              <Outlet />
            </GoalProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
