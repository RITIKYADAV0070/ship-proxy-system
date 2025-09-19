// frame.js
import { EventEmitter } from "events";

export const MSG = {
  REQUEST: 0x01,
  RESPONSE: 0x02,
  TUNNEL_DATA: 0x03,
  TUNNEL_OPENED: 0x04,
  ERROR: 0x05,
};

export function packMessage(msgType, requestId, payloadBuffer) {
  const payloadLength = payloadBuffer ? payloadBuffer.length : 0;
  const header = Buffer.alloc(4 + 1 + 4); // length + type + requestId
  header.writeUInt32BE(payloadLength, 0);
  header.writeUInt8(msgType, 4);
  header.writeUInt32BE(requestId >>> 0, 5);
  if (payloadLength === 0) return header;
  return Buffer.concat([header, payloadBuffer]);
}

// FramedReader: collects bytes from a socket and emits 'message' when a framed message arrives
export class FramedReader extends EventEmitter {
  constructor(socket) {
    super();
    this.socket = socket;
    this.buffer = Buffer.alloc(0);
    this.socket.on("data", (chunk) => this._onData(chunk));
    this.socket.on("close", () => this.emit("close"));
    this.socket.on("error", (err) => this.emit("error", err));
  }

  _onData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (true) {
      if (this.buffer.length < 9) return; // wait for header (4+1+4)
      const payloadLen = this.buffer.readUInt32BE(0);
      const total = 4 + 1 + 4 + payloadLen;
      if (this.buffer.length < total) return; // wait for full frame
      const msgType = this.buffer.readUInt8(4);
      const requestId = this.buffer.readUInt32BE(5);
      const payload = this.buffer.slice(9, 9 + payloadLen);
      this.emit("message", { msgType, requestId, payload });
      this.buffer = this.buffer.slice(total);
    }
  }
}
