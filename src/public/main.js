/* eslint no-undef: "off" */

// Title Animation vars
const title = 'Text+Effects';
const titleContainer = document.querySelector('.title');

// Output Code vars (This is not IA coded >:( ))
const outputTypeSelected = document.querySelector('#output-type-select');
const code = document.querySelector('#code-output');
const copyOutputBtn = document.querySelector('#copy-output-btn');
const copyOutputUrlBtn = document.querySelector('#copy-url-btn');

copyOutputBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(code.innerText).then(() => {
    copyOutputBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyOutputBtn.innerText = 'Copy';
    }, 2000);
  });
});

copyOutputUrlBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(generateUrl()).then(() => {
    copyOutputUrlBtn.innerText = 'Copied!';
    setTimeout(() => {
      copyOutputUrlBtn.innerText = 'Copy URL only';
    }, 2000);
  });
});

// Input vars
let textInputs = document.querySelectorAll('[data-text-input]');
const effectSelect = document.querySelector('#effect-select');
const primaryColorInput = document.querySelector('#primary-color');
const secondaryColorInput = document.querySelector('#secondary-color');
const transparentBgCheckbox = document.querySelector('#transparent-bg');
const bgColorInput = document.querySelector('#bg-color');
const fontInput = document.querySelector('#font');
const sizeInput = document.querySelector('#size');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');

const textInputsContainer = document.querySelector('#text-inputs-container');

const addNewLineBtn = document.querySelector('#add-new-line');
addNewLineBtn.addEventListener('click', () => {
  const i = textInputs.length + 1;
  const parent = document.querySelector('#text-inputs-container');
  const component = `<div class="form-input-container">
            <label for="text-input-${i}">Text:</label>
            <input id="text-input-${i}" name="text-input" type="text" data-text-input="${i}"
              placeholder="Enter your text here" value="And you just added line ${i}!" >
            <button type="button" class="btn destructive" data-remove-line="${i}">X</button>
          </div>`;
  parent.insertAdjacentHTML('beforeend', component);
  textInputs = document.querySelectorAll('[data-text-input]');
  generateCodeExample();
});

textInputsContainer.addEventListener('click', (e) => {
  if (e.target && e.target.matches('button.btn.destructive')) {
    const lineToRemove = e.target.getAttribute('data-remove-line');
    const inputToRemove = document.querySelector(
      `input[data-text-input="${lineToRemove}"]`,
    );
    const containerToRemove = inputToRemove.parentElement;
    containerToRemove.remove();
    textInputs = document.querySelectorAll('[data-text-input]');
    generateCodeExample();
  }
});

const inputs = [
  ...textInputs,
  effectSelect,
  primaryColorInput,
  secondaryColorInput,
  bgColorInput,
  fontInput,
  sizeInput,
  widthInput,
  heightInput,
];

const titleAnimation = () => {
  let index = 0;
  const interval = setInterval(() => {
    titleContainer.innerText += title[index];
    index++;
    if (index === title.length) {
      clearInterval(interval);
    }
  }, 150);
};

const generateUrl = () => {
  const { origin } = window.location;
  const effect = effectSelect.value || 'wavy-glitch';
  const text = Array.from(textInputs)
    .map((input) => encodeURIComponent(input.value))
    .join(';');
  const bgColor = transparentBgCheckbox.checked
    ? 'transparent'
    : bgColorInput.value.replace('#', '');
  const pColor = primaryColorInput.value.replace('#', '');
  const sColor = secondaryColorInput.value.replace('#', '');
  const size = sizeInput.value || '18';
  const width = widthInput.value || '400';
  const height = heightInput.value || '80';

  return `${origin}/generate/${effect}?text=${text}&pColor=${pColor}&sColor=${sColor}&bgColor=${bgColor}&font=${fontInput.value}&size=${size}&width=${width}&height=${height}`;
};

const generateCodeExample = () => {
  const effect = effectSelect.value || 'wavy-glitch';
  if (outputTypeSelected.value === 'markdown') {
    code.innerText = `![${effect.charAt(0).toUpperCase() + effect.slice(1)} Text Effect](${generateUrl()})`;
  } else if (outputTypeSelected.value === 'html') {
    code.innerText = `<img alt="${effect.charAt(0).toUpperCase() + effect.slice(1)} Text Effect" src="${generateUrl()}" />`;
  }
};

inputs.forEach((input) => {
  input.addEventListener(
    'input',
    () =>
      setTimeout(() => {
        const img = document.getElementById('svg-output');
        img.src = generateUrl();
        generateCodeExample();
      }),
    400,
  );
});

outputTypeSelected.addEventListener('change', () => {
  generateCodeExample();
});

window.addEventListener('load', () => {
  titleAnimation();
  const img = document.getElementById('svg-output');
  img.src = generateUrl();
  generateCodeExample();
});
