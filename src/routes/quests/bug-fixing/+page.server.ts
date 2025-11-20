import { prisma } from '$lib/prisma';

export async function load() {
  // načti všechny questy
  let quests = await prisma.bugFixQuest.findMany();

  // pokud databáze neobsahuje žádný quest → vytvoř ho
  if (quests.length === 0) {
    const defaultQuest = await prisma.bugFixQuest.create({
      data: {
        name: "Hidden bug in a condition",
        description: "Find a bug in the following code snippet. Select the line that causes an error.",
        codeSnippet: `
if (x = 5) {
    console.log("X is 5!");
}
`,
        rewardMoney: 50,
        correctLine: 0 // řádek s chybou (x = 5 místo x === 5)
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
