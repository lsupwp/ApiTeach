const responseError = (res, message) => {
    return res.json({status: "error", message: message});
}

module.exports = {responseError}