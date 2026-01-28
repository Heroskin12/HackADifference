import UserIconSmall from "../../../../assets/UserIconSmall";
export default function Card({ title, icon: Icon, stat, subText, textColor }) {
  return (
    <div className={`p-6 ${textColor || "text-dark-primary"} rounded-[10px]`}>
      <div className="flex items-center justify-between w-full">
        <h3 className="font-fun text-[18px] font-semibold">{title}</h3>
        {Icon && <Icon />}
      </div>
      <div>
        <h2 className="text-[30px] font-bold font-fun">{stat}</h2>
      </div>
      <div>
        <p className="font-primary font-normal text-[14px]">{subText}</p>
      </div>
    </div>
  );
}
