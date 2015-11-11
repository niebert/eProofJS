//#################################################################
//# Javascript Class:         EProof__SID__()
//#   Method Definition File: eproofmeth1.js
//#                
//# Author of Class:      Engelbert Niehaus                    
//# email:                niehaus@uni-landau.de                 
//# created               24.2.2015             
//# last modifications    __DATE__            
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus 
//#################################################################
function appendMethods_EProof__SID__ () {
    //#################################################################
	//# Nested: getAllJustIDs()
	//#################################################################
    this.getAllJustIDs = function () {
    	var vJustString = "";
    	var k=0;
    	var vTypeID = new Array("JUSTIFICATION","PRECONDITION");
    	var vComma = "";
		while (k != vTypeID.length) {
    		vJustString += vComma + this.aID4StepType[vTypeID[k]].join(",");
			if (vJustString != "")  vComma = ",";
			k++;
		};
		return vJustString;
    };
    //#################################################################
	//# Nested: getAllIDs4Type(pType) read form DOM
	//#################################################################
    this.getAllIDs4Type = function (pType) {
    	var vJustString = "";
    	var i=0;
		var vComma = "";
		var vJustIDs = this.getElementsByClassName("ID_"+pType+"LIST"+this.aQID);
		while (i !=vJustIDs.length) {
			vJustString += vComma + vJustIDs[i].value;
			vComma =","; 
			i++;
		};
		return vJustString;
    };
	//#################################################################
	//# Nested: getAllSteps()
	//#################################################################
	this.getAllSteps = function (pSCAN) {
		if ((!this.aAllSteps) || (pSCAN)) {
			this.aUsedSteps = this.getUsedSteps("SCAN");
			this.aUnusedSteps = this.getUnusedSteps("SCAN");
			//alert("Used="+this.aUsedSteps.length+" Unused="+this.aUnusedSteps.length+" ");
			if (pSCAN) {
				var vAll = new Array();
				var vAppend = this.aUsedSteps;
				var i=0;
				while (i != vAppend.length) {
					vAll.push(vAppend[i]);
					i++;
				};
				i=0;
				vAppend = this.aUnusedSteps;
				while (i != vAppend.length) {
					vAll.push(vAppend[i]);
					i++;
				}
				this.aAllSteps = vAll;
			};
			//alert("All="+vAll.length+" Used="+this.aUsedSteps.length+" Unused="+this.aUnusedSteps.length+" ");
			this.createStep2SA();
		};
		return this.aAllSteps;
	};  
    //#################################################################
	//# Nested: getDateString()
	//#################################################################
	this.getDateString = function () {
		var vNow = new Date();
		var vMonth = vNow.getMonth()+1;
		return vNow.getDate()+"."+vMonth+"."+vNow.getFullYear();
	};
    //#################################################################
	//# Nested: getStringNumber()
	//#################################################################
	this.getStringNumber = function (pNumber) {
		function ord(x) { return x.charCodeAt(0) }
		var vRes = "";
		vZ = ord("Z");
		while (this.greater(pNumber,vZ-1)) {
			vRes += "Z";
			//alert(vRes);
			pNumber -= vZ;
		};
		var vChar = String.fromCharCode(pNumber+ord("A")); 
		//alert(vRes + vChar);
		return vRes + vChar;
	};
	//#################################################################
	//# Nested: getStringQID()
	//#################################################################
	this.getStringQID = function (pQID) {
		function ord(x) { return x.charCodeAt(0) }
		function chr(x) { 
			var n = parseInt(x+"");
			n = n % 25;
			return String.fromCharCode(n+ord("A")) 
		};
		if (pQID == "") {
			var vNow = new Date();
			//var vMonth = vNow.getMonth()+1;
			//pQID = "Y"+vNow.getFullYear()+"M"+vMonth+"D"+vNow.getDate()+"h"+vNow.getHours()+"m"+vNow.getMinutes();
			pQID = chr(Math.round(Math.random()*25));
			pQID = chr(vNow.getFullYear());
			pQID += chr(vNow.getMonth());
			pQID += chr(vNow.getDate());
			pQID += chr(vNow.getHours());
			pQID += chr(vNow.getMinutes());
			pQID += chr(vNow.getSeconds());
			//pQID = this.vigenere(pQID,"ABCD","encode");
		};
		return pQID;
	};
	//#################################################################
	//# Nested: getEProofHTML()
	//#################################################################
	//this.getEProofHTML = function(pLibPath,pMathJaxPath,pMathJaxConfig) {
	this.getEProofHTML = function(pLibPath,pMathJaxPath,pMathJaxConfig) {
		var vLibPath  = pLibPath || "library/";
		var vMathJaxPath = pMathJaxPath || "../MathJax/";
		//var vMathJaxPath = pMathJaxPath || "../MathJax/";
		//var vOut = this.getWeeblyEProof(pLibPath,pMathJaxPath,pMathJaxConfig);
		return this.getWrappedHTML(vOut);
	};
	//#################################################################
	//# Nested: getEProofIMath()
	//#################################################################
	this.getEProofIMath = function() {
		//----used in saveEProofIMath2Form()----
		var vSID = this.getElementById("tSID"+this.aQID).value;
		var vQID = this.getElementById("tQID"+this.aQID).value;
		var cln = this.getIMathEProofClone();
		cln = this.getIMathEProofAnswerBox(cln);
		cln  = this.getIMathEProofClearSteps(cln);
		return this.getIMathEProofInnerHTML(cln,vQID,this.DO+"thisq",vSID);
	};
	//#################################################################
	//# Nested: getExportTemplate(pTPLname)
	//#################################################################
	this.getExportTemplate = function (pTPLname) {
		var vTPL = this.getChildById(this.aRootDOM,pTPLname).value;
		vTPL = this.replaceString(vTPL,"__do__",this.DO);
		return vTPL
	};
	//#################################################################
	//# Nested: getIMathById(pFormID)
	//#################################################################
	this.getIMathById = function (pFormID) {
		var vFormID = "imath"+pFormID;
		if (pFormID == "STORAGE") {
			//alert("ThisQ="+this.aThisQ+" Offline="+this.aOffline);
			//if (this.aOffline == "1") {
			//	alert("Offline");
			//}
			vFormID = "qn"+this.aThisQ+"000";
		};
		return this.getChildById(this.aRootDOM,vFormID);
	};
	//#################################################################
	//# Nested: getIMathEProofClone()
	//#################################################################
	this.getIMathEProofClone = function(pLoadXML,pRootID) {
		// clone e-Proof
		var vRootID = pRootID || "EMULATIONiMathAS";
		var vIMathRoot = document.getElementById(vRootID);
		var cln = vIMathRoot.cloneNode(true);
		var vLoadXML = this.getChildById(cln,"tLOAD"+this.aQID);
		vLoadXML.innerHTML = pLoadXML || "";
		vLoadXML.value = "";
		//alert(this.getChildById(cln,"tLOAD"+this.aQID).value);
		this.getChildById(cln,"USEDSTEPS"+this.aQID).innerHTML = "";
		this.getChildById(cln,"UNUSEDSTEPS"+this.aQID).innerHTML = "";
		this.getChildById(cln,"SOURCESTEPS"+this.aQID).innerHTML = this.DO+"SourceSteps";
		this.getChildById(cln,"ulCONNECTIONLIST"+this.aQID).innerHTML = this.createSelectConnection4JS();
		return cln;
	};
	//#################################################################
	//# Nested: getIMathEProofAnswerBox(cln)
	//#################################################################
	this.getIMathEProofAnswerBox = function(cln) {
		//----Create answerboxes for IMathAS-----
		var vValue = ""+this.CR;
		var i=0;
		//var vMax = this.aIMathArray.length;
		var vMax = 1;
		while (i != vMax) {
			vValue += this.DO+"answerbox["+i+"]"+this.CR;
			i++;
		}
		var vStorage = this.getChildById(cln,"imathSTORAGE");
		if (vStorage) {
			vStorage.innerHTML = vValue;
		} else {
			alert("this.getIMathEProofAnswerBox()-Call Error 'imathSTORAGE'");
		};
		var vListID = new Array("imathDISPLAYOPTION","imathSTEPCOUNT");
		i=0;
		vValue = "";
		while (i != vListID.length) {
			vValue += this.CR+"    "+this.LT+"input type='text' id='"+vListID[i]+"'  value='"+this.DO+vListID[i]+"'/"+this.GT;
			i++;
		};
		this.getChildById(cln,"imathDISPLAYOPTIONandSTEPCOUNT").innerHTML =vValue;
		//this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP","SOLUTION","ENCRYPTED");
		vListID = this.aIMathArray;
		i=0;
		while (i != vListID.length) {
			//this.getChildById(cln,"imath"+vListID[i]).innerHTML = "";
			this.getChildById(cln,"imath"+vListID[i]).innerHTML = this.DO+"imath"+vListID[i];
			i++;
		};
		return cln;
	};
	//#################################################################
	//# Nested: getIMathEProofClearSteps(cln)
	//#################################################################
	this.getIMathEProofClearSteps = function(cln) {
		//---vListID = new Array("PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP");
		var vListID = this.aIMathID;
		var i=0;
		while (i != vListID.length) {
			this.getChildById(cln,vListID[i]+"LIST"+this.aQID).innerHTML = "";
			i++;
		};
		return cln;
	};
	//#################################################################
	//# Nested: getIMathEProofInnerHTML()
	//#################################################################
	this.getIMathEProofInnerHTML = function(cln,pQID,pThisQ,pSID,pMode) {
		//------------------------------
		//---OPERATION on innerHTML-----
		//------------------------------
		var vMode = "DEFAULT";
		if (pMode) {
			// e.g. pMode = "AUTHORING" or "DEBUG";
			vMode = pMode;
		};
		var vControl = this.getChildById(cln,"PROOFCONTROL"+this.aQID);
		this.hideNode(vControl);
		vControl = this.getChildById(cln,"MAINCONTROL"+this.aQID);
		this.hideNode(vControl);
		//------------------------------
		var vSID = pSID || "_SID";
		var vQID = pQID || "_QID"+this.DO+"thisq_";
		var vThisQ = pThisQ || this.DO+"thisq";
		var vOut = cln.innerHTML;
		//---Replace $vQID and $thisq----
		vOut = this.replaceString(vOut,"__SID__",vSID);
		vOut = this.replaceString(vOut,"__QID__",vQID);
		vOut = this.replaceString(vOut,"__THISQ__",vThisQ);
		vOut = this.replaceString(vOut,"vRootID,'AUTHORING'","vRootID,'DEFAULT'");
		//vOut = this.replaceString(vOut,"\t"," ");
		vOut = this.replaceString(vOut,"\t","");
		//---Remove HTML Comments-------
		//alert(encodeURI("vOut = vOut.replace(/<!--(.*?)-->/gm, \"\")")); 
		eval(decodeURI("vOut%20=%20vOut.replace(/%3C!--(.*?)--%3E/gm,%20%22%22)"));
		return vOut;
	};
    //#################################################################
	//# Nested: getPossiblePrevNext()
	//#################################################################
	this.getPossiblePrevNext = function(pID,pPrevNext) {
		var vArr = null;
		var vText = vLanguage["Option"]+" in ["+this.aMappedID[pID]+"] " + vLanguage["for"]+" ";
		if (pPrevNext=="NEXT") {
			vArr = this.findConnectedSteps([pID],"NEXT");
			vText += vLanguage["next_n"];
		} else {
			vArr = this.findConnectedSteps([pID],"PREV");
			vText += vLanguage["previous_n"]
		};
		vArr = this.array2mapped(vArr);
		vText += " "+vLanguage["Step"]+": ";
		if (vArr.length == 0) {
			vText += vLanguage["impossible"];
		} else {
			vText +="["+vArr.join(",")+"] ";
		};
		//alert("getPossiblePrevNext("+pID+","+pPrevNext+") vText="+vText);
		return vText;
	};
	//#################################################################
	//# Nested: getUsedCounter(pName)
	//#################################################################
    this.getUsedCounter = function (pName,pStep) {
    	var vUsed = this.getElementById(pName+this.aQID+pStep);
		return parseInt(vUsed.value);	
    	//var vAssUsed = this.getElementById("inASSESSMENTUSED"+this.aQID+vStep);
		//var vCount = parseInt(vAssUsed.value);	
    };
    //#################################################################
	//# Nested: getIMathDisplayOption()
	//#################################################################
     this.getIMathDisplayOption = function () {
		//var vDispOpt = this.getElementById("imathDISPLAYOPTION"+this.aQID);
		var vDispOpt = this.getIMathById("DISPLAYOPTION");
		return vDispOpt.value;
	};
	//#################################################################
	//# Nested: getIMathStepCount()
	//#################################################################
     this.getIMathStepCount = function () {
		//var vStepCount = this.getElementById("imathSTEPCOUNT"+this.aQID);
		var vStepCount = this.getIMathById("STEPCOUNT");
		return vStepCount.value;
	};
	//#################################################################
	//# Nested: getStepCount()
	//#################################################################
     this.getStepCount = function () {
		var vStepCount = this.getElementById("sSTEPCOUNT"+this.aQID);
		//var vStepCount = this.getElementById("imathSTEPCOUNT");
		return parseInt(vStepCount.value+"");
	};
	//#################################################################
	//# Nested: getIndex4ID(pID)
	//#################################################################
    this.getID4Step = function (pStep) {
    	var i = this.aStep2Index[pStep];
    	var vReturn = "UNDEF";
    	if (i) {
    		vReturn = this.aIndex2ID[i];
    	};
    	return vReturn;
    };
    //#################################################################
	//# Nested: getIndex4ID(pID)
	//#################################################################
    this.getIndex4ID = function (pID) {
    	var vReturn = this.aID2Index[vID];
    	if (!vReturn) {
    		//alert("getIndex4ID() -eproofmeth1.js:317 - search necessary")
    		vReturn = this.getIndex4IDsearch(vID)-1;
    	};
    	return vReturn;
    };
    //#################################################################
	//# Nested: getIndex4IDsearch(pID)
	//#################################################################
    this.getIndex4IDsearch = function (pID) {
    	var vSA = this.getAllSteps("SCAN");
    	var i = 0;
		var vReturn = -1;
		//alert("getIndex4ID('"+pID+"') Step="+vStep+" for ID="+pID);
		if (pID == " ") {
			vReturn = 0;
		} else while (i != vSA.length) {
			var vNode = this.getChildByClassName(vSA[i],"inSTEPID"+this.aQID);
			if (vNode) {
				if (vNode.value == pID) vReturn = i+1;
			} else {
				alert("getIndex4ID() - inSTEPID for "+vSA[i].id+" not defined");
			};
			i++;
		}
		if (vReturn == -1) {
			alert("ERROR: getIndex4ID("+pID+") - no step found for ID=["+this.aMappedID[pID]+"]");
		};
		return vReturn; 
	};
	//#################################################################
	//# Nested: getIndex4Step(pStep)
	//#################################################################
    this.getIndex4Step = function (pStep) {
		// this.aStep2SA	  	  = new Array(); // Hash with Step Number to StudentAnswer 
		// this.aIndex2Step  	  = new Array();
		// this.aStep2Index  	  = new Array();
		// this.aIndex2ID        = new Array();
		// this.aID2Index        = new Array();
		return this.aStep2Index[pStep];
	};
	//#################################################################
	//# Nested: getIndex4StepSearch(pStep)
	//#################################################################
    this.getIndex4StepSearch = function (pStep) {
    	var vPosNode = this.getElementById("oldPOSITION"+this.aQID+pStep);
		var vIndex = -1;
		if (vPosNode) {
			vIndex = vPosNode.value;
		} else if (pStep==0) {
			vIndex = 0;
		} else {
			alert("getIndex4Step() oldPOSITION for "+pStep+" undefined");
		};	
 		return vIndex;
    };
	//#################################################################
	//# Nested: getKeys4Array(pAssArray)
	//#################################################################
	this.getKeys4Array = function(pAssArray) {
		var vKeyArray = new Array();
		for (key in pAssArray) {
			vKeyArray.push(key)
		};
		return vKeyArray;
	};
	//#################################################################
	//# Nested: getQueryHash()
	//#################################################################
	this.getQueryHash = function () {
		var vQuery = new Array();
		var query = window.location.search.substring(1);
		//alert("getQueryHash()"+this.CR+query);
		var vars = query.split("&");
		var i=0;
		while(this.lower(i,vars.length)) {
			//split var name and assigned values at "="
			var pair = vars[i].split("=");
			vQuery[pair[0]] = decodeURIComponent(pair[1]);
			i++;
		}; 
		return vQuery;
	};
    //#################################################################
	//# Nested: getQuery2Settings()
	//#################################################################
	this.getQuery2Settings = function  (pSettings) {
		// This function is anonymous, is executed immediately and 
		// the return value is assigned to QueryString!
		var vQueryString = this.getQueryHash();
		for (var key in vQueryString) {
			pSettings[key] = vQueryString[key]+"";
		};
	};
    //#################################################################
	//# Nested: getStep(pChildSA)
	//#################################################################
	this.getStep = function (pChildSA) {
		//alert("getStep()-Call: pChildSA.id="+pChildSA.id);
		return pChildSA.getAttribute("step");
	};
	//#################################################################
	//# Nested: getStep4ID(pID)
	//#################################################################
    this.getStep4ID = function (pID) {
		// this.aStep2SA	  	  = new Array(); // Hash with Step Number to StudentAnswer 
		// this.aIndex2Step  	  = new Array();
		// this.aStep2Index  	  = new Array();
		// this.aIndex2ID        = new Array();
		// this.aID2Index        = new Array();
	    var i = this.aID2Index[pID];
	    return this.aIndex2Step[i];
    };
   //#################################################################
	//# Nested: getStep4IDsearch(pID)
	//#################################################################
    this.getStep4IDsearch = function (pID) {
   		var vSA = this.getAllSteps();
    	var i = 0;
		var vReturn = -1;
		if (pID == " ") {
			//alert("getIndex4ID('"+pID+"') Step="+vStep+" for ID="+pID);
			vReturn = 0;
		} else while (i != vSA.length) {
			var vNode = this.getChildByClassName(vSA[i],"inSTEPID"+this.aQID);
			if (vNode) {
				if (vNode.value == pID) vReturn = vNode.getAttribute("step");
			} else {
				alert("getIndex4ID() - inSTEPID for "+vSA[i].id+" not defined");
			};
			i++;
		}
		if (vReturn == -1) alert("ERROR: getStep4ID('"+pID+"') Step for ID not found!");
 		return vReturn;
    };
	//#################################################################
	//# Nested: getStep4Index(pIndex)
	//#################################################################
	this.getStep4Index = function (pIndex) {
		// this.aStep2SA	  	  = new Array(); // Hash with Step Number to StudentAnswer 
		// this.aIndex2Step  	  = new Array();
		// this.aStep2Index  	  = new Array();
		// this.aIndex2ID        = new Array();
		// this.aID2Index        = new Array();
		return this.aIndex2Step[pIndex];
	};
	//#################################################################
	//# Nested: getStep4IndexSearch(pIndex)
	//#################################################################
	this.getStep4IndexSearch = function (pIndex) {
		//alert("getStep4Index()-Call: pIndex="+pIndex);
		var vStepList = this.getElementsByClassName("STEPNR"+this.aQID);
		var vStep = -1;
		if (vStepList[pIndex]) {
			vStep = vStepList[pIndex].value;
		} else {
			alert("getStep4Index()-Call: pIndex="+pIndex+" STEPNR was undefined");
		};
		return vStep;
	};
	//#################################################################
	//# Nested: getStep4Indexsearch(pIndex)
	//#################################################################
	this.getStep4Index = function (pIndex) {
		//alert("getStep4Index()-Call: pIndex="+pIndex);
		var vStepList = this.getElementsByClassName("STEPNR"+this.aQID);
		var vStep = -1;
		if (vStepList[pIndex]) {
			vStep = vStepList[pIndex].value;
		} else {
			alert("getStep4Index()-Call: pIndex="+pIndex+" STEPNR was undefined");
		};
		return vStep;
	};
	//#################################################################
	//# Nested: getSugCon(pID)
	//#################################################################
	this.getSugCon = function (pID) {
		var vReturn = "";
		if (this.aID2Solutions) {
			var Arr = new Array();
			// PrevID | ID | Con | JustArray | OptJustArray
			//alert("getSugCon(pID) ["+pID+"]");
			var aID = new Array();
			if (this.aID2Solutions[pID]) {
				aID = this.aID2Solutions[pID]["NEXT_REC"];
			} else {
				//alert("getSugCon(pID) no records in this.aID2Solutions for ["+pID+"]");
			};
			var k=0;
			var i=0;
			var vCon = "";
			//alert("getSugCon('"+pID+"') - this.aSolution.length="+this.aSolution.length);
			//alert("getSugCon('"+pID+"') - Length of Solution Records for ["+pID+"] is aID.length="+aID.length);
			while (k != aID.length) {
				i = aID[k];
				vCon = this.aSolution[i][2];
				//alert("Connection found in Solution with vCon="+vCon);
				vCon = this.vConnectionArray[vCon];
				Arr[vCon] = vCon;
				k++;
			};
			vReturn = this.hash2list(Arr);
		} else {
			alert("getSugCon('"+pID+"')-Call aID2Solutions not defined");
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: getSugID(pID)
	//#################################################################
	this.getSugID = function (pID) {
		var vReturn = "";
		if (this.aID2Solutions) {
			var Arr = new Array();
			// PrevID | ID | Con | JustArray | OptJustArray
			//this.aID2Solutions[pID]["PREV"].push(new Array(vPrevID,i));
			//alert("getSugID(pID) ["+pID+"]");
			var aID = new Array();
			if (this.aID2Solutions[pID]) {
				aID = this.aID2Solutions[pID]["NEXT"];
			};
			vReturn =  aID.join(",")
		} else {
			alert("getSugID('"+pID+"')-Call aID2Solutions not defined");
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: getSugJust(pID)
	//#################################################################
	this.getSugJust = function (pID) {
		var vReturn = "";
		if (this.aSolution) {
			var Arr = new Array();
			// PrevID | ID | Con | JustArray | OptJustArray
			var aID = new Array();
			var i=0;
			var vCon = "";
			while (i != this.aSolution.length) {
				if (this.aSolution[i][1] == pID) {
					vJust = this.aSolution[i][3];
					//alert("vJust.length="+vJust.length);
					Arr = this.unionarrays(vJust,Arr);
				}
				i++;
			};
			vReturn = Arr.join(",");
		} else {
			alert("getSugJust('"+pID+"')-Call aSolution not defined");
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: getSugNextJust(pID)
	//#################################################################
	this.getSugNextJust = function (pID) {
		var vReturn = "";
		if (this.aID2Solutions) {
			var Arr = new Array();
			// [0 ]PrevID | [1] ID | [2] Con | [3] JustArray | [4] OptJustArray
			//this.aID2Solutions[pID]["PREV"].push(new Array(vPrevID,i));
			//this.aID2Solutions[vPrevID]["NEXT"].push(new Array(vID,i));
			//alert("getSugCon(pID) ["+pID+"]");
			var aID = new Array();
			if (this.aID2Solutions[pID]) {
				aID = this.aID2Solutions[pID]["NEXT_REC"];
			};
			var k=0;
			var i=0;
			var vCon = "";
			while (k != aID.length) {
				i = aID[k];
				vJust = this.aSolution[i][3];
				//alert("vJust.length="+vJust.length);
				Arr = this.unionarrays(vJust,Arr);
				k++;
			};
			vReturn = Arr.join(",");
		} else {
			alert("getSugJust('"+pID+"')-Call aID2Solutions not defined");
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: getTemplateDOM()
	//#################################################################
	this.getTemplateDOM = function () {
		//var vUsedList = this.getChildrenByClassName(this.aUsedDOM,"inSTEPID"+this.aQID); 
		var vRes = this.aTemplateDOM;
		if (!vRes) {
			vRes = document.getElementById(this.aTemplateID);
			if (vRes) {
				alert("this.getTemplateDOM() Template found with ID="+vRes.id);
				this.aTemplateDOM = vRes;
			} else {
				alert("loading Template with this.getTemplateDOM() was not sucessful!");
			};
		}
		return vRes;
	};
	//#################################################################
	//# Nested: getUsedIDs()
	//#################################################################
	this.getUsedIDs = function () {
		//var vUsedList = this.getChildrenByClassName(this.aUsedDOM,"inSTEPID"+this.aQID); 
		var vUsedList =this.getUsed4DOM("inSTEPID");
		var k=0;
		var vUsedIDs = new Array();
		var vID = "";
		while (k != vUsedList.length) {
			vID = vUsedList[k].value;
			vUsedIDs.push(vID);
			k++;
		}
		return vUsedIDs;
	};
	//#################################################################
	//# Nested: getUsedSteps()
	//#################################################################
	this.getUsedSteps = function (pSCAN) {
		if ((!this.aUsedSteps) || (pSCAN)) {
	  		this.aUsedDOM   = this.getElementById("USEDSTEPS"+this.aQID);
			this.aUsedSteps = this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		};
		return this.aUsedSteps;
		//this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
	};
	//#################################################################
	//# Nested: getUnusedSteps()
	//#################################################################
	this.getUnusedSteps = function (pSCAN) {
		if ((!this.aUnusedSteps) || (pSCAN)) {
			this.aUnusedDOM = this.getElementById("UNUSEDSTEPS"+this.aQID);
			this.aUnusedSteps = this.getChildrenByClassName(this.aUnusedDOM,"STUDENTANSWER"+this.aQID);
			//alert("getUnusedSteps() length="+this.aUnusedSteps.length);
			
		}
		return this.aUnusedSteps;
		//this.getChildrenByClassName(this.aUnusedDOM,"STUDENTANSWER"+this.aQID);
	};
	//#################################################################
	//# Nested: getUsed4DOM(pName)
	//#################################################################
	this.getUsed4DOM = function (pName) {
		return this.getChildrenByClassName(this.aUsedDOM,pName+this.aQID);
	};
	//#################################################################
	//# Nested: getUsedCount(pStep,pName)
	//#################################################################
	this.getUsedCount = function (pStep,pName) {
		var vNode = this.getElementById(pName+this.aQID+pStep);
		//alert(pName +"="+vNode.value)
		var vCount = parseInt(vNode.value);
		return vCount;
	};
	//#################################################################
	//# Nested: getWeeblyEProof()
	//#################################################################
	this.getWeeblyEProof = function(pLibPath,pMathJaxPath,pMathJaxConfig,pQID,pThisQ,pSID,pAuthoring,pRootID) {
		var vInsertLibs = true;
		if (pRootID) {	
			vInsertLibs = false;
		};
		var vQID = pQID || "__QID__";
		var vThisQ = pThisQ || "__THISQ__";
		var vSID = pSID || "__SID__";
		var vAuthoring = pAuthoring || "DEFAULT";
		var vLoadXML = this.getChildById(this.aRootDOM,"tLOAD"+this.aQID);
		//var vLibPath  = pLibPath || "http://math.uni-landau.de/javascript/eProofJS/library/";
		// In Weebly local theme files are referenced
		//<script type="text/javascript" src="/files/theme/plugin.js" ></script>
		//<script type="text/javascript" src="/files/theme/mobile.js" ></script>
		//<script type="text/javascript" src="/files/theme/custom.js" ></script>
		var vLibPath  = pLibPath || "/files/theme/";
		var vMathJaxPath = pMathJaxPath || "http://cdn.mathjax.org/mathjax/latest/";
		var vMathJaxConfig = pMathJaxConfig || "AM_HTMLorMML"; 
		if (pMathJaxConfig.toUpperCase() == "LATEX") {
			// LaTeX-Config: TeX-AMS-MML_HTMLorMML 
			vMathJaxConfig = "TeX-AMS-MML_HTMLorMML";
		} else if (pMathJaxConfig.toUpperCase() == "ASCIIMATH") {
			// ASCII-Math Config: AM_HTMLorMML
			vMathJaxConfig = "AM_HTMLorMML";
		};
		var cln = this.getIMathEProofClone(vLoadXML.value,pRootID);
		//this.getIMathEProofAnswerBox(cln);
		cln = this.getIMathEProofClearSteps(cln);
		var vReturn = "";
		if (vInsertLibs) {
			var vStartJS = this.LT+"script type=\"text/javascript\" src=\"";
			var vEndJS = "\""+this.GT+this.LT+"/script"+this.GT+this.CR;
			vReturn += vStartJS + vLibPath +"language.js" + vEndJS;
			vReturn += vStartJS + vLibPath +"eproofmain.js" + vEndJS;
			vReturn += vStartJS + vLibPath +"eproofmeth1.js" + vEndJS;
			vReturn += vStartJS + vLibPath +"eproofmeth2.js" + vEndJS;
			//Path: "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML"
			vReturn += vStartJS + vMathJaxPath + "MathJax.js?config=" + vMathJaxConfig + vEndJS;
			//vReturn += this.LT+"script src=\"http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML\""+this.GT+""+this.LT+"/script"+this.GT+this.CR;
			//vReturn += this.getIMathEProofInnerHTML(cln,"_WEB","__THISQ__","_SID"); 
		} else {
			vReturn += this.LT + "html id='HTMLROOT'"+ this.GT;
		};
		vReturn += this.getIMathEProofInnerHTML(cln,vQID,vThisQ,vSID,vAuthoring); 
		if (!vInsertLibs) {
			vReturn += this.LT + "/html"+ this.GT;
		};
		return vReturn;	
	};
	//#################################################################
	//# Nested: getWrappedHTML(pString)
	//#################################################################
	this.getWrappedHTML = function(pString)
	{
		var vDate = new Date().toLocaleString();
		//pString = pString.replace(/__DATE__/g,vDate);
		var vHTML = this.LT+"HTML"+this.GT+this.CR;
		vHTML += "  "+this.LT+"HEAD"+this.GT+this.CR;
		vHTML += "    "+this.LT+"META http-equiv='Content-Type' content='text/html"+this.CO+" charset=UTF-8'"+this.GT+this.CR;
		vHTML += "    "+this.LT+"META name='eproof-create-date' content='"+vDate+"'"+this.GT+this.CR;
		vHTML += "  "+this.LT+"/HEAD"+this.GT+this.CR;
		vHTML += "  "+this.LT+"BODY"+this.GT+this.CR;
		vHTML += pString;
		vHTML += "  "+this.LT+"/BODY"+this.GT+this.CR;
		vHTML += this.LT+"/HTML"+this.GT;
		return vHTML;
	};

	//#################################################################
	//# Nested: hash2list(pHash)
	//#################################################################
	this.hash2list = function (pHash) {
		var vReturn = "";
		var vComma="";
		for (var iID in pHash) {
			vReturn += vComma+pHash[iID];  
			vComma=",";
		}
		return vReturn;
	};
	//#################################################################
	//# Nested: initCharCounter()
	//#################################################################
	this.initCharCounter = function () {
		//this.aCharCounter = Hash for Leader Chars e.g. "P" CharCounter=4 creates "P4"
		for (var iChar in this.aCharCounter) {
			this.aCharCounter[iChar] = 0;
		};
	};
	//#################################################################
	//# Nested: initExportHashSA(pHash)
	//#################################################################
	this.initExportHashSA = function (pHash) {
		var i = 0;
		var vSAF = this.aStudAnsFormat;
		while (this.lower(i,vSAF.length)) {
			pHash[vSAF[i]] = "";
			i++;
		};
		pHash["SUGUSED"] = "0";
		pHash["ASSUSED"] = "0";
	};
	//#################################################################
	//# Nested: iMathForm_loaded()
	//#################################################################
	this.iMathForm_loaded = function () {
		var vRet = false;
    	if (this.aOffline == "0") {
    		vRet = true;
		};
		return vRet;
	};
	//#################################################################
	//# Nested: iMathForm_loaded()
	//#################################################################
	this.X_iMathForm_loaded = function () {
		var vRet = false;
    	var vPreconNode = this.getChildById(this.aRootDOM,"imathPRECONDITION");
    	if (vPreconNode) {
    		var vPreconIMathAS = vPreconNode.value;
			vPreconIMathAS = vPreconIMathAS.replace(/\s/g,"");
			if (this.greater(vPreconIMathAS.lastIndexOf(this.aSeparator),0)) {
				vRet = true;
			};
		};
		return vRet;
	};
	//#################################################################
	//# Nested: intersectionarrays  
	//# intersectarrays(array,array): Finds the intersection of two arrays
	//#################################################################
	this.intersectionarrays = function (x,y) {
		var reshash=[], res=[];
		var i=0;
		while (i != x.length) {
			reshash[x[i]]=true;
			i++;
		};
		i=0;
		while (i != y.length) {
			if(reshash[y[i]]) res.push(y[i]);
			i++;
		};
		return res;
	};
	//#################################################################
	//# Nested: isSettingExportID(piID) 
	//#################################################################
	this.isSettingExportID = function (piID) {
		var vReturn = true;
		if (piID == "randomize_done") {
			vReturn = false
		} else if (piID == "ThisQ") {
			vReturn = false
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: list2mapped(pList)
	//#################################################################
	this.list2mapped = function (pList) {
		var vRes = [];
		if (pList) vRes = pList.split(",");
		vRes = this.array2mapped(vRes);
		return vRes.join(",");
	};
	//#################################################################
	//# Nested: list2original(pList)
	//#################################################################
	this.list2original = function (pList) {
		var vRes = [];
		if (pList) vRes = pList.split(",");
		vRes = this.array2original(vRes);
		return vRes.join(",");
	};
	//#################################################################
	//# Method: list2IMathAS(pList) 
	//#################################################################	
	this.list2IMathAS = function (pList) {
		if (pList != "") pList = (pList.split(",")).join(this.aComma);
		return pList;
	};
	//#################################################################
	//# Method:loadSettingsVar(pName,pValue)
	//#################################################################	
	this.loadSettingsVar = function (pName,pValue) {
		pName = pName.toUpperCase();
		if (pName == "TITLE") pName = "THEOREM_TITLE";
		for (var iName in this.aSettings) {
			if (iName.toUpperCase() == pName) {
				this.aSettings[iName] = pValue;
			}
		}
	};
	//#################################################################
	//# Method:loadDisplayOption()
	//#################################################################	
	this.loadDisplayOption = function () {	
		this.getElementById("sDISPLAYOPTION"+this.aQID).value = this.getElementById("imathDISPLAYOPTION").value;
	};
	//#################################################################
	//# Nested: loadStepInnerHTML(pID,pStepDefRaw)
	//#################################################################
	this.loadStepInnerHTML = function (pStepRoot,pID,pStepDefRaw) {
		var vName = "SOURCE"+this.aQID+"-"+pID;
		var vSourceNode = this.getChildById(pStepRoot,"SOURCE"+this.aQID+"-"+pID);
		//var vSourceNode = null;
		//alert("loadStepInnerHTML() pStepRoot.id="+pStepRoot.id);
		var vReturn = "";
		if (vSourceNode) {
			//alert("load InnerHTML form SOURCE"+this.aQID+"-"+pID+this.CR+vSourceNode.innerHTML);
			vReturn = vSourceNode.innerHTML;
		} else {
			pStepDefRaw = this.decodeTextarea(pStepDefRaw);
			//alert(pStepRoot.id);
			//alert("loadStepInnerHTML() create DIV for SOURCE"+this.aQID+"-"+pID+this.CR+pStepDefRaw);
			var vIDNode = document.createElement("DIV");
			vIDNode.id = vName;
			var t = document.createTextNode(pStepDefRaw);  // Create a text node
			vIDNode.appendChild(t); // Append the text to <DIV>
			pStepRoot.appendChild(vIDNode);
			if (this.onLoadAMprocess) {
				this.processMathNode(vIDNode);
			};
			vReturn = vIDNode.innerHTML;
			this.aAllID2Node[pID] = vIDNode;
			//vReturn = this.decodeTextarea(pStepDefRaw);
		};
		return vReturn
	};
	//#################################################################
	//# Nested: newCharCounter(pChar)
	//#################################################################
	this.newCharCounter = function (pChar) {
		if (this.aCharCounter[pChar]) {
			this.aCharCounter[pChar]++;
		} else {
			this.aCharCounter[pChar] = 1;
		};
		return this.aCharCounter[pChar];
	};
	//#################################################################
	//# Nested: renameCharCounter1()
	//#################################################################
	this.renameCharCounter1 = function () {
		//this.aCharCounter = Hash for Leader Chars e.g. "P" CharCounter=4 creates "P4"
		var vOrgID = "";
		for (var iChar in this.aCharCounter) {
			if (this.aCharCounter[iChar] == 1) {
				//--- if aCharCounter is 1 max rename AG1 to AG ----
				vOrgID = this.renameMappedID(iChar+"1",iChar);
			};
		};

	};
	//#################################################################
	//# Nested: renameMappedID(pOldID,pNewID)
	//#################################################################
	this.renameMappedID = function (pOldID,pNewID) {
		//alert("Rename Mapped ID=["+pOldID+"] to ["+pNewID+"]");
		var vOrgID = this.renameCheckMappedID(pOldID,pNewID);
		if (vOrgID != "") {
			this.redefinedMappedID(vOrgID,pNewID);
		}
	};
	//#################################################################
	//# Nested: renameCheckMappedID(pOldID,pNewID)
	//#################################################################
	this.renameCheckMappedID = function (pOldID,pNewID) {
		var vOrgID = "";
		var vNewID_exists = false;
		var vNo_OldID = true;
		for (var iID in this.aMappedID) {
			if (pOldID == this.aMappedID[iID]) {
				vOrgID = iID;
				vNo_OldID = false;
			};
			if (pNewID == this.aMappedID[iID]) {
				vNewID_exists = true;
			};
		};
		if (vNewID_exists) {
			alert("renameMappedID('"+pOldID+"','"+pNewID+"') was not sucessful, because ["+pNewID+"] exists as ID");
		} else if (vNo_OldID) {
			alert("renameMappedID('"+pOldID+"','"+pNewID+"') was not sucessful, because ["+pOldID+"] does not exist!");
		};
		return vOrgID;
	};
    //#################################################################
	//# Nested: renameCharID(pID,pNewChar)
	//#################################################################
	this.renameCharID = function (pID,pNewChar) {
		alert("Rename CharID ID=["+pID+"] with MappedID=["+this.aMappedID[pID]+"] to ID with Char="+pNewChar);
		vChar = this.createChar4ID(pID);
		if (vChar != pNewChar) {
			alert("perform renameCharID() for pNewChar='"+pNewChar+"'");
		};
		//vMappedID = vChar+this.newCharCounter(vChar);
		//this.aMappedID[vID] = vMappedID;
		//this.aOriginalID[vMappedID] = vID;
	};
	//#################################################################
	//# Nested: parseScore(pString)
	//#################################################################
	this.parseScore = function(pString) {
		var x = parseFloat(pString);
		return Math.round(x*100)/100;
	};
    //#################################################################
	//# Nested: parseSettingsString()
	//#################################################################
	this.parseSettingsString = function (pString) {
		//alert("parseSettingsString()-Call");
		//this.aSettings = new Array();
		//this.init_settings();
		var k = 0;
		var vListArray = pString.split(this.CR);
		while (k != vListArray.length) {
			if (this.greater(vListArray[k].indexOf(this.aSeparator) , 0)) {
				var vRec = vListArray[k].split(this.aSeparator);
				this.aSettings[vRec[0]] = vRec[1];
			};
			k++;
		}
	};
	//#################################################################
	//# Nested: parseSettings()
	//#################################################################
	this.parseSettings = function () {
		//alert("parseSettings()-Call");
		var vInput = this.getIMathById("SETTINGS").value;
		if (vInput) {
			this.parseSettingsString(vInput);
		};
	};
	//#################################################################
	//# Nested: parseSolution()
	//#################################################################
	this.parseSolution = function () {
		//alert("parseSolution()-Call");
		var vInput = this.getIMathById("SOLUTION").value;
		var i = 0;
		if (vInput) {
			var vListArray = vInput.split(this.CR);
			var k=0;
			this.checkSolStep(" ");
			while (k != vListArray.length) {
				if (this.greater(vListArray[k].indexOf(this.aSeparator) , 0)) {
					var vSolStep = new Array();
					var vSplitRec = vListArray[k].split(this.aSeparator);
					if (this.lower(vSplitRec.length,4)) {
						alert("Length Warning Solution Step: "+vListArray[k]);
					};
					vSplitRec[2] = this.vConnection2Index[vSplitRec[2]];
					vSplitRec[3] = vSplitRec[3].split(this.aComma);
					vSplitRec[4] = vSplitRec[4].split(this.aComma);
					if (!vSplitRec[4])  {
						vSplitRec[4] = new Array();
					};
					vSplitRec.push(this.unionarrays(vSplitRec[3],vSplitRec[4]));
					//----Solution Structure of SplitRec----------------------------------------
					// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
					this.aSolution.push(vSplitRec);
					var vPrevID = vSplitRec[0];
					var vID = vSplitRec[1];
					this.checkSolStep(vID);
					this.checkSolStep(vPrevID);
					this.aID2Solutions[vID]["ASSESS"].push(i);
					this.aID2Solutions[vID]["PREV"].push(vPrevID);
					this.aID2Solutions[vID]["PREV_REC"].push(i);
					this.aID2Solutions[vPrevID]["NEXT"].push(vID);
					this.aID2Solutions[vPrevID]["NEXT_REC"].push(i);
					//--------------------------------------------------------------------------
					i++;
				}
				k++;
			};
		} else {
			alert("parseSolution() - No Solution Defined!");
		};
		var vProofKeys = this.getKeys4Array(this.aID2Solutions);
		this.getElementById("PROOFIDS"+this.aQID).value = vProofKeys.join(",");
		this.getElementById("PROOFCOUNT"+this.aQID).value = vProofKeys.length;
	};
	//#################################################################
	//# Method: parseXML  
	//#    used in Class: XMLparser
	//#                
	//# Comment: if this.aTAG="BODY" then this.aText contains the block                       
	//#          between <BODY> and </BODY>. Parsing append all 
	//#          Children to this.aChilden. aTAG="" means block is 
	//#          a string without XML-Tags.
	//# created               22.10.2014             
	//# last modifications    22.10.2014             
	//#################################################################
	
	this.parseXML = function (pXMLstring) {
		//----Debugging------------------------------------------
		// The following alert-Command is useful for debugging 
		//alert("XMLparser:1939 parseXML()-Call")
		//-------------------------------------------------------
		//alert("parseXML:1941 - pXMLstring="+pXMLstring+"");
		if (pXMLstring) {
			this.aText = pXMLstring;
		};
		if (window.DOMParser) {
			parser=new DOMParser();
			this.aTreeXML = parser.parseFromString(this.aText,"text/xml");
		} else {
		// Internet Explorer
			this.aTreeXML = new ActiveXObject("Microsoft.XMLDOM");
			this.aTreeXML.async=false;
			this.aTreeXML.loadXML(this.aText);
		}
	};
	//----End of Method parse Definition
	//#################################################################
	//# Nested: randomizeStepOrder()
	//#################################################################
	this.randomizeStepOrder  = function () {
		//var vUnusedList = this.getChildrenByClassName(this.aUnusedDOM,"STUDENTANSWER"+this.aQID);
		var vUnusedList = this.getUnusedSteps(); 
		//alert("randomizeStepOrder() Unused="+vUnusedList.length);
		var vPosArr = new Array();
		var k=0;
		while (k != this.aCount) {
			k++;
			vPosArr.push(k);
		};
		//alert(vPosArr.join(","));
		vPosArr = this.shuffle(vPosArr);
		//alert(vPosArr.join(","));
		var k=0;
		var vOldNode = null;
		while (k != this.aCount) {
			vOldNode = this.getElementById("STUDENTANSWER"+this.aQID+vPosArr[k]);
			var vOldParentNode = vOldNode.parentNode;
 			//alert("vOldNode.id="+vOldNode.id+" vOldPos="+vOldPos+": vOldParentNode.id="+vOldParentNode.id);
			var vRemovedChild = vOldParentNode.removeChild(vOldNode);
	    	this.aUnusedDOM.appendChild(vRemovedChild);
	    	k++;
		};
		//vUnusedList = this.shuffle(vUnusedList);
	};
	//#################################################################
	//# Nested: rerenderMath()
	//#################################################################
	this.rerenderMath = function (pNodeID) {
		var vNodeID = "EPROOF"+this.aQID;
		if (pNodeID) vNodeID = pNodeID;
		if (this.aUseMathJax == "1") {
			//MathJax.Hub.Queue(["Typeset",MathJax.Hub,vNodeID]);
			//MathJax.Hub.Queue(["Rerender",MathJax.Hub,vNodeID]);
			//MathJax.Hub.Queue(["needsUpdate(",MathJax.Hub,vNodeID]);
		};
	};
	//#################################################################
	//# Nested: redefineMappedID(pID,pMappedID)
	//#################################################################
	this.redefineMappedID = function (pID,pMappedID) {
		if (pID) {
			if (this.aMappedID[pID]) {
				this.aMappedID[pID] = pMappedID;
				this.getElementById("MAPID-"+this.aQID+"-"+pID).value = pMappedID;
				this.aOriginalID[pMappedID] = pID;
				this.getElementById("LIST-ID-"+this.aQID+"-"+pID).innerHTML = "["+pMappedID+"]";
			} else {
				alert("redefineMappedID('"+pID+"','"+pMappedID+"') failed! MappedID for ["+pID+"] undefined");
			}
		} else {
			alert("Error: redefineMappedID(pID,'"+pMappedID+"') pID was undefined - OrgID=["+this.aOriginalID[pMappedID]+"] eproofmain.js:1020");
		};
	};
	//#################################################################
	//# Nested: resetProof(pButtonDOM)
	//#################################################################
	this.resetProof = function (pButtonDOM) {
		//Check = confirm("("+vLanguage["Delete"].toUpperCase()+") "+ vLanguage["Reset_Prompt"] + this.CR + vLanguage["Proof"]+": "+this.aSettings["Theorem_Title"]+"'?"+this.CR+"resetProof():1104");
		Check = confirm("("+vLanguage["Delete"].toUpperCase()+") "+ vLanguage["Reset_Prompt"] + this.CR + vLanguage["Proof"]+": "+this.aSettings["Theorem_Title"]+"'?");
		if (Check) {
			//alert(vLanguage["ProofStep"]+" ["+vNode4ID.value+"] "+vLanguage["Deleted"]);
			this.randomizeStepOrder();
			this.clearProofInput();
			this.updateStepCount(0);
			this.setStepCount(0);
		} else {
			alert(vLanguage["Cancel"].toUpperCase()+": "+ vLanguage["Delete"] +"-Operation.");
		}
    };
	//#################################################
	//# Encode Solution
	//#################################################
	this.getEncodedSol = function () {
		var vInNode = this.getIMathById("SOLUTION");
		return  this.rotEncode(vInNode.value);
	};
	//#################################################
	//# Encode Score
	//#################################################
	this.encodeScore = function (pScore) {
		function ord(x) { return x.charCodeAt(0) }
		function chr(x) { return String.fromCharCode(x) }
		var vKey = this.aSettings["cryptkey"];
		var vScore = pScore.toFixed(6)+"";
		var i=0;
		var vMax = vScore.length;
		var vOut = "";
		while (i != vMax) {
			var c = vScore.charCodeAt(i);
			if (chr(c)==".") {
				vOut += "A";
			} else {
				vOut += chr(c-ord("0")+ord("B"));
			};
			i++;
		}	
		//var vInteger = Math.round(pScore*1000);
		//alert("vScore*1000="+vInteger);
		//alert ("vScore="+vScore+" vOut="+vOut+" Encoded="+this.rotEncode(vOut));
		return vOut;
	};
	//#################################################
	//# Encode Solution
	//#################################################
	this.encodeSol = function () {
		var vInNode = this.getIMathById("SOLUTION");
		var vOutNode = this.getIMathById("ENCRYPTED");
		if ((vInNode.value).replace(/\s/g,"")!="") {
		//if ((vOutNode.value).replace(/\s/g,"")=="") {
			//alert("Solution Encode: "+vInNode.value);
			vOutNode.value = this.rotEncode(vInNode.value);
		};
	};
	//#################################################
	//# Decode Solution
	//#################################################
	this.decodeSol = function () {
		var vInNode = this.getIMathById("ENCRYPTED");
		var vOutNode = this.getIMathById("SOLUTION");
		if ((vOutNode.value).replace(/\s/g,"")=="") {
			//alert("Solution Decode: "+vInNode.value);
			vOutNode.value = this.rotDecode(vInNode.value);
		};
	};
	//#################################################
	//# Encode Rotation
	//#################################################
	this.rotEncode = function (pString) {
		//pString = "XY #_AA_#BB #__co__#MY1#__co__#TYP#__co__#CK#_co_#DU#__co__#AK#_co_#P2";
		//pString =" #__co__#MY1#__co__#TYP#__co__#CK#_co_#DU#__co__#AK#_co_#P2";
		//pString = "AAZZ123";
		var vKey = this.aSettings["cryptkey"];
		//var vReturn = this.vigenere(pString,"ABC","encode");
		var vReturn = this.vigenere(pString,vKey,"encode");
		//alert("Encoded="+vReturn + "\nDecode="+this.vigenere(vReturn,vKey,"decode"));
		return vReturn;
	};
	//#################################################
	//# Decode Rotation
	//#################################################
	this.rotDecode = function (pString) {
		var vCharShift = parseInt(this.aSettings["rotcount"]);
		//return this.rot(pString,-vCharShift)
		var vKey = this.aSettings["cryptkey"];
		var vReturn = this.vigenere(pString,vKey,"decode");
		vReturn = decodeURI(vReturn);
		return vReturn;
	};
	//#################################################
	//# Rot-Encode and Decode of Strings
	//#   Decode with -pCharShift
	//#################################################
	this.rot = function (pString,pCharShift) {
		var s = [];
		var vMinCode = 32;
		var vMaxCode = 126;
		var vMod = vMaxCode-vMinCode+1; 
		var i = 0;
		var j = 0;
		while (i != pString.length) {
			j = pString.charCodeAt(i);
			//alert("(A"+i+") pCharShift="+pCharShift+" vSign="+vSign+" pString='"+pString+"' Char='"+j+"' ["+s.join('')+"]");
			if ((this.greater(j+1,vMinCode)) && (this.lower(j,vMaxCode+1))) {
				j = vMinCode + ((j-vMinCode +pCharShift) % vMod);
			};
			s[i] = String.fromCharCode(j);
			//alert("(B"+i+") Shift="+pCharShift+" pString='"+pString+"' Char='"+j+"' ["+s.join('')+"]")
			i++;
		};
		//alert("Decoded="+this.rot(s.join(''),-pCharShift));
		return s.join('');
	};
	//#################################################################
	//# Nested: saveEProofIMath2Form()
	//#################################################################
	this.saveEProofIMath2Form = function() {
		this.getElementById("tSAVEIMATH"+this.aQID).value = this.getEProofIMath();
	};
	//#################################################################
	//# Nested: saveStep(pChildSA)
	//#################################################################
	this.saveStep = function (pButtonDOM) {
		//alert("saveStep()-Call: pChildSA.id="+pChildSA.id+" Offline="+this.aOffline);
		//this.aStepType4ID = new Array(); //Hash maps ID to StepType PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION 
		//this.aStep2SA	  	= new Array(); // Hash with Step Number to StudentAnswer 
		//this.aIndex2Step  = new Array();
		//this.aStep2Index  = new Array();
		//this.aIndex2ID    = new Array();
		//this.aID2Index    = new Array();
		var vStep = this.getStep(pButtonDOM);
		this.saveStepCheck(vStudentAnswerNode,vStep);
		//var vStudentAnswerNode = this.getParentStudentAnswer(pButtonDOM);
		var vStudentAnswerNode = this.aStep2SA[vStep];
		var vID = this.aIndex2ID[this.aStep2Index[vStep]];
		var vName = "STEPEDITOR"+this.aQID;
		var vListSE = this.getChildByClassName(vStudentAnswerNode,vName);
		if (vListSE) {
			this.toggleNode(vListSE);
			//this.save(pButtonDOM); 
			this.updateIMathById(this.aStepType4ID[vID]);
			var vOut = this.saveEProof2Form();
		} else {
			alert("Error: saveStep()-Call - vListSE undefined");
		};
	};
	//#################################################################
	//# Nested: saveStepCheck(pSA,pStep)
	//#################################################################
	this.saveStepCheck = function (pSA,pStep) {
		var vName = "taSTEPEDITOR"+this.aQID+pStep;
		var vEditNode = this.getChildById(pSA,vName);
		if (this.aSettings["MathFormat"] == "AM_HTMLorMML") {
			if (vEditNode) {
				var vMathDelimiters = (vEditNode.value).replace(/[^`]/g,"");
				//alert("Mathdelimiter="+vMathDelimiters);
				if (this.greater((vMathDelimiters.length % 2),0)) {
					alert("ERROR in ASCII-Math: Number of Math-Delimiters ` are not even!");
				};
			} else {
				alert("ERROR saveStepCheck():1211 EditNode does not exist ");
			};
		};
	};
	//#################################################################
	//# Nested: selectCheck(pSelectID)
	//#################################################################
	this.selectCheck = function (pSelectID) {
		var vSelect = this.getElementsByClassName(pSelectID);
		var k=0;
		var vReturn = "";
		if (vSelect.length != 0) {
			while (k != vSelect.length ) {
				if (vSelect[k].checked) {
					vReturn =vSelect[k].value;
				};
				k++;
			};
		} else {
			alert("WARNING: selectCheck() - No Select Items available for "+pSelectID);
		};
		return vReturn;
	};
	//#################################################################
	//# Nested: selectSuggestion(pStep)
	//#################################################################
	this.selectSuggestion = function (pStep) {
		var vCon = this.getElementById("inCONSUGGESTION"+this.aQID+pStep).value;
		var vID = this.getElementById("inIDSUGGESTION"+this.aQID+pStep).value;
		var vNextID = this.getElementById("NEXT"+this.aQID+pStep).value;
		var vMoveNode = true;
		if (vID == vNextID) {
			vMoveNode = false;
			alert("MOVING not necessary in selectSuggestion():1351");
		};
		if (vID == "") {
			alert("WARNING: No Step ID was selected!"+this.CR+"selectSuggestion()");
		} else if (vCon == "") {
			alert ("WARNING: No Connection was selected!"+this.CR+"selectSuggestion()");
		} else {
			//alert("selectSuggestion():1342 find SelNode for vID=["+vID+"]"); 
			var vListSA = document.getElementsByClassName("STUDENTANSWER"+this.aQID);
			var vSelIndex = 0;
			var vFound = false;
			var vSelNode = null;
			while ((!vFound) && (vSelIndex != vListSA.length)) {
				vSelNode = vListSA[vSelIndex];
				var vCheckID = this.getChildByClassName(vSelNode,"inSTEPID"+this.aQID).value;
				if (vCheckID == vID) {
					vFound = true;
				} else {
					vSelIndex++
				};
			};
			//alert("selectSuggestion():1371 SelNode for vID=["+vID+"] vMapID=["+this.aMappedID[vID]+"] found at index="+vSelIndex); 
			//----END search SelNode -- does not work as subroutine-Call-----
			//var vSelStep = vSelNode.getAttribute("step"); //does not work Offline
			var vSelStep = this.getChildByClassName(vSelNode,"STEPNR"+this.aQID).value;
			//alert("selectSuggestion():1375 vSelStep="+vSelStep);
			var vConNode = this.getChildById(vSelNode,"sCONNECTION"+this.aQID+vSelStep);
			var vPosNode = this.getChildById(vSelNode,"sPOSITION"+this.aQID+vSelStep);
			//alert("vCon="+vCon+" ID=["+vCheckID+"] selectSuggestion("+pStep+") vNewStep="+vSelStep);
			if (!vSelNode) {
				alert("vSelNode undefined - selectSuggestion():1357");
			};
			if (vConNode) {
				vConNode.value = vCon;
			} else {
				alert("vConNode undefined - selectSuggestion():1362");
				vCon=1;
			};
			this.updateConnection(vConNode);
			//---Move selected Node to follwing new Index-----------
			var vSugNodeIndex = this.getElementById("oldPOSITION"+this.aQID+pStep).value;
			var vNewIndex = parseInt(vSugNodeIndex+"") + 1;
			var vNewStep = pStep; //this.aIndex2Step[vNewIndex];
			//alert("selectSuggestion("+pStep+") vID=["+vID+"] vSelIndex="+vSelIndex+" vNewIndex="+vNewIndex); 
			var vIDm = this.aMappedID[vID]; 
			if (this.lower(vSelIndex,vNewIndex)) {
				if (vSelIndex != 0)	{	
					var vNew = vNewIndex-1;
					alert("WARNING: Step ["+vIDm+"] already used at position "+vSelIndex+". Step will be moved to positon "+vNew+".");
				};
			};
			//--------------------------------------------------------------------
			//---Provide User Feedback for Selected Step--------------------------
			//--------------------------------------------------------------------
			alert(vLanguage["Suggestion"]+" ("+vNewIndex+"): "+this.vConnectionArray[vCon]+" ["+vIDm+"] ");			
			//--------------------------------------------------------------------
			//---Now we can move the selected step to the appropriate position----
			var vUsedList = this.getUsedSteps();
			//alert("vSelIndex="+vSelIndex+" vNewIndex="+vNewIndex+" vUsedList.length="+vUsedList.length+" selectSuggestion():1379");
			if (this.greater(vNewIndex,vUsedList.length) ) {
				//alert("Append Selected Step ["+vIDm+"]");
				vNewIndex = 0;
			};
			//alert("selectSuggestion():1384 vCon="+vCon+" vMappedID="+this.aMappedID[vID]+" vSelIndex="+vSelIndex+" vNew="+vNewIndex+" vNewStep="+vNewStep);
			if (vMoveNode) {
				this.moveStep(vSelIndex,vNewIndex);
			};
			this.hide("SUGGESTIONS"+this.aQID+pStep);
		};
	};
	//#################################################################
	//# Nested: setJustifications(pStep)
	//#################################################################
	this.setJustifications = function (pStep) {
		//---displayJUSTIFICATIONS----
		var vID = this.getElementById("inSTEPID"+this.aQID+pStep).value;
		var vInJust = this.getElementById("inJUSTIFICATION"+this.aQID+pStep).value;
		//alert("setJustifications("+pStep+") vInJust="+vInJust+" DISPLAY: createJustifications()-Call");	
		var vContent = this.createDisplayJustifications(vInJust,this.aMappedID[vID]);
		this.getElementById("displayJUSTIFICATIONS"+this.aQID+pStep).innerHTML = vContent;
		var vSelJust = this.getElementById("selectJUSTIFICATION"+this.aQID+pStep).value;
		var vAppend_Just = this.getElementById("appendJUSTIFICATION"+this.aQID+pStep).value;
		var vSelectFromJust = this.concatList(vSelJust,vAppend_Just);
		//---editJUSTIFICATIONS----
		//alert("setJustifications("+pStep+") vInJust="+vInJust+" CHECKBOX: createJustifications()-Call");	
		vContent =  this.createJustifications(vInJust,vSelectFromJust,vAppend_Just,true,this.aMappedID[vID]);
		this.getElementById("editJUSTIFICATIONS"+this.aQID+pStep).innerHTML = vContent;
	};
	//#################################################################
	//# Nested: setAllJustifications()
	//#################################################################
	this.setAllJustifications = function () {
		//alert("setAllJustifications()");
		var vStep=1;
		while (vStep != (this.aCount+1)) {
			this.setJustifications(vStep);
			vStep++;
		};
	};
	//#################################################################
	//# Nested: setAllSuggestions()
	//#################################################################
	this.setAllSuggestions = function () {
		//alert("setAllSuggestions()");
		var vStep=0;
		while (vStep != (this.aCount+1)) {
			this.addCorrectSuggestionStep(vStep);
			this.addFalseSuggestionStep(vStep);
			//this.createSuggestionStep(vStep);
			vStep++;
		};
		// Suggestions determine the selection of Justifications 
		this.setAllJustifications();
	};
	//#################################################################
	//# Nested: setConnectionSize()
	//#################################################################
	this.setConnectionSize = function () {
		//alert("setConnectionSize()");
		var vStep=1;
		while (vStep != (this.aCount+1)) {
			this.setConnectionSizeStep(vStep);
			vStep++;
		};
	};
	//#################################################################
	//# Nested: setConnectionSizeStep()
	//#################################################################
	this.setConnectionSizeStep = function (pStep) {
		//alert("setConnectionSizeStep("+pStep+")");
		var vConValue = this.getElementById("sCONNECTION"+this.aQID+pStep).value;
		var vOutNode = this.getElementById("outCONNECTION"+this.aQID+pStep);
		this.updateConnectionWidth(vOutNode,vConValue);
	};
	//#################################################################
	//# Nested: setConnection2Index()
	//#################################################################
	this.setConnection2Index = function () {
		var vNr = 0;
		this.vConnectionName.push(vLanguage["Connection"] + "?");
		this.vConnection2Index["???"] = vNr;
		vNr++;
		this.vConnection2Index[" "] = vNr; //START: Beweissequenz
		this.vConnectionName.push("START: "+vLanguage["ProofSequence"]);
		vNr++;
		this.vConnection2Index["="+this.GT] = vNr;
		this.vConnectionName.push(vLanguage["Implication"]);
		vNr++;
		this.vConnection2Index['='] = vNr;
		this.vConnectionName.push(vLanguage["Equality"]);
		vNr++;
		this.vConnection2Index[this.LT+"="] = vNr;
		this.vConnectionName.push(vLanguage["lower_equal"]);
		vNr++;
		this.vConnection2Index[this.LT] = vNr;
		this.vConnectionName.push(vLanguage["lower"]);
		vNr++;
		this.vConnection2Index[this.GT+'='] = vNr;
		this.vConnectionName.push(vLanguage["greater_equal"]);
		vNr++;
		this.vConnection2Index[this.GT] = vNr;
		this.vConnectionName.push(vLanguage["greater"]);
		vNr++;
		this.vConnection2Index['subseteq'] = vNr;
		this.vConnectionName.push(vLanguage["Subset"]);
		vNr++;
		this.vConnection2Index['DEF'] = vNr;
		this.vConnectionName.push("Definition " + vLanguage["of"] + " "+ vLanguage["Variables"]);
		vNr++;
		this.vConnection2Index['TEXT'] = vNr;
		this.vConnectionName.push("Text "+vLanguage["or"] + " "+ vLanguage["Comment"]);
		vNr++;
		this.vConnection2Index["TYP"] = vNr;
		this.vConnectionName.push(vLanguage["Type"]);
		vNr++;
		this.vConnection2Index['q.e.d.'] = vNr;
		this.vConnectionName.push('q.e.d.');
	};
	//#################################################################
	//# Nested: setIMathDisplayOption(pOption)
	//#################################################################
     this.setIMathDisplayOption = function (pOption) {
		//var vDispOpt = this.getIMathById("DISPLAYOPTION"+this.aQID);
		var vDispOpt = this.getIMathById("DISPLAYOPTION");
		vDispOpt.value = pOption;
	};
	//#################################################################
	//# Nested: setIMathById(pFormID,pValue)
	//#################################################################
	this.setIMathById = function (pFormID,pValue) {
		var vOutNode = null;
		if (this.aIMATH[pFormID]) {
			//alert("getIMathById('"+this.aIMATH[pFormID]+"')");
			vOutNode = this.getChildById(this.aRootDOM,this.aIMATH[pFormID]);
			//if (vOutNode) {
			//	alert("ssetIMathById('"+this.aIMATH[pFormID]+"',pValue) exists OK!");
			//} else {
			//	alert("ERROR: setIMathById('"+this.aIMATH[pFormID]+"',pValue) does not exist!");
			//}
			vOutNode.value = pValue;
		}
	};
	//#################################################################
	//# Nested: setIMathStepCount(pCount)
	//#################################################################
     this.setIMathStepCount = function (pCount) {
		//var vStepCount = this.getIMathById("STEPCOUNT"+this.aQID);
		var vStepCount = this.getIMathById("STEPCOUNT");
		vStepCount.value = pCount;
	};
	//#################################################################
	//# Nested: setJustAssValue (pStep,pAssRoot,pSA,pNodeID)
	//#################################################################
	this.setJustAssValue = function (pStep,pAssRoot,pSA,pNodeID) {	
		var vOutRow = this.getChildById(pAssRoot,"out"+pNodeID+this.aQID+pStep);
		var vIDs = this.getChildById(pSA,"ass"+pNodeID+this.aQID+pStep).value;
		var vValue = "";
		var vText = "["+this.list2mapped(vIDs)+"] "+vLanguage["WRONG"];
		if (vIDs == "") {
			s = 0;
			vValue = "-0%";
			vOutRow.style.color = "green";
			vText = vLanguage["None"]+" - "+ vLanguage["RIGHT"];
		} else {
			vOutRow.style.color = "red";
			s = vIDs.split(",").length;
			var perc = this.aErrorDefault; //parseInt(this.aSettings["Per_Error_Minus_Percent"])/100;		
			vValue = "-"+this.createPercent(s * perc);
		};
		this.setStepAssValue(pStep,pAssRoot,"out"+pNodeID,vText,vValue);
	};
	//#################################################################
	//# Nested: setStepCount(pCount)
	//#################################################################
     this.setStepCount = function (pCount) {
		var vStepCount = this.getElementById("sSTEPCOUNT"+this.aQID);
		//var vStepCount = this.getIMathById("STEPCOUNT");
		vStepCount.value = pCount;
		this.updateIMathById("STEPCOUNT");
		var vOut = this.saveEProof2Form();
		//alert("setStepCount("+pCount+"):2487 vStepCount="+vStepCount.value);
		//var vAllStep = this.getAllSteps("SCAN");
		//this.updateUsedIDs();
	};
	//#################################################################
	//# Nested: setStepAssPrevNext (pStep,pAssRoot,pSA,pNodeID,pNextCon,pID,pPrevNextID)
	//#################################################################
	this.setStepAssPrevNext = function (pStep,pAssRoot,pSA,pNodeID,pNextCon,pMapID,pPrevNextID,pPrevNext,pText) {	
		var vName = "out"+pNodeID+this.aQID+pStep;
		//alert("pAssRoot.id="+pAssRoot.id+" vName="+vName);
		var vOutRow = this.getChildById(pAssRoot,vName);
		var vMapPrevNext = "Start";
		if (pPrevNextID != " ") vMapPrevNext=this.aMappedID[pPrevNextID];
		var vCountStr = this.getChildById(pSA,pNodeID+this.aQID+pStep).value;
		var vCount = parseInt(vCountStr);
		var vValue = "";
		var vText = "";
		var vID = this.aOriginalID[pMapID];
		if (!pPrevNextID) pPrevNextID = "?";
		//alert(pPrevNext+": pPrevNextID=["+pPrevNextID+"] - setStepAssPrevNext()-Call:1326");
		vOutRow.style.color = "red";
		if (vCountStr == "-1") {
			vText += "["+pMapID+"] "+vLanguage["logically"] +" "+ vLanguage["not"]+" "+vLanguage["connected"] +" ";
			if (!pPrevNextID) vText += vLanguage["with"]+" ["+vMapPrevNext+"] ";
			vText += vLanguage["WRONG"];
			vText += pText;
			vValue = "-"+this.createPercent(0.5);
		} else if (vCount == 0) {
			vValue = "-0%";
			vOutRow.style.color = "green";
			vText = vLanguage["ProofStep"] +" ["+vMapPrevNext+"] ";
			var vStartDist = this.calcStepDistance(" ",vID);
			if ((vStartDist == 1) && (pPrevNext == "PREV")) {
				//alert("setStepAssPrevNext():2159 - No Dependency of ["+vID+"] to previous step");
				vText = vLanguage["no_dependency"]+" "+vLanguage["for"]+" ["+pMapID+"] ";
			};
			if ((this.aStepType4ID[vID] == "CONCLUSION") && (pPrevNext == "NEXT")) {
				//alert("setStepAssPrevNext():2159 - CONCLUSION No Dependency of ["+vID+"] to next step");
				vText = vLanguage["End_of"]+" "+vLanguage["ProofSequence"]+" - "+ vLanguage["no_dependency"]+" "+vLanguage["for"]+" ["+pMapID+"] ";
			};
			vText+= vLanguage["RIGHT"];
			if (!pPrevNextID) vText = "---";
		} else {
			var perc = this.aErrorDefault; //parseInt(this.aSettings["Per_Error_Minus_Percent"])/100;	
			var reduc = vCount * perc;
			if (this.greater(reduc,0.5)) reduc=0.5;
			this.aErrorStep["STEP"+pStep] -= reduc;
			vValue = "-"+this.createPercent(reduc);
			if (vCount == 1) {
				vText = vCount+" " + vLanguage["ProofStep"]+" "+vLanguage["is_missing"];
			} else {
				vText = vCount+" "+vLanguage["ProofSteps"] + " " + vLanguage["missing"];
			};
			vText += " "+vLanguage["between"]+" ["+pMapID+"] "+vLanguage["and"] +" ["+vMapPrevNext+"] "+vLanguage["WRONG"] + pText;
		};
		//this.setStepAssValue(pStep,pAssRoot,"out"+pNodeID,vText,vValue);
		return new Array(vText,vValue);
	};
	//#################################################################
	//# Nested: setStepAssValue (pStep,pAssRoot,pNodeID,pText,pValue)
	//#################################################################
	this.setStepAssValue = function (pStep,pAssRoot,pNodeID,pText,pValue) {	
		var vTextNode = this.getChildById(pAssRoot,pNodeID+"TEXT"+this.aQID+pStep);
		var vValueNode = this.getChildById(pAssRoot,pNodeID+"SCORE"+this.aQID+pStep);
		if (vTextNode) {
			vTextNode.innerHTML = pText;
		} else {
		 	alert("pNodeID='"+pNodeID+"TEXT"+this.aQID+pStep+"' undefined. setStepAssValue():1946");
		}
		if (vValueNode) {
			vValueNode.innerHTML = pValue;
		} else {
		 	alert("pNodeID='"+pNodeID+"SCORE"+this.aQID+pStep+"' undefined. setStepAssValue():1951")
		}
		
	};
	//#################################################################
	//# Nested: setUnused4Step(pStep)
	//#################################################################
	this.setUnused4Step = function (pStep) {
		//alert("[+] visible");
		this.hide("outMYSTEPASSESS"+this.aQID+pStep);
		this.hideElement("bDelete"+this.aQID+pStep);
		this.hideElement("bJustifications"+this.aQID+pStep);
		this.hideElement("outJUSTIFICATIONID"+this.aQID+pStep);
		this.hide("optJUSTIFICATION"+this.aQID+pStep);
		this.hide("labelOPTJUSTIFICATION"+this.aQID+pStep);
		this.hideElement("sCONNECTION"+this.aQID+pStep);
		this.hideElement("sSTEPID"+this.aQID+pStep);
		this.hideElement("bEdit"+this.aQID+pStep);
		this.hideElement("bAssessStep"+this.aQID+pStep);
		this.hide("mapPREVIOUSLINK"+this.aQID+pStep);
		this.hide("bSuggestion"+this.aQID+pStep);
		this.hide("assessSTUDENTANSWER"+this.aQID+pStep);
		this.hide("SUGGESTIONS"+this.aQID+pStep);
		this.show("bUseStep"+this.aQID+pStep);
	};
	//#################################################################
	//# Nested: setAssessSugButton4Step(pStep)
	//#################################################################
	this.setAssessSugButton4Step = function (pStep) {
		if (this.aSettings["show_suggestions"] != "0") {
			// [Suggestion]
			this.show("bSuggestion"+this.aQID+pStep,"block");
		} else {
			// [Suggestion]
			this.hide("bSuggestion"+this.aQID+pStep);
		};
		if (this.aSettings["show_assessment"] != "0") {
			// [Assessment]
			this.show("bAssessStep"+this.aQID+pStep,"block");
		} else {
			// [Assessment]
			this.hide("bAssessStep"+this.aQID+pStep);
		};
	};
	//#################################################################
	//# Nested: setVisibility4Proof()
	//#################################################################
	this.setVisibility4Proof = function (pDisplay) {
		this.aDisplay = pDisplay || this.getElementById("sDISPLAYOPTION"+this.aQID).value;
		//alert("setVisibility4Proof() this.aDisplay="+this.aDisplay+" show_suggestions="+this.aSettings["show_suggestions"]);
		var vListNode = this.updateStudentAnswer();
		if (this.aDisplay == "Hide") {
			this.hide("STUDENTANSWERLIST"+this.aQID);
		} else {
			this.show("STUDENTANSWERLIST"+this.aQID);
			if (this.aDisplay == "EDITComplete") {
				if (this.aSettings["show_suggestions"] == "1") {
					//this.show("FIRSTSSUGGESTION"+this.aQID);
					this.show("bSuggestionFirst"+this.aQID);
				} else {
					//this.hide("FIRSTSSUGGESTION"+this.aQID);
					this.hide("bSuggestionFirst"+this.aQID);
				};
			} else {
				//this.hide("FIRSTSSUGGESTION"+this.aQID);
				this.hide("bSuggestionFirst"+this.aQID);
			};
			var k=0;
			while (k != vListNode.length) {
				this.setVisibility4Step(vListNode[k],k);
				k++;
			};
		};
		this.updateIMathById("DISPLAYOPTION");
		var vOut = this.saveEProof2Form();
	};
	//#################################################################
	//# Nested: setVisibility4Step(pStep)
	//#################################################################
	this.setVisibility4Step = function (pSA,pIndex) {
		var vStep;
		var vID = "?";
		if (!pIndex) {
			var vIDNode = this.getChildByClassName(pSA,"inSTEPID"+this.aQID);
			vID = vIDNode.value;
			vStep = vIDNode.getAttribute("step");
		} else {
			vID    = this.aIndex2ID[pIndex];
			vStep = this.aIndex2Step[pIndex];
		}
		//alert("pSA.step="+vStep);
		//alert("setVisibility4Step -- ID="+pSA.id+" pSA.parentNode.id="+pSA.parentNode.id);
		if (pSA.parentNode.id == "UNUSEDSTEPS"+this.aQID) {
			//alert("setVisibility4Step():2138 Unused Step");
			this.setUnused4Step(vStep);
		} else {
			//alert("[+] not visible [X] visible");
			this.showHideBoolean("outMYSTEPASSESS"+this.aQID+vStep,this.aSettings["AssessmentMode"]);
			this.showSA(pSA,"bDelete"+this.aQID+vStep);
			this.showSA(pSA,"sCONNECTION"+this.aQID+vStep);
			this.showSA(pSA,"sSTEPID"+this.aQID+vStep);
			this.showSA(pSA,"bJustifications"+this.aQID+vStep);
			this.showSA(pSA,"outJUSTIFICATIONID"+this.aQID+vStep);
			if ((vID.indexOf("MY")==0) || (this.aSettings["AuthoringMode"] != "0")) {
				this.showSA(pSA,"bEdit"+this.aQID+vStep);
			} else {
				this.hideElement("bEdit"+this.aQID+vStep);
			};
			if (this.aSettings["AuthoringMode"] == "0") {
				this.hideSA(pSA,"mapPREVIOUSLINK"+this.aQID+vStep);
				this.hideSA(pSA,"optJUSTIFICATION"+this.aQID+vStep);
				this.hideSA(pSA,"labelOPTJUSTIFICATION"+this.aQID+vStep);
			} else {
				this.showSA(pSA,"mapPREVIOUSLINK"+this.aQID+vStep);
				this.showSA(pSA,"optJUSTIFICATION"+this.aQID+vStep);
				this.showSA(pSA,"labelOPTJUSTIFICATION"+this.aQID+vStep);
			};
			this.hideSA(pSA,"bUseStep"+this.aQID+vStep);
			if (this.aDisplay == "EDITComplete") {
				this.setAssessSugButton4Step(vStep);
				this.showSA(pSA,"editSTUDENTANSWER"+this.aQID+vStep);
				this.showSA(pSA,"divJUSTIFICATIONS"+this.aQID+vStep);
				this.showSA(pSA,"divEDITJUSTIFICATIONS"+this.aQID+vStep);
				//this.updateStep(vStep);
			} else if (this.aDisplay == "EDITShort") {
				this.setAssessSugButton4Step(vStep);
				this.showSA(pSA,"editSTUDENTANSWER"+this.aQID+vStep);
				this.hideSA(pSA,"divJUSTIFICATIONS"+this.aQID+vStep);
				this.showSA(pSA,"divEDITJUSTIFICATIONS"+this.aQID+vStep);
				//this.hideElement("bJustifications"+this.aQID+vStep);
				//this.hideElement("outJUSTIFICATIONID"+this.aQID+vStep);
			} else  if (this.aDisplay == "Complete") {
				this.showSA(pSA,"divJUSTIFICATIONS"+this.aQID+vStep);
				this.hideSA(pSA,"divEDITJUSTIFICATIONS"+this.aQID+vStep);
				this.hideSA(pSA,"editSTUDENTANSWER"+this.aQID+vStep);
				this.hideSA(pSA,"assessSTUDENTANSWER"+this.aQID+vStep);
				this.hideSA(pSA,"SUGGESTIONS"+this.aQID+vStep);
			} else  { //if (this.aDisplay == "Short") {
				this.hideSA(pSA,"divJUSTIFICATIONS"+this.aQID+vStep);
				this.hideSA(pSA,"divEDITJUSTIFICATIONS"+this.aQID+vStep);
				this.hideSA(pSA,"editSTUDENTANSWER"+this.aQID+vStep);
				this.hideSA(pSA,"assessSTUDENTANSWER"+this.aQID+vStep);
				this.hideSA(pSA,"SUGGESTIONS"+this.aQID+vStep);
			};
		};
		this.checkUnusedCount();
	};
	//#################################################################
	//# Nested: shuffle(pArray)
	//#################################################################
	this.shuffle = function (pArray){
		var m = pArray.length;
		var vElem;
		var i=0;
		// While there remain elements to shuffle…
 		while (m) {
			// Pick a remaining element…
		    i = Math.floor(Math.random() * m--);
 			// And swap it with the current element.
			vElem = pArray[m];
			pArray[m] = pArray[i];
		    pArray[i] = vElem;
		}
		return pArray;
  	};
	//#################################################################
	//# Nested: selectElementsFromArray(pArray,pCount)
	//#################################################################
	this.selectElementsFromArray = function (pArray,pCount) {
		var vArray = pArray.slice();
		vArray = this.shuffle(vArray);
		var vResArr = new Array();
		var m = vArray.length;
		if (this.greater(pCount,m)) {
			alert("ERROR: Select "+pCount+" Elements from Array with lenght="+m+" is not possible!");
			pCount = m;
		};
		var vElem;
		var i=0;
		// While there remain elements to shuffle…
 		while (pCount) {
			// Pick a remaining element…
		    i = Math.floor(Math.random() * m--);
		    // Save random Element
		    vResArr.push(vArray[i]);
		    pCount--;
 			// And swap it with the current element.
			vElem = vArray[m];
			vArray[m] = vArray[i];
		    vArray[i] = vElem;
		}
  		return vResArr;
  	};
	//#################################################################
	//# Nested: storeCorrectSuggestions()
	//#################################################################
	this.storeCorrectSuggestions = function () {	
		//alert("store correct Suggestions according to Solution");
		this.clearSuggestions();
		var vStep=0;
		var vID = "";
		while (vStep != (this.aCount+1)) {
			vID = this.getElementById("inSTEPID"+this.aQID+vStep).value;
			//alert("vID=["+vID+"] Step="+vStep);
			this.getElementById("selectCONNECTION"+this.aQID+vStep).value = this.getSugCon(vID);
			this.getElementById("selectSTEPID"+this.aQID+vStep).value = this.getSugID(vID);
			this.getElementById("selectJUSTIFICATION"+this.aQID+vStep).value = this.getSugJust(vID);
			vStep++;
		};
		
	};
	//#################################################################
	//# Nested: toggleEdit(pButtonEDIT)
	//#################################################################
	this.toggleEdit = function (pButtonEDIT) {
		//parentNode= editSTUDENTANSWER 
		//parentNode.parentNode= STUDENTANSWER
		//parentNode.parentNode.parentNode= STUDENTANSWERLIST or UNUSEDSTEPS
		var vStudentAnswerNode = this.getParentStudentAnswer(pButtonEDIT);
		var vStep = pButtonEDIT.getAttribute("step");
		var vID = this.getElementById("inSTEPID"+this.aQID+vStep).value;
		//alert("eproofmain.js - toggleEdit():3298  vStep="+vStep);
		var vNode = this.getElementById("STEPEDITOR"+this.aQID+vStep);
		if (vNode) {
			if (vNode.style.display=="none") { 
				var vEditNode = this.getElementById("taSTEPEDITOR"+this.aQID+vStep);
				var vSourceNode = this.getElementById("EDITSTEP-"+this.aQID+"-"+vID);
				vEditNode.value = this.decodeTextarea(vSourceNode.value);
			};
			this.toggleNode(vNode);
		} else {
			alert("Error: toggleEdit()-Call - STEPEDITOR for Step="+vStep+" is undefined!");
		}
	};
	//#################################################################
	//# Nested: setminusarrays  
	//#################################################################
	this.setminusarrays = function (x, y) {
		var res = [];
		var i = 0;
		while (i != x.length) {
			if (this.findarray(x[i],y) == -1) {
				res.push(x[i]);
			};
			i++;
		};
		return res;
	};
	//#################################################################
	//# Nested: unionarrays  
	//# unionarrays(array,array): Unions two arrays, preventing duplicates, into a new array
	//#################################################################
	this.unionarrays = function (x, y) {
		var res = [];
		if (x.length == 0) {
			res = y;
		} else if (y.length == 0) {
			res = x;
		} else {
			//var obj = {};
			var obj = new Array();
			var i = 0;
			while (i != x.length) {
				obj[x[i]] = x[i];
				i++;
			};
			i = 0;
			while (i != y.length) {
				obj[y[i]] = y[i];
				i++;
			};
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) {
					res.push(obj[k]);
				}
			}
		};
		//alert("x=["+x.join(",")+"] y=["+y.join(",")+"] union=["+res.join(",")+"]");
		return res;
	};
	//#################################################################
	//# Nested: sortArrayID(pArray)  
	//#################################################################
	this.sortArrayID = function (pArray) {
		var k=0;
		var vMapArr = new Array();
		while (k != pArray.length) {
			vMapArr.push(this.aMappedID[pArray[k]]);
			k++;
		};
		vMapArr.sort();
		k=0;
		while (k != pArray.length) {
			pArray[k] = this.aOriginalID[vMapArr[k]];
			k++;
		};
		//return pArray
	};
	//#################################################################
	//# Nested: uniquearray  
	//# uniquearray(array): preventing duplicates, save into a new array
	//#################################################################
	this.uniquearray = function (x) {
		var obj = [];
		var i = 0;
		while (i != x.length) {
			obj[x[i]] = x[i];
			i++;
		};
		var res = [];
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				res.push(obj[k]);
			};
		};
		return res;
	};
	//#################################################################
	//# Nested: updateConnection(pChildSA)
	//#################################################################
	this.updateConnection = function (pChildSA) {
		//var vAnswerList = this.getChildrenByClassName(this.aRootDOM,"STUDENTANSWER"+this.aQID);
		//var vAnswerList = this.getAllSteps();
		var vSA = this.getParentStudentAnswer(pChildSA);
		var vStep = pChildSA.getAttribute("step");
		var vPrevID = this.getElementById("PREVIOUS"+this.aQID+vStep).value;
		//alert("updateConnection():2496 - vPrevID="+vPrevID);
		var vPreStep = 0;
		if (vPrevID != " ") {
			vPreStep = this.getStep4ID(vPrevID);
		};
		//alert("updateConnection():2498 vPreStep="+vPreStep);
		this.getElementById("NEXTCON"+this.aQID+vPreStep).value = pChildSA.value;
		var vOutConNode = this.getElementById("outCONNECTION"+this.aQID+vStep);
		vOutConNode.innerHTML = this.vConnection2Node[pChildSA.value].innerHTML;
		//alert("updateStep("+pChildSA.id+") vStep="+vStep+ " vAnswerList.length="+this.aCount);
		this.updateConnectionWidth(vOutConNode,pChildSA.value);
		this.updateIMathById("STUDENTANSWER");
		var vOut = this.saveEProof2Form();
    };
	//#################################################################
	//# Nested: updateConnectionWidth(pChildSA)
	//#################################################################
	this.updateConnectionWidth = function (pConNode,pConValue) {
		if (this.vConnectionArray[pConValue] == " ") {
			pConNode.setAttribute("width","0ex");
		} else {
			pConNode.setAttribute("width","35ex");
		}
    };
	//#################################################################
	//# Nested: updateEditJustifications(pChildSA)
	//#################################################################
	this.updateEditJustifications = function (pChildSA) {
		var vSA = this.getParentStudentAnswer(pChildSA);
		var vOutputList = this.getChildrenByClassName(vSA,"displayJUSTIFICATIONS"+this.aQID);
		var vInputIDs = this.getChildrenByClassName(vSA,"inJUSTIFICATION"+this.aQID);
	};
	//#################################################################
	//# Nested: updateAuthoringMappedIDs()
	//#################################################################
	this.updateAuthoringMappedIDs = function () {
		//alert("updateAuthoringMappedIDs()-Call");
		// update DOM Input Values
		var vFound = -1;
		var vID = "";
		var vChar = "";
		var vOrgID = "";
		var k=0;
		//alert("this.aAllID.length="+this.aAllID.length);
		while (k!= this.aAllID.length) {
			if (this.aAllID[k]) {
				vOrgID = this.aAllID[k];
				vFound = vOrgID.indexOf("_F");
				//alert("vOrgID="+vOrgID+" Found="+vFound);
				if (this.greater(vFound,0)) {
					//alert("False ID ["+vOrgID+"] found. updateMappedIDs():1938");
					vID = vOrgID.substr(0,vFound);
					if (this.aMappedID[vID]) {
						vChar = this.aMappedID[vID] + "_F"; //this.createChar4ID(vID);
						vMappedID = vChar+this.newCharCounter(vChar);
						this.redefineMappedID(vOrgID,vMappedID);
					} else {
						alert("updateMappedID() for vID=["+vOrgID+"] failed! MappedID for ["+vID+"] does not exist!");
					}
				};
			} else {
				alert("Error: this.aAllID.length="+this.aAllID.length+" this.aAllID["+k+"] is not defined! - updateAuthoringMappedIDs():3464");
			};
			k++;
		};
		// update DOM Output Value of ID
		//vContent +=""+this.LT+"INPUT type='text' size='3' value='"+pID+"' class='ID_"+pTextareaID+this.aQID+"' id='EDITID-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateSourceIDs()\""+this.GT;
		//vContent +=""+this.LT+"INPUT type='text' size='1' value='"+pChar+"' class='CHAR_"+pTextareaID+this.aQID+"' id='CHAR-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateCharIDs() \""+this.GT;
		//vContent +=""+this.LT+"INPUT type='text' size='3' value='"+pMappedID+"' class='MAPID_"+pTextareaID+this.aQID+"' id='MAPID-"+this.aQID+"-"+pID+"'  onchange=\"vEProof"+this.aQID+".updateMappedIDs() \""+this.GT;
	};
	//#################################################################
	//# Nested: updateMappedIDs()
	//#################################################################
	this.updateMappedIDs = function () {
		var vOrgID = "";
		alert("updateMappedIDs()-Call");
		var k=0;
		//alert("this.aAllID.length="+this.aAllID.length);
		while (k!= this.aAllID.length) {
			vOrgID = this.aAllID[k];
			vMappedID = this.getElementById("MAPID-"+this.aQID+"-"+vOrgID).value;
			this.redefineMappedID(vOrgID,vMappedID);
			k++;
		};
		//update DOM Input Values
		//update ID in Solutions
		//vContent +=""+this.LT+"INPUT type='text' size='3' value='"+pID+"' class='ID_"+pTextareaID+this.aQID+"' id='EDITID-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateSourceIDs()\""+this.GT;
		//vContent +=""+this.LT+"INPUT type='text' size='1' value='"+pChar+"' class='CHAR_"+pTextareaID+this.aQID+"' id='CHAR-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateCharIDs() \""+this.GT;
		//vContent +=""+this.LT+"INPUT type='text' size='3' value='"+pMappedID+"' class='MAPID_"+pTextareaID+this.aQID+"' id='MAPID-"+this.aQID+"-"+pID+"'  onchange=\"vEProof"+this.aQID+".updateMappedIDs() \""+this.GT;
	};
	//#################################################################
	//# Nested: updatePreviousLink(pStep)
	//#################################################################
	this.updatePreviousLink = function (pDOM) {
		var vStep = pDOM.getAttribute('step');
		var vMapID = pDOM.value;
		var vPrevID = this.getElementById("PREVIOUS"+this.aQID+vStep).value;
		vPrevID = this.aMappedID[vPrevID] || "Start";
		var vOrgNode = this.getElementById("PREVIOUSLINK"+this.aQID+vStep);
		//var vMapNode = this.getElementById("mapPREVIOUSLINK"+this.aQID+vStep);
		var vMapNode = pDOM;
		if (vMapID != "") {
			if (this.aOriginalID[vMapID]) {
				vOrgNode.value = this.aOriginalID[vMapID];
				alert("Replace previous ID=["+vPrevID+"] by a linked previous ID=["+vMapID+"]");
			} else {
				alert("Error Step "+vStep+" ["+vMapID+"] is undefined! - updatePreviousLink():3508");
				if (vOrgNode.value == "") {
					vMapNode.value = "";
				} else {
					vMapNode.value = this.aMappedID[vOrgNode.value];
				}
			}
		};
		//alert("updatePreviousLink("+vStep+"):3502 - eproofmain.js");
	};
	//#################################################################
	//# Nested: updateSourceIDs()
	//#################################################################
	this.updateSourceIDs = function () {
		alert("updateSourceIDs()-Call");
		//update DOM Input Values
		//update ID in Solutions
		//vContent +=""+this.LT+"INPUT type='text' size='3' value='"+pID+"' class='ID_"+pTextareaID+this.aQID+"' id='EDITID-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateSourceIDs()\""+this.GT;
		//vContent +=""+this.LT+"INPUT type='text' size='1' value='"+pChar+"' class='CHAR_"+pTextareaID+this.aQID+"' id='CHAR-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateCharIDs() \""+this.GT;
		//vContent +=""+this.LT+"INPUT type='text' size='3' value='"+pMappedID+"' class='MAPID_"+pTextareaID+this.aQID+"' id='MAPID-"+this.aQID+"-"+pID+"'  onchange=\"vEProof"+this.aQID+".updateMappedIDs() \""+this.GT;
	};
	//#################################################################
	//# Nested: updateStudentAnswer()
	//#################################################################
	this.updateStudentAnswer = function () {
		this.aStudentAnswerList = this.aAllSteps; 
		this.aCount = this.aStudentAnswerList.length;
		return this.aStudentAnswerList;
	};
	//#################################################################
	//# Nested: updateUsedIDs()
	//#################################################################
	this.updateUsedIDs = function () {
		//alert("updateUsedIDs()");
		var vUsedArray = this.getUsedIDs();
		var vProofC= parseInt(this.getElementById("PROOFCOUNT"+this.aQID).value);
		var vLLE = this.calcLogicLinkError(vUsedArray.length,vProofC);
		this.getElementById("LLE"+this.aQID).value = vLLE.toFixed(2);
		this.getElementById("USEDIDS"+this.aQID).value = vUsedArray.join(",");
	};
	//#################################################################
	//# Nested: updateStepDef(pID,pTextareaID)
	//#################################################################
	this.updateStepDef = function (pID,pTextareaID,pValue) {
		//this.aStudentAnswerList = this.getElementsByClassName("STUDENTANSWER"+this.aQID); 
		this.aStudentAnswerList = this.getAllSteps(); 
		//alert("updateStepDef('"+pID+"','"+pTextareaID+"','"+pValue+"')");
		//if TextareaID is not JUSTIFICATION then it is necessary to update two DOMs
		if (pTextareaID != "JUSTIFICATION") {
			var vIndex = this.getIndex4ID(pID);
			var vSA = this.aStudentAnswerList[vIndex];
			//Update StepEditor and StepDef Display
		};
		//----Update AllID2RAW------------
		if (this.aAllID2RAW[pID]) {
			this.aAllID2RAW[pID] = pValue;
		};
		//-----update Display above the StepDefinition Input Line
		var vOutNode = this.getElementById("ID-"+this.aQID+"-"+pID);
		vOutNode.innerHTML = pValue;
		this.processMathNode(vOutNode);
		var vStep = this.getStep4ID(pID);
		if (this.greater(vStep,0)) {
			this.writeInnerHTML4Math("outSTEPDEF"+this.aQID+vStep,pValue)
		};
		this.updateIMathById(pTextareaID);
		this.updateAllJustifications();
		var vOut = this.saveEProof2Form();
	};
	//#################################################################
	//# Nested: updateStepCount(pCount)
	//#################################################################
	this.updateStepCount = function (pCount) {
		var vListNode = this.updateStudentAnswer();
		//alert("vListNode.length="+vListNode.length);
		var vUsedNodes   = this.getUsedSteps(); //this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		var vUnusedNodes = this.getUnusedSteps(); //ChildrenByClassName(this.aUnusedDOM,"STUDENTANSWER"+this.aQID);
 		var vProof       = this.aUsedDOM; 
		var vUnused      = this.aUnusedDOM; 
		var vDelPos = vUsedNodes.length - 1;
		var vParent = null;
		//alert("Set Number of Proof Steps="+pCount+" All="+this.aCount+" vUsedNodes="+vUsedNodes.length+" Unused="+vUnusedNodes.length+")");
		if (this.lower(pCount,vUsedNodes.length)) {
			//---vProof [0,1,2,3,4,5] vUnused [6,7,8,9] pCount=3
			//alert("Reduce Number of Steps form "+vUsedNodes.length +" to "+pCount);
			//var vParentNode = vListNode[pCount-1].parentNode;
			vDelPos = vUsedNodes.length-1;
			while (pCount != vUsedNodes.length) {
				//alert("vUsedNodes[vDelPos].id="+vUsedNodes[vDelPos].id);
				vParent = vUsedNodes[vDelPos].parentNode;
				vRemovedChild = vParent.removeChild(vUsedNodes[vDelPos]);
				vUnused.insertBefore(vRemovedChild,vUnused.firstChild);
				//vUnused.appendChild(vRemovedChild);
				vDelPos--;
				pCount++;
			}	
		} else if (this.greater(pCount , vUsedNodes.length)) {
			//---Proof [0,1,2,3,4] Unused [5,6,7,8,9] pCount=6
			//alert("Increase Number of Steps form "+vUsedNodes.length +" to "+pCount);
			vDelPos = 0;
			while (this.lower(vUsedNodes.length,pCount)) {
				//alert("vUnusedNodes[vDelPos].id="+vUnusedNodes[vDelPos].id+" vUnusedNodes.length="+vUnusedNodes.length);
				vParent = vUnusedNodes[vDelPos].parentNode;
				vRemovedChild = vParent.removeChild(vUnusedNodes[vDelPos]);
				vProof.appendChild(vRemovedChild);
				vDelPos++;
				pCount--;
			}	
		};
		//alert("updateStepCount() - 1.1");
		this.checkUnusedCount();
		//alert("updateStepCount() - 1.2");
		this.setVisibility4Proof();
		//alert("updateStepCount() - 1.3");
		this.updateInput();
		//alert("updateStepCount() - 1.4");
		//this.setStepCount(pCount); not necessary because Selector is changed by User
		var vAllStep = this.getAllSteps("SCAN");
	};
	//#################################################
	//# Vigenere-Encode and Decode of Strings
	//#   pDecode true false
	//#################################################
	this.vigenere = function (pString,pKeyword,pEncode) {
		var CR = this.CR;
		function ord(x) { return x.charCodeAt(0) }
		function chr(x) { return String.fromCharCode(x) }
		function rot(a, b, decode) {
			var vMinChar = "0";
			var vMaxChar = "Z";
			var vMod = ord(vMaxChar)-ord(vMinChar)+1;
			//var vMod = ord("z")-32+1;
			//alert("vMod="+vMod);
			return decode	? chr((vMod + ord(a) - ord(b)) % vMod + ord(vMinChar))
					: chr((vMod + ord(a) + ord(b) - ord(vMinChar) * 2) % vMod + ord(vMinChar)) 
		}
		function transEnc(msg, key) {
			//alert("Encode");
			var i = 0;
			key = key.toUpperCase().replace(/[^A-Z]/g, '');
			var cc=0;
			var k=0;
			var vMaxChar = 35;
			var vOut = "";
			var c1,c2; 
			while (i != msg.length) {
				cc = msg.charCodeAt(i);
				k = key.charCodeAt(i % key.length) - ord("A");
				cc += k;
				cc = cc % 256;
				c1 = chr(Math.floor(cc / 16) + ord("A")); 
				c2 = chr((cc % 16)+ ord("A"));
				//alert("Enc("+i+")="+cc);
				vOut +=c1+c2;
				i++;
				if ((i % vMaxChar) == 0) vOut += CR;
			};
			return vOut;
		};
		function transDec(msg, key) {
			//alert("Decode");
			var vArr = msg.split(CR);
			msg = vArr.join("");
			key = key.toUpperCase().replace(/[^A-Z]/g, '');
			var cc=0;
			var i = 0;
			var k=0;
			var vOut = "";
			var vSplit = "";
			var c1,c2; 
			var vMax = Math.floor(msg.length/2);
			while (i != vMax) {
				c1= msg.charCodeAt(2*i)-ord("A");
				c2= msg.charCodeAt(2*i+1)-ord("A");
				cc = c1*16+c2;
				k = key.charCodeAt(i % key.length) - ord("A");
				cc = (cc - k) % 256;
				//alert("Dec("+i+"/k="+k+")="+cc);
				vOut += chr(cc);
				i++;
			};
			return vOut;
		};
		
		if (pEncode == "encode") {
			return transEnc(pString,pKeyword);
		} else {
			return transDec(pString,pKeyword);
		}
	};
	//#################################################################
	//# Nested: visibleManualAssess()
	//#################################################################
	this.visibleManualAssess = function () {
		var ManAssNodes = this.getElementsByClassName("outMYSTEPASSESS"+this.aQID);
		var i=0;
		if (this.aSettings["AssessmentMode"] == "1") {
			//alert("Show Manual Assessment Box for Steps - visibleManualAssess("+this.aSettings["AssessmentMode"]+"):3052");
			while (i != ManAssNodes.length) {
				this.show(ManAssNodes[i].id);
				i++;
			};
		} else {
			//alert("Hide Manual Assessment Box for Steps length="+ManAssNodes.length+" - visibleManualAssess("+this.aSettings["AssessmentMode"]+"):3130");
			while (i != ManAssNodes.length) {
				//this.hideNode(ManAssNodes[i]);
				this.hide(ManAssNodes[i].id);
				i++;
			}
		}
	};
	//#################################################################
	//# Nested: writeHash2Value
	//#################################################################
	this.writeHash2Value = function (pParent,pHash,pPostfix) {
		if (!pPostfix) pPostfix = "";
		for (var iID in pHash) {
			this.writeParentValue(pParent,iID+this.aQID+pPostfix,pHash[iID]);
		};
	};
	//#################################################################
	//# Nested: writeHash2InnerHTML
	//#################################################################
	this.writeHash2InnerHTML = function (pParent,pHash,pPostfix) {
		if (!pPostfix) pPostfix = "";
		for (var iID in pHash) {
			this.writeParentInnerHTML(pParent,iID+this.aQID+pPostfix,pHash[iID]);
		};
	};
	//#################################################################
	//# Nested: writeInnerHTML
	//#################################################################
	this.writeInnerHTML = function (pID,pContent) {
		this.writeParentInnerHTML(this.aRootDOM,pID,pContent);
	};
	//#################################################################
	//# Nested: writeParentInnerHTML
	//#################################################################
	this.writeParentInnerHTML = function (pParent,pID,pContent) {
		var vOutNode = this.getChildById(pParent,pID);
		if (vOutNode) {
			vOutNode.innerHTML = pContent;
		} else {
			this.alertDOM("For ID="+pID+" is writeParentInnerHTML() not defined");		
		}
	};
	//#################################################################
	//# Nested: writeParentValue
	//#################################################################
	this.writeParentValue = function (pParent,pID,pContent) {
		var vOutNode = this.getChildById(pParent,pID);
		if (vOutNode) {
			vOutNode.value = pContent;
		} else {
			this.alertDOM("For ParentID="+pParent.id+" and ID="+pID+" in writeParentValue() not defined");		
		}
	};
	//#################################################################
	//# Nested: writeInnerHTML4Math
	//#################################################################
	this.writeInnerHTML4Math = function (pNodeID,pContent) {
		var vOutNode = this.getElementById(pNodeID);
		if (vOutNode) {
			vOutNode.innerHTML = pContent;
			this.processMathNode(vOutNode);
		} else {
			alert("writeInnerHTML4Math()-Error: pNodeID='"+pNodeID+"' not found!");
		}
	};
	//#################################################################
	//# Nested: writeInnerHTML4Step
	//#################################################################
	this.writeInnerHTML4Step = function (pStep,pClassID,pContent) {
		var vRootNode = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
		this.writeInnerHTML4Root(vRootNode,pClassID,pContent);
	};
	//#################################################################
	//# Nested: writeSelectionClick
	//#################################################################
	this.writeSelectionClick = function (pStep,pClassID,pValue) {
		//alert("writeSelectionClick():2402 - Value="+pValue+" writeDOM to "+pClassID+this.aQID+pStep);
		var vNode = this.getElementById(pClassID+this.aQID+pStep);
		vNode.value = pValue; 
	};
	//#################################################################
	//# Nested: writeValue4Step
	//#################################################################
	this.writeValue4Step = function (pStep,pClassID,pValue) {
		var vNode = this.getElementById(pClassID+this.aQID+pStep);
		vNode.value = pValue; 
	};
	//#################################################################
	//# Nested: writeInnerHTML4Root
	//#################################################################
	this.writeInnerHTML4Root = function (pRootDOM,pClassID,pContent) {
		//var vOutNode = document.getElementById(pID);
		//var vOutNode = this.getChildById(this.aRootDOM,pID);
		if (pRootDOM) {
			//alert("writeInnerHTML4Root()-Call pRootDOM.id="+pRootDOM.id+" exists");
			var vOutList = this.getChildrenByClassName(pRootDOM,pClassID);
			if (vOutList.length == 0) {
				this.alertDOM("vOutList with ID="+pClassID+" in writeInnerHTML4Root() not defined");
			} else {
				var k=0;
				while (k !=vOutList.length) {
					vOutList[k].innerHTML = pContent;
					k++;
				};
			}
		} else {
			this.alertDOM("pRootDOM for Search-ID="+pClassID+" in writeInnerHTML4Root() not defined");
		}
	};
	//#################################################################
	//# Nested: writeSolution2SA()
	//#################################################################
	this.writeSolution2SA = function () {
		//alert("writeSolution2SA:2343");
		var vOut = "";
		var vCR = "";
		var vPrevious = " ";
		var vPrevID = "";
		var vInput = this.getIMathById("SOLUTION").value;
		var vHash = new Array();
		this.initExportHashSA(vHash);
		var vID = "";
		var vStepCount = 0;
		if (vInput) {
			var vListArray = vInput.split(this.CR);
			var k=0;
			this.checkSolStep(" ");
			while (k != vListArray.length) {
				if (this.greater(vListArray[k].indexOf(this.aSeparator) , 0)) {
					var vSolStep = new Array();
					var vSplitRec = vListArray[k].split(this.aSeparator);
					//-----HASH FORMAT----------------------------------------------
					//this.aStudAnsFormat = new Array("PREVIOUS","CONNECTION","ID","JUST","OPTJUST","MANSCORE","SUGUSED","ASSUSED","SELCON","SELID","SELJUST","VALUE");
					//----Solution Structure of SplitRec----------------------------------------
					// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
					if (this.lower(vSplitRec.length,4)) {
						alert("Length Warning Solution Step: "+vListArray[k]);
					} else {
						vStepCount++;
						vID = vSplitRec[1];
						vHash["VALUE"] = vStepCount;
						//---------------------
						//--- "PREVIOUS"-------
						vPrevID = vSplitRec[0];
						if (vPrevious != vPrevID) {
							vHash["PREVIOUS"]=vPrevID;
						} else {
							vHash["PREVIOUS"]="";
						};
						vHash["ID"] = vID;
						vHash["CONNECTION"] = vSplitRec[2];
						vHash["JUST"] = vSplitRec[3];
						vHash["OPTJUST"] = vSplitRec[4];
						//---------------------
						vOut += vCR + this.exportHashSA2Form(vHash);
						vCR = this.CR;
						vPrevious = vID;
						this.aSolUsedID[vID] = vID;
					};
					//--------------------------------------------------------------------------
				}
				k++;
			};
		} else {
			alert("writeSolution2SA() - No Solution Defined!");
		};
		var vIMathSA = this.getIMathById("STUDENTANSWER");
		//alert("BEFORE:"+vIMathSA.value);
		vIMathSA.value = vOut;
		//alert("AFTER:"+vIMathSA.value);
		this.setIMathStepCount(vStepCount);
	};
	//#################################################################
	//# Nested: greater(a,b)
	//#################################################################
	this.greater = function (a,b) {
	  //var vReturn = (a greater b);
	  eval(decodeURI("var vReturn%20=%20(a%3Eb)"));
	  return vReturn;
	};
	//#################################################################
	//# Nested: lower(a,b)
	//#################################################################
	this.lower = function (a,b) {
	  //var vReturn = (a lower b);
	  eval(decodeURI("vReturn%20=%20(a%3Cb)"));
	  return vReturn;
	};
	//#################################################################
	//# Method: debugValue()
	//#################################################################	
	this.debugValue = function (pLabel) {
		var vDOM = "imathSTUDENTANSWER";
		var vValue = this.getElementById(vDOM).value;
		alert("debugValue("+pLabel+"):3696 "+vDOM+"='"+vValue+"'");
		//var vMsg = "";
		//for (var iID in vAnswerHash) {
		//	vMsg +=iID+"="+vAnswerHash[iID]+this.CR;
		//};
		//alert(vMsg);

	};
	//#################################################################
	//# Nested: decodeValue  
	//#################################################################
	this.decodeValue = function (pValue) {
		var vRet = "undefined decodeValue()";
		if (pValue) {
			pValue = pValue.replace(/__qu__/g,this.QU);
			vRet = this.decodeValueNoQuotes(pValue);
		}
		return vRet;
	};
	//#################################################################
	//# Nested: decodeValueNoQuotes  
	//#################################################################
	this.decodeValueNoQuotes = function (pValue) {
		if (pValue) {
			pValue = pValue.replace(/__math__/g,this.AP);
			pValue = pValue.replace(/__eq__/g,"=");
			eval(decodeURI("pValue=pValue.replace(/__gt__/g,%22%3E%22)"));
			eval(decodeURI("pValue=pValue.replace(/__lt__/g,%22%3C%22)"));
			pValue = pValue.replace(/__CO__/g,",");
			pValue = pValue.replace(/__co__/g,",");
			pValue = pValue.replace(/__ae__/g,"ä");
			pValue = pValue.replace(/__oe__/g,"ö");
			pValue = pValue.replace(/__ue__/g,"ü");
			pValue = pValue.replace(/__AE__/g,"Ä");
			pValue = pValue.replace(/__OE__/g,"Ö");
			eval(decodeURI("pValue=pValue.replace(/__OE__/g,%22%EF%BF%BD%22)"));
			pValue = pValue.replace(/__UE__/g,"Ü");
			pValue = pValue.replace(/__sz__/g,"ß");
			return pValue;
		} else {
			return "";
		}
	};
	//#################################################################
	//# Nested: encodeCR  
	//#################################################################
	this.encodeCR = function (pValue) {
		// __n__ eval(decodeURI("pValue=pValue.replace(/%5C%5Cn/g,%22__n__%22)"));
		eval(decodeURI("pValue=pValue.replace(/%5Cn/g,%22,%22)"));
		return pValue;
	};
	//#################################################################
	//# Nested: encodeCommaForm  
	//#################################################################
	this.encodeCommaForm = function (pValue) {
		pValue = pValue.replace(/,/g,this.aComma);
		return pValue;
	};
	//#################################################################
	//# Nested: decodeCommaForm  
	//#################################################################
	this.decodeCommaForm = function (pValue) {
		eval("pValue=pValue.replace(/"+this.aComma+"/g,',')");
		return pValue;
	};
	//#################################################################
	//# Nested: decodeCR  
	//#################################################################
	this.decodeCR = function (pValue) {
		//pValue = pValue.replace(/__n__/g,this.CR);
		pValue = pValue.replace(/,/g,this.CR);
		return pValue;
	};
	//#################################################################
	//# Nested: decodeTextarea  
	//#################################################################
	this.decodeTextarea = function (pValue) {
	  pValue = this.decodeValue(pValue);
	  pValue = pValue.replace(/__n__/g,this.CR);
	  //eval(decodeURI("pValue%20=%20pValue.replace(/__n__/g,%22%5Cn%22)"));
	  return pValue;
	};
	//#################################################################
	//# Nested: encodeTextarea  
	//#################################################################
	this.encodeTextarea = function (pValue) {
	  pValue = this.encodeValue(pValue);
	  pValue = this.encodeTextareaCR(pValue);
	  //pValue = pValue.replace(/__n__/g,this.CR);
	  //eval(decodeURI("pValue%20=%20pValue.replace(/%5Cn/g,%22__n__%22)"));
	  return pValue;
	};
	//#################################################################
	//# Nested: encodeTextareaCR  
	//#################################################################
	this.encodeTextareaCR = function (pValue) {
	  eval(decodeURI("pValue=pValue.replace(/%5Cn/g,%22__n__%22)"));
	  return pValue;
	};
	//#################################################################
	//# Nested: encodeValue  
	//#################################################################
	this.encodeValue = function (pValue) {
		if (pValue) {
			eval("pValue = pValue.replace(/"+this.AP+"/g,"+this.QU+"__math__"+this.QU+")");
			eval("pValue = pValue.replace(/"+this.LT+"/g,"+this.QU+"__lt__"+this.QU+")");
			eval("pValue = pValue.replace(/"+this.GT+"/g,"+this.QU+"__gt__"+this.QU+")");
			pValue = pValue.replace(/,/g,"__co__");
			pValue = pValue.replace(/=/g,"__eq__");
			pValue = pValue.replace(/"/g,"__qu__");
			pValue = pValue.replace(/ä/g,"__ae__");
			pValue = pValue.replace(/ö/g,"__oe__");
			pValue = pValue.replace(/ü/g,"__ue__");
			pValue = pValue.replace(/Ä/g,"__AE__");
			//pValue = pValue.replace(/Ö/g,"__OE__");
			eval(decodeURI("pValue%20=%20pValue.replace(/%EF%BF%BD/g,%22__OE__%22)"));
			pValue = pValue.replace(/Ü/g,"__UE__");
			pValue = pValue.replace(/ß/g,"__sz__");
			return pValue;
		} else {
			return "";
		};
	};
	//#################################################################
};
