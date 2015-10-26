//----ProgressBar---------------
function ProgressBar__QID__ () {
	this.aObjectName ="vProgressBar";
	this.aBarName = "dPROGRESSBAR__QID__";
	this.aDOM = null;
	this.aMax = 20;
	this.x = null;
	this.y = null;
		//---Methods----------------------------
	//#################################################################
	//# Nested: appendchar()
	//#################################################################
	this.appendchar = function () {
		this.x.innerHTML +="o";
		var ys = this.y.innerHTML; 
		this.y.innerHTML = ys.substr(1,ys.length);
	}
	//#################################################################
	//# Nested: next()
	//#################################################################
	this.next = function () {
		if ((this.y.innerHTML).length != 0) {
			this.appendchar();
	   } else {
			this.reset();
	   }
	}
	//#################################################################
	//# Nested: nextstep()
	//#################################################################
	this.nextstep = function () {
		//var x = document.getElementById("xProgressBar__QID__");
		//var y = document.getElementById("yTimeLeft__QID__");
		if ((this.y.innerHTML).length != 0) {
			this.appendchar();
	   } else {
			this.stop();
	   }
	};
	//#################################################################
	//# Nested: init(pObjectName,pBarName,pCount)
	//#################################################################
	this.init = function (pObjectName,pBarName,pCount) {
		this.aObjectName = pObjectName;
		this.aBarName = pObjectName;
		this.x = document.getElementById("xProgressBar__QID__");
		this.y = document.getElementById("yTimeLeft__QID__");
		this.aDOM = document.getElementById(pBarName);
		if (!this.aDOM) alert("progressbar.js:36 - pBarName='"+pBarName+"' undefined");
		
	};
	//#################################################################
	//# Nested: initMax(pMax)
	//#################################################################
	this.initMax = function (pMax) {
		this.aMax = pMax;
		this.x.innerHTML = "";
		var i=0;
		this.y.innerHTML ="";
		while (i!=pMax) {
			this.y.innerHTML +="o";
			i++;
		};
	}
	//#################################################################
	//# Nested: hide()
	//#################################################################
	this.hide = function() {
		var vNode = this.aDOM;
		if (vNode) {
			vNode.style.display = "none";
			vNode.style.visibility = "hidden";
		};
	}
	//#################################################################
	//# Nested: show()
	//#################################################################
	this.show = function() {
		var vNode = this.aDOM;
		if (vNode) {
			vNode.style.display = "block";
			//vNode.style.display = "inline";
			vNode.style.visibility = "visible";
		};
	};
	//#################################################################
	//# Nested: reset()
	//#################################################################
	this.reset = function () {
		this.show();
		this.initMax(this.aMax);	
	}
	//#################################################################
	//# Nested: start()
	//#################################################################
	this.start = function () {
		this.reset();
		this.aCycle = setInterval(this.aObjectName+".nextstep();", 500);
   }
   //#################################################################
	//# Nested: stop()
	//#################################################################
	this.stop = function () {
		clearInterval(this.aCycle);
	}
}	

		//var vProgressBar__QID__ = new ProcessBar__QID__();
		//vProgressBar__QID__.init("vEProof__QID__.aProgressBar","dPROGRESSBAR__QID__");
		//vProgressBar__QID__.init("vProgressBar__QID__","dPROGRESSBAR__QID__");
		//vProgressBar__QID__.initMax(20);		
		//vProgressBar__QID__.start();
// 		<div id="dPROCESSBAR">
// 			<table border=1 bgcolor="white" align="center" cellspacing="0"><tr><td>
// 				<table border="0" align="center">
// 					<tr>
// 						<td id="xProgressBar" bgcolor="blue" style="color:blue" ></td>
// 						<td id="yTimeLeft"  style="color:white">ooooooooooooooooooooooooooo</td>
// 					</tr>
// 				</table></td></tr>
// 			</table>
// 		</div>
 									
 									