var eca = new eca();

//-----------------------------------------
//TODO
var cellWidth = 50;
var cellGenerationMax = 50;
var code = 110;
eca.drawUnit = function(x, y, state, width, height)
{
    if(state)
    {
        fill(color(0, 255, 0));
    }
    else
    {
        fill(color(0));
    }
    noStroke();
    
    //rect(x, y, width, height);
    
    var size = width * 0.5;
    ellipse(x + size, y + size, size * 2, size * 2, 1);


}
//------------------------------------------


//------------------------------------------
function setup() {
  createCanvas(600, 600);

  var startPattern = [];
  for(var i = 0; i < cellWidth; i++)
  {
    startPattern.push(Math.random() > 0.5);
  }
  eca.setup(cellWidth, cellGenerationMax, code, startPattern);
}

function draw() {
    eca.draw(0, 0, 600, 600);
}

function keyPressed() {

    if (keyCode == DOWN_ARROW) 
    {
        eca.nextGeneration();
    }
}