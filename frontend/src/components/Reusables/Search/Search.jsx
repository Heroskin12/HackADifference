import SearchIcon from "../../../assets/SearchIcon";
import { useTranslation } from "react-i18next";

export default function Search({ onSearchChange }) {
  const { t } = useTranslation("home");
  const handleInputChange = (event) => {
    onSearchChange(event.target.value); // Update the search query in context
  };

  return (
    <div className="flex items-center space-x-4 w-full">
      <div className="relative flex w-full md:mr-2">
        <input
          type="text"
          onChange={handleInputChange}
          placeholder={t("search.placeholder")}
          className="w-[199px] md:w-full h-[42px] p-[10px] rounded-md bg-white text-dark-primary placeholder-gray-500 focus:outline-none border-1 border-dark-primary font-primary placeholder:font-fun"
        />
        <div className="absolute w-[30px] h-[30px] rounded-[7px] right-3 top-1/2 transform -translate-y-1/2 bg-orange-accent flex items-center justify-center cursor-pointer">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
