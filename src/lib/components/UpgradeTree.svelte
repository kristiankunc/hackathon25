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
		status: "purchased",
		x: 445,
		y: 300,
		type: "stats",
		icon: "",
		children: [
			{
				id: 2,
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/smg.png",
				x: 145,
				y: 150,
				children: [
					{
						id: 13,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/smg.png",
						x: 145,
						y: 50,
						children: [
							{
								id: 14,
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
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/bow.png",
				x: 205,
				y: 150,
				children: [
					{
						id: 15,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/bow.png",
						x: 205,
						y: 50,
						children: [
							{
								id: 16,
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
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/mortar.png",
				x: 265,
				y: 150,
				children: [
					{
						id: 17,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/mortar.png",
						x: 265,
						y: 50,
						children: [
							{
								id: 18,
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
				status: "purchased",
				type: "equipment",
				itemType: "gun",
				icon: "/assets/guns/laser.png",
				x: 325,
				y: 150,
				children: [
					{
						id: 19,
						status: "locked",
						type: "equipment",
						itemType: "gun",
						icon: "/assets/guns/laser.png",
						x: 325,
						y: 50,
						children: [
							{
								id: 20,
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
				status: "purchased",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/cechy.webp",
				x: 385,
				y: 150,
				children: [
					{
						id: 21,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/cechy.webp",
						x: 385,
						y: 50,
						children: [
							{
								id: 22,
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
				status: "purchased",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/morava.webp",
				x: 445,
				y: 150,
				children: [
					{
						id: 23,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/morava.webp",
						x: 445,
						y: 50,
						children: [
							{
								id: 24,
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
				status: "locked",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/slezsko.webp",
				x: 505,
				y: 150,
				children: [
					{
						id: 25,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/slezsko.webp",
						x: 505,
						y: 50,
						children: [
							{
								id: 26,
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
				status: "locked",
				type: "equipment",
				itemType: "shield",
				icon: "/assets/shields/slovensko.webp",
				x: 565,
				y: 150,
				children: [
					{
						id: 27,
						status: "locked",
						type: "equipment",
						itemType: "shield",
						icon: "/assets/shields/slovensko.webp",
						x: 565,
						y: 50,
						children: [
							{
								id: 28,
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
				status: "locked",
				type: "equipment",
				itemType: "engine",
				icon: "/assets/engines/steam.webp",
				x: 625,
				y: 150,
				children: [
					{
						id: 29,
						status: "locked",
						type: "equipment",
						itemType: "engine",
						icon: "/assets/engines/steam.webp",
						x: 625,
						y: 50,
						children: [
							{
								id: 30,
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
				status: "locked",
				type: "equipment",
				itemType: "engine",
				icon: "/assets/engines/skoda.webp",
				x: 685,
				y: 150,
				children: [
					{
						id: 31,
						status: "locked",
						type: "equipment",
						itemType: "engine",
						icon: "/assets/engines/skoda.webp",
						x: 685,
						y: 50,
						children: [
							{
								id: 32,
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
				status: "locked",
				type: "equipment",
				itemType: "engine",
				icon: "/assets/engines/unity.webp",
				x: 745,
				y: 150,
				children: [
					{
						id: 33,
						status: "locked",
						type: "equipment",
						itemType: "engine",
						icon: "/assets/engines/unity.webp",
						x: 745,
						y: 50,
						children: [
							{
								id: 34,
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
					<img src={slot.item.icon} alt={`Node ${slot.item.id}`} class="h-8 w-8" />
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
			<button
				class={`absolute flex items-center justify-center rounded-full border-2 font-bold transition-transform duration-200
          ${node.status === "purchased" ? "border-green-700 bg-green-500 text-white hover:scale-110" : ""}
          ${node.status === "locked" ? "cursor-not-allowed border-gray-400 bg-gray-300 text-gray-600" : ""}`}
				style="width: {NODE_RADIUS * 2}px; height: {NODE_RADIUS * 2}px; left: {node.x}px; top: {node.y}px;"
				on:mouseenter={() => handleHover(node)}
				on:mouseleave={clearHover}
				draggable={node.status === "purchased" && node.type === "equipment"}
				on:dragstart={() => handleDragStart(node)}
			>
				{#if node.depth === 1}
					<!-- main tier nodes show icon -->
					<img src={node.icon} alt={`Node ${node.id}`} class="pointer-events-none h-12 w-12 object-contain" />
				{:else}
					<!-- children show text -->
					<span class="text-xs font-bold">
						{node.depth === 2 ? "Lvl. 2" : "Lvl. 3"}
					</span>
				{/if}
			</button>
		{/each}

		{#if hoveredNode}
			<div
				class="pointer-events-none absolute z-10 rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-lg"
				style="left: {modalPos.x}px; top: {modalPos.y}px; transform: translate(-50%, 0);"
			>
				<strong>Node {hoveredNode.id}</strong><br />
				Status: {hoveredNode.status}<br />
				Type: {hoveredNode.type}<br />
				{#if hoveredNode.itemType}
					Item: {hoveredNode.itemType}
				{/if}
			</div>
		{/if}
	</div>
</div>
