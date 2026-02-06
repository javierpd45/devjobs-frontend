export class HttpError extends Error {
  constructor({ status, statusText, url, message }) {
    const finalMessage = message || `HTTP ${status}: ${statusText}`;

    super(finalMessage);

    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.type = "http";
  }
}
