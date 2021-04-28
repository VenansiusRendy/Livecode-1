const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
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

router.post("/foods", auth, (req, res) => {
	const { title, price, ingredients, tag } = req.body;
	Food.create({
		title,
		price,
		ingredients,
		tag,
		UserId: req.user_id,
	})
		.then((data) => {
			const { id, title, price, ingredients, tag, UserId } = data;
			res.status(201).json({ id, title, price, ingredients, tag, UserId });
		})
		.catch((err) => res.status(500).json({ errors: "Internal Server Error" }));
});

router.get("/foods", auth, (req, res) => {
	Food.findAll({
		where: {
			UserId: req.user_id,
		},
	})
		.then((foods) => {
			res.status(200).json(foods);
		})
		.catch((err) => res.status(500).json({ errors: "Internal Server Error" }));
});

router.delete("/foods/:id", auth, (req, res) => {
	console.log(req.params);
	const { id } = req.params;
	Food.findByPk(id)
		.then((food) => {
			if (+food.UserId !== +req.user_id) {
				res.status(404).json({ errors: "Food Not Found" });
			}
			console.log(food);
			food.destroy();
			res
				.send(200)
				.json({ message: "Successfully delete food from your menu" });
		})
		.catch((err) => res.status(500).json({ errors: "Internal Server Error" }));
});

module.exports = router;
