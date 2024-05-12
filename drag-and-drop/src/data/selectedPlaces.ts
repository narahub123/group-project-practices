export type SelectedPlaceType = {
  id: number;
  name: string;
  description: string;
  addr: string;
  contentTypeId: number;
  img: string;
  createdAt: string;
};

export interface PlanType {
  tourStart: string;
  tourEnd: string;
}

export const plans: PlanType[] = [
  {
    tourStart: "Sun May 15 2024 00:00:00 GMT+0900 (한국 표준시)",
    tourEnd: "Sun May 17 2024 00:00:00 GMT+0900 (한국 표준시)",
  },
];

export const selectedPlaces: SelectedPlaceType[] = [
  {
    id: 1,
    name: "경복궁",
    description:
      "조선 시대 궁궐 중 하나로, 궁궐의 아름다운 건축물과 정원을 감상할 수 있습니다.",
    addr: "서울특별시 종로구 사직로 161",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production140/d1283/5c7ab017-7148-48ab-9777-0a99d6cbd2d2.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:22 GMT+0900 (한국 표준시)",
  },
  {
    id: 2,
    name: "남산 서울타워",
    description:
      "서울의 랜드마크로 유명한 전망대로, 서울 시내를 한 눈에 볼 수 있습니다.",
    addr: "서울특별시 용산구 남산공원길 105",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production77/d1862/0fb7252f-4638-44e0-ada1-ab9678abe89d.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:23 GMT+0900 (한국 표준시)",
  },
  {
    id: 3,
    name: "인사동",
    description:
      "전통적인 한옥 건물이 있는 골목으로, 다양한 공예품과 전통 음식을 즐길 수 있습니다.",
    addr: "서울특별시 종로구 인사동길 44",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production166/d1277/560c61c6-9d3d-4ce1-9d02-aecbcc199aad.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:24 GMT+0900 (한국 표준시)",
  },
  {
    id: 4,
    name: "명동",
    description:
      "쇼핑과 음식, 엔터테인먼트가 모두 모여있는 번화가로, 외국인 관광객들도 많이 찾는 곳입니다.",
    addr: "서울특별시 중구 명동길 33",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production130/d968/6eb54ac7-5377-4348-bac6-512a4fbcbf53.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:25 GMT+0900 (한국 표준시)",
  },
  {
    id: 5,
    name: "홍대 (홍익대학교 거리)",
    description:
      "젊은이들이 모이는 문화와 예술의 중심지로, 거리 예술과 다양한 음식과 상점이 있습니다.",
    addr: "서울특별시 마포구 와우산로 160",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production148/d1781/3ac0faa7-21e3-415a-adc7-f1aea15eed62.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:26 GMT+0900 (한국 표준시)",
  },
  {
    id: 6,
    name: "광장시장",
    description:
      "역사적인 재래시장으로, 다양한 먹거리와 전통 공예품을 구경하고 쇼핑할 수 있습니다.",
    addr: "서울특별시 종로구 창경궁로 88",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production144/d102/2098f292-d761-477b-ad53-bab60ab90d57.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:27 GMT+0900 (한국 표준시)",
  },
  {
    id: 7,
    name: "한강공원",
    description:
      "한강을 따라 있는 대규모 공원으로, 산책과 자전거 타기 등 여러 가지 액티비티를 즐길 수 있습니다.",
    addr: "서울특별시 서초구 신반포로11길 40",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production91/d548/1a8526df-0ae1-419c-94fa-31f1725b7a5c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:28 GMT+0900 (한국 표준시)",
  },
  {
    id: 8,
    name: "덕수궁",
    description:
      "조선 시대의 왕궁으로, 아름다운 정원과 건물을 감상할 수 있습니다.",
    addr: "서울특별시 중구 세종대로 99",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production8/d639/ff10f9f7-be1d-4d6e-9a80-936b54a8883d.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:29 GMT+0900 (한국 표준시)",
  },
  {
    id: 9,
    name: "경리단길",
    description:
      "감성 가득한 카페와 레스토랑이 모여 있는 거리로, 예술적인 분위기를 느낄 수 있습니다.",
    addr: "서울특별시 강남구 논현로 416",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production3/d1972/a8adff3d-897d-4b22-8ee9-d01f2e6ec36d.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:30 GMT+0900 (한국 표준시)",
  },
  {
    id: 10,
    name: "서울숲",
    description: "도심 속의 숲으로, 산책로와 자연을 즐길 수 있는 곳입니다.",
    addr: "서울특별시 성동구 뚝섬로 273",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production53/d1670/98d7d828-3d07-4a2e-b332-2ab225a63e4c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    createdAt: "Sun May 12 2024 11:18:31 GMT+0900 (한국 표준시)",
  },
];
