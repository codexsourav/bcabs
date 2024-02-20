export const statusCode = {
    "SUCCESS": 200,
    "CREATED": 201,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "INTERNAL_SERVER_ERROR": 500,
    "SERVICE_UNAVAILABLE": 503
};

export const statusMessage = {
    "200": "OK - The request was successful",
    "201": "Created - The request was successful and a new resource was created",
    "400": "Bad Request - The request could not be understood by the server",
    "401": "Unauthorized - Authentication is required and has failed or has not yet been provided",
    "403": "Forbidden - The server understood the request but refuses to authorize it",
    "404": "Not Found - The requested resource could not be found",
    "500": "Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request",
    "503": "Service Unavailable - The server is currently unavailable (overloaded or down) and cannot handle the request"
}
