import { generateRenovationPrompt } from "./src/lib/prompt-template";

const testInputs = {
    industry: "Plumbing",
    colors: "Blue and White",
    oldHtml: "<div><h1>Old Site</h1><p>We fix pipes.</p></div>"
};

const prompt = generateRenovationPrompt(testInputs);

console.log("--- Generated Prompt Preview ---");
console.log(prompt.substring(0, 500) + "...");
console.log("-------------------------------");

if (prompt.includes("Plumbing") && prompt.includes("Blue and White") && prompt.includes("We fix pipes.")) {
    console.log("✅ TEST PASSED: All inputs present in prompt.");
} else {
    console.error("❌ TEST FAILED: Missing inputs in prompt.");
    process.exit(1);
}
