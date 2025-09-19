// frame.js
import { EventEmitter } from "events";

/**
 * Frame format:
 * [1 byte]  msgType (UInt8)
 * [4 bytes] requestId (UInt32BE)
 * [4 bytes] payloadLen (UInt32BE)
 * [N bytes] payload
 */

export const MSG = {
  REQUEST: 1,
  RESPONSE: 2,
  TUNNEL_OPENED: 3,
  TUNNEL_DATA: 4,
  ERROR: 255,
};

export function packMessage(msgType, requestId, payload) {
  const payloadBuf = Buffer.isBuffer(payload) ? payload : Buffer.from(payload ?? "");
  const header = Buffer.alloc(1 + 4 + 4);
  header.writeUInt8(msgType, 0);
  header.writeUInt32BE(requestId >>> 0, 1);
  header.writeUInt32BE(payloadBuf.length >>> 0, 5);
  return Buffer.concat([header, payloadBuf]);
}

export class FramedReader extends EventEmitter {
  constructor(stream) {
    super();
    this.stream = stream;
    this.buf = Buffer.alloc(0);

    this._onData = this._onData.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onError = this._onError.bind(this);

    stream.on("data", this._onData);
    stream.on("close", this._onClose);
    stream.on("end", this._onClose);
    stream.on("error", this._onError);
  }

  _onData(chunk) {
    this.buf = Buffer.concat([this.buf, chunk]);
    this._process();
  }

  _process() {
    const HEADER_LEN = 1 + 4 + 4;
    while (this.buf.length >= HEADER_LEN) {
      const msgType = this.buf.readUInt8(0);
      const requestId = this.buf.readUInt32BE(1);
      const payloadLen = this.buf.readUInt32BE(5);

      if (this.buf.length < HEADER_LEN + payloadLen) break; // wait for full payload
      const payload = this.buf.slice(HEADER_LEN, HEADER_LEN + payloadLen);
      this.buf = this.buf.slice(HEADER_LEN + payloadLen);

      // emit parsed message
      this.emit("message", { msgType, requestId, payload });
    }
  }

  _onClose() {
    this.emit("close");
    this._cleanup();
  }

  _onError(err) {
    this.emit("error", err);
  }

  _cleanup() {
    if (!this.stream) return;
    try {
      this.stream.off("data", this._onData);
      this.stream.off("close", this._onClose);
      this.stream.off("end", this._onClose);
      this.stream.off("error", this._onError);
    } catch (e) { /* ignore */ }
    this.stream = null;
  }
}
