import { prisma } from '$lib/prisma';
import fs from 'fs';
import path from 'path';

export async function load() {
    let quests = await prisma.realOrFakeQuest.findMany();

    // pokud databáze je prázdná → vytvoř default quest
    if (quests.length === 0) {
        const defaultQuest = await prisma.realOrFakeQuest.create({
            data: {
                name: "Banán",
                rewardMoney: 20,
                picturesFilepath: "/images/real-or-fake-1",
                fakePicture: "the-fake.jpg"
            }
        });
        quests = [defaultQuest];
    }

    // vyber náhodný quest
    const randomQuest = quests[Math.floor(Math.random() * quests.length)];

    // načti obrázky z filesystemu
    const folderPath = path.join(process.cwd(), randomQuest.picturesFilepath);
    const files = fs.existsSync(folderPath) ? fs.readdirSync(folderPath) : [];

    return {
        name: randomQuest.name,
        rewardMoney: randomQuest.rewardMoney,
        picturesFilepath: randomQuest.picturesFilepath,
        fakePicture: randomQuest.fakePicture,
        images: files
    };
}
