export class HTTPException extends Error {
  statusCode: number;
  status: number; // Alias für Kompatibilität
  details: { message: string; [key: string]: any };

  constructor(
    statusCode: number,
    details: { message: string; [key: string]: any }
  ) {
    super(details.message);
    this.statusCode = statusCode;
    this.status = statusCode; 
    this.details = details;
  }
}
