import Logo from "../../../assets/Logo_H.jpeg";
export default function LogoBarSmall() {
  return (
    <div className="flex items-center text-dark-primary">
      <img src={Logo} alt="English Sponge Logo" className="w-24 h-24" />
    </div>
  );
}
