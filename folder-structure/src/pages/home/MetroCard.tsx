import { MetroType } from "../../data/metro";
import { Link } from "react-router-dom";
import { metros } from "../../data/metro";

interface MetroCardProps extends MetroType {
  setActive: (value: boolean) => void;
  setMetro: (value: MetroType) => void;
}

const MetroCard = ({
  areaCode,
  name,
  description,
  imgUrl,
  setActive,
  setMetro,
}: MetroCardProps) => {
  const handleClick = (areaCode: number) => {
    setActive(true);
    const metro = metros.find((metro) => metro.areaCode === areaCode);
    metro && setMetro(metro);
  };
  return (
    <Link to="" onClick={() => handleClick(areaCode)}>
      <img src={imgUrl} alt={name} />
      <p>{name}</p>
    </Link>
  );
};

export default MetroCard;
