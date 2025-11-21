<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";

	export let data;
	const { result, expression } = data;

	let inputExpression: string = "";
	let usedExpressions: string[] = [];

	const operatorIndexes = [2, 5, 8];

	const fields = Array.from({ length: 11 }, (_, i) => {
		const isOperator = operatorIndexes.includes(i);
		return {
			pattern: isOperator ? "[+\\-*]" : "[0-9]"
		};
	});

	let values = Array(11).fill("");

	onMount(() => {
		document.getElementById("input-0")!.focus();
	});
</script>

<Header {data} />

<div class="my-20 flex w-screen flex-col items-center">
	{#each usedExpressions as expr}
		<div class="mb-4 flex items-center gap-2">
			{#each expr.split("") as char, i}
				<div
					class="flex h-8 w-8 items-center justify-center {operatorIndexes.includes(i) ? 'rounded-full' : 'rounded-sm'} {char ==
					expression[i]
						? 'bg-primary-700'
						: expression.includes(char)
							? 'bg-accent'
							: 'bg-secondary'}"
				>
					<span class="text-xl">{char}</span>
				</div>
			{/each}
			<span class="text-xl">= {result}</span>
		</div>
	{/each}

	<div class="flex items-center gap-2">
		{#each fields as _, i}
			<input
				id="input-{i}"
				bind:value={values[i]}
				type="text"
				maxlength="1"
				class="h-8 w-8 text-center text-xl {operatorIndexes.includes(i) ? 'rounded-full bg-background-900' : 'rounded-sm bg-background-950'}"
				oninput={() => {
					if (!values[i].match(fields[i].pattern)) values[i] = "";
					else if (i < 10) document.getElementById("input-" + (i + 1))!.focus();
				}}
				onkeydown={(event) => {
					if (event.key == "Backspace" && i > 0) document.getElementById("input-" + (i - 1))!.focus();
				}}
			/>
		{/each}
		<span class="text-xl">= {result}</span>
	</div>

	<button
		class="mt-4 rounded-sm bg-primary px-6 py-3 text-lg font-semibold text-background transition hover:bg-primary-600"
		onclick={() => {
			inputExpression = values.join("");
			if (inputExpression.length < 11) {
				alert("All fields must be filled in");
			} else if (inputExpression.trim() === expression.trim()) {
				alert("Correct!");
			}

			//evals the equation
			else if (eval(inputExpression) === result) {
				usedExpressions = [...usedExpressions, inputExpression];
				for (let i = 0; i < 11; i++) {
					(document.getElementById("input-" + i)! as HTMLInputElement).value = "";
					values[i] = "";
				}
				document.getElementById("input-0")!.focus();
			} else {
				alert("Equation must be mathematicaly correct.");
				for (let i = 0; i < 11; i++) {
					(document.getElementById("input-" + i)! as HTMLInputElement).value = "";
					values[i] = "";
				}
				document.getElementById("input-0")!.focus();
			}
		}}>Submit</button
	>
</div>

dev hint: {expression}

