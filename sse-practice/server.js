const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

let clients = [];

// SSE 엔드포인트
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
});

// 클릭 이벤트 처리 엔드포인트
app.post("/click", (req, res) => {
  console.log("Click event received");
  clients.forEach((client) =>
    client.res.write(
      `data: ${JSON.stringify({ message: "Button clicked!" })}\n\n`
    )
  );
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
