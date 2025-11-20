export async function load() {
    // 4 random numbers from 10-99
    let numbers: number[] = [];
    while (numbers.length < 4) {
        const num = Math.floor(Math.random() * 90) + 10;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }

    // 3 random operators from +, -, *
    const operators = ['+', '-', '*'];
    let ops: string[] = [];
    while (ops.length < 3) {
        const op = operators[Math.floor(Math.random() * operators.length)];
        ops.push(op);
    }

    let result = eval(`${numbers[0]} ${ops[0]} ${numbers[1]} ${ops[1]} ${numbers[2]} ${ops[2]} ${numbers[3]}`);

    let expression = `${numbers[0]}${ops[0]}${numbers[1]}${ops[1]}${numbers[2]}${ops[2]}${numbers[3]}`;

    return {
        result,
        expression
    }


}