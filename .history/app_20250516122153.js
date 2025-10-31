const text = "Programmer, also likes making videos :)";
const description = document.querySelector('.description');
let index = 0; 

function typeText(){
  if (description.textContent.length < text.length && description.textContent.endsWith('|')){
    description.textContent -= text.charAt(index);
    console.log("animation cancel" description.textContent);
  }
  if(index < text.length){
    description.textContent += text.charAt(index) += '|';
    console.log(description.textContent);
    index ++;
    setTimeout(typeText, 100);
   }
}
window.addEventListener('load', typeText);