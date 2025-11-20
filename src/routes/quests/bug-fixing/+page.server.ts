import { prisma } from '$lib/prisma';
import type { Actions } from './$types';


export async function load() {
  // načti všechny questy
  let quests = await prisma.bugFixQuest.findMany();

  // pokud databáze neobsahuje žádný quest → vytvoř ho
  if (quests.length === 0) {
    const defaultQuest = await prisma.bugFixQuest.create({
      data: {
        name: "Hidden bug in a condition",
        description: "The following snippet simulates a very simple job queue runner. However, under certain conditions, the runner never finishes — it enters an infinite loop even when all jobs should be processed. Find the line that causes the queue to never empty. The issue is subtle and caused by a wrong loop condition combined with an unexpected mutation inside the loop.",
        codeSnippet: `
function runJobQueue(queue) {
    let processed = 0;

    // runner should process items until the queue is empty
    while (queue.length >= 0) {
        const job = queue.shift();

        if (!job) {
            console.log("No job found, skipping...");
            continue;
        }

        console.log("Running job:", job.name);

        if (job.retries > 0) {
            job.retries--;
            queue.push(job);  // requeue job with fewer retries
        }

        processed++;

        if (processed > 50) {
            console.log("Safety break!");
            break;
        }
    }

    return processed;
}

const jobs = [
    { name: "A", retries: 1 },
    { name: "B", retries: 2 },
    { name: "C", retries: 0 }
];

runJobQueue(jobs);

`,
        rewardMoney: 50,
        correctLine: 4 // řádek s chybou (x = 5 místo x === 5)
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
