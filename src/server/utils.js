const { createHash } = require("crypto");
const { resolve } = require("path");
const sharp = require("sharp");

function hash(input) {
	if (!input) return input;
	return createHash("sha512").update(input).digest("hex");
}

async function upload(image) {
	const buffer = Buffer.from(image.split(",")[1], "base64");
	const filename = `${Date.now()}.png`;

	await sharp(buffer)
		.resize(450, 450)
		.toFile(resolve(__dirname, "dist", "uploads", filename));

	return resolve("/uploads", filename);
}

exports.hash = hash;
exports.upload = upload;
