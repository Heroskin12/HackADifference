import SearchIcon from "../../../assets/SearchIcon";
export default function MobileSearchInactive({ clickHandler }) {
  return (
    <button
      className="transition-all duration-400 ease-in-out w-[30px] h-[30px] rounded-[7px] bg-orange-accent flex items-center justify-center cursor-pointer"
      onClick={() => clickHandler(true)}
      aria-label="Open search"
    >
      <SearchIcon />
    </button>
  );
}
