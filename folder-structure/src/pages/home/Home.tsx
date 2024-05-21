import { useState } from "react";
import Search from "../../components/ui/Search";
import MetroCard from "./MetroCard";
import MetroModal from "./MetroModal";
import { MetroType, metros } from "../../data/metro";
import "./home.css";
import { useLocation, useParams } from "react-router-dom";

const Home = () => {
  const [active, setActive] = useState(false);
  const [metro, setMetro] = useState<MetroType | undefined>(undefined);

  console.log(metro);

  console.log(active);

  const params = new URLSearchParams(document.location.search);

  const search = params.get("search");

  console.log(search);

  const filteredMetros = metros.filter((metro) =>
    metro.name?.includes(search || "")
  );

  return (
    <div className="home">
      {active && metro && <MetroModal metro={metro} setActive={setActive} />}
      <div className="search">
        <Search />
      </div>
      <div className="container">
        <ul>
          {filteredMetros.map((metro) => (
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
