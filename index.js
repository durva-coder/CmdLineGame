import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a Javascript Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("How To Play")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...

  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Which planet in the solar system is known as the “Red Planet”?\n",
    choices: ["Venus", "Earth", "Mars", "Jupiter"],
  });

  return handleAnswer(answers.question_1 == "Mars");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "What is the capital of Japan?\n",
    choices: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
  });

  return handleAnswer(answers.question_2 == "Tokyo");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "What chemical element is designated as “Hg”?\n",
    choices: ["Silver", "Tin", "Copper", "Mercury"],
  });

  return handleAnswer(answers.question_3 == "Mercury");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Where does the Sushi come from?\n",
    choices: ["Japan", "China", "America", "South Korea"],
  });

  return handleAnswer(answers.question_4 == "Japan");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

function winner() {
  console.clear();

  const msg = `Congrats, ${playerName} !\n $ 1,000,000`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winner();
