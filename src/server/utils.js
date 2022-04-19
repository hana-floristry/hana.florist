const { createHash } = require("crypto");
const { resolve } = require("path");
const { writeFileSync } = require("fs");

function hash(input) {
	if (!input) return input;
	return createHash("sha512").update(input).digest("hex");
}

function upload(image) {
	const buffer = Buffer.from(image.split(",")[1], "base64");
	const filename = `${Date.now()}.png`;
	writeFileSync(resolve(__dirname, "dist", "uploads", filename), buffer);
	return resolve("/uploads", filename);
}

exports.hash = hash;
exports.upload = upload;
