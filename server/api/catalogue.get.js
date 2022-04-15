import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
	const categories = await prisma.category.findMany({
		include: {
			items: true
		}
	});

	return categories;
});
