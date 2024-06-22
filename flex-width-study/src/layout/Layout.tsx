import Procedure from "../pages/Procedure";
import Choice from "../pages/Choice";
import Map from "../pages/Map";
import "./layout.css";
import { useEffect, useRef, useState } from "react";
import { useRenderCount } from "@uidotdev/usehooks";

const Layout = () => {
  const layoutRef = useRef<HTMLDivElement>(null);
  // layout 너비
  const [layoutWidth, setLayoutWidth] = useState(0);
  const renderCount = useRenderCount();

  console.log("렌더링 횟수: ", renderCount);

  const columnPlaces_1 = [1];
  const placesStorage = 400;
  const columnPlacesLength = 381;
  const procedureLength = 90;
  const leftPadding = 10;
  const basicLength = procedureLength + leftPadding;

  // 창 너비 표준
  // 창 너비가 735일때 map이 나타나야 하는 너비: 창 너비 - 20 - 90 - choice 너비 최대

  // layout 너비
  useEffect(() => {
    // debounce를 줘서 렌더링 값을 줄여줘야 함
    const handleResize = () => {
      // layout 요소의 너비를 가져와서 상태값 업데이트
      if (layoutRef.current) {
        setLayoutWidth(layoutRef.current.getBoundingClientRect().width);
      }
    };

    // 초기 너비 설정 및 resize 이벤트 리스너 추가
    handleResize();

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [layoutRef]);

  useEffect(() => {
    if (!layoutRef.current) return;
    console.log(layoutRef.current);

    const target = layoutRef.current?.children[1] as HTMLElement | null;
    const mapTarget = layoutRef.current.children[3] as HTMLElement | null;

    console.log(target);
    console.log(mapTarget);

    if (!target || !mapTarget) return;

    console.log(layoutWidth);

    target.style.width = layoutWidth < 735 ? `${layoutWidth}px` : `735px`;
    mapTarget.style.setProperty(
      "--map-width",
      `${layoutWidth < 735 ? 0 : layoutWidth - 735}px`
    );
  }, [layoutWidth]);

  console.log(layoutWidth);

  const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget.previousElementSibling as HTMLElement | null;
    const mapTarget = e.currentTarget.nextElementSibling as HTMLElement | null;

    console.log(target);
    console.log(mapTarget);

    if (!target) return;
    if (!mapTarget) return;

    const targetWidth = target?.offsetWidth;
    console.log("choice 너비", targetWidth);

    // 최대 최소 사이즈 정하기: 어디서 부터?
    // 장소 보관함에 장소가 있을 때랑 없을 때 구분해야 함
    // 장소 보관함이 있을 때 : 장소 보관함 너비 + 장소 컬럼1 + 다음 있다는 걸 조금 보임
    // 장소 보관함이 없을 때 : 장소 컬럼 2
    // 장소 보관함의 너비 : 400
    // 장소 컬럼 381
    const MIN_WIDTH = layoutWidth <= 735 ? basicLength + placesStorage : 400;

    const MAX_WIDTH = layoutWidth <= 735 ? 735 : layoutWidth - 100;

    console.log("최소 너비", MIN_WIDTH);
    console.log("최대 너비", MAX_WIDTH);
    console.log("현재 너비", layoutWidth);

    // 초기 마우스 위치 저장
    const initialX = e.clientX;
    console.log("초기 위치 저장", initialX);
    const resize = (e: MouseEvent) => {
      // 마우스 이동 거리
      const deltaX = e.clientX - initialX;
      console.log(deltaX);

      // 새로운 너비
      let newWidth =
        targetWidth + deltaX < MIN_WIDTH
          ? MIN_WIDTH
          : targetWidth + deltaX > MAX_WIDTH
          ? MAX_WIDTH
          : targetWidth + deltaX;

      target.style.width = `${newWidth}px`;
      mapTarget.style.setProperty(
        "--map-width",
        `${layoutWidth - newWidth - procedureLength - 2}px`
      );
      console.log("이동거리", deltaX);
      console.log("choice 너비", newWidth);
      console.log("맵 너비", layoutWidth - newWidth - procedureLength - 2);
    };

    // 마우스 이동 이벤트
    document.addEventListener("mousemove", resize);

    // 마우스 이벤트 종료
    document.addEventListener(
      "mouseup",
      () => {
        console.log("mouseup");

        document.removeEventListener("mousemove", resize);
      },
      { once: true }
    );
  };

  return (
    <div className="layout" ref={layoutRef}>
      <Procedure />
      <Choice />
      <div className="edge" onMouseDown={(e) => handleResize(e)}></div>
      <Map />
    </div>
  );
};

export default Layout;
