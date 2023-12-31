"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errHandler = (err, req, res, next) => {
    if (err.name &&
        (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")) {
        err.statusCode = 401;
    }
    if (err.isAxiosError) {
        if (err.code === "ECONNREFUSED") {
            err.statusCode = 503;
            err.message = `${err.request._options.path.split("/")[1]} service unavailable.`;
        }
        if (err.response) {
            err.statusCode = err.response.status;
            err.message = err.response.data.message;
        }
    }
    console.log(err);
    return res
        .status(err.statusCode || 500)
        .json({ status: false, message: err.message });
};
exports.default = errHandler;
