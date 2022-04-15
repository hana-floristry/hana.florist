import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const data = await useBody(event);

	const category = await prisma.category.create({ data });
	return category;
});
