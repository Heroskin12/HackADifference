export default function BaseModal({ onClose, children, type, className = "" }) {
  const getDefaultWidth = () => {
    switch (type) {
      case "level":
        return "w-[800px] max-w-[90vw]"; // Wider for level modal
      case "login":
      case "signup":
        return "w-[480px] max-w-[90vw]"; // Wider for auth modals to accommodate Spanish text
      default:
        return "w-[421px]"; // Original width for other modals
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={type == "login" || type == "signup" ? onClose : undefined}
    >
      <div
        className={`bg-white drop-shadow-lg relative px-[20px] pt-[50px] pb-[20px] rounded-[17px] ${getDefaultWidth()} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
}
