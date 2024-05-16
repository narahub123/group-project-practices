import { useState } from "react";
import Search from "../../components/ui/Search";
import MetroCard from "./MetroCard";
import MetroModal from "./MetroModal";
import { MetroType, metros } from "../../data/metro";

const Home = () => {
  const [active, setActive] = useState(false);
  const [metro, setMetro] = useState<MetroType | undefined>(undefined);

  console.log(metro);

  console.log(active);

  return (
    <div className="home">
      {active && metro && <MetroModal metro={metro} setActive={setActive} />}
      <Search />
      <div className="container">
        <ul>
          {metros.map((metro) => (
            <MetroCard
              key={metro.areaCode}
              {...metro}
              setActive={setActive}
              setMetro={setMetro}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
