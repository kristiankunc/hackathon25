<script lang="ts">
    import Header from "$lib/components/Header.svelte";

    export let data;
    const { result, expression } = data;

    let inputExpression: string = "";

    let usedExpressions: string[] = [];


</script>

<Header {data}/>

<div class="expressions dalsi trida uplne k hovnu">
    {#each usedExpressions as expr}
        <div class="expression-item">
            {#each expr.split('') as char, i}
                <span class="{char == expression[i] ? "bg-primary" : (expression.includes(char) ? "bg-accent" : "bg-secondary")}">{char}</span>
            {/each}
        </div>
    {/each}
</div>

<input type="text" bind:value={inputExpression} placeholder="Enter your answer here" class="" />
<span>= {result}</span>

<button onclick={() => {
    if (inputExpression.trim() === expression.trim()) {
        alert("Correct!");
    }

    //evals the equation
    else if (eval(inputExpression) === result) {
        usedExpressions = [...usedExpressions, inputExpression];
        inputExpression = "";
    }
    
    else {
        alert("Equation must be mathematicaly correct.");
    }
}}>submit</button>

{expression}