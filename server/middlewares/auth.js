const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = (req, res, next) => {
	const { access_token } = req.headers;
	try {
		const verify = jwt.verify(access_token, process.env.JWT_SECRET);

		User.findByPk(verify.id)
			.then((user) => {
				req.user_id = verify.id;
				next();
			})
			.catch((err) => {
				res.status(404).json({ errors: "Invalid Token / User" });
			});

		req.user_id = verify.id;
	} catch (err) {
		res.status(404).json({ errors: "Invalid Token" });
	}
};

module.exports = auth;
