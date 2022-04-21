const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const app = express();

const { hash, upload } = require("./utils");
const isValid = password => hash(password) == process.env.PASSWORD_HASH;

app.use(express.json({ limit: "30mb" }));

app.get("/catalogue",  async (_, res) => {
	const categories = await prisma.category.findMany({
		include: {
			items: true
		}
	});

	res.json(categories);
});

app.post("/login", (req, res) => {
	const password = req.body.password;
	if (!isValid(password)) {
		res.status(401).end();
	}

	res.end();
});

app.use((req, res, next) => {
	if (!isValid(req.get("authorization"))) {
		return res.status(404).end();
	}

	next();
});

app.post("/categories", async (req, res) => {
	const category = await prisma.category.create({
		data: req.body,
		include: {
			items: true
		}
	});

	res.json(category);
});

app.patch("/categories", async (req, res) => {
	const { id } = req.body;
	delete req.body.id;

	const category = await prisma.category.update({
		where: {
			id
		},
		data: req.body
	});

	res.json(category);
});

app.delete("/categories", async (req, res) => {
	const { id } = req.body;

	const deleteItems = prisma.item.deleteMany({
		where: {
			categoryId: id
		}
	});

	const deleteCategory = prisma.category.delete({
		where: req.body
	});

	const transaction = await prisma.$transaction([deleteItems, deleteCategory]);
	res.json(transaction);
});

app.post("/items", async (req, res) => {
	const data = req.body;
	const { categoryId } = data;
	delete data.categoryId;
	data.image = upload(data.image);

	const item = await prisma.item.create({
		data: {
			...data,
			category: {
				connect: {
					id: categoryId
				}
			}
		}
	});

	res.json(item);
});

app.patch("/items", async (req, res) => {
	const { id } = req.body;
	delete req.body.id;

	const item = await prisma.item.update({
		where: {
			id
		},
		data: req.body
	});

	res.json(item);
});

app.delete("/items", async (req, res) => {
	const item = await prisma.item.delete({
		where: req.body
	});

	res.json(item);
});

module.exports = app;
