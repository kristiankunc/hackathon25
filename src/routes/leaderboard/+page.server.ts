import { prisma } from "$lib/prisma";

export async function load() {
	const users = await prisma.user.findMany();

	if (users.length < 2) {
		await prisma.user.createMany({
			data: [
				{ name: "Alice", money: 100, points: 150 },
				{ name: "Bob", money: 80, points: 120 },
				{ name: "Charlie", money: 50, points: 90 },
				{ name: "Diana", money: 70, points: 110 },
				{ name: "Charlie Kirk", money: 60, points: 67 }
			]
		});
		return { users: (await prisma.user.findMany()).sort((a, b) => b.points - a.points) };
	} else {
		return { users: users.sort((a, b) => b.points - a.points) };
	}
}
