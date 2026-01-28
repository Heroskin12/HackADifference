export default function Button({ color, children }) {
  const colorClasses = {
    red: "border-button-red text-button-red",
    green: "border-button-green text-button-green",
    yellow: "border-button-yellow text-button-yellow",
  };

  const selectedColor = colorClasses[color] || "";
  return (
    <button
      className={`w-auto h-[24px] px-2 font-fun font-normal text-sm rounded-[4px] border-1 ${selectedColor}`}
    >
      {children}
    </button>
  );
}
