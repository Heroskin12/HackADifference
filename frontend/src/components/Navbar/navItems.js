import HomeIcon from "../../assets/NavIcons/HomeIcon.jsx";
import ProgressIcon from "../../assets/NavIcons/ProgressIcon.jsx";
import UserIcon from "../../assets/NavIcons/UserIcon.jsx";
import SettingsIcon from "../../assets/NavIcons/SettingsIcon.jsx";
import AboutIcon from "../../assets/NavIcons/AboutIcon.jsx";

export const navItems = [
  { name: "Home", translationKey: "home", route: "/", Icon: HomeIcon },
  {
    name: "Progress",
    translationKey: "progress",
    route: "/progress",
    Icon: ProgressIcon,
  },
  { name: "User", translationKey: "user", route: "/user/1", Icon: UserIcon },
  {
    name: "Settings",
    translationKey: "settings",
    route: "/settings",
    Icon: SettingsIcon,
  },
  { name: "About", translationKey: "about", route: "/about", Icon: AboutIcon },
];
