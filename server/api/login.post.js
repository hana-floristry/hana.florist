import crypto from "crypto";

export default defineEventHandler(async event => {
	const { password } = await useBody(event);
	const hash = crypto.createHash("sha512").update(password).digest("hex");

	const valid = hash == process.env.PASSWORD_HASH;
	if (!valid) event.res.statusCode = 401;

	event.res.end();
});
