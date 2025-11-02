const text = "Programmer, also likes making videos :)";
const description = document.querySelector('.description');
let index = 0;

function typeText() {
  if (index < text.length) {
    description.textContent = text.substring(0, index + 1) + '|';
    index++;
    setTimeout(typeText, 100);
  } else {
    // Keep cursor blinking after text is complete
    setInterval(() => {
      description.textContent = text + (description.textContent.endsWith('|') ? '' : '|');
    }, 500);
  }
}

window.addEventListener('load', typeText);