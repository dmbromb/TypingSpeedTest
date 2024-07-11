"use strict";
let word = document.querySelector(".word");
let timer = document.querySelector(".timer");
let regenBtn = document.querySelector("#regenerate");
let resetBtn = document.querySelector("#resetTimer");
let typingInput = document.querySelector("#typing-input");
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalId;
let wordToType;
const wordList = [
  "Atoms bond forming molecules",
  "Electrons orbit atomic nuclei",
  "Acids neutralize with bases",
  "Catalysts speed chemical reactions",
  "Elements form the periodic table",
  "Covalent bonds share electrons",
  "Chemical reactions release energy",
  "Ionic bonds transfer electrons",
  "Compounds have fixed ratios",
  "Protons determine atomic number",
  "Isotopes vary neutron count",
  "Molecules interact forming solutions",
  "Solutions consist solute solvent",
  "Reactions can be exothermic",
  "Endothermic reactions absorb energy",
  "Acids donate hydrogen ions",
  "Bases accept hydrogen ions",
  "Oxidation involves electron loss",
  "Reduction involves electron gain",
  "pH scale measures acidity",
  "Molecular geometry affects properties",
  "Organic chemistry studies carbon",
  "Inorganic chemistry studies minerals",
  "Chemical bonds store energy",
  "Valence electrons determine reactivity",
  "Atoms form stable configurations",
  "Electrolysis splits compounds electrically",
  "Solubility depends on temperature",
  "Gases expand when heated",
  "Liquids form when condensed",
  "Solids have fixed shapes",
  "Plasma conducts electricity easily",
  "Quantum mechanics explains particles",
  "Thermodynamics studies heat energy",
  "Kinetics studies reaction rates",
  "Equilibrium balances reactants products",
  "Spectroscopy analyzes light absorption",
  "Chromatography separates mixtures",
  "Distillation purifies liquids",
  "Filtration removes solid particles",
];

function getRandomObject(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  let randomWord = list[randomIndex];
  word.textContent = randomWord;
  return randomWord;
}

function newWord() {
  wordToType = getRandomObject(wordList);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  typingInput.value = "";
  document.querySelector(".timer").style.color = "#fff"; // Initially white
  stopTimer();
  timer.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  typingInput.focus();
}

function increaseTimer() {
  milliseconds += 1;
  if (milliseconds == 100) {
    milliseconds = 0;
    seconds += 1;
  }
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
  timer.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
  if (number < 10) {
    number = `0${number}`;
  }
  return number;
}

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(increaseTimer, 10);
  }
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  typingInput.value = "";
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  document.querySelector(".timer").style.color = "#fff"; // Initially white
  timer.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  typingInput.focus();
}

function correctWord() {
  if (typingInput.value === wordToType) {
    document.querySelector(".timer").style.color = "green";
    stopTimer();
  } else {
    document.querySelector(".timer").style.color = "red";
    setTimeout(() => {
      document.querySelector(".timer").style.color = "#fff";
    }, 1000);
  }
}

timer.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    correctWord();
  } else {
    startTimer();
  }
});

regenBtn.addEventListener("click", newWord);
resetBtn.addEventListener("click", resetTimer);

newWord();
typingInput.focus();
