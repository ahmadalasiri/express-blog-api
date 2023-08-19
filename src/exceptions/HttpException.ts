export default class HttpException extends Error {
  public statusCode;
  public status: string;
  constructor(statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}
