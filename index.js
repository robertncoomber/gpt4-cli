import chalk from "chalk";
import PromptSync from "prompt-sync";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as os from 'os';
import dialog from "node-file-dialog";
import { Stream } from "stream";

dotenv.config();
const prompt = PromptSync();

const configuration = new Configuration({
    organization: "org-WHcqwXkvrqu8UeNV76L5rRQQ",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log(chalk.white("\n*** gpt-cli *** \n"))
console.log(chalk.grey(" - type quit to close"))
console.log(chalk.grey(" - type \"save filename\" to save to the directory.\n"))
let model;

function getModel() {
    console.log("chose model - enter number \n\n 2) gpt-3.5-turbo-0301 \n 3) gpt-3.5 \n 4) gpt-4\n")
    let modelSelection = prompt("")
    if (modelSelection.includes("2")) {
        model = "gpt-3.5-turbo-0301";
    } else if (modelSelection.includes("3")) {
        model = "gpt-3.5-turbo";
    } else if (modelSelection.includes("4")) {
        model = "gpt-4";
    }
    else {
        console.log(modelSelection + " is not valid.");
        getModel();
    }
}
getModel();

let instructions = "You are a helpful ai assistent";
let messages = [];

console.log("\n******************\n\nmodel: " + model + "\n");

messages.push({ role: "system", content: instructions })
let num = 0;
async function loop() {
    const userPrompt = prompt('->');

    if (userPrompt == "quit") {
        return;
    } else if (userPrompt.slice(0, 4) == "save") {

        fs.appendFile("\\saved-conversations\\" + userPrompt.slice(-userPrompt.length + 5) + '.txt', JSON.stringify(messages, undefined, 4), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        return;
    }

    messages.push({ role: "user", content: userPrompt })
    const response = await openai.createChatCompletion({
        model: model,
        temperature: 0.888,
        max_tokens: 2048,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 1,
        messages: messages
    }, { timeout: 60000 });

    const response_text = response.data.choices[0].message.content.trim();
    messages.push({ role: "assistant", content: response_text })
    console.log("\n" + chalk.greenBright("chat: " + response_text + "\n"));
    loop();
}

loop();



