export class HttpError extends Error {
  constructor(status, statusText, url) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = "HttpError";
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.type = "http";
  }
}
