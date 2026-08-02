const limiter = require("express-rate-limit");

const rateLimiter = limiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    headers: true, // Send rate limit info in the `RateLimit-*` headers
    message: {
        status: "fail",
        message: "Too many requests from this IP, please try again after 15 minutes"
    }
});

module.exports = rateLimiter;