const AppError = require("./appError");

class BadRequestError extends AppError {
    constructor(inavlidParams) {
        // invalidParams : []

        let message = ""
        inavlidParams.forEach(params => message += `${params}\n`);

        super(`The request has the following invalid parameters \n ${inavlidParams}`, 400)
    }
}

module.exports = BadRequestError;