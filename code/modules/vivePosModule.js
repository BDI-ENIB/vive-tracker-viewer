exports.init=function(displayer,w,h){
	exports.card = new displayer.TextCard();
	var col = new displayer.Col(6,4,3);
	displayer.mainFrame.addChild(col);
	col.addChild(exports.card);
	var title = new displayer.Title();
	title.text="Vive";
	exports.card.addChild(title);
	var text = new displayer.Text();
	exports.card.addChild(text);
  exports.canvas = new displayer.Canvas();
  exports.canvas.width = w;
  exports.canvas.height = h;
  exports.canvas.element.style.border = "solid 1px grey";
  exports.card.addChild(exports.canvas);
  exports.sensors=[];
  let colors = ["red","orange","yellow","green","cyan","blue","purple","pink"];
  for(let i=0;i<8;i++)exports.sensors.push({
    position:{x:0,y:0},
    color: colors[i],
    offset: {x:200*Math.cos(2*Math.PI*i/8),y:200*Math.sin(2*Math.PI*i/8)}
  });
  exports.beaconPos = {x:315+150,y:30,z:315};
}
exports.setSensorPosition=function(sensor,pos){
  exports.sensors[sensor].position = pos;
  //exports.reDraw();
}
exports.reDraw=function(){
  clearCanvas(exports.canvas,exports.canvas.ctx);
  drawPos(exports.beaconPos,40,"yellow",exports.canvas.ctx);
  for(let sensor of exports.sensors) {
    try{drawPos(sensor.position,20,sensor.color,exports.canvas.ctx);}catch(e){}
  }
  drawPos(exports.sensors.map(d=>d.position).reduce((a,b)=>({x:a.x+b.x/8,y:a.y+b.y/8}),{x:0,y:0}),40,"white",exports.canvas.ctx);
}

function clearCanvas(c,ctx){
  ctx.clearRect(0,0,c.width,c.height);
}
function drawPos(pos,s,cl,ctx){
  ctx.fillStyle = cl;
  ctx.fillRect(pos.x-s,pos.y-s,s,s);
}