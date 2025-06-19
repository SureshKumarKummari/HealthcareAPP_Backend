module.exports = (res, code, msg) => {
return res.status(code).json({ error: msg });
};