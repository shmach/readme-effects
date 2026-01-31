/* eslint no-undef: "off" */

// Title Animation vars
const title = 'Readme+Effects';
const titleContainer = document.querySelector('.title');

// Output Code vars (This is not IA coded >:( ))
const outputTypeSelected = document.querySelector('#output-type-select');
const code = document.querySelector('#code-output');

// Input vars
const textInput = document.querySelector('#text-input');
const effectSelect = document.querySelector('#effect-select');
const primaryColorInput = document.querySelector('#primary-color');
const secondaryColorInput = document.querySelector('#secondary-color');
const transparentBgCheckbox = document.querySelector('#transparent-bg');
const bgColorInput = document.querySelector('#bg-color');
const fontInput = document.querySelector('#font');
const sizeInput = document.querySelector('#size');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');

const inputs = [
  textInput,
  effectSelect,
  primaryColorInput,
  secondaryColorInput,
  bgColorInput,
  transparentBgCheckbox,
  fontInput,
  sizeInput,
  widthInput,
  heightInput,
];

// URL vars
const origin = window.location.origin;

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
  const effect = effectSelect.value || 'wavy-glitch';
  const text = encodeURIComponent(
    textInput.value || 'This is Readme+Effects text effect!',
  );
  const bgColor = transparentBgCheckbox.checked
    ? 'transparent'
    : bgColorInput.value;
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
        if (input.id === 'transparent-bg') {
          if (input.checked) {
            bgColorInput.disabled = true;
            bgColorInput.parentElement.classList.add('disabled');
          } else {
            bgColorInput.disabled = false;
            bgColorInput.parentElement.classList.remove('disabled');
          }
        }
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
