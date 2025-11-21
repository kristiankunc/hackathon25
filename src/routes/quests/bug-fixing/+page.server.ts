import { prisma } from "$lib/prisma";
import type { Actions } from "./$types";

export async function load() {
	// načti všechny questy
	let quests = await prisma.bugFixQuest.findMany();

	// pokud databáze neobsahuje žádný quest → vytvoř ho
	if (quests.length === 0) {
		const defaultQuest = await prisma.bugFixQuest.create({
			data: {
				name: "Simple even checker bug",
				description:
					"A tiny utility that is supposed to check if a number is even, but the return condition is incorrect. Find the line with the bug.",
				codeSnippet: `
  function isEven(n) {
    // should return true for even numbers
    return n % 2 === 1;
  }

  console.log(isEven(2)); // expected true
  console.log(isEven(3)); // expected false
  `,
				rewardMoney: 10,
				correctLine: 2 // line with the incorrect return condition
			}
		});

		// vrať nově vytvořený quest
		return {
			name: defaultQuest.name,
			description: defaultQuest.description,
			codeSnippet: defaultQuest.codeSnippet,
			rewardMoney: defaultQuest.rewardMoney,
			correctLine: defaultQuest.correctLine
		};
	}

	// pokud questy existují → vyber náhodný
	const randomQuest = quests[Math.floor(Math.random() * quests.length)];

	return {
		name: randomQuest.name,
		description: randomQuest.description,
		codeSnippet: randomQuest.codeSnippet,
		rewardMoney: randomQuest.rewardMoney,
		correctLine: randomQuest.correctLine
	};
}

export const actions: Actions = {
	addMoney: async ({ request }) => {
		const form = await request.formData();
		const amount = Number(form.get("amount") || 0);

		// vezmi demo usera
		const user = await prisma.user.findFirst();
		if (!user) throw new Error("User not found");

		const updated = await prisma.user.update({
			where: { id: user.id },
			data: { money: user.money + amount }
		});

		return { user: updated };
	}
};
