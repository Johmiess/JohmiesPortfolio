const text = "Programmer, also likes making videos :)";
const description = document.querySelector('.description');
let index = 0; 

function typeText(){
  if(index < text.length){
    description.textContent += text.charAt(index) + "|";
    index ++;
    setTimeout(typeText, 100);
   }
   setTimeout(() => {
    description.textContent = description.textContent.slice(0, -1);
   }, 1000);
}
window.addEventListener('load', typeText);