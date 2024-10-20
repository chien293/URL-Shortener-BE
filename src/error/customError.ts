export class HttpError extends Error {
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.name = "HttpError";
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor(message: string = "Not Found Error") {
      super(404, message);
    }
  }

  export class ExpiredError extends HttpError {
    constructor(message: string = "Expired Error") {
      super(410, message);
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor(message: string = "Bad Request Error") {
      super(400, message);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor(message: string = "Internal Server Error") {
      super(500, message);
    }
  }