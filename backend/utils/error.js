const errorHandler = (statusCode, message) => {
    const error = new Error(message); // vendos mesazhin direkt në konstruktor
    error.statusCode = statusCode;
    return error;
};

module.exports = errorHandler;