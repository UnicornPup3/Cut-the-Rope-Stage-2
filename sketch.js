const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composite;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;
var fruit_con_2;

var bg_img
var food;
var rabbit;

var button;
var bunny;
var blink, eat, sad;

function preload()
{
  bg_img = LoadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","eat_3.png","eat_4.png");
  eat = loadAnimation("eat_0.png","eat_1.png", "eat_2.png");
  sad = LoadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup(){
  createCanvas(500,700);
  frameRatez(80);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_bth.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new rope(7,{x:245,y:30});
  ground = new ground(200,690,600,20);

  blink.frameDely = 20;
  eat.frameDely = 20;
  sad.frameDelay = 20;

  bunny = createSpirite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);



  rectMode(CENTER);
  ellipseMode(RADIUS);
  ImageMode(CENTER);

}

function draw()
{
  background(51);
  Image(bg_img,width/2,height/2,490,690);
  
  if(fruit!=null){
    Image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating'); 
  }
}