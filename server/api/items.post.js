import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

/*
function uploadImage(image) {
	const buffer = Buffer.from(image.split(",")[1], "base64");
	const filename = `${Date.now()}.png`;
	writeFileSync(resolve("public", "uploads", filename), buffer);
	return resolve("/uploads", filename);
}
*/

export default defineEventHandler(async event => {
	if (!event.context.auth) {
		event.res.statusCode = 404;
		return event.res.end();
	}

	const data = await useBody(event);
	const { categoryId } = data;
	delete data.categoryId;

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

	return item;
});
