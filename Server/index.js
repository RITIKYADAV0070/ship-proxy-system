import http from "http";
import https from "https";
import net from "net";
import url from "url";

// Helper to forward HTTP requests
function forwardHttp(req, res) {
  try {
    const parsedUrl = url.parse(req.url); // req.url is full URL in proxy mode

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 80,
      path: parsedUrl.path,
      method: req.method,
      headers: { ...req.headers, host: parsedUrl.hostname },
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    req.pipe(proxyReq);

    proxyReq.on("error", (err) => {
      console.error("❌ Offshore HTTP error:", err.message);
      res.writeHead(502);
      res.end("Bad Gateway");
    });
  } catch (err) {
    console.error("❌ Offshore parsing error:", err.message);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
}

// Create HTTP server
const server = http.createServer(forwardHttp);

// Handle HTTPS CONNECT (tunneling)
server.on("connect", (req, clientSocket, head) => {
  console.log("🔒 Offshore HTTPS CONNECT:", req.url);

  const [hostname, port] = req.url.split(":");
  const targetPort = port || 443;

  const offshoreSocket = net.connect(targetPort, hostname, () => {
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

// Start server
server.listen(9999, () => {
  console.log("🌊 Offshore proxy running on 9999 (HTTP + HTTPS)");
});
