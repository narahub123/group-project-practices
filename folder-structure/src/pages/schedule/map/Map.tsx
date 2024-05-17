import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./map.css";
import { geocoder } from "../../../utils/kakaoMap/kakaoApi";
import { useParams } from "react-router-dom";
import { PlaceApiDetailType } from "../choice/places/PlaceModal";

interface ResultType {
  address_name: string;
  address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
  x: string;
  y: string;
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress;
}

interface CoordType {
  title: string;
  lat: string;
  lng: string;
}

interface MapProps {
  selectedPlaces: string[];
}

interface TitleType {
  addr: string;
  title: string;
}

interface CoordsType {
  title: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

const KakaoMap = ({ selectedPlaces }: MapProps) => {
  const [coord, setCoord] = useState<CoordType[]>([]);
  const [coords, setCoords] = useState<CoordsType[]>([]);
  const [selectedTitles, setSelectedTitles] = useState<TitleType[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responses = await Promise.all(
        selectedPlaces.map(async (contentId) => {
          const response = await fetch(
            `http://localhost:8080/places/${contentId}`
          );

          const jsonData = await response.json();

          return jsonData.map((data: PlaceApiDetailType) => ({
            addr: data.addr1,
            title: data.title,
          }))[0];
        })
      );

      setSelectedTitles(responses);
    };

    fetchData();
  }, [selectedPlaces]);

  useEffect(() => {
    var callback = function (
      result: ResultType[],
      status: kakao.maps.services.Status
    ): void {
      if (status === kakao.maps.services.Status.OK) {
        const title: string = result[0].address_name;
        const lat: string = result[0].y;
        const lng: string = result[0].x;
        const coo: CoordType = { title, lat, lng };
        setCoord([coo]);
      }
    };

    params.metro && geocoder.addressSearch(params.metro, callback);
  }, [params.metro]);

  useEffect(() => {
    var callback = function (
      result: ResultType[],
      status: kakao.maps.services.Status
    ): void {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);

        const title: string = result[0].address_name;
        const lat: number = Number(result[0].y);
        const lng: number = Number(result[0].x);
        const coo: CoordsType = { title, latlng: { lat, lng } };
        console.log(coo);

        setCoords((prevCoord) => [...prevCoord, coo]);
      } else {
        console.log(status);
      }
    };

    if (selectedTitles.length > 0) {
      selectedTitles.forEach((place) => {
        console.log(place.addr);

        setCoords([]);
        geocoder.addressSearch(place.addr, callback);
      });
    }
  }, [selectedTitles]);

  const filteredCoords = coords.map((place, index) => {
    return place;
    // return {
    //   ...place,
    //   title: selectedTitles[index].title || place.title,
    // };
  });

  console.log(filteredCoords);
  console.log(selectedTitles);

  return (
    <div className="map">
      <Map
        center={{
          lat: Number(coord[0]?.lat) || 33.5563,
          lng: Number(coord[0]?.lng) || 126.79581,
        }}
        style={{ width: "400px", height: "100vh" }}
        level={9}
      >
        {filteredCoords.map((coord, index) => (
          <MapMarker key={index} position={coord.latlng} title={coord.title} />
        ))}
      </Map>
    </div>
  );
};

export default KakaoMap;
