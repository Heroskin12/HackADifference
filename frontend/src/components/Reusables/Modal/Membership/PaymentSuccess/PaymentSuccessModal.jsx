import BaseModal from "../../BaseModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function PaymentSuccessModal({ closeModal }) {
  const { t } = useTranslation("common");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true);

    // Optional: Stop confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartWatching = () => {
    window.location.hash = "";
    closeModal();
  };

  return (
    <BaseModal onClose={closeModal} type="paymentSuccess">
      {/* Confetti Container */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: [
                  "#ff6b6b",
                  "#4ecdc4",
                  "#45b7d1",
                  "#f9ca24",
                  "#f0932b",
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center p-6 relative z-10">
        <div className="animate-bounce mb-4">
          <div className="text-6xl">🎉</div>
        </div>
        <h2 className="text-[24px] font-fun font-semibold text-dark-primary text-center mb-4 animate-fade-in">
          {t("paymentSuccess.title")}
        </h2>
        <p className="text-[14px] font-primary text-gray-600 text-center mb-6 animate-fade-in-delayed">
          {t("paymentSuccess.description")}
        </p>
        <div className="flex gap-4">
          <button
            className="bg-orange-accent text-white px-6 py-2 rounded-md cursor-pointer transform hover:scale-105 transition-transform"
            onClick={handleStartWatching}
          >
            {t("paymentSuccess.startWatching")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
