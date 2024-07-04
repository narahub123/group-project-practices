import "./alarm.css";

const Alarm = ({ alarm, setAlarm }) => {
  const handleClick = () => {
    setAlarm(false);
  };
  return (
    <div className={alarm ? "alarm-active" : "alarm"} onClick={handleClick}>
      신고가 접수되었습니다.
    </div>
  );
};

export default Alarm;
