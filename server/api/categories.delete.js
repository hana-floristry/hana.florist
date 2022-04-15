import Prisma from "@prisma/client";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default defineEventHandler(async event => {
	const data = await useBody(event);
	const { id } = data;

	const deleteItems = prisma.item.deleteMany({
		where: {
			categoryId: id
		}
	});

	const deleteCategory = prisma.category.delete({
		where: data
	});

	const transaction = await prisma.$transaction([deleteItems, deleteCategory]);
	return transaction;
});
