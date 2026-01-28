import BaseModal from "../BaseModal";
import BadgeIcon from "../../../../assets/BadgeIcon";
import BalloonIcon from "../../../../assets/BalloonIcon";
import CertificateIcon from "../../../../assets/CertificateIcon";
import CrownIcon from "../../../../assets/CrownIcon";
import RibbonIcon from "../../../../assets/RibbonIcon";
import StarIcon from "../../../../assets/StarIcon";
import TimelineTrophy from "../../../../assets/TimelineTrophy";
import { useTranslation } from "react-i18next";

export default function LevelModal({ closeModal, selectedLevel }) {
  const { t } = useTranslation("level");

  if (!selectedLevel) return null;

  const getIconForLevel = (levelTitle) => {
    const iconProps = {
      width: "60px",
      height: "60px",
      style: {},
    };

    const getBackgroundColor = () => {
      switch (levelTitle) {
        case "A0 - Absolute Beginner":
          return "bg-blue-100"; // Light blue for beginner
        case "A1 - Beginner":
          return "bg-green-100"; // Light green for progress
        case "A2 - Upper Beginner":
          return "bg-purple-100"; // Light purple for advancement
        case "B1 - Intermediate":
          return "bg-orange-100"; // Light orange for achievement
        case "B1.5 - Upper-Intermediate":
          return "bg-indigo-100"; // Light indigo for progression
        case "B2 - Upper-Intermediate":
          return "bg-yellow-100"; // Light yellow for mastery
        case "C1 - Advanced":
          return "bg-red-100"; // Light red for advanced
        default:
          return "bg-gray-100";
      }
    };

    const icon = (() => {
      switch (levelTitle) {
        case "A0 - Absolute Beginner":
          return <BadgeIcon {...iconProps} />;
        case "A1 - Beginner":
          return <RibbonIcon {...iconProps} />;
        case "A2 - Upper Beginner":
          return <CertificateIcon {...iconProps} />;
        case "B1 - Intermediate":
          return <TimelineTrophy {...iconProps} />;
        case "B1.5 - Upper-Intermediate":
          return <BalloonIcon {...iconProps} />;
        case "B2 - Upper-Intermediate":
          return <CrownIcon {...iconProps} />;
        case "C1 - Advanced":
          return <StarIcon {...iconProps} />;
        default:
          return <BadgeIcon {...iconProps} />;
      }
    })();

    return (
      <div
        className={`w-20 h-20 rounded-full ${getBackgroundColor()} flex items-center justify-center shadow-sm`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
          }}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <BaseModal onClose={closeModal} type="level">
      <div className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* Header with Icon and Title */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex-shrink-0">
              {getIconForLevel(selectedLevel.title)}
            </div>
            <div>
              <h2 className="text-[28px] font-fun font-bold text-dark-primary mb-2">
                {selectedLevel.title}
              </h2>
              {selectedLevel.timeRange && (
                <p className="text-blue-600 font-medium mb-2">
                  {selectedLevel.timeRange}
                </p>
              )}
              <p className="text-gray-600 text-lg">
                {selectedLevel.description}
              </p>
            </div>
          </div>

          {/* How It Feels Section */}
          {selectedLevel.howItFeels && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-dark-primary">
                {t("modal.howItFeels")}
              </h4>
              <p className="text-gray-700 bg-red-50 border-l-4 border-red-200 p-4 rounded-r-lg leading-relaxed">
                {selectedLevel.howItFeels}
              </p>
            </div>
          )}

          {/* What You Need To Do Section */}
          {selectedLevel.whatToDo && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-dark-primary">
                {t("modal.whatToDo")}
              </h4>
              <div className="text-gray-700 bg-blue-50 border-l-4 border-blue-200 p-4 rounded-r-lg leading-relaxed whitespace-pre-line">
                {selectedLevel.whatToDo}
              </div>
            </div>
          )}

          {/* What You Will Learn Section */}
          {selectedLevel.whatYouLearn && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-dark-primary">
                {t("modal.whatYouLearn")}
              </h4>
              <p className="text-gray-700 bg-green-50 border-l-4 border-green-200 p-4 rounded-r-lg leading-relaxed">
                {selectedLevel.whatYouLearn}
              </p>
            </div>
          )}

          {/* Key Skills Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-dark-primary">
              {t("modal.keySkills")}
            </h4>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {selectedLevel.skills}
            </p>
          </div>

          {/* Requirements Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-dark-primary">
              {t("modal.requirements")}
            </h4>
            <ul className="space-y-3">
              {selectedLevel.requirements.map((req, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 mt-1 text-lg">•</span>
                  <span className="leading-relaxed font-primary">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
