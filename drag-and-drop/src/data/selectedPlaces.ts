export type SelectedPlaceType = {
  id: number;
  name: string;
  addr: string;
  contentTypeId: number;
  img: string;
};

export const selectedPlaces: SelectedPlaceType[] = [
  {
    id: 1,
    name: "경복궁",
    addr: "서울특별시 어디 어디",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production123/d477/f88c6cdb-3e47-45f5-bfd7-d3775d1f3bcc.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
  },
  {
    id: 2,
    name: "창녕궁",
    addr: "서울특별시 어디 어디",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production60/d1151/364e7147-c289-4151-9f1e-070061df4f54.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
  },
  {
    id: 3,
    name: "신라호텔",
    addr: "서울특별시 어디 어디",
    contentTypeId: 15,
    img: "https://a.cdn-hotels.com/gdcs/production65/d1136/d92970c8-590c-4c3e-b507-5d9a5dfe8467.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
  },
  {
    id: 4,
    name: "창경궁",
    addr: "서울특별시 어디 어디",
    contentTypeId: 12,
    img: "https://a.cdn-hotels.com/gdcs/production148/d622/18f614cb-23aa-475e-b73a-b32e6a7b412a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
  },
];
