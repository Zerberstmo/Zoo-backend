export class HTTPException extends Error {
    statusCode;
    status; // Alias für Kompatibilität
    details;
    constructor(statusCode, details) {
        super(details.message);
        this.statusCode = statusCode;
        this.status = statusCode;
        this.details = details;
    }
}
