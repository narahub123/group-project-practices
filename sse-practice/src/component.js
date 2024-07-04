import { useEffect, useState } from "react";

const EventComponent = () => {
  const [message, setMessage] = useState("boo");

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3000/events`);

    if (typeof EventSource !== "undefined") {
      console.log("yayy");
    } else {
      console.log("boooo");
    }

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log(eventData);
      setMessage(eventData.message);
    };

    return () => eventSource.close();
  }, []);

  return <div>{message}</div>;
};

export default EventComponent;
