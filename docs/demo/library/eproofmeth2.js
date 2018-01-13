//#################################################################
//# Javascript Class:         EProof__SID__()
//#   Method Definition File: eproofmeth2.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               24.2.2015
//# last modifications    __DATE__
//# GNU Public License - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//#################################################################
	//var Test = "$A"
	//alert("CharCode $="+Test.charCodeAt(0));
	//setTimeout("postProcessProof()",1000);
	//var s = document.getElementById("EPROOF__SID__");
	// textarea rows="10" cols="125" id="HTMLoutput" wrap="off" /textarea
	//var s = document.getElementById("STUDENTANSWERLIST__SID__")
	//var r = document.getElementById("HTMLoutput");
	//r.value = s.innerHTML;

//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
// If you want to access the attributes of EProof__SID__, use
// the attribute name with a leading "this.", e.g.
// this.myattrib3 = "Hello World";
//---------------------------------------------------------------------
//----Methodes---------------------------------------------------------
// In the definition of the methods of  'EProof__SID__'
// the function name is extended with '_EProof__SID__'.
// This is done to avoid name space conflicts, if you overwrite a
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:       EProof__SID__.my_method()
// The method definitions are as follows
//   function my_method_EProof__SID__(...) { .....
// and
//   function my_method_MySuperClass(...) { .....
//---------------------------------------------------------------------
//---Methods of Class "EProof__SID__()" defined as JS functions
//---------------------------------------------------------------------
//#################################################################
//# Method: addStepDefinition(pButtonDOM)
//#    used in Class: EProof__SID__
//#
//# Comment: Adds a new Step Definition to an defined StepType
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function addStepDefinition_EProof__SID__ (pButton) {
	var vStepType = pButton.getAttribute("steptype");
	var vChar = "";
	this.updateProof2IMath();
	if (vStepType =="PROOFSTEP") {
		vChar = "S";
	} else {
		vChar = vStepType.substring(0, 1);
	};
	//alert("addStepDefinition():50 eproofmeth.js vChar='"+vChar+"' vStepType='"+vStepType+"'");
	var vInNode  = this.getElementById(this.aIMATH[vStepType]);
	var vID = vChar+this.newCharCounter(vChar);
	while (this.aMappedID[vID]) {
		vID = vChar+this.newCharCounter(vChar);
	};
	vInNode.value += this.CR +vID+ this.aSeparator +"Definition "+vLanguage["for"]+" "+vStepType;
	//alert("StepType="+vStepType+ " vChar="+vChar+" new ID=["+vID+"]");
	alert(vLanguage["New"]+" "+vLanguage["Step"]+" "+vLanguage["with"]+" ID=["+vID+"]"+this.CR+"["+vStepType+"]");
	this.reloadProof();
};
//#################################################################
//# Method: append_template(pAnswerHash,pInnerHash,pStep)
//#    used in Class: EProof__SID__
//#
//# Comment: Provide an Object ID of a DOM template that will be cloned
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function append_template_EProof__SID__(pAnswerHash,pInnerHash,pStep) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:append_template()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.append_template();
	//-------------------------------------------------------
	var vID = pAnswerHash["sSTEPID"];
	//var vIndex=-1;
	//var cln = this.aTemplateDOM.cloneNode(true);
	var cln = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
	if (cln) {
		//alert("append_template():93 - eproofmeth2.js Node for "+vID+" exists!");
		//cln.className = "STUDENTANSWER"+this.aQID;
		//cln.id = cln.className + pStep;
		this.writeHash2Value(cln,pAnswerHash,pStep);
		this.writeHash2InnerHTML(cln,pInnerHash,pStep);
		var vMapID = this.aMappedID[vID];
		//alert("vMapID="+vMapID);
		this.writeInnerHTML4Root(cln,"outSTEPNR"+this.aQID,"("+pStep+")");
		this.writeInnerHTML4Root(cln,"outSTEPID"+this.aQID,"["+vMapID+"]");
		this.writeInnerHTML4Root(cln,"outSTEPDEF"+this.aQID,this.aAllID2Node[vID].innerHTML);
	} else {
		alert("append_template():104 - eproofmeth2.js  Node for "+vID+" does not exists!");
	};
	//this.aUsedDOM     = document.getElementById(this.aUsedID);
	//this.aUnusedDOM     = document.getElementById(this.aUnsedID+this.aQID);
	//this.aUnusedDOM     = document.getElementById("UNUSEDSTEPS"+this.aQID);
	this.aUnusedDOM.appendChild(cln);
};
//----End of Method append_template() Definition
//#################################################################
//# Method: assessStep_EProof(pButtonDOM,pIncrement)
//#    used in Class: EProof__SID__
//#
//# Comment: Provide an Object ID of a DOM template that will be cloned
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function assessStep_EProof__SID__ (pButtonDOM) {
	var vIncrement = 1;
	if (this.aSettings["AssessmentMode"] == 1) {
		//alert("assessStep() in AssessmentMode=1");
		vIncrement = 0;
	} else {
		//alert("assessStep() in AssessmentMode=0");
		vIncrement = 1;
		this.updateIMathById("STUDENTANSWER");
		var vOut = this.saveEProof2Form();
	};
	var vStep = pButtonDOM.getAttribute("step");
	//alert("assessStep()-Call -pButtonDOM.step="+vStep);
	var vNode = this.getElementById("assessSTUDENTANSWER"+this.aQID+vStep);
	if (vNode.style.display=="none") {
		var vAssUsed = this.getElementById("inASSESSMENTUSED"+this.aQID+vStep);
		var vCount = parseInt(vAssUsed.value);
		vAssUsed.value = vCount + vIncrement;
		//alert("assessStep():121 vCount="+vCount+" vIncrement="+vIncrement);
		this.createAssessmentStep(vStep);
	};
	this.hide("SUGGESTIONS"+this.aQID+vStep);
	this.toggleNode(vNode);
};
//----End of Method assessStep() Definition
//#################################################################
//# Method: assessStepDisplay_EProof(pButtonDOM,pIncrement)
//#    used in Class: EProof__SID__
//#
//# Comment: Provide an Object ID of a DOM template that will be cloned
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function assessStepDisplay_EProof__SID__ (pButtonDOM) {
	var vStep = pButtonDOM.getAttribute("step");
	//alert("assessStepDisplay()-Call -pButtonDOM.step="+vStep);
	this.createAssessmentStep(vStep);
};
//----End of Method assessStepDisplay() Definition
//#################################################################
//# Method: checkPreviousLink(pInDOM)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function checkPreviousLink_EProof__SID__(pInDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:checkPreviousLink()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.checkPreviousLink();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getElementById(pInDOM);
	if (vNode) {
		vNode.style.display = "none";
		vNode.style.visibility = "hidden";
	} else {
		alert("checkPreviousLink()-Call pInDOM="+pInDOM+" does not exist!");
	}
};
//----End of Method checkPreviousLink() Definition
//#################################################################
//# Method: clear_LocalStorage(pForm,pOut)
//#    used in Class: EProof__SID__
//#
//# Comment:  clear the Data of imathEPROOF in LocalStorage
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function clear_LocalStorage_EProof__SID__() {
	localStorage.removeItem("imathEPROOF");
	alert("Local Storage cleared for 'imathEPROOF'");
};
//----End of Method clear_LocalStorage() Defsaveion
//#################################################################
//# Method: correct_StudentAnswer()
//#    used in Class: EProof__SID__
//#
//# Comment:  correct "co__#__co" by "co__##__co" and
//#           correct "CR__co" by "CR#__co"
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function correct_StudentAnswer_EProof__SID__() {
	var vDOM = this.getIMathById("STUDENTANSWER");
	var vValue = vDOM.value;
	vValue = vValue.replace(/co__#__co/g,"co__##__co");
	eval(decodeURI("vValue=vValue.replace(/%5Cn__co/g,%22%5Cn#__co%22)"));
	eval(decodeURI("vValue=vValue.replace(/co__%5Cn/g,%22co__#%5Cn%22)"));
	//eval(decodeURI("vValue=vValue.replace(/co__"+this.DO+"/g,%22co__#%22)"));
	vDOM.value = vValue;
    var vDOM = this.getIMathById("SOLUTION");
	var vValue = vDOM.value;
	vValue = vValue.replace(/co__#__co/g,"co__##__co");
	eval(decodeURI("vValue=vValue.replace(/co__%5Cn/g,%22co__#%5Cn%22)"));
	eval(decodeURI("vValue=vValue.replace(/co__"+this.DO+"/g,%22co__#%22)"));
	vDOM.value = vValue;
	//alert(encodeURI("vValue=vValue.replace(/\\n__co/g,\"\\n#__co\")"));
    //alert(encodeURI("vValue=vValue.replace(/co__$/g,\"co__#\")"));
};
//----End of Method correct_StudentAnswer() Defsaveion

//#################################################################
//# Method: createAllID2Node
//#    used in Class: EProof__SID__
//#
//# Comment: reads the imathPRECONDITION textarea and extracts the
//#          ID for example [P1] and maps aAllID2Node to DOM-Node
//#          pASCIIMath (Boolean) determines ASCII Math Processing
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function createAllID2Node_EProof__SID__(pASCIIMath) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:createAllID2Node()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createAllID2Node();
	//-------------------------------------------------------
	this.aCharCounter     = new Array(); //Hash for Leader Chars e.g. "P" CharCounter=4 creates "P4"
	this.aMappedID  	  = new Array();
	this.aOriginalID  	  = new Array();
	var vTextAreaArray = new Array("PROOFSTEP","CONCLUSION","PRECONDITION","JUSTIFICATION");
	var i=0;
	var k=0;
	var vInput = "";
	while (i != vTextAreaArray.length) {
		this.aID4StepType[vTextAreaArray[i]] = new Array();
		vInput = this.getElementById(this.aIMATH[vTextAreaArray[i]]).value;
		var vListArray = vInput.split(this.CR);
		k=0;
		while (k != vListArray.length) {
			if (this.greater(vListArray[k].indexOf(this.aSeparator) , 0)) {
				var vSplitStep = vListArray[k].split(this.aSeparator);
				var vID = vSplitStep[0].replace(/\s/g,"");
				var vName = "ID-"+this.aQID+"-"+vID;
				var vStepNode = this.getElementById(vName);
				if (vID != "") {
					if (vStepNode) {
						if ((this.aOffline == "1") && (pASCIIMath)) {
							this.processMathNode(vStepNode);
							//alert("vID=["+vID+"] vStepNode.innerHTML="+vStepNode.innerHTML);
						};
						this.aAllID2Node[vID] = vStepNode;
						this.aAllID2NodeID[vID] = vName;
						vChar = this.createChar4ID(vID);
						vMappedID = vChar+this.newCharCounter(vChar);
						this.aMappedID[vID] = vMappedID;
						this.aOriginalID[vMappedID] = vID;
						this.aStepType4ID[vID] = vTextAreaArray[i];
						//this.aAllID2innerHTML[vID] = vStepNode.innerHTML;
					} else {
						alert("Node '"+vName+"' was undefined in createAllID2Node()-Call");
					};
					this.aAllID2RAW[vID] = vSplitStep[1];
					//if (vTextAreaArray[i] != "JUSTIFICATION") {
					if (i != 3) {
						this.aAllID.push(vID);
					};
					this.aID4StepType[vTextAreaArray[i]].push(vID);
				} else {
					alert("vID is empty in createAllID2Node()-Call");
				}
			} else {
				//alert("Unused Student Answer Line:\n'"+vListArray[k]+"'");
			};
			k++;
		};
		i++;
	};
	this.correctMappedID();
};
//----End of Method createAllID2Node Definition

//#################################################################
//# Method: createDisplayJustifications
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function createDisplayJustifications_EProof__SID__(pJustSelected,pStepID,pTitle) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof__qid__.js:createDisplayJustifications(pJustString)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createJustificationsDisplay(pJustSelected,pStepID,pTitle);
	//-------------------------------------------------------
	var vJust = pJustSelected+"";
	return this.createJustifications(vJust,"","",false,pStepID,pTitle);
};
//#################################################################
//# Method: createEditJustificationsStep
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function createEditJustificationsStep_EProof__SID__(pStep,pTitle) {
	//alert("createEditJustificationsStep("+pStep+"):3383");
	var st = this.aQID+pStep;
	var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
	var vID = this.getChildById(vSA,"inSTEPID"+st).value;
	var vJust = this.getChildById(vSA,"inJUSTIFICATION"+st).value;
	var vSelJust = this.getChildById(vSA,"selectJUSTIFICATION"+st).value;
	var vAppJust = this.getChildById(vSA,"appendJUSTIFICATION"+st).value;
	//var vJustArray = unionarrays(vJust.split(","),vSelJust.split(","));
	//vSelJust = this.concatList(vJust,SelJust);
	//vSelJust = this.concatList(vSelJust,vAppJust);
	//alert("(Step"+pStep+") ["+vID+"] vSelectFromJust='"+vSelectFromJust+"' inJUSTIFICATION='"+vAnswerHash["inJUSTIFICATION"]+"'");
	//alert( this.createJustifications(vJust,vSelJust,vAppJust,false,this.aMappedID[vID],pTitle));
	var vCheckBox = true;
	return this.createJustifications(vJust,vSelJust,vAppJust,vCheckBox,this.aMappedID[vID],pTitle);
}
//#################################################################
//# Method: createJustifications
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function createJustifications_EProof__SID__(pJustSelected,pJustSelectFrom,pAppendJust,pCheckBox,pStepID,pTitle) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof__qid__.js:createJustifications(pJustString)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createJustifications(pJustString,...);
	//-------------------------------------------------------
		var vTitle = vLanguage["Justifications"]+":";
		if (pTitle) vTitle = pTitle;
		var vJustHTML = "";
		var i=0;
		var vJustNode = null;
		var vID = "";
		var vHeader = "";
		var vClass = "";
		//if (pStepID == "S3") alert("["+pStepID+"] pJustSelected="+pJustSelected); alert("pJustSelectFrom="+pJustSelectFrom);
		var vListTemp = this.concatList(pJustSelected,pJustSelectFrom);
		var vJustString = this.concatList(vListTemp,pAppendJust);
		//if (pStepID == "S3") alert("["+pStepID+"] vJustString="+vJustString);
		vSelected = "#,"+pJustSelected+",#";
		if (pCheckBox) {
			vHeader =  this.LT+"b"+this.GT+""+vTitle+""+this.LT+"/b"+this.GT+" ["+pStepID+"]";
			vHeader +=  this.LT+"button type='button' onclick=\"vEProof"+this.aQID+".showAllJustifications(this)\" "+this.GT+vLanguage["All"]+this.LT+"/button"+this.GT;
			vHeader +=  this.LT+"button type='button' onclick=\"vEProof"+this.aQID+".toggleJustifications(this)\" "+this.GT+"   OK   "+this.LT+"/button"+this.GT;
			//if (pStepID == "C1") alert("CHECKBOX ["+pStepID+"]: vJustString='"+vJustString+"' vListTemp='"+vListTemp+"'");
			if (vJustString =="") {
				vJustString = this.getAllJustIDs();
			}
		} else {
			//if (pStepID == "C1") alert("JUST Display: ["+pStepID+"]: vJustString='"+vJustString+"' vListTemp='"+vListTemp+"'");
			vJustString = pJustSelected;
			vHeader =  this.LT+"b"+this.GT+""+vTitle+""+this.LT+"/b"+this.GT+" ["+pStepID+"]";
			//alert("DISPLAY ["+pStepID+"]: vJustString='"+vJustString+"'");
		};
		//vJustString = vJustString.replace(/,[,]+/g,",");
		var vJustArray = vJustString.split(",");
		if (vJustString != "") {
			//vJustHTML =  this.LT+"table border=0 align='center' cellspacing='10px'"+this.GT+""+this.LT+"tr"+this.GT+""+this.LT+"td colspan='3'"+this.GT;
			//vJustHTML =  this.LT+"table border=0  cellspacing='10px'"+this.GT+""+this.LT+"tr"+this.GT+""+this.LT+"td colspan='3'"+this.GT;
			vJustHTML += vHeader;
			//vJustHTML +=  this.LT+"/td"+this.GT+""+this.LT+"/tr"+this.GT;
			vJustHTML +=  this.LT+"ul style='margin-left:"+this.aIndentUL+"' "+this.GT;
			vChecked = "";
			while (i != vJustArray.length) {
				vID = vJustArray[i].replace(/\s/g,"");
				//vJustNode = this.aAllID2Node[vID];
				//alert("vJustNode.innerHTML="+vJustNode.innerHTML);
				if (this.aAllID2Node[vID]) {
					vJustHTML +=  this.LT+"li"+this.GT+"";
					if (pCheckBox) {
						vClass = "checkboxJUSTIFICATION"+this.aQID;
						if (vSelected.indexOf(vID) == -1) {
							vChecked = "";
						} else {
							vChecked = " checked='checked' ";
						};
						vJustHTML +=""+this.LT+"input type='checkbox' class='"+vClass+"' id='"+vID+"' value='"+vID+"' "+vChecked+" onchange=\"vEProof"+this.aQID+".updateJustifications(this)\" /"+this.GT+" ";
    				};
					vJustHTML += "["+this.aMappedID[vID]+"] "+this.aAllID2Node[vID].innerHTML;
					//vJustHTML +=  this.LT+"tr"+this.GT+""+this.LT+"td valign='top'"+this.GT+"&nbsp;-&nbsp;"+this.LT+"/td"+this.GT+""+this.LT+"td valign='top'"+this.GT+"["+this.aMappedID[vID]+"] "+this.LT+"/td"+this.GT+""+this.LT+"td"+this.GT+""+this.aAllID2Node[vID].innerHTML+""+this.LT+"/td"+this.GT+""+this.LT+"/tr"+this.GT;
					vJustHTML +=  this.LT+"/li"+this.GT+"";
				} else {
					//vJustHTML += "["+this.aMappedID[vID]+"] undefined Step Definition von vID=["+vID+"]";
				};
				i++;
			};
			//vJustHTML +=  this.LT+"/table"+this.GT;
			vJustHTML +=  this.LT+"/ul"+this.GT;
		} else {
			//alert("["+pStepID+"] vJustString='' pJustSelected="+pJustSelected+" pJustSelectFrom="+pJustSelectFrom);
		};
		return vJustHTML;
};
//#################################################################
//# Method: createSol2IMathAS()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function createSol2IMathAS_EProof__SID__() {
	var i=0;
	var vSol = this.aSolution;
	var vPrevSolID = "";
	var vPrevID = " ";
	var vID = "";
	var vCon = "";
	var vJust = "";
	var vJustOpt = "";
	var vOut = "";
	var k=0;
	var SEP = this.aSeparator;
	while (i != vSol.length) {
		//----Structure of SplitRec-------------------------------------------------
		// [0] PrevID -|- [1] ID -|- [2] Con -|- [3] JustArray -|- [4] OptJustArray [5] JustOK = unionarray of [3] and [4]
		vPrevSolID = vSol[i][0];
		vID = vSol[i][1];
		k = parseInt(vSol[i][2]);
		vCon = this.vConnectionArray[k];
		vJust = (vSol[i][3]).join(this.aComma);
		vJustOpt = (vSol[i][4]).join(this.aComma);
		vOut += vPrevSolID;
		vOut += SEP+vID;
		vOut += SEP+this.vCon;
		vOut += SEP+this.vJust;
		vOut += SEP+this.vJustOpt+this.CR;
		vPrevID = vID;
		i++;
	}
	return vOut;
};
//#################################################################
//# Method: createSuggestionStep
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function createSuggestionStep_EProof__SID__(pStep) {
	this.addFalseSuggestionStep(pStep);
	var vOutCon = "";
	var vOutID = "";
	var vCR = "";
	var k=0;
	var vValue = "";
	var vSugID = vLanguage["Proof"]+": ";
	//var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
	var vSA = this.aStep2SA[pStep];
	var vSF = this.getElementById("SELECTFROM"+this.aQID+pStep);
	var vOutNode;
	if (pStep != 0) {
		var vPreID   = this.getChildById(vSA,"inSTEPID"+this.aQID+pStep).value;
		if (this.aMappedID[vPreID]) {
			vSugID = "["+this.aMappedID[vPreID]+"]";
		} else {
			vSugID = "[?"+vPreID+"?]";
		};
		vOutNode = this.getChildById(vSA,"sugSTEPID"+this.aQID+pStep);
	} else {
		vSF = this.getChildById(this.aRootDOM,"SELECTFROM"+this.aQID+"0");
		vSA = this.getChildById(this.aRootDOM,"SUGGESTIONS"+this.aQID+"0");
		//alert("vSF.id='"+vSF.id+"'");
		vOutNode = this.getChildById(this.aRootDOM,"sugSTEPID"+this.aQID+pStep);
		//alert("vOutNode.id='"+vOutNode.id+"'");
	};
	vOutNode.innerHTML = vSugID;
	var vConSelect = this.getChildById(vSF,"selectCONNECTION"+this.aQID+pStep).value;
	var vIDSelect  = this.getChildById(vSF,"selectSTEPID"+this.aQID+pStep).value;
	//alert("createSuggestionStep("+pStep+") - vConSelect="+vConSelect);
	//alert("createSuggestionStep("+pStep+") - vIDSelect="+vIDSelect);
	var vHTML = "";
	//---SELECT CONNECTION----
	if (vIDSelect != "") {
		if (vConSelect == "") vConSelect = " ,="+this.GT;
		//alert("vConSelect="+vConSelect);
		var vConIndex = this.convertConList2Index(vConSelect);
		//alert("vConIndex.length="+vConIndex.length);
		var vBase = "SUGGESTION";
		var vClass = "rCONSUGGESTION"+this.aQID+pStep;
		var vSaveID =  "rCONSUGGESTION"+this.aQID+pStep;
		k=0;
		while (k != vConIndex.length) {
			vValue = vConIndex[k];
			if (this.vConnection2Node[vValue]) {
				vHTML = this.vConnection2Node[vValue].innerHTML;
				if (vValue == this.vConnection2Index[" "]) {
					vHTML = this.LT+"i"+this.GT+"START"+this.LT+"/i"+this.GT;
				};
				vOutCon += vCR+this.LT+"INPUT type='radio' class=\""+vClass+"\" value=\""+vValue+"\" step=\""+pStep+"\" name=\""+vClass+"\" id=\""+vClass+"CON"+k+"\" onclick=\"vEProof"+this.aQID+".writeSelectionClick('"+pStep+"','inCON"+vBase+"','"+vValue+"')\" /"+this.GT;
				vOutCon += vHTML;
				vCR = this.BR;
			};
			k++;
		};
		//----SELECT STEPID-------
		vCR = "";
		k=0;
		var vIDArray = vIDSelect.split(",");
		//vIDArray.sort(function(a,b) {arrayindex(a)-arrayindex(b)});
		this.sortArrayID(vIDArray);
		var vClass = "rIDSUGGESTION"+this.aQID+pStep;
		while (k != vIDArray.length) {
			vID = vIDArray[k];
			//alert("vIDArray["+k+"]='"+vIDArray[k]+"'");
			//alert("vIDArray["+k+"]=vID='"+vID+"'");
			if (vID) {
				//var vOrgID = this.aOriginalID[vID];
				vOutID += vCR+this.LT+"INPUT type='radio' class='"+vClass+"' value='"+vID+"' name='"+vClass+"' id='"+vClass+"ID"+k+"'  onclick=\"vEProof"+this.aQID+".writeSelectionClick('"+pStep+"','inID"+vBase+"','"+vID+"')\" /"+this.GT;
				//vOut += "["+this.aMappedID[vID]+"] "+this.aAllID2Node[vID].innerHTML;
				if (this.aMappedID[vID]) {
					vOutID += "["+this.aMappedID[vID]+"] ";
					if (this.aAllID2Node[vID]) {
						vOutID += this.aAllID2Node[vID].innerHTML;
					} else {
						vOutID += "Undefined Proof Step for ["+vID+"] Mapped to ["+this.aMappedID[vID]+"]	";
					};
				} else {
					vOutID += "[UNDEF-"+vID+"] ";
				};
				vCR =  this.LT+"BR/"+this.GT;
			};
			k++;
		}
	} else {
		vOutID = vLanguage["No_connection_to_next"];
	};
	vOutNode = this.getElementById("CONSUGGESTION"+this.aQID+pStep);
	vOutNode.innerHTML = vOutCon;
	vOutNode = this.getElementById("IDSUGGESTION"+this.aQID+pStep);
	vOutNode.innerHTML = vOutID;
}
//----------------------

//#################################################################
//# Method: createSelectPosition
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function createSelectPosition_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:createSelectPosition()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createSelectPosition();
	//-------------------------------------------------------
	var vContent    = "";
	var i=1;
	//alert("createSelectPosition()  this.aCount="+this.aCount);
	while (i!=this.aCount+1) {
		vContent +=this.LT+"option value='"+i+"'"+this.GT+ i + this.LT+"/option"+this.GT;
		i++;
	};
	this.writeInnerHTML("sPOSITION"+this.aQID,vContent);
	i=0;
	vContent =this.LT+"option value='"+i+"'"+this.GT+ i + this.LT+"/option"+this.GT+vContent;
	this.writeInnerHTML("sSTEPCOUNT"+this.aQID,vContent);
};
//----End of Method createSelectPosition Definition

//#################################################################
//# Method: createSelectConnection4JS
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function createSelectConnection_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:createSelectConnection4JS()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createSelectConnection4JS();
	//-------------------------------------------------------
	var vContent    = "";
	var i=0;
	var vConID = "";
	while (i!=this.vConnectionName.length) {
		vContent += this.LT+"option value='"+i+"'"+this.GT+this.vConnectionName[i] + this.LT+"/option"+this.GT;
		i++;
	};
	this.writeInnerHTML("sCONNECTION"+this.aQID,vContent);
};
//#################################################################
//# Method: createSelectConnection4JS
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function createSelectConnection4JS_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:createSelectConnection4JS()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createSelectConnection4JS();
	//-------------------------------------------------------
	var vContent    = "";
	var i=0;
	var vConID = "";
	vContent    = this.LT+"ul id=\"ulCONNECTIONLIST\""+this.GT+this.CR;
	while (i!=this.vConnectionName.length) {
		vConID = "CON-"+this.aQID+"-"+i;
		//vConID = "CON-"+i;
		//alert("vConID="+vConID);
		vContent +=this.LT+"li"+this.GT+this.LT+"EPROOFCONNECTION class=\"tplCONNECTION"+this.aQID+"\" id=\""+vConID+"\" "+this.GT;
		vContent +="`"+this.vConnectionArray[i]+"`"+this.LT+"/EPROOFCONNECTION"+this.GT+this.LT+"/li"+this.GT+this.CR;
		i++;
	};
	vContent +=this.LT+"/ul"+this.GT;
	//alert(vContent);
	//this.writeInnerHTML("tplCONNECTIONLIST"+this.aQID,vContent);
	return vContent;
};
//----End of Method createSelectConnection4JS Definition


//#################################################################
//# Method: createSelectStepID
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function createSelectStepID_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:createSelectStepID()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createSelectStepID();
	//-------------------------------------------------------
	var k=0;
	var vContent = "";
	while (k != this.aAllID.length) {
 		vContent +=  this.LT+"OPTION value='"+this.aAllID[k]+"'"+this.GT+""+this.aMappedID[this.aAllID[k]]+""+this.LT+"/OPTION"+this.GT;
 		k++;
	}
	this.writeInnerHTML("sSTEPID"+this.aQID,vContent);
};
//----End of Method createSelectStepID Definition

//#################################################################
//# Method: createDisplayOptions
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function createDisplayOptions_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:createDisplayOptions()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.createDisplayOptions();
	//-------------------------------------------------------
	var vSelNode = this.getElementById("tplDISPLAYSELECT"+this.aQID);
	var vContent = "";
    vContent += this.LT+"OPTION selected value='EDITComplete' "+this.GT+"EDIT: "+vLanguage["Complete"]+this.LT+"/OPTION"+this.GT;
    vContent += this.LT+"OPTION value='EDITShort'"+this.GT+"EDIT: "+vLanguage["Short"]+this.LT+"/OPTION"+this.GT;
	vContent += this.LT+"OPTION value='Complete'"+this.GT+vLanguage["Complete"]+this.LT+"/OPTION"+this.GT;
    vContent += this.LT+"OPTION value='Short'"+this.GT+vLanguage["Short"]+this.LT+"/OPTION"+this.GT;
	vContent += this.LT+"OPTION value='Hide'"+this.GT+vLanguage["Hide"]+this.LT+"/OPTION"+this.GT;
	this.writeInnerHTML("sDISPLAYOPTION"+this.aQID,vContent);
};
//----End of Method createDisplayOptions Definition
//#################################################################
//# Method: exportXML
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function exportXML_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	alert("eproof.js:exportXML()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.exportXML();
	//-------------------------------------------------------
};
//#################################################################
//# Method: deleteID
//#    used in Class: EProof__SID__
//#
//# Comment: Delete the Step Definition of and ID and all Usage in
//#          Solution, Justification and StudentAnswer
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function deleteID_EProof__SID__(pButtonDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof:3757 - deleteID(pButtonDOM)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.deleteID(pButtonDOM);
	//-------------------------------------------------------
	var vID = pButtonDOM.getAttribute("stepid");
	var vStepType = pButtonDOM.getAttribute("steptype");
	var vInNode  = this.getIMathById(vStepType);
	var vStepArray = (vInNode.value).split(this.CR);
	var i=0;
	var vOutArr= new Array();
	while (i != vStepArray.length) {
		if (vStepArray[i].indexOf(vID+this.aSeparator) == 0) {
			alert("Deleted Line "+(i+1)+" was found for ID=["+vID+"]!");
		} else {
			vOutArr.push(vStepArray[i])
		};
		i++;
	};
	vInNode.value = vOutArr.join(this.CR);
	//alert("eproofmeth:722 - deleteID('"+vID+"','"+vStepType+"')-Call");
	this.reloadProof();
};
//#################################################################
//# Method: getCheckedJustifications(pChildSA)
//#    used in Class: EProof__SID__
//#
//# Comment: Is called from Checkboxes to update the Justifications
//#          for a single Proof Step. pChildSA ist the Button-Object.
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
// pChildSA is a Child of StudentAnswer
function getCheckedJustifications_EProof__SID__(pChildSA) {
	var vSA = this.getParentStudentAnswer(pChildSA);
	var vReturn = new Array();
	vReturn["IDs"] = "";
	vReturn["OrgIDs"] = "";
	var vID = "";
	var vCheckboxes = this.getChildrenByClassName(vSA,"checkboxJUSTIFICATION"+this.aQID);
	//alert("vCheckboxes.length="+vCheckboxes.length);
	//var vStep = pChildSA.getAttribute("step");
	//alert("vStep="+vStep);
	if (vCheckboxes.length != 0 ) {
		var vComma = "";
		var k=0;
		while (this.lower(k,vCheckboxes.length)) {
			if (vCheckboxes[k].checked) {
				vID = vCheckboxes[k].value;
				vReturn["OrgIDs"] += vComma + vID;
				vReturn["IDs"] += vComma + this.aMappedID[vID];
				vComma = ",";
			};
			k++;
		};
	};
	return vReturn;
};
//#################################################################
//# Method: getChildById
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function getChildById_EProof__SID__(pParentDOM,pNodeID) {
	var vParent = document;
	if (pParentDOM) {
		vParent = pParentDOM;
	} else {
		vParent = this.aRootDOM;
	};
	var vReturn = this.getChildByIdRecursive(vParent,pNodeID);
	if (!vReturn) {
		vReturn = document.getElementById(pNodeID);
	};
	//if (!vReturn) {
	//	this.alertDOM("getChildById()-Error: Node with ID='"+pNodeID+"' not found!");
	//};
	return vReturn;
};
//#################################################################
//# Method: getChildByIdRecursive
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function getChildByIdRecursive_EProof__SID__(pParentDOM,pNodeID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof__qid__.js:getChildByID(pParentDOM,pNodeID)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.getChildByID(pParentDOM,pNodeID);
	//-------------------------------------------------------
	var vParentNode = pParentDOM;
	var i=0;
	var vReturn = null;
	if (vParentNode) {
		while (i != vParentNode.children.length) {
			if (vParentNode.children[i].nodeType == 1) {
				//if (pNodeID.indexOf("inSTEPID")>=0) alert("class='"+vParentNode.children[i].className+"'\nCompare '"+vParentNode.children[i].id+"' with '"+ pNodeID+"'");
				if (vParentNode.children[i].id == pNodeID) {
					//if (pNodeID.indexOf("inSTEPID")>=0) alert("FOUND class='"+vParentNode.children[i].className+"'\nCompare '"+vParentNode.children[i].id+"' with '"+ pNodeID+"'");
					vReturn = vParentNode.children[i];
					i = vParentNode.children.length - 1;
				} else {
					vReturn = this.getChildByIdRecursive(vParentNode.children[i],pNodeID);
					if (vReturn) {
						i = vParentNode.children.length - 1;
					}
				}
			}
			i++;
		};
	} else {
		alert("getChildById()-Error: Node with ID='"+pNodeID+"' not found! ParentNode does not exist!");
	};
	return vReturn;
};
//----End of Method getChildById Definition
//#################################################################
//# Method: getChildrenByClassName
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getChildrenByClassName_EProof__SID__(pParentDOM,pClassName) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof__qid__.js:getChildrenByClassName(pParentDOM,pClassName)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.getChildrenByClassName(pParentDOM,pClassName);
	//-------------------------------------------------------
	var vParent; //document.getElementById(pParentID);
	var vReturn = new Array();
	//this.alertDOM("getChildrenByClassName()-call pParentDOM.id="+pParentDOM.id)
	if (pParentDOM) {
		vParent = pParentDOM;
	} else {
		vParent = document;
	};
	if (vParent) {
		var i=0;
		while (i != vParent.children.length) {
			if (vParent.children[i].nodeType == 1) {
				//alert("ID="+vParent.children[i].id+"\nCompare '"+vParent.children[i].className+"' with '"+ pClassName+"'");
				if (vParent.children[i].className == pClassName) {
					vReturn.push(vParent.children[i]);
				} else {
					var vRetArray = this.getChildrenByClassName(vParent.children[i],pClassName);
					vReturn = vReturn.concat(vRetArray);
				};
			};
			i++;
		};
	} else {
		alert("getChildrenByClassName()-Call pParentDOM for ClassName "+pClassName+" is undefined");
	};
	return vReturn;
};
//----End of Method getChildrenByClassName Definition
//#################################################################
//# Method: getChildByClassName
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getChildByClassName_EProof__SID__(pParentDOM,pClassName) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof__qid__.js:getChildrenByClassName(pParentDOM,pClassName)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.getChildByClassName(pParentDOM,pClassName);
	//-------------------------------------------------------
	var vParent = null; //document.getElementById(pParentID);
	//this.alertDOM("getChildrenByClassName()-call pParentDOM.id="+pParentDOM.id)
	var vReturn = null;
	if (pParentDOM) {
		vParent = pParentDOM;
		var i=0;
		while (i != vParent.children.length) {
			if (vParent.children[i].nodeType == 1) {
				//alert("ID="+vParent.children[i].id+"\nCompare '"+vParent.children[i].className+"' with '"+ pClassName+"'");
				if (vParent.children[i].className == pClassName) {
					vReturn = vParent.children[i];
					i = vParent.children.length - 1;
				} else {
					vReturn = this.getChildByClassName(vParent.children[i],pClassName);
					if (vReturn) {
						i = vParent.children.length - 1;
					}
				}
			};
			i++;
		};
	} else {
		alert("getChildByClassName()-Call pParentDOM for ClassName "+pClassName+" is undefined");
	};

	return vReturn;
};
//----End of Method getChildrenByClassName Definition

//#################################################################
//# Method: getListIMathAS
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getListIMathAS_EProof__SID__(pStepRoot,pTextareaID,pOutNodeID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:getListIMathAS(pTextareaID)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.getListIMathAS(pTextareaID);
	//-------------------------------------------------------
	var vInput = this.getIMathById(pTextareaID).value;
	//alert("getListIMathAS(pTextareaID) "+vInput);
	var vListArray = vInput.split(this.CR);
	var vContent = "";
	if (vInput) {
		//vContent += this.LT+"LISTHEADER id='htmlHEADER"+pTextareaID+"'"+this.GT+"Header "+this.LT+"tt"+this.GT+"htmlHEADER"+pTextareaID+this.LT+"/tt"+this.GT+this.LT+"/LISTHEADER"+this.GT;
		//vContent += this.LT+"LISTHEADER id='htmlHEADER"+pTextareaID+"'"+this.GT+this.aListHeader[pTextareaID]+this.LT+"/LISTHEADER"+this.GT;
		vContent += this.LT+"DIV id='htmlHEADER"+pTextareaID+"' "+this.GT+this.aListHeader[pTextareaID]+this.LT+"/DIV"+this.GT;
		//vContent += this.LT+"ul style='margin-left:"+this.aIndentUL+"' class='"+pTextareaID+"LIST"+this.aQID+"' id='"+pTextareaID+"LIST"+this.aQID+"'"+this.GT;
		vContent += this.LT+"ul style='margin-left:0.5em' class='"+pTextareaID+"LIST"+this.aQID+"' id='"+pTextareaID+"LIST"+this.aQID+"'"+this.GT;
		vContent += this.getItemsIMathAS(pStepRoot,pTextareaID,vListArray);
		vContent +=this.LT+"/ul"+this.GT;
		//var vInsert = "";
		//if (this.aSettings["AuthoringMode"] != "1") {
			vInsert=this.SC+"display:none" ;
		//};
		//vContent +=this.LT+"BUTTON type='button' class='bAddStepID__SID__' steptype='"+pTextareaID+"'  id='bAddStepID"+pTextareaID+"__SID__' onclick=\"vEProof__SID__.addStepDefinition(this)\" style='color:green"+vInsert+"'"+this.GT+"+ "+vLanguage["Step"]+this.LT+"/BUTTON"+this.GT;
	} else {
		this.alertDOM("Textarea: '"+pTextareaID+"' at form-ID '"+this.aIMATH[pTextareaID]+"‘ was undefined!");
	};
	this.writeInnerHTML(pOutNodeID,vContent);
};
//----End of Method getListIMathAS Definition


//#################################################################
//# Method: getItemsIMathAS
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getItemsIMathAS_EProof__SID__(pStepRoot,pTextareaID,pListArray) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:getItemsIMathAS(pTextareaID,pListArray)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.getItemsIMathAS(pTextareaID,pListArray);
	//-------------------------------------------------------
	var vContent = "";
	var vChar = "";
	var vMappedID = "";
	var vStepDefinition = "";
	var vStepDefRaw = "";
	if (pListArray) {
		var k=0;
		while (this.lower(k,pListArray.length)) {
			if (this.greater(pListArray[k].indexOf(this.aSeparator) , 0)) {
				var vSplitStep = pListArray[k].split(this.aSeparator);
				var vID = vSplitStep[0].replace(/\s/g,"");
				//alert("vID='"+vID+"' in getItemsIMathAS()-Call");
				if (vID != "") {
					//vContent += this.LT+"li"+this.GT+this.LT+"STEPDEFINITION class='ID-"+this.aQID+"-"+vSplitStep[0]+"' name='tpl"+pTextareaID+this.aQID+"' id='tplID-"+vSplitStep[0]+"'"+this.GT;
					vChar = this.createChar4ID(vID);
					vMappedID = vID;
					if (this.aSettings['remap_proofstep_IDs'] == "1") {
						vMappedID = vChar+this.newCharCounter(vChar);
					};
					//alert("vID="+vID+" vMappedID="+vMappedID+" - getItemsIMathAS()-Call:845 eproofmeth.js");
					vStepDefRaw = this.decodeCommaForm(vSplitStep[1]);
					//alert("getItemsIMathAS():3188 for vID="+vID);
					vStepDefinition = this.loadStepInnerHTML(pStepRoot,vID,vStepDefRaw);
					vContent += this.LT+"li"+this.GT+"";
					vContent += this.getStepDefHTML(vID,vChar,vMappedID,pTextareaID,vStepDefinition,vStepDefRaw);
					vContent += this.LT+"/li"+this.GT;
				} else {
					alert("vID='' was undefined for step definition='"+vSplitStep[1]+"'");
				}
			}
			k++;
		};
	};
	this.correctMappedID(); //'MAPID-"+this.aQID+"-"+vID+"'
	return vContent;
};
//----End of Method getItemsIMathAS Definition

//#################################################################
//# Method: getStepDefHTML
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function getStepDefHTML_EProof__SID__(pID,pChar,pMappedID,pTextareaID,pStepDefinition,pStepDefRaw) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:getStepDefHTM(pID,pChar,pMappedID,pTextareaID,pStepDefinition,pStepDefRaw)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.getStepDefHTM(pID,pChar,pMappedID,pTextareaID,pStepDefinition,pStepDefRaw);
	//-------------------------------------------------------
	var vContent = "";
	var vHideInsert = "";
	if (this.aSettings["AuthoringMode"] != "1") {
		 vHideInsert = "style=\"display:none\" ";
	};
	vContent += this.LT+"STEPID class=\"LIST-ID-"+this.aQID+"\" id=\"LIST-ID-"+this.aQID+"-"+pID+"\""+this.GT+"["+pMappedID+"]"+this.LT+"/STEPID"+this.GT+" ";
	vContent += this.LT+"STEPDEFINITION class='"+pTextareaID+this.aQID+"' id='ID-"+this.aQID+"-"+pID+"'"+this.GT;
	vContent += pStepDefinition;
	vContent += this.LT+"/STEPDEFINITION"+this.GT;
	vContent +=this.LT+"DIV  class='EDIT"+pTextareaID+this.aQID+"' id='EDIT-"+this.aQID+"-"+pID+"'  "+vHideInsert+" "+this.GT+this.LT+"BR/"+this.GT;
	vContent +=this.LT+"BUTTON type='button' class='bDeleteID-"+this.aQID+"' stepid='"+pID+"' steptype='"+pTextareaID+"' id='bDeleteID-"+this.aQID+"' onclick=\"vEProof"+this.aQID+".deleteID(this)\" style='color:red'"+this.GT+"X"+this.LT+"/BUTTON"+this.GT;
	vContent +=this.LT+"INPUT type='text' size='3' value='"+pID+"' class='ID_"+pTextareaID+this.aQID+"' id='EDITID-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateSourceIDs()\" style=\"display:none\" "+this.GT;
	//vContent +=this.LT+"INPUT type='text' size='3' value='"+pID+"' class='ID_"+pTextareaID+this.aQID+"' id='EDITID-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateSourceIDs()\"  "+this.GT;
	vContent +=this.LT+"INPUT type='text' size='1' value='"+pChar+"' class='CHAR_"+pTextareaID+this.aQID+"' id='CHAR-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateCharIDs()\" style=\"display:none\" "+this.GT;
	vContent +=this.LT+"INPUT type='text' size='3' value='"+pMappedID+"' class='MAPID_"+pTextareaID+this.aQID+"' id='MAPID-"+this.aQID+"-"+pID+"'  onchange=\"vEProof"+this.aQID+".updateMappedIDs() \""+this.GT;
	pStepDefRaw = this.decodeValueNoQuotes(pStepDefRaw);
	vContent +=this.LT+"INPUT type='text' size='80' value=\""+pStepDefRaw+"\" class='EDITSTEP_"+pTextareaID+this.aQID+"' id='EDITSTEP-"+this.aQID+"-"+pID+"' onchange=\"vEProof"+this.aQID+".updateStepDef('"+pID+"','"+pTextareaID+"',this.value)  \""+this.GT;
	vContent +=this.LT+"OUTSTEP  class='MARKUSED"+this.aQID+"' id='MARKUNUSED"+this.aQID+"-"+pID+"' "+this.GT+""+this.LT+"/OUTSTEP"+this.GT+" ";
	//<OUTSTEP class="MARKUSED_SID" id="MARKUNUSED_SID-S3">UNUSED</OUTSTEP>
	vContent +=this.LT+"/DIV"+this.GT;
	//alert(vContent);
	return vContent;
};
//----End of Method getStepDefHTML Definition

//#################################################################
//# Method: getParentStudentAnswer(pNodeDOM)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getParentStudentAnswer_EProof__SID__(pNodeDOM) {
	var vReturnNode = pNodeDOM.parentNode;
	while ((vReturnNode.className != "STUDENTANSWER"+this.aQID) && (vReturnNode.parentNode != null)) {
		vReturnNode = vReturnNode.parentNode
	};
	//alert("vReturnNode.id="+vReturnNode.id);
	return vReturnNode;
};
//#################################################################
//# Method: getElementById
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getElementById_EProof__SID__(pNodeID) {
	var vReturn = this.getChildById(this.aRootDOM,pNodeID);
	return vReturn;
};
//#################################################################
//# Method: getStudentAnswerByClassName
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getStudentAnswerByClassName_EProof__SID__(pChildOfStudentAnswer,pClassNameID) {
	var vStudentAnswerNode = this.getParentStudentAnswer(pChildOfStudentAnswer);
	var vList = this.getChildrenByClassName(vStudentAnswerNode,pClassNameID);
	return vList
};
//#################################################################
//# Method: getStudentAnswerById
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getStudentAnswerById_EProof__SID__(pChildOfStudentAnswer,pNodeID) {
	var vList = this.getStudentAnswerByClassName(pChildOfStudentAnswer,pNodeID);
	return vList[0];
};
//#################################################################
//# Method: getElementsByClassName
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function getElementsByClassName_EProof__SID__(pClassName) {
	return this.getChildrenByClassName(this.aRootDOM,pClassName);
};
//#################################################################
//# Method: hide(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function hide_EProof__SID__(pID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:hide()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hide();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getElementById(pID);
	if (vNode) {
		vNode.style.display = "none";
		vNode.style.visibility = "hidden";
	} else {
		alert("hide()-Call pID="+pID+" does not exist!");
	}
};
//----End of Method hide() Definition
//#################################################################
//# Method: hideSA(pSA,pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function hideSA_EProof__SID__(pSA,pID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:hide()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hide();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getChildById(pSA,pID);
	this.hideNode(vNode);
};
//----End of Method hide() Definition

//#################################################################
//# Method: hideNode(pNode)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function hideNode_EProof__SID__(pNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:hide()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hideNode(pNode);
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	if (pNode) {
		pNode.style.display = "none";
		pNode.style.visibility = "hidden";
	};
};
//----End of Method hide() Definition
//#################################################################
//# Method: hideElement(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function hideElement_EProof__SID__(pID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:hideElement()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hideElement(pID);
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getElementById(pID);
	if (vNode) {
		//alert(vNode.style.display)
		vNode.style.visibility = "hidden";
	} else {
		alert("hideElement()-Call pID="+pID+" was undefined");
	}
};
//----End of Method hide() Definition
//#################################################################
//# Method: hideElement(pNode)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function hideElementNode_EProof__SID__(pNode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:hideElementNode()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hideElementNode(pNode);
	//-------------------------------------------------------
	if (pNode) vNode.style.visibility = "hidden";
};
//----End of Method hide() Definition
//#################################################################
//# Method: init(pRootNode,pNodeDOM)
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function init_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:init()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.init();
	//-------------------------------------------------------
	this.aListHeader      = new Array(); //Hash for PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION
	this.aAllID           = new Array(); //Array with ID
	this.aAllID2Node      = new Array(); //Hash for Proof Step ID
	this.aAllID2NodeID    = new Array(); //Hash for Proof Step ID
	this.aAllID2RAW       = new Array(); //Hash for Proof Step ID
	this.aCharCounter     = new Array(); //Hash for Leader Chars e.g. "P" CharCounter=4 creates "P4"
	this.aErrorStep       = new Array(); //Array4Steps
	this.aScoreStep       = new Array(); //Array4Steps
	this.aID2Solutions    = new Array(); //Hash for Proof Step ID
	this.aID4StepType     = new Array(); //Hash of Arrays for PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION with ID-Arrays
	this.aStepType4ID     = new Array(); //Hash maps ID to StepType PRECONDITION, PROOFSTEP, CONCLUSION, JUSTIFICATION
	this.aSolUsedID  	  = new Array();
	this.aOriginalID  	  = new Array();
	this.aSolution        = new Array(); //Array with all Solution Steps
	this.getElementById("USEDSTEPS"+this.aQID).innerHTML = "";
	this.getElementById("UNUSEDSTEPS"+this.aQID).innerHTML = "";
	this.getElementById("SOURCESTEPS"+this.aQID).innerHTML = "";
	this.getElementById("ASSESSMENT"+this.aQID).innerHTML = "";
	this.getElementById("SOLUTION"+this.aQID).innerHTML = "";
	this.aLocalEProof = "";
	//this.aRootDOM = pRootDOM;
	//this.aUsedDOM = pNodeDOM;
	//this.vConnection2Node = this.getElementsByClassName("tplCONNECTION"+this.aQID);
	//alert("this.vConnection2Node.length="+this.vConnection2Node.length);

};
//----End of Method init() Definition

//#################################################################
//# Method: initRootNodeById(pRootID,pNodeID)
//#    used in Class: EProof__SID__
//#
//# Comment: Set Root and DOM Object by ID
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function initRootNodeById_EProof__SID__(pRootID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:initRootNodeById(pRootID,pNodeID)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.initRootNodeById(pNodeID);
	//-------------------------------------------------------
	var vRootDOM = document.getElementById(pRootID);
	if (vRootDOM) {
		this.aRootDOM = vRootDOM;
		this.aRootID  = pRootID;
	} else {
		alert("initRootNodeById('"+pRootID+"') is undefined!")
	}
};
//----End of Method initRootNodeById() Definition
//#################################################################
//# Method: initIMathQN()
//#    used in Class: EProof__SID__
//#
//# Comment: Init Question Number for the IMathAS-Forms
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function initIMathQN_EProof__SID__() {
	//this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","SOLUTION","ENCRYPTED");
	//this.aIMATH = new Array(); //init Hash by method init()
	var i=0;
	var iID = "";
	while (i != this.aIMathArray.length) {
		iID = this.aIMathArray[i];
		this.aIMATH[iID] = "imath"+iID;
		i++;
	};
	if (this.aQID == "__SID__") {
		this.aIMATH["STORAGE"] = "qn1000";
	} else {
		this.aIMATH["STORAGE"] = "qn"+this.aSettings["ThisQ"]+"000";
	}
// 		while (i != this.aIMathArray.length) {
// 			iID = this.aIMathArray[i];
// 			i++;
// 			if (this.lower(i,10)) {
// 				this.aIMATH[iID] = "qn"+this.aSettings["ThisQ"]+"00"+i;
// 			} else {
// 				this.aIMATH[iID] = "qn"+this.aSettings["ThisQ"]+"0"+i;
// 			}
// 		}
// 	}
};
//----End of Method initIMathQN() Definition

//#################################################################
//# Method: init_settings()
//#    used in Class: EProof__SID__
//#
//# Comment: set the default settings if no settings can be loaded
//#
//# created               24.6.2015
//# last modifications    24.6.2015
//#################################################################
function init_settings_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:init_settings(pNodeDOM)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.init_settings();
	//-------------------------------------------------------
	this.aSettings = new Array();
	this.init_default_settings();
	//this.aSettings["show_feedback_score"] = this.aSettings["show_assessment"]; //depricated replace in iMathAS-settings
};
//----End of Method init_settings() Definition
//#################################################################
//# Method: init_default_settings()
//#    used in Class: EProof__SID__
//#
//# Comment: set the default settings if no settings can be loaded
//#
//# created               24.6.2015
//# last modifications    24.6.2015
//#################################################################
function init_default_settings_EProof__SID__() {
	//this.aSettings["show_feedback_score"] = this.aSettings["show_assessment"]; //depricated replace in iMathAS-settings
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:init_settings(pNodeDOM)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.default_settings();
	//-------------------------------------------------------
	this.init_undef_setting("Theorem_Title","Default Title of the Proof");
	this.init_undef_setting("Theorem_Label","Theorem");
	this.init_undef_setting("Author","Author Name");
	this.init_undef_setting("eMail","mail@author.inf");
	this.init_undef_setting("LANGUAGE","DE");
	this.init_undef_setting("Theorem_Appendix","Appendix of the Proof with link __lt__a href__eq____qu__http://de.wikipedia.org/wiki/Absolute_Konvergenz__qu__ target__eq____qu__blank__qu____gt__Wikipedia__lt__/a__gt__");
	this.init_undef_setting("Per_Error_Minus_Percent","9");
	this.init_undef_setting("Assessment_Minus_Percent","2");
	this.init_undef_setting("Suggestion_Minus_Percent","17");
	this.init_undef_setting("unnecessary_connections","3");
	this.init_undef_setting("unnecessary_proofsteps","3");
	this.init_undef_setting("unnecessary_justifications","2");
	this.init_undef_setting("selectbox_proofsteps","1");
	this.init_undef_setting("allow_own_proofsteps","1");
	this.init_undef_setting("remap_proofstep_IDs","1");
	this.init_undef_setting("randomize_proofstep_IDs","1");
	this.init_undef_setting("randomize_done","0");
	this.init_undef_setting("cryptkey","ACBSD");
	this.init_undef_setting("show_Load_Save_Control","0");
	this.init_undef_setting("show_Main_Control","0");
	this.init_undef_setting("show_links","1");
	this.init_undef_setting("show_assessment","1");
	this.init_undef_setting("show_suggestions","1");
	this.init_undef_setting("show_proof_solution","1");
	this.init_undef_setting("AuthoringMode","0");
	this.init_undef_setting("AssessmentMode","0");
	this.init_undef_setting("MathFormat","AM_HTMLorMML");
	this.init_undef_setting("COMMONCONTROL","4980,4981,4982,4983");
	this.init_undef_setting("QUESTIONTEXT","4980,4981,4982,4983");
	this.init_undef_setting("vQID","__SID__");
	this.init_undef_setting("ThisQ","__THISQ__");
	this.init_undef_setting("alertDOM","1");
};
//----End of Method default_settings() Definition
//#################################################################
//# Method: init_undef_setting(pSetID,pValue)
//#    used in Class: EProof__SID__
//#
//# Comment: set the default settings if no settings can be loaded
//#
//# created               24.6.2015
//# last modifications    24.6.2015
//#################################################################
function init_undef_setting_EProof__SID__(pID,pValue) {
	if (!this.aSettings[pID]) {
		this.aSettings[pID] = pValue;
	} else {
		if (this.aSettings[pID] == "") {
			this.aSettings[pID] = pValue;
		};
	};
};
//----End of Method init_undef_setting() Definition

//#################################################################
//# Method: init_template(pDOMtemplate)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function init_template_EProof__SID__(pTemplateDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:init_template()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.init_template(pTemplateDOM);
	//-------------------------------------------------------
	if (pTemplateDOM) {
		this.aTemplateDOM = pTemplateDOM;
	} else {
		this.alertDOM("init_template():1471 was not successful!");
	};
};
//----End of Method init_template() Definition

//#################################################################
//# Method: init_template_ID(pTemplateID)
//#    used in Class: EProof__SID__
//#
//# Comment: Provide an Object ID of a DOM template that will be cloned
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function init_template_ID_EProof__SID__(pTemplateID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:template()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.init_template_ID(pTemplateID);
	//-------------------------------------------------------
	this.aTemplateDOM = document.getElementById(pTemplateID);
};
//----End of Method init_template_ID(pTemplateID) Definition

//#################################################################
//# Method: load(pInArray)
//#    used in Class: EProof__SID__
//#
//# Comment: Loads a NEW e-Proof into Environment
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function load_EProof__SID__(pQID,pThisQ,pRootDOM,pRootID,pMode) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:load(pInArray)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.load();
	//-------------------------------------------------------
	//---Append defined Methods from eproofmeth1.js----------
	this.appendMethods();
	//-------------------------------------------------------
	//this.aDebug = "0"; //set this in eproofmain.js
	if (pMode) {
		this.aMode = pMode;
		if (this.aMode == "AUTHORING") {
			this.aShowControl = "1";
		} else if (this.aMode == "DEBUG") {
			this.aDebug = "1";
		};
	} else {
		this.aMode = "DEFAULT";
	};
	//-------------------------------------------------------
	if (this.aDebug == "1") {
		this.showDebug();
		this.aShowControl = "1";
	};
	//this.aSettings["alertDOM"] = "1";
	//-------------------------------------------------------
	this.aQID = pQID;
	//this.aQID = this.getStringQID(pQID);
	this.aUsedID     += this.aQID;
	this.aUnusedID   += this.aQID;
	this.aTemplateID += this.aQID;
	//-------------------------------------------------------
	if (pRootDOM) {
		this.aRootID = pRootDOM.id;
		this.aRootDOM = pRootDOM;
	} else {
		this.initRootNodeById(pRootID);
	};
	//this.aRootDOM = document.getElementById(this.aRootID);
	//alert("Root.id="+(this.aRootDOM.id)+" for '"+this.aRootID+"'");
	//-------------------------------------------------------
	this.init_settings();
	//-------------------------------------------------------
	this.aLocalEProof = "";
	if (pThisQ == "__THISQ__") {
		//alert("Load From Storage");
		this.load_Form_LocalStorage();
		this.aThisQ = "1";
		this.aOffline = "1";
		this.show("bSAVEIMATHCONTROL"+this.aQID);
	} else {
		//--Online-Mode iMathAS
		//alert("Load From IMathAS");
		this.aThisQ = pThisQ;
		this.aOffline = "0";
		this.hide("bSAVEIMATHCONTROL"+this.aQID);
	};
	//alert("load(1)");
	this.preProcess();
	//alert("load(2)");
	if (this.aOffline == "1") {
		//alert("JS-e-Proof Environment");
		this.preProcess4JS_only();
	};
	//alert("load(3)")
	if (this.aLocalEProof != "") {
		//this.load_XML();
		alert("Load IMathAS from Local Storage");
		this.parseSettings();
		//alert("load(1.2)");
		this.load_IMathAS();
	} else {
		if (this.iMathForm_loaded()) {
			//alert("Load IMathAS from Form");
			this.load_IMathAS();
		} else {
			//alert("Load XML");
			this.load_XML();
		};
		this.clickCloseControl();
	}
};
//----End of Method load() Defloadion

//#################################################################
//# Method: load_Form_LocalStorage()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function load_Form_LocalStorage_EProof__SID__() {
	//alert("Load from Local Storage");
	if (this.aMode != "AUTHORING") {
		this.aLocalEProof = localStorage.getItem("imathEPROOF");
	//} else {
	//	alert(" load_Form_LocalStorage this.aMode="+this.aMode);
	};
	//alert("this.aLocalEProof="+this.aLocalEProof);
	if (this.aLocalEProof) {
		var vArr = this.aLocalEProof.split(",");
		var i=0;
		var vDOM = null;
		//while (i != vArr.length) {
		var vMax = vArr.length;
		if (this.greater(vMax,this.aIMathArray.length)) vMax=this.aIMathArray.length;
		while (i != vMax) {
			//this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP","SOLUTION","ENCRYPTED","SETTINGS");
			vArr[i] = this.replaceString(vArr[i],this.aNewLine,this.CR);
			vDOM = this.getIMathById(this.aIMathArray[i]);
			if (vDOM) {
				vDOM.value = vArr[i];
			//alert("load_Form_LocalStorage('"+this.aIMathArray[i]+"')"+this.CR+vArr[i]);
			//} else {
			//	alert("load_Form_LocalStorage('"+this.aIMathArray[i]+"') undefined");
			};
			i++;
		}
	} else {
		this.aLocalEProof = "";
		//alert("Local Storage for e-Proof 'imathEPROOF"+this.aQID+"' has not a saved version! Save you work first!");
	}
};
//#################################################################
//# Method: load_IMathAS
//#    used in Class: EProof__SID__
//#
//# Comment: Loads Data from IMATHAS Form Elements
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function load_IMathAS_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:load_IMathAS()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.load_IMathAS();
	//-------------------------------------------------------
	//alert("load_IMathAS(1.0)");
	//this.aSettings = new Array();
	//alert("(1) this.aSettings[AuthoringMode]="+this.aSettings["AuthoringMode"]);
	this.load_Settings();
	//alert("(2) this.aSettings[AuthoringMode]="+this.aSettings["AuthoringMode"]);
	//this.correct_StudentAnswer();
	this.aSettings["alertDOM"] = this.aDebug;
	this.showHelpLanguage();
	this.preProcess4Lanugage();
	this.encodeSol();
	this.decodeSol();
	//alert("(3) this.aSettings[AuthoringMode]="+typeof(this.aSettings["AuthoringMode"]));
	var vRandSteps = this.aSettings["randomize_proofstep_IDs"];
	if (this.aMode == "AUTHORING") {
		this.aSettings["AuthoringMode"] = "1";
	};
	if (this.aSettings["AuthoringMode"] == "1") {
		//alert("writeSolution2SA="+this.aSettings["AuthoringMode"]);
		this.writeSolution2SA();
		this.aSettings["randomize_proofstep_IDs"] = "0";
		//this.aSettings["remap_proofstep_IDs"] = "0";
	} else {
		//alert("NO writeSolution2SA="+vTest);
	};
	//var vArr = new Array("editTITLE"+this.aQID,"mapPREVIOUSLINK"+this.aQID,"optJUSTIFICATION"+this.aQID);
	//this.showHideArray(vArr,this.aSettings["AuthoringMode"]);
	//this.showHideArray(vArr,"0");
	//alert("Show Main Control="+this.aSettings["show_Main_Control"]+" - Show Proof Control="+this.aSettings["show_Load_Save_Control"]);
	this.showHideBoolean("PROOFCONTROL"+this.aQID,this.aSettings["show_Load_Save_Control"]);
	this.showHideBoolean("MAINCONTROL"+this.aQID,this.aSettings["show_Main_Control"]);
	//this.show("MAINCONTROL"+this.aQID);
	//alert("this.aSettings[randomize_proofstep_IDs]='"+this.aSettings["randomize_proofstep_IDs"]+"'");
	if (this.aSettings["randomize_proofstep_IDs"] == "1") {
		if (this.aSettings["randomize_done"] != "1") {
			//alert("shuffle ProofSteps");
			this.aSettings["randomize_done"] = "1";
			this.shuffleSteps("PROOFSTEP");
			this.shuffleSteps("STUDENTANSWER");
		};
	} else {
		//alert("No Shuffle of Steps");
	};
	this.aSettings["randomize_proofstep_IDs"] = vRandSteps;
	if (this.aSettings["AssessmentMode"] == "1") {
		this.show("outMYSTEPASSESS"+this.aQID);
	} else {
		this.hideElement("outMYSTEPASSESS"+this.aQID);
	};
	this.preAllSteps();
	if (this.aSettings["AuthoringMode"] == "1") {
		this.appendMissingSteps2SA();
	};
	//alert("(1) eproof.js:load_IMathAS()-Call this.aCount="+this.aCount);
	//alert("this.vConnection2Node.length="+this.vConnection2Node.length);
	var vNode = this.getElementById("THEOREMAPPENDIX"+this.aQID);
	if (this.aSettings["show_links"] == "1") {
		vNode.innerHTML = this.decodeValue(this.aSettings["Theorem_Appendix"]);
	} else {
		vNode.innerHTML = "";
	};
	this.createSelectConnection();
	this.preProcessCounter();
	this.createSelectPosition();
	this.createSelectStepID();
	//alert("load_IMathAS(1.3)");
	this.createAllStudentAnswers();
	this.parseSolution();
	//alert("load_IMathAS(1.4)");
	this.loadDisplayOption();
	//alert("load_IMathAS(1.5)");
	this.load_StudentAnswer();
	//alert("load_IMathAS(1.6)");
	this.aStudentAnswerList = this.getAllSteps("SCAN");
	//alert("load_IMathAS(1.7)");
	this.aCount = this.aStudentAnswerList.length;
	//alert("Load IMath finished - Start postProcess() with setTimeout");
	//window.setTimeout("vEProof"+this.aQID+".postProcess()",20);
	//alert("load_IMathAS(1.10)");
	this.postProcess();
	//alert("load_IMathAS(1.11)");
};
//----End of Method load_IMathAS Definition
//#################################################################
//# Method: load_StudentAnswer
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function load_StudentAnswer_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof__qid__.js:load_StudentAnswer()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.load_StudentAnswer();
	//-------------------------------------------------------
		var vStep = 0;
		var vStepDef = "";
		//alert("load_StudentAnswer()");
		//var vInput = this.getElementById("imathSTUDENTANSWER").value;
		var vInput = this.getIMathById("STUDENTANSWER").value;
		var vComma = "";
		var vPrevious = " ";
		var vHash = new Array();
		vHash["APPEND_JUST"] = "";
		var vAppend_Justifications = "";
		if (vInput) {
			var vListArray = vInput.split(this.CR);
			//alert("vListArray.length="+vListArray.length+" - load_StudentAnswer():1375");
			var k=0;
			//alert("load_StudentAnswer(1.2)");
			while (k != vListArray.length) {
				if (this.greater(vListArray[k].indexOf(this.aSeparator) , -1)) {
					vStep++;
					this.load_StudentAnswerLine(vListArray[k],vStep,vHash)
				//} else {
					//alert(k+". Line ignored"+this.CR+vListArray[k]);
				};
				k++;
			}
		} else {
			alert("Textarea: 'imathSTUDENTANSWER' was undefined!");
		}
};
//----End of Method load_StudentAnswer Definition
//#################################################################
//# Method: load_StudentAnswerLine (pLine,pStep)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function load_StudentAnswerLine_EProof__SID__(pLine,pStep,pHash) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert(pLine+this.CR+"eproofmeth.js:load_StudentAnswerLine()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.load_StudentAnswerLine(pLine,pStep,pHash);
	//-------------------------------------------------------
	// 0:PrevID 1:Con=TYP  2:ID=MY
	// 3:Just=CK,DU,P1 4:OptJust
	// 5:ManScore=0.9 6:SugUsed  7:AssUsed
	// 8:Con-Select 9:ID-Select=S2,S3,S7  10:Just-Select=J1,J2,J6
	//alert("pStep="+pStep+" load_StudentAnswerLine():1607");
	var vAnswerHash = new Array();
	var vInnerHash = new Array();
	var vSplitAnswer = pLine.split(this.aSeparator);
	var vID = vSplitAnswer[2];
	if (this.aAllID2Node[vID]) {
		//-----Step----------------
		vAnswerHash["sPOSITION"] = pStep;
		vAnswerHash["oldPOSITION"] = pStep;
		//----(0)-Previous-------
		//----Can be Empty - Link Definition for an alternative Path in the Proof -------------
		//----The link node defines another previous step to link to as starting step--------
		vAnswerHash["PREVIOUSLINK"] = vSplitAnswer[0] || "";
		//----(1)-Connection------
		var vConIndex = -1;
		if (this.vConnection2Index[vSplitAnswer[1]]) {
			vConIndex = this.vConnection2Index[vSplitAnswer[1]];
		} else {
			//alert("load_StudentAnswerLine() - vConTyp="+vSplitAnswer[1]+" is undefined");
			vConIndex = 0;
		};
		//alert("vConIndex["+k+"]="+vConIndex);
		vAnswerHash["sCONNECTION"] = vConIndex;
		vInnerHash["outCONNECTION"] = this.vConnection2Node[vConIndex].innerHTML;
		//----(2)-ID---------------
		vAnswerHash["sSTEPID"]  = vID;
		vAnswerHash["inSTEPID"] = vID;
		//alert("load_StudentAnswerLine(1.6)");
		//----(3,4)-Justifications-------
		var vJustArray = vSplitAnswer[3].split(this.aComma);
		var vMappedIDs = this.array2mapped(vJustArray);
		var vOptJustArray = vSplitAnswer[4].split(this.aComma);
		var vOptMapJustArray = this.array2mapped(vOptJustArray);
		vAnswerHash["optJUSTIFICATION"] = vOptMapJustArray.join(",");
		vAnswerHash["inJUSTIFICATION"] = vJustArray.join(",");
		//alert("("+pStep+") inJUSTIFICATION="+vAnswerHash["inJUSTIFICATION"]+" - load_StudentAnswerLine():1443");
		vInnerHash["outJUSTIFICATIONID"] = "["+vMappedIDs.join(",")+"]";
		vInnerHash["displayJUSTIFICATIONS"] = ""; //this.createDisplayJustifications(vAnswerHash["inJUSTIFICATION"],this.aMappedID[vID]);
		//----(5)-Manual Assessment----
		vAnswerHash["inMYSTEPASSESSSCORE"] = this.parseScore(vSplitAnswer[5]) || "";
		//--(6,7)-Used Assessment/Suggestions-----
		vAnswerHash["inSUGGESTIONSUSED"] = vSplitAnswer[6] || "0";
		vAnswerHash["inASSESSMENTUSED"] = vSplitAnswer[7] || "0";
		//----(8)-Select Connection List----------
		var vConList = vSplitAnswer[8] || ""; //this.vConnectionArray.join(",");
		vAnswerHash["selectCONNECTION"] = this.form2list(vConList);
		//----(9)-ID Select List------------------
		var vIDList = vSplitAnswer[9] || ""; //this.aAllID.join(",");
		vAnswerHash["selectSTEPID"]  = this.form2list(vIDList);
		vInnerHash["outSTEPID"] = "["+this.aMappedID[vID]+"]";
		vInnerHash["sugSTEPID"] = "["+this.aMappedID[vID]+"]";
		vInnerHash["outSTEPDEF"] = this.aAllID2Node[vID].innerHTML;
		//----(10)-Justification Select List--------
		var vEditJustList = vSplitAnswer[10] || ""; //this.getAllJustIDs();
		vAnswerHash["selectJUSTIFICATION"] = this.form2list(vEditJustList);
		//------------------
		//---APPEND Template--------------
		//alert("load_StudentAnswerLine(1.7)");
		this.append_template(vAnswerHash,vInnerHash,pStep);
	} else {
		if (vID != "") {
			alert("ERROR Step("+pStep+"): Original ID ["+vID+"] does not exist in the pre-defined proof steps. load_StudentAnswerLine():4582");
		};
	}
};
//#################################################################
//# Method: load_XML_IMathAS
//#    used in Class: EProof__SID__
//#
//# Comment: Loads Data from IMATHAS Form Elements
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function load_XML_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:load_XML()-Call:4053");
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.load_XML();
	//-------------------------------------------------------
	var vLoadDOM = this.getElementById("tLOAD"+this.aQID);
	var vXMLstring = vLoadDOM.value || "";
	if (this.greater(vXMLstring.indexOf("EPROOF"),0)) {
		//alert("EPROOF loaded");
	} else {
		var vFileXML = this.getElementById("COPYTOLOAD"+this.aQID).value;
		vXMLstring = this.getElementById(vFileXML).value;
		vLoadDOM.value = vXMLstring;
	};
	//alert("eproof.js:loadXML()-Call:4367\n"+vXMLstring);
	this.init();
	this.parseXML(vXMLstring);
	this.exportXMLtree();
	//alert("loadXML(1)");
	this.getIMathById("STEPCOUNT").value = "0";
	this.clearSuggestions();
	//alert("Load XML-File - Please wait!");
	this.load_IMathAS();
};
//#################################################################
//# Method: load_Settings()
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function load_Settings_EProof__SID__() {
	this.init_settings();
	this.parseSettings();
	this.init_default_settings();
	if (this.aOffline == "1") {
		this.getQuery2Settings(this.aSettings);
	};
};
//#################################################################
//# moveStepOrder(pChildSA)
//#################################################################
function moveStepOrder_EProof__SID__(pChildSA,pNewPos) {
	var vStep = this.getStep(pChildSA);
	var vOldPos = this.getElementById("oldPOSITION"+this.aQID+vStep).value;
	//alert("moveStepOrder: vStep=" + vStep + " vOldPos =" +vOldPos+ " TO pNewPos="+pNewPos);
	this.moveStep(vOldPos,pNewPos);
};
//#################################################################
//# moveStepID(pStep,pID,pCount)
//#################################################################
function moveStepID_EProof__SID__(pSelectDOM,pID) {
	//the Step, where the ID is the selected is the
	//alert("moveStepID: pID=["+pID+"]");
	var vSA = this.getParentStudentAnswer(pSelectDOM);
	//var vStep = this.getChildByClassName(vSA,"STEPNR"+this.aQID).value;
	var vStep = pSelectDOM.getAttribute("step");
	var vListOfID = this.getElementsByClassName("inSTEPID"+this.aQID);
	//var vID = this.aOriginalID[pID];
	var vMapID = this.aMappedID[pID];
	var vSelPos = this.aID2Index[pID]+1;
	var vNewPos = this.getChildByClassName(vSA,"oldPOSITION"+this.aQID).value;
	//alert("vSelPos="+vSelPos + " vNewPos="+vNewPos + " vStep="+vStep+" pID="+pID+" pMappedID="+vMapID+ " this.aCount="+this.aCount);
	var vUsedNodes   = this.getUsedSteps();
	//alert("moveStepID: vStep=" + vStep + " pID=" +pID+" vSelPos="+vSelPos+ " TO vNewPos="+vNewPos+"vUsedNodes.length="+vUsedNodes.length);
	if (this.greater(vSelPos,vUsedNodes.length)) {
		//---OldPos is coming from UnusedSteps
		if (vNewPos == vUsedNodes.length) {
			//---The NewPos is in UsedSteps---
			//alert("moveStepID():2018 - Minimize");
			if (this.greater(vNewPos,0)) {
				//vNewPos--;
			};
		};
	};
	if (vSelPos != vNewPos) {
		this.moveStep(vSelPos,vNewPos);
		var vOldID = this.getChildByClassName(vSA,"inSTEPID"+this.aQID).value;
		this.getChildByClassName(vSA,"sSTEPID"+this.aQID).value = vOldID;
	}
	//this.moveStep(vNewPos,this.aCount+1);
	//this.updateStepChange(vStep);
};
//#################################################################
//# moveStep(pOldPos,pNewPos)
//#################################################################
function moveStep_EProof__SID__(pOldPos,pNewPos) {
	//-----LIST and COUNT------
	var vListNode     = this.getAllSteps(); //this.aStudentAnswerList;
	//alert("vListNode.length="+vListNode.length);
	var vOldPos		  =  pOldPos;
	var vNewPos		  =  pNewPos;
	//-------------------------
	//alert("MOVE vOldPos=" + vOldPos + " TO vNewPos="+vNewPos+" BEFORE Pos Correction");
	var vUnusedNodes = this.getUnusedSteps();
	var vUsedNodes = this.getUsedSteps();
	if (this.lower(pNewPos,vUsedNodes.length+1)) {
		// This is a pos correction, which is necessary,
		// if pNewPos is NOT coming from Unused Nodes
		if (this.lower(pOldPos,pNewPos)) {
			//alert(pOldPos+"=pOldPos < pNewPos="+pNewPos)
	    	vNewPos++;
		};
	}
	//-------------------------
	//alert("MOVE vOldPos=" + vOldPos + " TO vNewPos="+vNewPos+" AFTER Pos Correction");
	if (pNewPos == -1) {
    	alert("No Move-Operation with pNewPos="+vNewPos);
    } else if (pOldPos == -1) {
    	alert("No Move-Operation with pOldPos="+pOldPos);
    } else if (vOldPos == vNewPos) {
    	//alert("No Move-Operation vOldPos="+vOldPos+"=vNewPos");
    } else {
    	//alert("moveStep("+pOldPos+","+pNewPos+") vNewPos="+vNewPos+" vUsedNodes.length="+vUsedNodes.length);
    	var vOldNode = vListNode[vOldPos-1];
 		var vOldParentNode = vOldNode.parentNode;
 		//alert("vOldNode.id="+vOldNode.id+" vOldPos="+vOldPos+": vOldParentNode.id="+vOldParentNode.id);
		var vRemovedChild = vOldParentNode.removeChild(vOldNode);
		if (pNewPos == 0) {
	    	this.aUsedDOM.appendChild(vRemovedChild);
	    	//alert("PROOF: Append Child at Pos="+vUsedNodes.length);
	    } else if (this.lower(pNewPos , vUsedNodes.length)) {
	    	//alert("PROOF: Insert USED Child"+vOldPos+" before "+vNewPos+" vUsedNodes.length="+vUsedNodes.length);
	    	this.aUsedDOM.insertBefore(vRemovedChild,vListNode[vNewPos-1]);
	    } else if (pNewPos == vUsedNodes.length) {
	    	//alert("PROOF: Append Child");
	    	this.aUsedDOM.appendChild(vRemovedChild);
	    } else {
	    	//alert("UNUSED: Append to Unused Steps");
		    this.aUnusedDOM.appendChild(vRemovedChild);
	    };
	    this.aStudentAnswerList = this.getAllSteps("SCAN");
		this.setVisibility4Step(vRemovedChild);
		this.updateInput();
	};
};
//#################################################################
//# Method: preAllSteps
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function preAllSteps_EProof__SID__() {
	this.preProcessHeader();
	var vListID = this.aIMathID;
	//new Array("PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP");
	var i=0;
	var vStepRoot = this.getElementById("SOURCESTEPS"+this.aQID);
	while (i != vListID.length) {
		this.getListIMathAS(vStepRoot,vListID[i],vListID[i]+"LIST"+this.aQID);
		i++;
	};
	this.createAllID2Node();
	//this.createAllStudentAnswers(); length of AllID is here still 0
};
//#################################################################
//# Method: preProcess
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function preProcess_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:preProcess()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.preProcess();
	//-------------------------------------------------------
	//this.load_XML();
	//this.debugValue("preProcess:1700");
	if (this.aUseMathJax == "1") {
		//this.show("bRERENDER"+this.aQID);
	};
	var vStep0 = this.getElementById("SELECTFROM"+this.aQID);
	this.setClassName4Step(vStep0,"","0");
	this.initIMathQN();
	this.aUsedDOM     = document.getElementById(this.aUsedID);
	this.aUnusedDOM   = document.getElementById(this.aUnusedID);
	this.aTemplateDOM = document.getElementById(this.aTemplateID);
	//alert("aTemplateDOM.id="+this.aTemplateDOM.id+" in preProcess():2027");
	//alert("aUsedDOM.id="+this.aUsedDOM.id+" in preProcess():2089");
	this.vConnection2Node = this.getElementsByClassName("tplCONNECTION"+this.aQID);
	//alert("(1.1) this.aSettings[\"show_Main_Control\"]="+this.aSettings["show_Main_Control"]);

};
//----End of Method preProcess Definition
//#################################################################
//# Method: preProcess4Language
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function preProcess4Lanugage_EProof__SID__() {
	this.setConnection2Index();
	this.createDisplayOptions();
	this.getElementById("LINKINFO1"+this.aQID).setAttribute("href",this.vLink_Tutorial);
	this.getElementById("LINKINFO2"+this.aQID).setAttribute("href",this.vLink_Screencast);
	this.getElementById("LINKINFO3"+this.aQID).setAttribute("href",this.vLink_ASCIIMath);
	//this.getElementById("LINKINFO4"+this.aQID).setAttribute("href",this.vLink_ASCIIMath);
	if (this.aSettings["show_links"] == "0") {
		this.getElementById("LINKHEADERURL1"+this.aQID).innerHTML = this.LT+"b"+this.GT+"Information"+this.LT+"/b"+this.GT;
		this.getElementById("LINKHEADERURL2"+this.aQID).innerHTML = "";
		this.hideNode(this.getElementById("LINKINFO3"+this.aQID));
		//this.getElementById("LINKINFO3"+this.aQID).innerHTML = "";
	};
	this.getElementById("HEADERLINETR1"+this.aQID).innerHTML =(vLanguage["Number_of"]+" "+vLanguage["ProofSteps"]+":").bold();
	this.getElementById("HEADERLINETR2"+this.aQID).innerHTML =(vLanguage["Display"]+" "+vLanguage["Proof"]+":").bold();
	var vHash = new Array();
	vHash["btHelp"] = vLanguage["HelpPage"];
	vHash["btSave"] = vLanguage["Save"];
	vHash["btSaveII"] = vLanguage["Save"];
	vHash["bJustifications"] = vLanguage["Justifications"];
	vHash["btToggleUnused"] = "+ "+vLanguage["Deleted_ProofSteps"].bold();
	vHash["btAssessment"] = ((vLanguage["Assessment"]+" "+vLanguage["Proof"]).fontcolor("red"));
	vHash["btSolution"] = (vLanguage["Solution"].fontcolor("green"));
	vHash["btProofStep"] = vLanguage["ProofSteps"];
	vHash["btJustification"] = vLanguage["Justifications"];
	vHash["outSCORESTEPTITLE"] =   (vLanguage["Assessment"]+" "+vLanguage["ProofStep"]+":").bold();
	vHash["outSUGUSEDTITLE"] =  vLanguage["Suggestions"]+" "+vLanguage["USED"].toLowerCase()+":";
	vHash["outASSESSUSEDTITLE"] =  vLanguage["Assessment"]+" "+vLanguage["USED"].toLowerCase()+":";
	vHash["outASSESSCONNECTIONTITLE"] = vLanguage["Connection"]+" "+vLanguage["ProofStep"]+":";
	vHash["outpreLINKSTEPSTITLE"] = vLanguage["previous"]+" "+vLanguage["Step"]+":";
	vHash["outpostLINKSTEPSTITLE"] = vLanguage["next"]+" "+vLanguage["Step"]+":";
	vHash["outJUSTCORRECTTITLE"] = vLanguage["Correct"]+" "+vLanguage["Justifications"]+":";
	vHash["outJUSTMISSINGTITLE"] = vLanguage["Missing"]+" "+vLanguage["Justifications"]+":";
	vHash["outJUSTUNNECESSARYTITLE"] = vLanguage["Unnecessary"]+" "+vLanguage["Justifications"]+":";
	vHash["bAssessStep"] = vLanguage["Assessment"];
	vHash["bSaveEditor"] = vLanguage["Save"];
	vHash["bUseStep"] = vLanguage["Append_Step"];
	vHash["bSuggestion"] = this.LT+"font color='green'"+this.GT+""+vLanguage["Suggestion"]+""+this.LT+"/font"+this.GT;
	vHash["bSuggestionFirst"] = vHash["bSuggestion"];
	//vHash["bSelectSuggestion"] = vLanguage["Suggestion"]+vLanguage["select"];
	var vTitle = vLanguage["Suggestion"];
	vHash["bSelectSuggestion"] = vTitle;
	//---For Suggestion 0---
	this.writeParentInnerHTML(this.aRootDOM,"bSelectSuggestion"+this.aQID+"0",vTitle);
	var vButTitle = vLanguage["ProofStep"] + " " + vLanguage["select"];
	vHash["bSelectSuggestionOK"] = vButTitle;
	//---For Suggestion 0---
	var vSug0 = this.getChildById(this.aRootDOM,"SUGGESTIONS"+this.aQID+"0");
	this.writeParentInnerHTML(vSug0,"bSelectSuggestionOK"+this.aQID+"0",vButTitle);
	vHash["outASSESSMENTTITLE"] = vLanguage["Assessment"] + " " + vLanguage["ProofStep"];
	vHash["outMYSTEPASSESSTITLE"] = vLanguage["manual"] + " " +  vLanguage["Assessment"];
	vHash["outMYSTEPASSESSTEXT"] = vLanguage["Self_Defined"];
	vHash["bReset"] = vLanguage["Delete_Proof"];
	this.writeHash2InnerHTML(this.aRootDOM,vHash,"");
};
//----End of Method preProcessLanguage Definition

//#################################################################
//# Method: preProcess4JS_only
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function preProcess4JS_only_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:preProcess4JS_only()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.preProcess4JS_only();
	//-------------------------------------------------------
	//var vOut = this.createSelectConnection4JS();
	//this.writeInnerHTML("tplCONNECTIONLIST"+this.aQID,vOut);


};
//----End of Method preProcess4JS_only Definition

//#################################################################
//# Method: preProcessHeader
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function preProcessHeader_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:preProcessHeader()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.preProcessHeader();
	//-------------------------------------------------------
	var vArrayID = new Array("Precondition","Conclusion");
	var vCount = 0;
	var i=0;
	var vID = "";
	var vHeader = "";
	while (i!=vArrayID.length) {
		vID = vArrayID[i].toUpperCase();
		// e.g. vID = "CONCLUSION"
		vCount = this.aCountHash[vID];
		if (vCount == 0) {
			vHeader = "Error: No Steps for "+vID+" defined in e-Proof!"
		} else if (vCount == 1) {
			vHeader = vLanguage[vArrayID[i]+"_Single"];
		} else {
			vHeader = vLanguage[vArrayID[i]+"_Multi"];
		};
		this.aListHeader[vID] = vHeader;
		i++;
	}
	this.aListHeader["JUSTIFICATION"] = this.LT+"h2"+this.GT+""+vLanguage["Justifications"]+":"+this.LT+"/h2"+this.GT;
	this.aListHeader["PROOFSTEP"] = this.LT+"h2"+this.GT+""+vLanguage["ProofSteps"]+":"+this.LT+"/h2"+this.GT;
};
//#################################################################
//# Method: preProcessCounter
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function preProcessCounter_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:preProcessCounter()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.preProcessCounter();
	//-------------------------------------------------------
	this.aCount = 0;
	var vListID = new Array("PRECONDITION","CONCLUSION","PROOFSTEP","JUSTIFICATION");
	var i=0;
	var vValue = 0;
	var vString = "";
	var vNode = null;
	var vID = "";
	while (i != vListID.length) {
		//vID = "imath"+vListID[i]+this.aQID;
		//vID = "imath"+vListID[i];
		//vID = this.aIMATH[vListID[i]];
		//vNode = this.getChildById(this.aRootDOM,vID);
		vNode = this.getIMathById(vListID[i]);
		if (vNode) {
			vString = (vNode.value+"") || "";
			var vResult = vString.split(this.aSeparator);
			var vTypeCount = 0;
			if (this.greater(vResult.length,0)) {
				vTypeCount = vResult.length-1;
			}
			//alert("preProcessCount() vString='"+vString+"' vTypeCount="+vTypeCount);
			this.aCountHash[vListID[i]] = vTypeCount || 0;
			if (i != vListID.length-1) {
				this.aCount += this.aCountHash[vListID[i]];
				//alert("preProcessCounter() - this.aCountHash['"+vListID[i]+"']="+this.aCountHash[vListID[i]]);
			};
		} else {
			this.alertDOM("preProcessCouter()-Call: '"+vListID[i]+"' is not defined in DOM");
		};
		//this.alertDOM("Count AllSteps="+this.aCount);
		i++
	};
};
//----End of Method preProcessCounter Definition


//#################################################################
//# Method: postProcess
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function postProcess_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:postProcess()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.postProcess();
	//-------------------------------------------------------
	//alert("postPRocess(1.0)");
	var vCount = this.getIMathStepCount();
	//alert("postProcess(1.1)");
	this.updateStepCount(vCount);
	//alert("postProcess(1.2)");
	this.setStepCount(vCount);
	//alert("postProcess(2.0)");
	//alert("(2) this.aSettings[\"show_Main_Control\"]="+this.aSettings["show_Main_Control"]);
	if (this.aShowControl == "1") {
		this.aSettings["show_Load_Save_Control"] = "1";
		this.aSettings["show_Main_Control"] = "1";
	};
	//alert("postProcess(3.0)");
	this.showHideBoolean("btAssessment"+this.aQID,this.aSettings["show_assessment"]);
	this.showHideBoolean("btSolution"+this.aQID,  this.aSettings["show_proof_solution"]);
	this.showHideBoolean("PROOFCONTROL"+this.aQID,this.aSettings["show_Load_Save_Control"]);
	this.showHideBoolean("MAINCONTROL"+this.aQID, this.aSettings["show_Main_Control"]);
	//alert("postProcess(4.0)");
	//this.preAllSteps();
	this.aErrorDefault = parseInt(this.aSettings["Per_Error_Minus_Percent"])/100;
	this.aErrorAssessment = parseInt(this.aSettings["Assessment_Minus_Percent"])/100;
	this.aErrorSuggestion = parseInt(this.aSettings["Suggestion_Minus_Percent"])/100;
	//alert("postProcess(5.0)");
	var vHash = new Array();
	vHash["PROOFLABEL"] = vLanguage["Proof"]+":";
	vHash["THEOREMLABEL"] = this.aSettings["Theorem_Label"];
	vHash["THEOREMTITLE"] = this.aSettings["Theorem_Title"];
	vHash["HELPTITLE"] = vLanguage["HelpPage"];
	vHash["SETTINGTHEOREMTITLE"] =  this.aSettings["Theorem_Label"]+": "+this.aSettings["Theorem_Title"];
	this.writeHash2InnerHTML(this.aRootDOM,vHash,"");
	this.getElementById("editTHEOREMLABEL"+this.aQID).value = this.aSettings["Theorem_Label"];
	this.getElementById("editTHEOREMTITLE"+this.aQID).value = this.aSettings["Theorem_Title"];
	//alert("postProcess(6.0)");
	this.postProcessSolution();
	this.setConnectionSize();
	//alert("postProcess(7.0)");
	var vNoCallVis4Proof = "1";
	this.toggleAuthoringMode(this.aSettings["AuthoringMode"],vNoCallVis4Proof);
	this.toggleManualAssessment(this.aSettings["AssessmentMode"],vNoCallVis4Proof);
	this.toggleAssessmentButton(this.aSettings["show_assessment"],vNoCallVis4Proof);
	this.toggleSuggestionButton(this.aSettings["show_suggestions"],vNoCallVis4Proof);
	this.toggleSolutionButton(this.aSettings["show_proof_solution"],vNoCallVis4Proof);
	//alert("postProcess(8.0)");
	this.setVisibility4Proof();
	this.visibleManualAssess();
	//alert("postProcess(9.0)");
	//if (this.onLoadAMprocess) this.rerenderMath();
	//this.aStudentAnswerList = this.getAllSteps("SCAN");
};
//----End of Method postProcess Definition
//#################################################################
//# Method: postProcessSolution
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function postProcessSolution_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:preProcessSolution()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.preProcessSolution();
	//-------------------------------------------------------
	//this.parseSolution();
	this.storeCorrectSuggestions();
	this.setAllSuggestions();
	//this.updateUsedIDs();
};
//----End of Method preProcessSolution Definition

//#################################################################
//# Method: replaceString()
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function replaceString_EProof__SID__(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (!pString) {
		alert("replaceString()-Call - pString not defined!");
	} else if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (this.greater(vN+1,0)) {
			if (this.greater(vN , 0)) {
				vReturnString += pString.substring(0, vN);
			};
			vReturnString += pReplace;
            if (this.lower(vN + pSearch.length , pString.length)) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
};

//#################################################################
//# Method: removeAllChildren()
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function removeAllChildren_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:removeAllChildren()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hide();
	//-------------------------------------------------------
	this.aUsedDOM.innerHTML = "";
};
//----End of Method removeAllChildren() Definition

//#################################################################
//# Method: reloadProof()
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function reloadProof_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:reloadProof()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.hide();
	//-------------------------------------------------------
	//alert("reloadProof() call init()");
	this.init();
	this.preProcess();
	//alert("reloadProof(1)");
	this.onLoadAMprocess = true; //ASCII Math Processing of Source Steps switch on
	this.load_IMathAS();
};
//----End of Method reloadProof() Definition


//#################################################################
//# Method: save(pNodeDOM)
//#    used in Class: EProof__SID__
//#
//# Comment: Saves the e-Proof
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function save_EProof__SID__(pButtonDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:save(pNodeDOM)-Call pButtonDOM.id="+pButtonDOM.id);
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.save(pNodeDOM);
	//-------------------------------------------------------
	this.updateProof2IMath();
	var vOut = this.saveEProof2Form();
	this.save_Form_LocalStorage(pButtonDOM.form,vOut);
};
//----End of Method save() Defsaveion
//#################################################################
//# Method: saveEProof2Form()
//#    used in Class: EProof__SID__
//#
//# Comment: Saves the e-Proof
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function saveEProof2Form_EProof__SID__() {
	var vOut = "";
	var i=0;
	var vSI = "";
	var vArr= this.aIMathArray;
	var vValue = "";
	while (i != vArr.length) {
		//this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP","SOLUTION","ENCRYPTED","SETTINGS");
		vValue = this.getIMathById(vArr[i]).value || " ";
		vOut += vSI + this.replaceString(vValue,this.CR,this.aNewLine);
		vSI = this.aSepInput;
		i++;
	};
	// Save total Score encrypted
	vOut += vSI + this.encodeScore(this.aScoreTotal);
	this.getIMathById("STORAGE").value = vOut;
	//alert(vOut);
	return vOut;
};
//#################################################################
//# Method: save_Form_LocalStorage(pForm,pOut)
//#    used in Class: EProof__SID__
//#
//# Comment:  Saves Data to IMATHAS Form Elements
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function save_Form_LocalStorage_EProof__SID__(pForm,pOut) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:save_Form_LocalStorage()-Call"+this.CR+pOut);
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.save_Form_LocalStorage(pForm,pOut);
	//-------------------------------------------------------
	if (this.aOffline == "1") {
		if(typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage.
			//--- Store to Variable "lastname" with Value "Smith"
			// localStorage.setItem("lastname", "Smith");
			//--- Retrieve Data from Local Storage---
			// document.getElementById("result").innerHTML = localStorage.getItem("lastname");
			alert(vLanguage["Save"] + " e-Proof OK - Local Storage");
			localStorage.setItem("imathEPROOF", pOut);
		} else {
			// Sorry! No Web Storage support..
			this.alertDOM("save_Form_LocalStorage()-Call: No Local Storage for this Browser available. Data will be lost, when you close window!");
		}
	} else {
		//document.getElementById("qn"+this.aThisQ+"000").value = pOut;
		alert("SAVE e-Proof to IMathAS - Please Wait!");
		pForm.submit();
	}
};
//----End of Method save_IMathAS Definition
//#################################################################
//# Method: saveOnChange()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    __DATE__
//#################################################################
function saveOnChange_EProof__SID__() {
	//var vCrypt = this.getElementById("SELECTSAVETYPE"+this.aQID).value;
	//checkENCRYPT
	var vFileFormat = this.getElementById("sFILEFORMAT"+this.aQID).value;
	this.aCrypt     = this.getElementById("checkENCRYPT"+this.aQID).checked;
	this.aExportSA  = this.getElementById("checkSTUDANSWERSOLUTION"+this.aQID).checked;
	this.aSAexport  = this.getElementById("checkSTUDANSWEREXPORT"+this.aQID).checked;
	this.aExportSol = this.getElementById("checkUSESOLUTION"+this.aQID).checked;
	//this.aExportSol = true;  //will be set by CheckBox "checkUSESOLUTION"
	if (vFileFormat == "XML") {
		//alert("SAVE XML - saveOnChange()-Call:2063 eproofmeth.js");
		this.saveXML();
	} else if (vFileFormat == "IMathAS") {
		//alert("SAVE IMathAS - saveOnChange()-Call:2065 eproofmeth.js");
		this.saveIMathAS();
	} else if (vFileFormat == "HTML") {
		//alert("SAVE IMathAS - saveOnChange()-Call:2065 eproofmeth.js");
		this.saveOfflineHTML();
	} else {
		alert("Error: Export Format '"+vFileFormat+"' is undefined!");
	};
};
//----End of Method saveOnChange() Definition

//#################################################################
//# Method: saveOfflineHTML()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    __DATE__
//#################################################################
function saveOfflineHTML_EProof__SID__() {
	var vOut = this.getEProofHTML();
	this.getElementById("tSAVEXML"+this.aQID).value = vOut;
};
//#################################################################
//# Method: saveXML()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    __DATE__
//#################################################################
function saveXML_EProof__SID__() {
	//var vCrypt = this.getElementById("SELECTSAVETYPE"+this.aQID).value;
	//checkENCRYPT
	var vOut = this.LT+"EPROOF"+this.GT+this.CR;
	vOut += this.createSettingXML();
	vOut += this.createStepsXML("PRECONDITION",2);
	vOut += this.createStepsXML("CONCLUSION",2);
	vOut += this.createStepsXML("JUSTIFICATION",2);
	if (this.aCrypt) {
		vOut += this.createStepsXML("PROOFSTEP",2);
		vOut += this.createCryptSol("CRYPTSOL");
	} else {
		//vOut += this.createStepsXML("PROOFSTEP",2);
		//vOut += this.createProofStepsXML("PROOFSTEP",5);
		// createSolutionXML includes exports PROOFSTEPS 2
		//vOut += this.createSolutionXML("SOLUTION",2,5);
		vOut += this.createSolutionXML("PROOFSTEP",2,5);
	};
	if (this.aSAexport) {
		vOut += this.createStudentAnswer2XML("STUDENTANSWER",10);
	}
	vOut += this.LT+"/EPROOF"+this.GT+this.CR;
	this.getElementById("tSAVEXML"+this.aQID).value = vOut;
};
//----End of Method saveXML() Definition
//#################################################################
//# Method: saveIMathAS()
//#    used in Class: EProof__SID__
//#
//# Comment: export IMathAS Version of the e-Proof
//#
//# created               3.3.2015
//# last modifications    __DATE__
//#################################################################
function saveIMathAS_EProof__SID__() {
	alert("Save IMathAS");
	var vOut = "";
	var vHash = new Array();
	vOut = this.createSettingIMathAS();
	vOut = this.createStepsIMathAS("Precondition",vOut);
	vOut = this.createStepsIMathAS("Conclusion",vOut);
	vOut = this.createStepsIMathAS("Justification",vOut);
	vOut = this.createStepsIMathAS("ProofStep",vOut);
	if (this.aCrypt) {
		vOut = this.createSolutionIMathAS("CryptSolution",vOut);
	//} else {
	};
	vOut = this.createSolutionIMathAS("SolutionStep",vOut);
	var vRet = "//--- Student Answers not defined/exported ---"+this.CR;
	var vFormSA = this.createStudentAnswer2IMathAS();
	var vArr = vFormSA.split(this.CR);
	var vPre  = this.DO+"StudentAnswer=\"";
	var vJoin = "\""+this.CR+this.DO+"StudentAnswer.=\"";
	var vPost = "\""+this.CR;
	if (this.aSAexport) {
		vRet = this.saveArr2IMathAS(vArr,vPre,vJoin,vPost);
	}
	vOut = this.replaceString(vOut,"___STUDENTANSWERS___",vRet);
	vArr = (this.aSettings["COMMONCONTROL"]).split(/,|__[coCO]+__/);
	vPre  = "includecodefrom(";
	vJoin = ")"+this.CR+vPre;
	vPost = ")"+this.CR;
	vRet = this.saveArr2IMathAS(vArr,vPre,vJoin,vPost);
	vOut = this.replaceString(vOut,"___INCLUDECODE___",vRet);
	vArr = (this.aSettings["QUESTIONTEXT"]).split(/,|__[coCO]+__/);
	vPre  = "// includeqtextfrom(";
	vJoin = ")"+this.CR+vPre;
	vRet = this.saveArr2IMathAS(vArr.slice(1),vPre,vJoin,vPost);
	vRet = "// "+this.LT +"SCRIPT type='text/javascript'"+this.GT + this.CR +vRet;
	vRet += "// "+this.LT +"/SCRIPT"+this.GT + this.CR;
	vRet += vPre + vArr[0] + ")";
	vOut = this.replaceString(vOut,"___INCLUDEQTEXT___",vRet);
	this.getElementById("tSAVEXML"+this.aQID).value = vOut;
};
//----End of Method saveIMathAS() Definition

//#################################################################
//# Method: saveArr2IMathAS(pArr,pPre,pJoin,pPost)
//#    used in Class: EProof__SID__
//#
//# Comment:  Save Content to IMathAS in Online Mode integrated in IMathAS
//#
//# created               3.3.2015
//# last modifications    __DATE__
//#################################################################
function saveArr2IMathAS_EProof__SID__(pArr,pPre,pJoin,pPost) {
	var vRet = "";
	if (pArr) {
		if (pArr.length != 0) {
			vRet = pPre +pArr.join(pJoin)+pPost;
		};
	};
	return vRet;
};
//----End of Method save2IMathAS() Definition
//#################################################################
//# Method: saveSol2StudAns()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    __DATE__
//#################################################################
function saveSol2IMathAS_EProof__SID__() {
	this.getIMathById("SOLUTION").value = this.createSol2IMathAS();
};
//#################################################################
//# Method: setAttribute4List
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function setAttribute4List_EProof__SID__(pRootNode,pListID,pAttribName,pValue) {
	var k=0;
	var vListID = pListID || new Array();
	while (k!=vListID.length) {
		//alert(vListID[k]);
		var vList = this.getChildrenByClassName(pRootNode,vListID[k]+this.aQID);
		var i=0;
		while (i != vList.length) {
			//alert("setAttribute4List()-Call ID="+vListID[k]);
			//alert("setAttribute4List()-Call ID="+vListID[k]+" Attribt="+pAttribName+" Value="+pValue);
			vList[i].setAttribute(pAttribName,pValue);
			i++;
		};
		k++
	};
	//alert("pRootNode.innerHTML=\n"+pRootNode.innerHTML);
};
//----End of Method setAttribute4List Definition

//#################################################################
//# Method: setClassName4Step
//#    used in Class: EProof__SID__
//#
//# Comment: set ClassName and ID for Step, optional add a prefix e.g. "imath"
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function setClassName4Step_EProof__SID__(pParentDOM,pPrefix,pStep) {
	//if (pStep=="0") alert("setClassName4Step(pStep="+pStep+")");
	//alert("setClassName4Step(pStep="+pStep+")")
	var vParent = null;
	var vName = "";
	var vNode = null;
	if (pParentDOM) {
		vParent = pParentDOM;
		//alert("(1) Rename ID="+vParent.id+"\nClassname '"+vParent.className+"' with '"+ pPrefix+"'");
		var i=0;
		while (i != vParent.children.length) {
			vNode = vParent.children[i];
			if (vNode.nodeType == 1) {
				if (vNode.className != "") {
					//alert("(1) Rename ID="+vNode.id+"\nClassname '"+vNode.className+"' with '"+ pPrefix+"'");
					vName = pPrefix + vNode.className;
					vNode.className = vName;
					if (vName != "") {
						vNode.id = vName + pStep;
					} else {
						vNode.id += pStep;
					}
					vNode.setAttribute("step", pStep);
					//alert("(2) Rename ID="+vNode.id+"\nClassname '"+vNode.className+"' with '"+ pPrefix+"'");
				}
				this.setClassName4Step(vNode,pPrefix,pStep);
			};
			i++;
		};
	} else {
		alert("setClassName4Step()-Call pParentDOM for Step="+pStep+" and Prefix "+pPrefix+" is undefined");
	};
	//alert("InnerHTML="+pParentDOM.innerHTML);
}


//#################################################################
//# Method: setStep4List
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function setStep4List_EProof__SID__(pRootNode,pListID,pStep) {
	var k=0;
	var vListID = pListID || new Array();
	while (k!=vListID.length) {
		//alert(vListID[k]);
		var vList = this.getChildrenByClassName(pRootNode,vListID[k]+this.aQID);
		var i=0;
		while (i != vList.length) {
			vList[i].id = vList[i].className + pStep;
			vList[i].setAttribute("step",pStep);
			i++;
		};
		k++
	};
	//alert("pRootNode.innerHTML=\n"+pRootNode.innerHTML);
};
//----End of Method setStep4List Definition

//#################################################################
//# Method: set_values(pHashArray)
//#    used in Class: EProof__SID__
//#
//# Comment: Use Hash to Set Values in DOM. Hash IDs are ID names of DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function set_values_EProof__SID__(pStep,pHashArray) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:set_values(pStep,pHashArray)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.set_values(pStep,pHashArray);
	//-------------------------------------------------------
	var vNode = null;
	for (var iName in pHashArray) {
		vNode = this.getElementById(iName+this.aQID+pStep);
		//alert("set_values()-Call:3539 iName='"+iName+"'");
		if (vNode) {
			vNode.value = pHashArray[iName];
		} else {
			alert("set_values()-Call: DOM-Object with ID='"+iName+"' is not defined!");
		}
	}
};
//----End of Method set_values() Definition

//#################################################################
//# Method: toggleAllJustifications(pStep)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function showAllJustifications_EProof__SID__(pButtonDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
    //alert("showAllJustifications()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.showAllJustifications(pButtonDOM);
	//-------------------------------------------------------
	if (!pButtonDOM) {
		alert("Justification-Button is not defined in toggleAllJustification()");
	} else {
		// vSA=Student Answer Node
		var vSA = this.getParentStudentAnswer(pButtonDOM);
		var vStep = this.getChildByClassName(vSA,"STEPNR"+this.aQID).value;
		//alert("showAllJustifications()-Call for vStep="+vStep);
		var st = this.aQID+vStep;
		var vID = this.getChildById(vSA,"inSTEPID"+st).value;
		var vOutNode = this.getChildById(vSA,"editJUSTIFICATIONS"+st);
		var vIDhash = this.getCheckedJustifications(pButtonDOM);
		var vAppJust = this.getChildById(vSA,"appendJUSTIFICATION"+st).value;
		//alert("showAllJustifications()-Call for vOrgIDs="+vIDhash["OrgIDs"]);
		var vSelJust = this.getAllJustIDs();
		//alert("vSelJust="+vSelJust+"\nshowAllJustifications():5265");
		var vCheckBox = true;
		vOutNode.innerHTML = this.createJustifications(vIDhash["OrgIDs"],vSelJust,vAppJust,vCheckBox,this.aMappedID[vID]);
	};
};
//----End of Method toggleJustifications Definition

//#################################################################
//# Method: show(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function show_EProof__SID__(pID,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.show();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getElementById(pID);
	this.showNode(vNode,pDisplay);
};
//----End of Method show() Definition
//#################################################################
//# Method: showSA(pSA,pID,pDisplay)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function showSA_EProof__SID__(pSA,pID,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.show();
	//-------------------------------------------------------
	var vNode = this.getChildById(pSA,pID);
	this.showNode(vNode,pDisplay);
};
//----End of Method show() Definition
//#################################################################
//# Method: showDebug(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function showDebug_EProof__SID__(pBoolean,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:showDebug()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.showDebug();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vArr = this.getChildrenByClassName(this.aRootDOM,"SELECTFROM"+this.aQID);
	//alert("vArr.length="+vArr.length);
	this.showHideArray(vArr,"1",pDisplay);
	var vArr = this.getChildrenByClassName(this.aRootDOM,"SELECTFROM"+this.aQID);
	var vNode = document.getElementById("iMathASINOUT"+this.aQID);
	this.showNode(vNode);
};
//----End of Method showDebug() Definition
//#################################################################
//# Method: showHideBoolean(pID,pBoolean)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function showHideBoolean_EProof__SID__(pID,pBoolean,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.showHideBooelan(pID,pBooelan);
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getElementById(pID);
	if (pBoolean == "1") {
		//alert("SHOW: showHideBoolean('"+pID+"','"+pBoolean+"')");
		this.showNode(vNode,pDisplay);
	} else {
		//alert("HIDE: showHideBoolean('"+pID+"','"+pBoolean+"')");
		this.hideNode(vNode);
	}
};
//----End of Method showHideBoolean() Definition
//#################################################################
//# Method: showHideNodeBoolean(pID,pBoolean)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function showHideNodeBoolean_EProof__SID__(pNode,pBoolean,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.showHideBooelan(pNode,pBoolean);
	//-------------------------------------------------------
	if (pBoolean == "1") {
		//alert("SHOW: showHideNodeBoolean(pNode.id='"+pNode.id+"','"+pBoolean+"')");
		this.showNode(pNode,pDisplay);
	} else {
		//alert("HIDE: showHideNodeBoolean(pNode.id='"+pNode.id+"','"+pBoolean+"')");
		this.hideNode(pNode);
	}
};
//----End of Method showHideNodeBoolean() Definition
//#################################################################
//# Method: showHideArray(pArray,pBoolean)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function showHideArray_EProof__SID__(pArray,pBoolean,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.showHideArray(pArray,pBoolean);
	//-------------------------------------------------------
	var i=0;
	if (pBoolean = "1") {
		while (i != pArray.length) {
			this.showNode(pArray[i],pDisplay);
			i++;
		}
	} else {
		while (i != pArray.length) {
			this.hideNode(pArray[i]);
			i++;
		}
	}
};
//----End of Method showHideNodeBoolean() Definition
//#################################################################
//# Method: showHelpLanguage()
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function showHelpLanguage_EProof__SID__ () {
	var vLang = this.aSettings["LANGUAGE"];
	//alert("showHelpLanguage('"+vLang+"')");
	if (vLanguageSelect[vLang]) {
		vLanguage = vLanguageSelect[vLang];
	} else {
		if (vLang == "") {
			vLanguage = vLanguageSelect["EN"];
			vLang = "EN";
		} else {
			alert("Language '"+vLang+"' is undefined, please add a new translation in language.js");
		}
	};
	for (var iLang in vLanguageSelect) {
		this.hide("HELP_EN"+this.aQID);
	};
	this.show("HELP_"+vLang+this.aQID);
};

//#################################################################
//# Method: showNode(pNode)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function showNode_EProof__SID__(pNode,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.showNode(pNode);
	//-------------------------------------------------------
	var vDisplay = pDisplay || "inline";
	if (pNode) {
		pNode.style.display = vDisplay;
		//pNode.style.display = "inline"; // "block"
		pNode.style.visibility = "visible";
	};
};
//----End of Method showNode() Definition

//#################################################################
//# Method: shuffleSteps(pStepType)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function shuffleSteps_EProof__SID__(pStepType) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:show()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.shuffleSteps(pStepType);
	//-------------------------------------------------------
	//load IMathAS ProofStep Content and split into Array
	//alert("shuffleSteps('"+pStepType+"')");
	var vNode = this.getIMathById(pStepType);
	var vArr = (vNode.value).split(this.CR);
	//shuffle Array
	var vArrRandom = this.shuffle(vArr);
	vNode.value = vArrRandom.join(this.CR);
	//alert(vNode.value);
};
//----End of Method shuffleSteps() Definition
//#################################################################
//# Method: toggle(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function toggle_EProof__SID__(pID,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:toggle()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggle();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = document.getElementById(pID);
	if (vNode) {
		this.toggleNode(vNode,pDisplay);
	} else {
		alert("'"+pID+"' does not exist");
	}
};
//----End of Method toggle() Definition
//#################################################################
//# Method: toggle(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function toggleSA_EProof__SID__(pSA,pID,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:toggle()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggle();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getChildById(pSA,pID);
	if (vNode) {
		this.toggleNode(vNode,pDisplay);
	} else {
		alert("toggle('"+pID+"') Node does not exist");
	}
};
//----End of Method toggleSA() Definition

//#################################################################
//# Method: toggleNode(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function toggleNode_EProof__SID__(pNode,pDisplay) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:toggleNode()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleNode(pNode);
	//-------------------------------------------------------
	var vDisplay = pDisplay || "inline";
	if (pNode) {
		if (pNode.style.display=="none") {
			//alert("SHOW "+pNode.id);
			this.showNode(pNode,pDisplay);
			//pNode.style.visibility = "visible";
			//pNode.style.display = vDisplay;
		} else {
			//alert("HIDE "+pNode.id);
			this.hideNode(pNode);
			//pNode.style.visibility = "hidden";
			//pNode.style.display = "none";
		}
	} else {
		alert("ERROR: toggleNode()-Call - pNode does not exist");
	}
};
//----End of Method toggleNode() Definition

//#################################################################
//# Method: toggleAuthoringMode(pMode,pNoVis4Proof)
//#    used in Class: EProof__SID__
//#
//# Comment: pMode = "1" or "0"   pNoVis4Proof="1" or null
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleAuthoringMode_EProof__SID__(pMode,pNoVis4Proof) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
    //alert("Call toggleAuthoringMode('"+pMode+"')-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleeAuthoringMode(pButtonDOM);
	//-------------------------------------------------------
	// toggleButtonMode(pSettingID,pInfoONOFF,pAlertText,pToogleID,pMode,pDisplay,pNoVis4Proof)
	var vBool = this.toggleButtonMode("AuthoringMode","infoAUTHORMODE","Authoring Mode","",pMode,"block",pNoVis4Proof);
	//-------------------------------------------------------
	//SHOW-HIDE: Elements per Step
	var vPerClass = new Array("mapPREVIOUSLINK","labelOPTJUSTIFICATION","optJUSTIFICATION");
	//,"EDITPROOFSTEP","EDITCONCLUSION","EDITPRECONDITION","EDITJUSTIFICATION"
	var vSA = this.getUsedSteps();
	var i=0;
	var vStep = 0;
	var vNode;
	while (i != vSA.length) {
		vStep = this.getStep4Index(i+1);
		//alert(vStep);
		var k=0;
		while (k != vPerClass.length) {
			vNode = this.getChildById(vSA[i],vPerClass[k]+this.aQID+vStep);
			this.showHideNodeBoolean(vNode,vBool);
			k++;
		};
		i++
	};
	//-------------------------------------------------------
	//SHOW-HIDE: Edit Steps with ID="EDIT-"+this.aQID+"-"+pID
	var vArr = this.unionarrays(this.aAllID,this.aID4StepType["JUSTIFICATION"]);
	var k=0;
	//alert("SHOW-HIDE EDIT-"+this.aQID+"-ID vArr.length="+vArr.length);
	while (k != vArr.length) {
		vNode = this.getChildById(this.aRootDOM,"EDIT-"+this.aQID+"-"+vArr[k]);
		this.showHideNodeBoolean(vNode,vBool);
		k++;
	};
	//-------------------------------------------------------
	//SHOW-HIDE: [+Step]-Buttons
	vArr = this.getChildrenByClassName(this.aRootDOM,"bAddStepID"+this.aQID);
	k=0;
	while (k != vArr.length) {
		this.showHideNodeBoolean(vArr[k],vBool);
		k++;
	};
	//-------------------------------------------------------
	vNode = this.getChildById(this.aRootDOM,"editTITLE"+this.aQID);
	this.showHideNodeBoolean(vNode,vBool);
	//-------------------------------------------------------
};
//----End of Method toggleAuthoringMode() Definition
//#################################################################
//# Method: toggleManualAssessment(pMode,pNoVis4Proof)
//#    used in Class: EProof__SID__
//#
//# Comment:      pMode = "1" or "0"
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleManualAssessment_EProof__SID__(pMode,pNoVis4Proof) {
	// toggleButtonMode(pSettingID,pInfoONOFF,pAlertText,pToogleID,pMode,pDisplay,pNoVis4Proof);
	this.toggleButtonMode("AssessmentMode","infoMANASSESS","Manual Assessment","outMYSTEPASSESS",pMode,"block",pNoVis4Proof);
};
//----End of Method toggleManualAsessment() Definition
//#################################################################
//# Method: toggleAssessmentButton(pMode,pNoVis4Proof)
//#    used in Class: EProof__SID__
//#
//# Comment:  pMode = "1" or "0"   pNoVis4Proof="1" or null
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleAssessmentButton_EProof__SID__(pMode,pNoVis4Proof) {
	// toggleButtonMode(pSettingID,pInfoONOFF,pAlertText,pToogleID,pMode,pDisplay,pNoVis4Proof)
	this.toggleButtonMode("show_assessment","infoASSESSBUTTON","Assessment Button","bAssessStep",pMode,"block",pNoVis4Proof);
	this.toggleButton("btAssessment","show_assessment");
};
//----End of Method toggleAssessmentButton() Definition
//#################################################################
//# Method: toggleSuggestionButton(pMode,pNoVis4Proof)
//#    used in Class: EProof__SID__
//#
//# Comment:  pMode = "1" or "0"   pNoVis4Proof="1" or null
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleSuggestionButton_EProof__SID__(pMode,pNoVis4Proof) {
	// toggleButtonMode(pSettingID,pInfoONOFF,pAlertText,pToogleID,pMode,pDisplay,pNoVis4Proof)
	//alert("eproofmeth.js:3023 - toggleSuggestionButton() pMode='"+pMode+"'");
	this.toggleButtonMode("show_suggestions","infoSUGGESTBUTTON","Suggestion Button","bSuggestion",pMode,"block",pNoVis4Proof);
	this.toggleButton("bSuggestionFirst","show_suggestions");
};
//----End of Method toggleSuggestionButton() Definition
//#################################################################
//# Method: toggleSolutionButton(pMode,pNoVis4Proof)
//#    used in Class: EProof__SID__
//#
//# Comment:    pMode = "1" or "0"   pNoVis4Proof="1" or null
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleSolutionButton_EProof__SID__(pMode,pNoVis4Proof) {
	// toggleButtonMode(pSettingID,pInfoONOFF,pAlertText,pToogleID,pMode,pDisplay,pNoVis4Proof)
	this.toggleButtonMode("show_proof_solution","infoSOLUTIONBUTTON","Solution Button","btSolution",pMode,"block",pNoVis4Proof);
	this.toggleButton("btSolution","show_proof_solution");
};
//----End of Method toggleSolutionButton() Definition
//#################################################################
//# Method: toggleButton(pButtonID,pSetID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleButton_EProof__SID__(pButtonID,pSetID) {
	if (this.aSettings[pSetID] == "1") {
		this.show(pButtonID+this.aQID);
	} else {
		this.hide(pButtonID+this.aQID);
	};
};
//#################################################################
//# Method: toggleButtonMode(pSettingID,pInfoONOFF,pAlert,pToogleID,pMode,pDisplay,pNoVis4Proof)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################
function toggleButtonMode_EProof__SID__(pSettingID,pInfoONOFF,pAlert,pToogleID,pMode,pDisplay,pNoVis4Proof) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
    // alert("vEProof__SID___.toggleManualAsessment()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleManualAsessment(pSettingID,pInfoONOFF,pMode);
	//-------------------------------------------------------
	if (pMode) {
		if (pMode == "1") {pMode = "0"} else {pMode = "1"};
		this.aSettings[pSettingID] = pMode;
	};
	var vInfo = this.getChildById(this.aRootDOM,pInfoONOFF+this.aQID);
	var vSA = this.getAllSteps();
	var i=0;
	if (this.aSettings[pSettingID] == "1") {
		this.aSettings[pSettingID] = "0";
		if (!pMode) {
			if (pNoVis4Proof != "1") {
				alert(pAlert+": OFF (0)");
			};
		};
		vInfo.innerHTML = "[OFF]";
		if (pToogleID != "") {
			while (i != vSA.length) {
				this.hideSA(vSA[i],pToogleID+this.aQID+(i+1));
				i++;
			}
		};
	} else {
		this.aSettings[pSettingID] = "1";
		if (!pMode) {
			if (pNoVis4Proof != "1") {
				alert(pAlert+": ON (1)");
			};
		};
		vInfo.innerHTML = "[ON]";
		if (pToogleID != "") {
			while (i != vSA.length) {
				this.showSA(vSA[i],pToogleID+this.aQID+(i+1));
				i++;
			}
		};
	};
	if (!pNoVis4Proof) {
		this.setVisibility4Proof();
	}
	return this.aSettings[pSettingID];
};
//----End of Method toggleButtonMode() Definition
//#################################################################
//# Method: toggleList(pButtonDOM)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function toggleList_EProof__SID__(pList1,pMode1,pList2,pMode2) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
    // alert("vEProof__SID___.toggleList()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleList(pButtonDOM);
	//-------------------------------------------------------
	if ((pMode1 == "0") && (pMode2 == "0")) {
		this.hideElement('btXPJ'+this.aQID);
	} else {
		this.visible('btXPJ'+this.aQID);
	};
	this.toggleSteps(pList1,pMode1);
	this.toggleSteps(pList2,pMode2);
};
//#################################################################
//# Method: toggleSteps(pList,pMode)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function toggleSteps_EProof__SID__(pList,pMode) {
	//------------------------------
	var vL = pList+"LIST"+this.aQID;
	if (pMode == "1") {
		this.show(vL);
	} else if (pMode == "T") {
		this.toggle(vL);
	} else {
		this.hide(vL);
	};
	var b = "bAddStep"+pList+this.aQID;
	if (this.aSettings["AuthoringMode"] == "1") {
		if (pMode == "1") {
			this.show(b);
		} else if (pMode == "T") {
			this.toggle(b);
		} else {
			this.hide(b);
		};
	} else {
		this.hide(b);
	};
}
//#################################################################
//# Method: toggleJustifications(pButtonDOM)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function toggleJustifications_EProof__SID__(pButtonDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
    // alert("vEProof__SID___.toggleJustifications()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleJustifications(pButtonDOM);
	//-------------------------------------------------------
	if (!pButtonDOM) {
		alert("Justification-Button is not defined in toggleJustification()");
	} else {
		var vSA = this.getParentStudentAnswer(pButtonDOM);
		var vStepIDList = this.getChildrenByClassName(vSA,"sSTEPID"+this.aQID);
		var vStep = vStepIDList[0].getAttribute("step");
		// "true" means update the Checkboxes: this.updateJustifications(pButtonDOM,true);
		var vName = "JUSTIFICATIONS"+this.aQID+vStep;
		var vNode = this.getChildById(vSA,"edit"+vName);
		if (vNode.style.display=="none") {
			vNode.innerHTML = this.createEditJustificationsStep(vStep);
		} else {
			var vReadCheckboxes = true;
			this.updateJustifications(pButtonDOM,vReadCheckboxes);
			this.updateIMathById("JUSTIFICATION");
			this.updateIMathById("STUDENTANSWER");
			var vOut = this.saveEProof2Form();
		};
		//this.updateJustifications(vStepIDList[0]);
		//alert("pButtonDOM.step="+vStep);
		//alert("toggleJustifications(this) vStep="+vStep);
		//this.createJustification();
		this.toggleSA(vSA,"edit"+vName);
		this.toggleSA(vSA,"display"+vName);
		this.hideSA(vSA,"assessSTUDENTANSWER"+this.aQID+vStep);
		this.hideSA(vSA,"SUGGESTIONS"+this.aQID+vStep);
	};
};
//----End of Method toggleJustifications Definition
//#################################################################
//# Method: toggleSuggestionAppend(pButtonDOM)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               3.3.2015
//# last modifications    3.3.2015
//#################################################################

function toggleSuggestionAppend_EProof__SID__(pButtonDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
    // alert("vEProof__SID___.toggleJustifications()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleSuggestionAppend(pButtonDOM);
	//-------------------------------------------------------
	if (!pButtonDOM) {
		alert("Suggestion-Button is not defined in toggleSuggestionAppend()");
	} else {
		var vSAList = this.getUsedSteps(); //this.getChildrenByClassName(this.aUsedDOM,"STUDENTANSWER"+this.aQID);
		//alert("vSAList.length="+vSAList.length);
		var vStep = "0";
		if (vSAList.length != 0) {
			var vStudentAnswerNode = vSAList[vSAList.length-1];
			var vStepIDList = this.getChildrenByClassName(vStudentAnswerNode,"sSTEPID"+this.aQID);
			vStep = vStepIDList[0].getAttribute("step");
		}
		//alert("pButtonDOM.step="+vStep);
		this.toggleSuggestionStep(vStep);
	};
};
//----End of Method toggleSuggestionAppend Definition

//#################################################################
//# Method: toggleSuggestion(pButtonDOM)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function toggleSuggestion_EProof__SID__(pButtonDOM) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:toggleSuggestion()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleSuggestion(pButtonDOM);
	//-------------------------------------------------------
	var vStep = pButtonDOM.getAttribute("step");
	var vSugStep = this.getElementById("stepSUGGESTION"+this.aQID+vStep).value;
	this.toggleSuggestionStep(vSugStep);
};
//----End of Method toggleSuggestion() Definition
//#################################################################
//# Method: toggleSuggestionStep(pStep)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function toggleSuggestionStep_EProof__SID__(pStep) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:toggleSuggestion()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.toggleSuggestionStep(pStep);
	//-------------------------------------------------------
	var vNode = this.getElementById("SUGGESTIONS"+this.aQID+pStep);
	if (vNode.style.display=="none") {
		if (this.aSettings["AssessmentMode"] != "1") {
			this.getElementById("inSUGGESTIONSUSED"+this.aQID+pStep).value++;
			this.updateIMathById("STUDENTANSWER");
			var vOut = this.saveEProof2Form();
		};
		this.createSuggestionStep(pStep);
	};
	this.hide("assessSTUDENTANSWER"+this.aQID+pStep);
	this.toggleNode(vNode);
};
//----End of Method toggleSuggestion() Definition

//#################################################################
//# Method: update(pInArray)
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function update_EProof__SID__(pInArray) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:update(pInArray)-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.update(pInArray);
	//-------------------------------------------------------
	var vChildList = this.getChildrenByClassName(this.aUsedDOM,this.aChildClassName);
	var i=0;
	if (vChildList.length == pInArray.length) {
		while (i != pInArray) {
			//--- pInArray[i] is again a HashArray with DOM ObjectIDs as IDs----
			//---pInArray[i]["sCONNECTION"]="Typ"---
			this.set_values(pInArray[i],i);
			i++;
		}
	} else {
		alert("ERROR update(): Incompatible length of pInArray and ChildList");
	}
};
//----End of Method update() Defupdateion

//#################################################################
//# Method: updateInput()
//#    used in Class: EProof__SID__
//#
//# Comment: Updates all Proof Steps
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function updateInput_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:updateInput()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.updateInput();
	//-------------------------------------------------------
	//this.updateUsedIDs();
	var vUsedNodes   = this.getUsedSteps();
	this.setStepCount(vUsedNodes.length);
	//alert("updateInput() - 1.0");
	this.updateIMathById("STEPCOUNT");
	//alert("updateInput() - 2.0");
	this.updateIMathById("STUDENTANSWER");
	//alert("updateInput() - 3.0");
	var vOut = this.saveEProof2Form();
    //alert("updateInput() - 4.0");
	this.append_PreviousStep_Justification();
	//alert("updateInput() - 5.0");
};
//----End of Method updateInput() Defupdateion
//#################################################################
//# Method: updateProof2IMath()
//#    used in Class: EProof__SID__
//#
//# Comment: Updates all Proof Steps
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function updateProof2IMath_EProof__SID__() {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproofmeth.js:2842 - updateProof2IMath()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.updateInput();
	//-------------------------------------------------------
	//this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP","SOLUTION","ENCRYPTED");
	var i = 0;
	while (i != this.aIMathArray.length) {
		this.updateIMathById(this.aIMathArray[i]);
		i++;
	};
	this.calcAssessment(0); //Add 0 to Used Counter of Assessment
};
//----End of Method updateInput() Defupdateion
//#################################################################
//# Method: updateIMathByI(pFormID)
//#    used in Class: EProof__SID__
//#
//# Comment: Is called from Checkboxes to update the Justifications
//#          for a single Proof Step. pChildSA ist the Button-Object.
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
 function updateIMathById_EProof__SID__ (pFormID) {
	var vOutNode = this.getIMathById(pFormID);
	//this.aIMathArray = new Array("DISPLAYOPTION","STEPCOUNT","STUDENTANSWER","PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP","SOLUTION","ENCRYPTED","SETTINGS");
	var vValue = "";
	if (vOutNode) {
		if (pFormID == "STEPCOUNT") {
			vValue = this.getElementById("sSTEPCOUNT"+this.aQID).value;
		} else if (pFormID == "DISPLAYOPTION") {
			vValue = this.getElementById("sDISPLAYOPTION"+this.aQID).value;
		} else if (pFormID == "STUDENTANSWER") {
			vValue = this.createStudentAnswer2IMathAS();
		} else if (pFormID == "SOLUTION") {
			vValue = this.createSolution2Form();
		} else if (pFormID == "ENCRYPTED") {
			vValue = this.rotEncode(this.createSolution2Form());
		} else if (pFormID == "SETTINGS") {
			vValue = this.createIMathSettings();
			//alert("SETTINGS="+vValue);
		} else {
			if (this.aID4StepType[pFormID]) {
				vValue = "";
				var i=0;
				var vArrID = this.aID4StepType[pFormID];
				var vCR = "";
				while (i != vArrID.length) {
					if (this.aAllID2RAW[vArrID[i]]) {
						vValue += vCR + vArrID[i] + this.aSeparator + this.encodeValue(this.aAllID2RAW[vArrID[i]]);
						vCR = this.CR;
					};
					i++;
				}
			} else {
				alert("ERROR: updateIMathById('"+pFormID+"') FormID undefined!");
			}
		};
		vOutNode.value = vValue;
	}
};
//#################################################################
//# Method: updateAllJustifications()
//#    used in Class: EProof__SID__
//#
//# Comment: Is called from Checkboxes to update the Justifications
//#          for a single Proof Step. pChildSA is the Button-Object.
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
// pChildSA is a Child of StudentAnswer
function updateAllJustifications_EProof__SID__() {
	var vStep =0;
	var vChildSA = null;
	var vUpdateEdit = false;
	while (vStep != this.aCount) {
		vStep++;
		vChildSA = this.getElementById("displayJUSTIFICATIONS"+this.aQID+vStep);
		var vButton = this.getElementById("bJustifications"+this.aQID+vStep);
		this.toggleJustifications(vButton);
		if (vChildSA.style.display=="none") {
			this.toggleJustifications(vButton);
		};
	}
};
//#################################################################
//# Method: updateSettingValue(pInputDOM)
//#    used in Class: EProof__SID__
//#
//# Comment: Updates all Proof Steps
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function updateSettingValue_EProof__SID__ (pInputDOM) {
	var vName = (pInputDOM.id).replace(/^SET_/,"");
	//alert("updateSettingValue("+vName+")='"+pInputDOM.value+"' :2576");
	this.aSettings[vName] = this.encodeValue(pInputDOM.value);
};
//#################################################################
//# Method: updateSettings2Form()
//#    used in Class: EProof__SID__
//#
//# Comment: Updates all Proof Steps
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function updateSettings2Form_EProof__SID__ () {
	//alert("updateSettings2Form():2815");
	var vValue = "";
	for (var iID in this.aSettings) {
		var vNode = this.getElementById("SET_"+iID);
		if (vNode) {
			vValue = this.aSettings[iID] || "";
			vNode.value = this.decodeValue(vValue);
		} else {
			//this.alertDOM("SET_"+iID+" is undefined!");
		};
	};
};
//#################################################################
//# Method: updateJustifications(pChildSA)
//#    used in Class: EProof__SID__
//#
//# Comment: Is called from Checkboxes to update the Justifications
//#          for a single Proof Step. pChildSA ist the Button-Object.
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
// pChildSA is a Child of StudentAnswer
function updateJustifications_EProof__SID__(pChildSA,pUpdateEdit) {
	var vSA = this.getParentStudentAnswer(pChildSA);
	var vIDList = "";
	var vOrgIDList = "";
	var vID = "";
	var vInputIDs = this.getChildByClassName(vSA,"inJUSTIFICATION"+this.aQID);
	var vOutputIDs = this.getChildByClassName(vSA,"outJUSTIFICATIONID"+this.aQID);
	var vSelectFromIDs = this.getChildByClassName(vSA,"selectJUSTIFICATION"+this.aQID);
	var vAppendJustIDs = this.getChildByClassName(vSA,"appendJUSTIFICATION"+this.aQID);
	var vOutputDisplay = this.getChildByClassName(vSA,"displayJUSTIFICATIONS"+this.aQID);
	if (!vInputIDs) {
		alert("Error: updateJustifications()-Call - vInputIDs not defined");
	} else 	if (!vOutputIDs) {
		alert("Error: updateJustifications()-Call - vOutputIDs not defined");
	} else 	if (!vSelectFromIDs) {
		alert("Error: updateJustifications()-Call - vSelectFromIDs not defined");
	} else 	if (!vOutputDisplay) {
		alert("Error: updateJustifications()-Call - vOutputDisplay not defined");
	} else {
		var vIDhash = this.getCheckedJustifications(pChildSA);
		var vID = this.getChildByClassName(vSA,"inSTEPID"+this.aQID).value;
		//alert("Justification ID-List=["+vIDhash["IDs"]+"]");
		vInputIDs.value = vIDhash["OrgIDs"];
		vOutputIDs.innerHTML = "["+vIDhash["IDs"]+"]"; //XXX
		vOutputDisplay.innerHTML = this.createJustifications(vIDhash["OrgIDs"],vSelectFromIDs.value,vAppendJustIDs.value,false,this.aMappedID[vID]);
		if (pUpdateEdit) {
			var vOutputEdit = this.getChildByClassName(vSA,"editJUSTIFICATIONS"+this.aQID);
			vOutputEdit.innerHTML = this.createJustifications(vIDhash["OrgIDs"],vSelectFromIDs.value,vAppendJustIDs.value,true,this.aMappedID[vID]);
		};
		//this.processMathNode(vOutputList[0]);
	}
};
//#################################################################
//# Method: updateStep(pStep)
//#    used in Class: EProof__SID__
//#
//# Comment: update Connection and Justifications from
//#          sCONNECTION and inJUSTIFICATION
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function updateStep_EProof__SID__(pStep) {
	var vSA = this.getElementById("STUDENTANSWER"+this.aQID+pStep);
	var vOutConNode = this.getElementById("outCONNECTION"+this.aQID+pStep);
	var vConSA = this.getElementById("sCONNECTION"+this.aQID+pStep);
	//alert("updateStep("+pStep+"):4360 - vConSA exists");
	//alert("updateStep("+pStep+"):4360 - vConSA.value="+vConSA.value);
	vOutConNode.innerHTML = this.vConnection2Node[vConSA.value].innerHTML;
	var vUpdateEdit = true;
	this.updateJustifications(vConSA,vUpdateEdit);
};
//#################################################################
//# Method: updateTextArea(pChildSA)
//#    used in Class: EProof__SID__
//#
//# Comment: Use innerHTML to erase all sub nodes in DOM
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function updateTextarea_EProof__SID__(pChildSA) {
  var vStep = pChildSA.getAttribute("step");
  var vID  = this.getElementById("inSTEPID"+this.aQID+vStep).value;
  var vNodeStepDef = this.getElementById("EDITSTEP-"+this.aQID+"-"+vID);
  var vNodeEditor   = document.getElementById(this.vEditorID +this.aQID+ vStep);
  var vValue = vNodeEditor.value;
  this.aAllID2RAW[vID] = this.encodeTextarea(vValue);
  vOutNode = this.getElementById("ID-"+this.aQID+"-"+vID);
  vOutNode.innerHTML = vValue;
  this.processMathNode(vOutNode);
  this.writeInnerHTML4Step(vStep,"outSTEPDEF"+this.aQID,vOutNode.innerHTML);
  eval(decodeURI("vValue=vValue.replace(/%5Cn/g,%22__n__%22)"));
  //alert(decodeURI("vValue%20=%20vValue.replace(/%5Cn/g,%22__n__%22);"));
  vNodeStepDef.value = vValue;
  this.processMathNode(vOutNode);
  //this.updateStepEdit(pStep);
};
//#################################################################
//# Method: updateTitle()
//#    used in Class: EProof__SID__
//#
//# Comment: updates the Title and Label of the Title
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################
function updateTitle_EProof__SID__() {
	var vLabel = this.getElementById("THEOREMLABEL"+this.aQID);
	var vTitle = this.getElementById("THEOREMTITLE"+this.aQID);
	var vSettingTitle = this.getElementById("SETTINGTHEOREMTITLE"+this.aQID);
	var vEditLabel = this.getElementById("editTHEOREMLABEL"+this.aQID);
	var vEditTitle = this.getElementById("editTHEOREMTITLE"+this.aQID);
	vLabel.innerHTML = vEditLabel.value;
	vTitle.innerHTML = vEditTitle.value;
	this.aSettings["Theorem_Label"] = vEditLabel.value;
	this.aSettings["Theorem_Title"] = vEditTitle.value;
	this.processMathNode(vTitle);
	vSettingTitle.innerHTML = vLabel.innerHTML+": "+vTitle.innerHTML;
};
//#################################################################
//# Method: visible(pID)
//#    used in Class: EProof__SID__
//#
//# Comment:
//#
//# created               24.2.2015
//# last modifications    __DATE__
//#################################################################

function visible_EProof__SID__(pID) {
	//----Debugging------------------------------------------
	// The following alert-Command is useful for debugging
	//alert("eproof.js:visible()-Call")
	//----Create Object/Instance of EProof__SID__----
	//    var vMyInstance = new EProof__SID__();
	//    vMyInstance.visible();
	//-------------------------------------------------------
	//var vNode = this.aUsedDOM;
	var vNode = this.getChildById(this.aRootDOM,pID);
	vNode.style.visibility = "visible";
};
//----End of Method visible() Definition
