import { prisma } from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    // najdeme uživatele – v demo verzi předpokládáme, že je max jeden
    let user = await prisma.user.findFirst();

    // pokud neexistuje, vytvoříme demo usera
    if (!user) {
        user = await prisma.user.create({
            data: {
                name: 'Demo User',
                money: 0,  // libovolná počáteční hodnota
                points: 0
            }
        });
    }

    return { user };
};
