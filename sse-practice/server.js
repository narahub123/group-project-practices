const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
};

app.get("/events", cors(corsOptions), (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "cache-control": "no-cache",
    Connection: "keep-alive",
  });

  // send sse every second
  setInterval(() => {
    const data = { message: `Hello, world! (${new Date().toDateString()})` };
    // console.log("sent: ", data);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000);
});

app.listen(3000, () => console.log("Server is listening on port 3000"));
