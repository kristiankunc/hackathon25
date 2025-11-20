import fs from "fs";
import path from "path";

interface Page {
    name: string;
    path: string;
    children?: Page[];
}

// rekurzivní čtení složek a souborů v routes
function readRoutes(dir: string, basePath = ""): Page[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const pages: Page[] = [];

    for (const entry of entries) {
        if (entry.name.startsWith("+")) continue; // přeskočit +page.svelte, +layout.svelte

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            const children = readRoutes(fullPath, path.posix.join(basePath, entry.name));
            pages.push({
                name: entry.name,
                path: "/" + path.posix.join(basePath, entry.name),
                children: children.length ? children : undefined
            });
        } else if (entry.isFile() && entry.name.endsWith(".svelte")) {
            // ignorujeme +page.svelte v kořeni složky, jen název souboru
            const name = entry.name.replace(".svelte", "");
            pages.push({
                name,
                path: "/" + path.posix.join(basePath, name)
            });
        }
    }

    return pages;
}

export async function load() {
    const routesDir = path.join(process.cwd(), "src/routes");
    const pages = readRoutes(routesDir);
    return { pages };
}
