exports.sendJson = function (req, res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    if (data)
        res.write(JSON.stringify(data));
    res.end();
};
