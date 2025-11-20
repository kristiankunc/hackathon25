import { prisma } from '$lib/prisma';
import type { Actions } from './$types';

export async function load() {
    let quests = await prisma.realOrFakeQuest.findMany();

    if (quests.length === 0) {
        const defaultQuest = await prisma.realOrFakeQuest.create({
            data: {
                name: "Banán",
                rewardMoney: 20,
                picturesFilepath: "/images/real-or-fake-1",
            }
        });
        quests = [defaultQuest];
    }

    const randomQuest = quests[Math.floor(Math.random() * quests.length)];

    return {
        name: randomQuest.name,
        rewardMoney: randomQuest.rewardMoney,
        picturesFilepath: randomQuest.picturesFilepath,
    };
}

// +page.server.ts

export const actions: Actions = {
    addMoney: async ({ request }) => {
        const form = await request.formData();
        const amount = Number(form.get('amount') || 0);

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
