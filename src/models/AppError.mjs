export default class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      if (statusCode >= 500 && statusCode < 600) {
        this.status = "Internal Server Error";
      } else
        switch (statusCode) {
          case 400:
            this.status = 'Bad Request, information saknas';
            break;
          case 401:
            this.status = 'Unauthorized, du måste vara inloggad';
            break;
          case 403:
            this.status = 'Unauthorized, du har inte behörighet';
            break;
          case 404:
            this.status = 'Not Found, vi hittar inte resursen som du frågar efter';
            break;
          default:
            this.status = 'Det gick fel, vet inte vad';
        }
  
      Error.captureStackTrace(this, this.constructor);
    }
  }