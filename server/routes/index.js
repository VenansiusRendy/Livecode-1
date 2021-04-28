const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Food } = require("../models");

router.post("/register", (req, res) => {
	const { email, password } = req.body;
	User.create({ email, password })
		.then((user) => res.status(201).json({ id: user.id, email: user.email }))
		.catch((err) => res.status(500).json({ errors: "Internal Server Error" }));
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({
		where: {
			email,
		},
	})
		.then((user) => {
			if (!user) {
				res.status(404).json({ errors: "Invalid User Or Email" });
			}
			const match = bcrypt.compareSync(password, user.password);
			if (!match) {
				res.status(404).json({ errors: "Invalid User Or Email" });
			}
			const access_token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET
			);
			res.status(200).json({ access_token });
		})
		.catch((err) => res.status(500).json({ errors: "Internal Server Error" }));
});

module.exports = router;
