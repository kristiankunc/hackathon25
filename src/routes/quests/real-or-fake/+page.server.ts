import { prisma } from '$lib/prisma';

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
