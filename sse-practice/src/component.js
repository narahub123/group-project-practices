import { useEffect, useState } from "react";

const EventComponent = ({ setAlarm }) => {
  const [message, setMessage] = useState("No messages yet.");

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/events`);

    eventSource.onopen = () => {
      console.log("Connection to server opened.");
    };

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);
      setMessage(eventData.message);
      setAlarm(true);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log("EventSource closed.");
    };
  }, []);

  return (
    <div>
      <h1>Notification:</h1>
      <p>{message}</p>
    </div>
  );
};

export default EventComponent;
