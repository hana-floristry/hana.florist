import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	if (!event.context.auth) {
		event.res.statusCode = 404;
		return event.res.end();
	}

	const data = await useBody(event);
	const category = await prisma.category.create({
		data,
		include: {
			items: true
		}
	});
	return category;
});
