import crypto from "crypto";

export default defineEventHandler(event => {
	const password = event.req.headers.authorization ?? "";
	const hash = crypto.createHash("sha512").update(password).digest("hex");
	event.context.auth = hash == process.env.PASSWORD_HASH;
});
