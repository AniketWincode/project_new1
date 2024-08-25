const AppError = require("./appError");
class UnAuthorisedError extends AppError {
    constructor(resource) {
        super(`User is not authorised properly, 401`)
    }
}

module.exports = UnAuthorisedError;