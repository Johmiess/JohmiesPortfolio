const text = "Programmer, also likes making videos :)";
const description = document.querySelector('.description');
let index = 0; 

function typeText(){
  setTimeout(() => {
    description.textContent = description.textContent.replace("|", "");
   }, 250);
  if(index < text.length){
    description.textContent += text.charAt(index) + "|";
    index ++;
    setTimeout(typeText, 200);
   }
  if(index == text.length){
    setInterval(() => {
      description.textContent = text + (description.textContent.endsWith("|") ? "" : "|");
    }
}
}
window.addEventListener('load', typeText);