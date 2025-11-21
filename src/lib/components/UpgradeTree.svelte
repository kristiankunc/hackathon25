<script lang="ts">
	type NodeStatus = "locked" | "purchased";
	type UpgradeType = "equipment" | "stats";
	type EquipmentType = "engine" | "shield" | "gun";

	interface Node {
		id: number;
		status: NodeStatus;
		type: UpgradeType;
		itemType?: EquipmentType;
		icon: string;
		x: number;
		y: number;
		price: number;
		children?: Node[];
	}

	interface Slot {
		id: string;
		x: number;
		y: number;
		type: EquipmentType;
		item: Node | null;
	}

	const NODE_RADIUS = 25;
	const LINE_GAP = 7;
	const MODAL_OFFSET_Y = 80;

	let root: Node = {
		id: 1,
		price: 0,
		status: "purchased",
		x: 445,
		y: 300,
		type: "stats",
		icon: "/assets/ship.png",
		children: [
			{
				id: 2,
				price: 15,
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/smg.png",
				x: 145,
				y: 150,
				children: [
					{
						id: 13,
						price: 20,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/smg.png",
						x: 145,
						y: 50,
						children: [
							{
								id: 14,
								price: 30,
								status: "locked",
								type: "equipment",
								itemType: "gun",
								icon: "/assets/guns/smg.png",
								x: 145,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 3,
				price: 18,
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/bow.png",
				x: 205,
				y: 150,
				children: [
					{
						id: 15,
						price: 22,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/bow.png",
						x: 205,
						y: 50,
						children: [
							{
								id: 16,
								price: 35,
								status: "locked",
								type: "equipment",
								itemType: "gun",
								icon: "/assets/guns/bow.png",
								x: 205,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 4,
				price: 12,
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/mortar.png",
				x: 265,
				y: 150,
				children: [
					{
						id: 17,
						price: 25,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/mortar.png",
						x: 265,
						y: 50,
						children: [
							{
								id: 18,
								price: 40,
								status: "locked",
								type: "equipment",
								itemType: "gun",
								icon: "/assets/guns/mortar.png",
								x: 265,
								y: -50,
								children: []
							}
						]
					}
				]
			},
			{
				id: 5,
				price: 14,
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/laser.png",
				x: 325,
				y: 150,
				children: [
					{
						id: 19,
						price: 28,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/laser.png",
						x: 325,
						y: 50,
						children: [
							{
								id: 20,
								price: 45,
								status: "locked",
								type: "equipment",
								itemType: "gun",
								icon: "/assets/guns/laser.png",
								x: 325,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 6,
				price: 16,
				status: "purchased",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/cechy.webp",
				x: 385,
				y: 150,
				children: [
					{
						id: 21,
						price: 26,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/cechy.webp",
						x: 385,
						y: 50,
						children: [
							{
								id: 22,
								price: 50,
								status: "locked",
								type: "equipment",
								itemType: "shield",
								icon: "/assets/shields/cechy.webp",
								x: 385,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 7,
				price: 17,
				status: "purchased",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/morava.webp",
				x: 445,
				y: 150,
				children: [
					{
						id: 23,
						price: 24,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/morava.webp",
						x: 445,
						y: 50,
						children: [
							{
								id: 24,
								price: 32,
								status: "locked",
								type: "equipment",
								itemType: "shield",
								icon: "/assets/shields/morava.webp",
								x: 445,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 8,
				price: 19,
				status: "locked",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/slezsko.webp",
				x: 505,
				y: 150,
				children: [
					{
						id: 25,
						price: 21,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/slezsko.webp",
						x: 505,
						y: 50,
						children: [
							{
								id: 26,
								price: 34,
								status: "locked",
								type: "equipment",
								itemType: "shield",
								icon: "/assets/shields/slezsko.webp",
								x: 505,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 9,
				price: 11,
				status: "locked",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/slovensko.webp",
				x: 565,
				y: 150,
				children: [
					{
						id: 27,
						price: 27,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/slovensko.webp",
						x: 565,
						y: 50,
						children: [
							{
								id: 28,
								price: 38,
								status: "locked",
								type: "equipment",
								itemType: "shield",
								icon: "/assets/shields/slovensko.webp",
								x: 565,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 10,
				price: 13,
				status: "locked",
				type: "equipment",
				itemType: "engine",
				icon: "/assets/engines/steam.webp",
				x: 625,
				y: 150,
				children: [
					{
						id: 29,
						price: 23,
						status: "locked",
						type: "equipment",
						itemType: "engine",
						icon: "/assets/engines/steam.webp",
						x: 625,
						y: 50,
						children: [
							{
								id: 30,
								price: 36,
								status: "locked",
								type: "equipment",
								itemType: "engine",
								icon: "/assets/engines/steam.webp",
								x: 625,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 11,
				price: 20,
				status: "locked",
				type: "equipment",
				itemType: "engine",
				icon: "/assets/engines/skoda.webp",
				x: 685,
				y: 150,
				children: [
					{
						id: 31,
						price: 33,
						status: "locked",
						type: "equipment",
						itemType: "engine",
						icon: "/assets/engines/skoda.webp",
						x: 685,
						y: 50,
						children: [
							{
								id: 32,
								price: 48,
								status: "locked",
								type: "equipment",
								itemType: "engine",
								icon: "/assets/engines/skoda.webp",
								x: 685,
								y: -50
							}
						]
					}
				]
			},
			{
				id: 12,
				price: 21,
				status: "locked",
				type: "equipment",
				itemType: "engine",
				icon: "/assets/engines/unity.webp",
				x: 745,
				y: 150,
				children: [
					{
						id: 33,
						price: 29,
						status: "locked",
						type: "equipment",
						itemType: "engine",
						icon: "/assets/engines/unity.webp",
						x: 745,
						y: 50,
						children: [
							{
								id: 34,
								price: 44,
								status: "locked",
								type: "equipment",
								itemType: "engine",
								icon: "/assets/engines/unity.webp",
								x: 745,
								y: -50
							}
						]
					}
				]
			}
		]
	};

	let slots: Slot[] = [
		{ id: "slot1", x: 155, y: 300, type: "engine", item: null },
		{ id: "slot2", x: 210, y: 300, type: "engine", item: null },
		{ id: "slot3", x: 30, y: 250, type: "gun", item: null },
		{ id: "slot4", x: 330, y: 250, type: "gun", item: null },
		{ id: "slot5", x: 270, y: 195, type: "gun", item: null },
		{ id: "slot6", x: 85, y: 195, type: "gun", item: null },
		{ id: "slot7", x: 183, y: -75, type: "shield", item: null },
		{ id: "slot8", x: 183, y: 50, type: "shield", item: null },
		{ id: "slot9", x: 183, y: 200, type: "gun", item: null }
	];

	let allNodes: (Node & { depth: number })[] = [];
	let lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

	let hoveredNode: Node | null = null;
	let modalPos = { x: 0, y: 0 };

	let draggingNode: Node | null = null;
	let buyModalNode: Node | null = null;

	function flattenTree(node: Node, depth = 0): (Node & { depth: number })[] {
		let nodes = [{ ...node, depth }];
		if (node.children) {
			for (const child of node.children) {
				nodes.push(...flattenTree(child, depth + 1));
			}
		}
		return nodes;
	}

	function computeLines(node: Node) {
		let result: typeof lines = [];
		if (node.children) {
			for (const child of node.children) {
				const dx = child.x - node.x;
				const dy = child.y - node.y;
				const dist = Math.hypot(dx, dy);
				const offsetX = (dx / dist) * (NODE_RADIUS + LINE_GAP);
				const offsetY = (dy / dist) * (NODE_RADIUS + LINE_GAP);

				result.push({
					x1: node.x + NODE_RADIUS + offsetX,
					y1: node.y + NODE_RADIUS + offsetY,
					x2: child.x + NODE_RADIUS - offsetX,
					y2: child.y + NODE_RADIUS - offsetY
				});

				result.push(...computeLines(child));
			}
		}
		return result;
	}

	$: allNodes = flattenTree(root);
	$: lines = computeLines(root);

	function handleHover(node: Node) {
		hoveredNode = node;
		modalPos = {
			x: node.x + NODE_RADIUS,
			y: node.y - MODAL_OFFSET_Y
		};
	}

	function clearHover() {
		hoveredNode = null;
	}

	function handleDragStart(node: Node) {
		if (node.type === "equipment" && node.status === "purchased") {
			draggingNode = node;
		}
	}

	async function purchase(node: Node) {
		const formData = new FormData();
		formData.set("cost", node.price.toString());

		const res = await fetch("?/purchase", {
			method: "POST",
			body: formData
		});

		const data = await res.json();

		if (data.error) {
			alert(data.error);
			return;
		}

		alert("Upgrade purchased successfully!");
		node.status = "purchased";
		buyModalNode = null;
	}

	$: containerWidth = Math.max(...allNodes.map((n) => n.x)) + NODE_RADIUS + 20;
	$: containerHeight = Math.max(...allNodes.map((n) => n.y)) + NODE_RADIUS;
</script>

<div class="flex items-start justify-center gap-8">
	<div class="relative" style="width: 400px; height: 300px;">
		<img src="/assets/ship.png" alt="Spaceship" class="h-full w-full scale-150 rotate-90 object-contain" />

		{#each slots as slot, i}
			<div
				class="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-gray-400 bg-white/50"
				style="left: {slot.x}px; top: {slot.y}px;"
				role="button"
				tabindex="0"
				on:dragover={(e) => e.preventDefault()}
				on:drop={() => {
					if (draggingNode && draggingNode.type === "equipment") {
						if (slot.type === draggingNode.itemType) {
							slots = slots.map((s, idx) => (idx === i ? { ...s, item: draggingNode } : s));
						}
					}
					draggingNode = null;
				}}
			>
				{#if slot.item}
					<img src={slot.item.icon} alt={`Node ${slot.item.id}`} class="h-12 w-12 object-contain" />
				{/if}
			</div>
		{/each}
	</div>

	<div class="relative" style="width: {containerWidth}px; height: {containerHeight}px;">
		<svg class="pointer-events-none absolute h-full w-full">
			{#each lines as { x1, y1, x2, y2 }}
				<line {x1} {y1} {x2} {y2} class="stroke-dashed stroke-gray-400 stroke-2" />
			{/each}
		</svg>

		{#each allNodes as node}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<button
				class={`absolute flex items-center justify-center rounded-full border-2 font-bold transition-transform duration-200
          ${node.status === "purchased" ? "border-green-700 bg-green-500 text-white hover:scale-110" : ""}
          ${node.status === "locked" ? "border-gray-400 bg-gray-300 text-gray-600" : ""}`}
				style="width: {NODE_RADIUS * 2}px; height: {NODE_RADIUS * 2}px; left: {node.x}px; top: {node.y}px;"
				on:mouseenter={() => handleHover(node)}
				on:mouseleave={clearHover}
				draggable={node.status === "purchased" && node.type === "equipment"}
				on:dragstart={() => handleDragStart(node)}
				on:click={() => {
					if (node.status === "locked") {
						buyModalNode = node;
					}
				}}
			>
				{#if node.depth === 0 || node.depth === 1}
					<img src={node.icon} alt={`Node ${node.id}`} class="pointer-events-none h-12 w-12 object-contain" />
				{:else}
					<span class="text-xs font-bold">
						{node.depth === 2 ? "Lvl. 2" : "Lvl. 3"}
					</span>
				{/if}
			</button>
		{/each}

		{#if hoveredNode}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="animate-fade absolute z-200 w-40 rounded-lg border border-gray-300 bg-white p-3 shadow-xl"
				style="left: {modalPos.x}px; top: {modalPos.y}px; transform: translate(-50%, 0);"
			>
				<div class="mb-1 text-sm font-semibold">
					Upgrade #{hoveredNode.id}
				</div>

				<div class="text-xs text-gray-700">
					Status: <span class="font-medium">{hoveredNode.status}</span><br />
					Type: <span class="font-medium">{hoveredNode.type}</span>

					{#if hoveredNode.itemType}
						<br />Item: <span class="font-medium">{hoveredNode.itemType}</span>
					{/if}
				</div>
			</div>
		{/if}

		{#if buyModalNode}
			<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
				<div class="relative w-80 rounded-lg bg-white p-6 shadow-xl">
					<h2 class="mb-3 text-xl font-bold text-gray-800">
						Buy Upgrade #{buyModalNode.id}
					</h2>

					<div class="mb-4 flex items-center gap-3">
						<img src={buyModalNode.icon} alt="icon" class="h-12 w-12 object-contain" />
						<div>
							<p class="text-sm text-gray-700 capitalize">{buyModalNode.type}</p>
							{#if buyModalNode.itemType}
								<p class="text-xs text-gray-500">Type: {buyModalNode.itemType}</p>
							{/if}
						</div>
					</div>

					<p class="mb-4 text-lg font-semibold text-green-600">
						Price: {buyModalNode.price}$
					</p>

					<div class="flex justify-end gap-2">
						<button class="cursor-pointer rounded bg-gray-300 px-3 py-1 text-sm hover:bg-gray-400" on:click={() => (buyModalNode = null)}>
							Cancel
						</button>

						<button
							class="cursor-pointer rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
							on:click={() => purchase(buyModalNode!)}
						>
							Buy
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
