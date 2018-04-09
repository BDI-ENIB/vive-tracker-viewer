var XCom = require("./backend-libs/XCom");
var loaderModule = require("./modules/loader");
var vivePosModule = require("./modules/vivePosModule");

var xCom = new XCom.XCom();

// ===== DISPLAY ===== //
//loader
loaderModule.init(displayer);
vivePosModule.init(displayer,2000,3000);


// ===== EVENTS ===== //
var readyPromise = Promise.all([xCom.whenConOpen("vive")]);


// ===== ACTIONS ===== //

//debug
readyPromise.then(()=>{
	xCom.addCommand("SCRAMBLED",(com,con)=>{
		alert("scrambled");
	})
});

//loader dismissal
readyPromise.then(()=>{
	console.log("all devices ready");
	loaderModule.hide(); // hide loader
})

readyPromise.then(()=>{
  xCom.addCommand("LEDPOS",(com,con)=>{
		vivePosModule.setSensorPosition(parseFloat(com[1]),{x:parseFloat(com[2]),y:parseFloat(com[3])});
	});
});
setInterval(()=>vivePosModule.reDraw(),50);