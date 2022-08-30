module.exports = (err, _req, res, _nxt) => {
	res
		.status(err.status || 500)
		.json({ error: { status: err.status || 500, message: err.message } })
		.end();
};
