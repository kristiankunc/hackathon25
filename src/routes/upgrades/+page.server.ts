import { prisma } from "$lib/prisma";
import type { Actions } from "./$types";

export const actions: Actions = {
	purchase: async ({ request }) => {
		const form = await request.formData();
		const cost = Number(form.get("cost") || 0);

		const user = await prisma.user.findFirst();
		if (!user) {
			return { error: "User not found" };
		}

		if (user.money < cost) {
			return { error: "Not enough money" };
		}

		const updated = await prisma.user.update({
			where: { id: user.id },
			data: { money: user.money - cost }
		});

		return {
			success: true,
			newMoney: updated.money
		};
	}
};
