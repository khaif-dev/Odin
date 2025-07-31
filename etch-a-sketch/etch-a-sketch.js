const resizeBtn = document.querySelector("#resizeBtn")
resizeBtn.addEventListener("click", () =>{
  const size = parseInt(prompt("Enter Your grid size (number between 2 and 100)"))
  if(isNaN(size)||size<2||size>100){
    alert("Please Enter a number between 2 and 100")
    return;
  }
  createGrid(size);
});


const container = document.querySelector("#container")
//create grid from the input
function createGrid(size){
  container.innerHTML = "";

  const squareSize = 100 / size;

  //create the squares
  for(let i=0; i<size*size; i++){
    const square = document.createElement('div')
    square.style.width = `${squareSize}%`;
    square.style.height = `${squareSize}%`;
    square.style.border = "0.5px solid grey";
    square.style.boxSizing = "border-box";
    
    //creating random rgb colors
    square.dataset.hoverCount = 0;
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.dataset.rgb = `rgb(${r},${g},${b})`;

    //adding hover effect
    square.addEventListener("mouseover", ()=>{
      let count = Number(square.dataset.hoverCount);
      if(count < 10){
        count += 1;
        square.dataset.hoverCount = count;
        square.style.background = square.dataset.rgb;
        square.style.opacity = count*0.1;
      }
    })
    container.appendChild(square);
  } 

}
createGrid(16)

//reset button
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () =>{
  createGrid(16);
})


