// client/index.js
import net from "net";
import http from "http";

const OFFSHORE_HOST = "127.0.0.1";
const OFFSHORE_PORT = 9999;

const server = http.createServer((req, res) => {
  console.log("🌐 HTTP Request:", req.method, req.url);

  const offshoreReq = http.request(
    {
      host: OFFSHORE_HOST,
      port: OFFSHORE_PORT,
      method: req.method,
      path: req.url,
      headers: req.headers,
    },
    (offshoreRes) => {
      res.writeHead(offshoreRes.statusCode, offshoreRes.headers);
      offshoreRes.pipe(res);
    }
  );

  req.pipe(offshoreReq);

  offshoreReq.on("error", (err) => {
    console.error("❌ Error forwarding to offshore:", err.message);
    res.writeHead(502);
    res.end("Bad Gateway");
  });
});

server.on("connect", (req, clientSocket, head) => {
  console.log("🔒 HTTPS CONNECT:", req.url);

  const offshoreSocket = net.connect(OFFSHORE_PORT, OFFSHORE_HOST, () => {
    clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    offshoreSocket.write(head);
    offshoreSocket.pipe(clientSocket);
    clientSocket.pipe(offshoreSocket);
  });

  offshoreSocket.on("error", (err) => {
    console.error("❌ Offshore CONNECT error:", err.message);
    clientSocket.end();
  });
});

server.listen(8080, () => {
  console.log("🚢 Ship proxy listening on 8080 (HTTP/HTTPS)");
});
