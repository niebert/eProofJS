//--------------------------------------------
//----DEFINITION of CONSTANTS-----------------
//--------------------------------------------
var vQID = vSettings["vQID"];
var ThisQ = vSettings["ThisQ"];
var vLink_Screencast = "http://e-proof.weebly.com/german-tutorials.html";
var vLink_Tutorial   = "http://math.uni-landau.de/download/IMathAS/eProof_iMathAS_Tutorial.pdf";
var vMaxQuestionPart = 6;
var vUpdateEdit = 0;
var CR = String.fromCharCode(10); //newline symbol /n
var GT = String.fromCharCode(62); //greater than symbol >
var LT = String.fromCharCode(60); //lower than symbol >
var AP = String.fromCharCode(96); //IMathAS Apostrophe
var vStepMap  = new Array();
var vEditorID = "XmceEditor";
var vUpdateButton = "<input type='button' name='bUpdate"+vQID+"' value=' Update ' onclick=\"updateInput2IMathAS(this.form)\">";
var vSpace =  " &nbsp;&nbsp; " 
var vConnection2Index = new Array();
var vConnectionArray = new Array("???","TYP"," ","="+GT,"=",LT+"=",LT,GT+"=",GT,"subseteq","DEF","TEXT","q.e.d.");
var vConnectionName = new Array();
vConnectionName.push(vLanguage["Connection"] + "?");
var vNr = 1;
vConnection2Index["TYP"] = vNr;
vConnectionName.push(vLanguage["Type"]);
vNr++;
vConnection2Index[" "] = vNr; //START: Beweissequenz
vConnectionName.push("START: "+vLanguage["ProofSequence"]);
vNr++;
vConnection2Index["="+GT] = vNr;
vConnectionName.push(vLanguage["Implication"]);
vNr++;
vConnection2Index['='] = vNr;
vConnectionName.push(vLanguage["Equality"]);
vNr++;
vConnection2Index[LT+"="] = vNr;
vConnectionName.push(vLanguage["lower_equal"]);
vNr++;
vConnection2Index[LT] = vNr;
vConnectionName.push(vLanguage["lower"]);
vNr++;
vConnection2Index[GT+'='] = vNr;
vConnectionName.push(vLanguage["greater_equal"]);
vNr++;
vConnection2Index[GT] = vNr;
vConnectionName.push(vLanguage["greater"]);
vNr++;
vConnection2Index['subseteq'] = vNr;
vConnectionName.push(vLanguage["Subset"]);
vNr++;
vConnection2Index['DEF'] = vNr;
vConnectionName.push("Definition " + vLanguage["of"] + " "+ vLanguage["Variables"]);
vNr++;
vConnection2Index['TEXT'] = vNr;
vConnectionName.push("Text "+vLanguage["or"] + " "+ vLanguage["Comment"]);
vNr++;
vConnection2Index['q.e.d.'] = vNr;
vConnectionName.push('q.e.d.');
if (vSetting["AuthoringMode"] == "1") {
	vNr++;
	vConnection2Index['LINKNODE'] = vNr;
	vConnectionName.push('LINKNODE');
}
//--------------------------------------------
//#################################################################
//# Method: appendNewStep(pMaxSteps)  
//#################################################################
function appendNewStep(pMaxSteps) {
	var iIndex = updateNewStep(pMaxSteps);
	//alert("iIndex="+iIndex+"pMaxSteps="+pMaxSteps);
	if (greater(iIndex,0)) {
		moveStep(iIndex,0);
		var vNewNodeID   = document.getElementsByClassName("newsSTEP"+vQID)[0]; 
		var vNewNodeCon  = document.getElementsByClassName("newsCONNECTION"+vQID)[0]; 
		//alert("vNodeID.id="+vNodeID.id);
		vNewNodeID.value = "???";
		vNewNodeCon.value = 0;
	} else {
		alertDOM("Creating a new Step 'newSTEP"+vQID+" was not sucessful! - appendNewStep()-Call");
	};
}
//#################################################################
//# Method: updateNewStep(pMaxSteps)  
//#################################################################
function updateNewStep(pMaxSteps) {
	var vRet = -1;
	var vNewNodeID = document.getElementById("newsSTEP"+vQID);
	var vStudentAnswerList = document.getElementsByClassName("STUDENTANSWER"+vQID);
	if (vNewNodeID) {
		var vID = vNewNodeID.value;
		if (vID != "???") {
			var iIndex = getStepIndex4ID(vID);
			if (iIndex == -1) {
				alert("ID '"+vID+"' does not exist in e-Proof!");
			} else {
				var vStudentAnswer = vStudentAnswerList[iIndex-1];
				var vEditStudentAnswer = vStudentAnswer.getElementsByClassName("editSTUDENTANSWER"+vQID)[0];
				var vNodeID   = vEditStudentAnswer.getElementsByClassName("sSTEP"+vQID)[0]; 
				var vNodeCon  = vEditStudentAnswer.getElementsByClassName("sCONNECTION"+vQID)[0]; 
				var vNewNodeID   = document.getElementsByClassName("newsSTEP"+vQID)[0]; 
				var vNewNodeCon  = document.getElementsByClassName("newsCONNECTION"+vQID)[0]; 
				//alert("vNodeID.id="+vNodeID.id);
				vNodeID.value = vNewNodeID.value;
				vNodeCon.value = vNewNodeCon.value;
				vRet = iIndex;
			}
		} else {
			alert("vNewNodeID.value='???' no append");
		}
	} else {
		alertDOM("DOM-Node 'newSTEP"+vQID+" does not exist! - appendNewStep()-Call");
	};
	return vRet;
}
//#################################################################
//# Method: greater(a,b)
//#################################################################
function greater(a,b) {
  //var vReturn = (a>b);
  eval(decodeURI("var vReturn%20=%20(a%3Eb);"));
  return vReturn;
}
//#################################################################
//# Method: lower(a,b)
//#################################################################
function lower(a,b) {
  //var vReturn = (a<b);
  eval(decodeURI("vReturn%20=%20(a%3Cb);"));
  return vReturn;
}
//#################################################################
//# Method: toggleHide(pObjectID)
//#################################################################
function toggleHide(pObjectID) {
	//alert("pObjectID="+pObjectID);
	var vNode = document.getElementById(pObjectID);
	if (!vNode) {
		alertDOM("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
	} else {
		//alert("vNode.id="+vNode.id);
		//ii(vNode.style.visibility=="hidden") {
		//if (vNode.style.visibility=="visible") {
		if (vNode.style.display=="none") {
			//alert("SHOW "+pObjectID);
			vNode.style.visibility = "visible";
			vNode.style.display = "block";
		} else {
			//alert("HIDE "+pObjectID);
			vNode.style.visibility = "hidden";
			vNode.style.display = "none";
		}
	}  
}
//#################################################################
//# Method: toggleElementHide(pObjectID)
//#################################################################
function toggleElementHide(pObjectID) {
	//alert("pObjectID="+pObjectID);
	var vNode = document.getElementById(pObjectID);
	if (!vNode) {
		alertDOM("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
	} else {
		//alert("vNode.id="+vNode.id);
		if (vNode.style.visibility=="hidden") {
			//alert("SHOW "+pObjectID);
			vNode.style.visibility = "visible";
			//vNode.style.display = "block";
		} else {
			//alert("HIDE "+pObjectID);
			vNode.style.visibility = "hidden";
			//vNode.style.display = "none";
		}
	}  
}
//#################################################################
//# Method: hideElement(pObjectID)
//#################################################################
function hideElement(pObjectID) {
	//alert("pObjectID="+pObjectID);
	var vNode = document.getElementById(pObjectID);
	if (!vNode) {
		alertDOM("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
	} else {
		//vNode.style.display = "none";
		vNode.style.visibility = "hidden";
	}   
}
//#################################################################
//# Method: showElement(pObjectID)
//#################################################################
function showElement(pObjectID) {
	//alert("pObjectID="+pObjectID);
	var vNode = document.getElementById(pObjectID);
	if (!vNode) {
		alertDOM("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
	} else {
		//vNode.style.display = "block";
		vNode.style.visibility ="visible";
	}   
}
//#################################################################
//# Method: hideObject(pObjectID)
//#################################################################
function hideObject(pObjectID) {
	//alert("pObjectID="+pObjectID);
	var vNode = document.getElementById(pObjectID);
	if (!vNode) {
		alertDOM("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
	} else {
		vNode.style.display = "none";
		vNode.style.visibility = "hidden";
	} 
}
//#################################################################
//# Method: showObject(pObjectID)
//#################################################################
function showObject(pObjectID) {
	//alert("pObjectID="+pObjectID);
	var vNode = document.getElementById(pObjectID);
	if (!vNode) {
		alertDOM("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
	} else {
		vNode.style.display = "block";
		vNode.style.visibility ="visible"
	}
}
//#################################################################
//# Method: hideEditLines(pCount)
//#################################################################
function hideEditLines(pCount) {
	var vListArray = document.getElementsByClassName("editSTUDENTANSWER"+vQID);
	//alert("vListArray.length="+vListArray.length);
	var vNr = 0;
	while (lower(vNr,pCount)) {
		vNr++;
		hideObject("editSTUDENTANSWER"+vQID+vNr);
	}
}
//#################################################################
//# Method: showEditLines(pCount)
//#################################################################
function showEditLines(pCount) {
	//var vListArray = document.getElementsByClassName("editSTUDENTANSWER");
	var vNr = 0;
	while (lower(vNr,pCount)) {
		vNr++;
		showObject("editSTUDENTANSWER"+vQID+vNr);
	}
}
//#################################################################
//# Method: setVisibility4Proof(pSelected,pForm)
//#################################################################
function setVisibility4Proof(pSelected,pForm) {
	var vNode = createNodeQN("Display Selector","qn"+ThisQ+"001");
	vNode.value = pSelected;
	if (pSelected=="Assessment") {
		updateInput2IMathAS(pForm);
		//pForm.submit();
		//alert("Submit Form");
	};
	setDisplayOptions();
}
//#################################################################
//# Method: setDisplayOptions(pStep,pNode,pCountUnused)
//#################################################################
function setDisplayOptions() {
	var vNode = createNodeQN("Display Selector","qn"+ThisQ+"001");
	vSelected = vNode.value;
	//alert("vSelected="+vSelected);
	var vListArray = document.getElementsByClassName("cVIEWJUSTIFICATION"+vQID);
	//-----SHORT---------------
	if (vSelected=="Short") {
		showObject("EDITPROOF"+vQID);
		showObject("STUDENTANSWERLIST"+vQID);
		showEditLines(vListArray.length);
		hideObject("ASSESSMENT"+vQID);
		hideObject("SOLUTION"+vQID);
		//alert("vListArray.length="+vListArray.length);
		setShortJustification(vListArray,true);
	//-----COMPLETE---------------
	} else 	if (vSelected=="Complete") {
		showObject("EDITPROOF"+vQID);
		showObject("STUDENTANSWERLIST"+vQID);
		showEditLines(vListArray.length);
		hideObject("ASSESSMENT"+vQID);
		hideObject("SOLUTION"+vQID);
		setShortJustification(vListArray,false);
	//-----HIDE-------------------
	} else 	if (vSelected=="Hide") {
		showObject("EDITPROOF"+vQID);
		showObject("STUDENTANSWERLIST"+vQID);
		hideEditLines(vListArray.length);
		hideObject("ASSESSMENT"+vQID);
		hideObject("SOLUTION"+vQID);
	//-----ASSESSMENT---------------
	} else 	if (vSelected=="Assessment") {
		showObject("ASSESSMENT"+vQID);
		hideObject("EDITPROOF"+vQID);
		hideObject("STUDENTANSWERLIST"+vQID);
		hideObject("SOLUTION"+vQID);
	//-----ASSESSMENT---------------
	} else 	if (vSelected=="Solution") {
		showObject("SOLUTION"+vQID);
		hideObject("EDITPROOF"+vQID);
		hideObject("ASSESSMENT"+vQID);
		hideObject("STUDENTANSWERLIST"+vQID);
    }
}
//#################################################################
//# Method: setShortJustification(pListArray,pBoolean)
//#################################################################
function setShortJustification(pListArray,pBoolean) {
	var i=0;
	while (lower(i,pListArray.length)) {
		//alert("pListArray[i].id="+pListArray[i].id);
		pListArray[i].checked = !(pBoolean);
		i++;
	};
	i = 0;
	while (lower(i,pListArray.length)) {
		i++;
		changeViewJustification(i);
	}
	//var vButtonArray = document.getElementsByClassName("bJUSTIFICATION");
	//var vInputArray = document.getElementsByClassName("inJUSTIFICATION");
	if (pBoolean) {
		i = 0;
		while (lower(i,pListArray.length)) {
			i++;
			hideElement("bJUSTIFICATION"+vQID+i);
			hideElement("inJUSTIFICATION"+vQID+i);
		}
	} else {
		i = 0;
		while (lower(i,pListArray.length)) {
			i++;
			showElement("bJUSTIFICATION"+vQID+i);
			showElement("inJUSTIFICATION"+vQID+i);
		}
	}
}
//#################################################################
//# Method: setVisibility4Unused()
//# Comment:  shows hides the [X]-Button and the [+]-Button                     
//#################################################################
function setVisibility4Unused() {
	var vListNode = document.getElementsByClassName("STUDENTANSWER"+vQID);
	var k=0;
	while (lower(k,vListNode.length)) {
		setVisibility4Step(vListNode[k]);
		k++;
	}
}
//#################################################################
//# Method: setVisibility4Step(pStudentAnswerNode)
//# Comment:  shows hides the [X]-Button and the [+]-Button                     
//#################################################################
function setVisibility4Step(pNode) {
    var vStep = getStep4NodeID(pNode.id);
	//alert("pNode.step="+vStep);
	//alert("setVisibility4Step -- pNode.parentNode.id="+pNode.parentNode.id);
	if (pNode.parentNode.id == "UNUSEDSTEPS"+vQID) {
		//alert("[+] visible");
		hideElement("bDelete"+vQID+vStep);
		hideElement("bJUSTIFICATION"+vQID+vStep);
		hideElement("inJUSTIFICATION"+vQID+vStep);
		hideElement("sCONNECTION"+vQID+vStep);
		hideElement("sSTEP"+vQID+vStep);
		showElement("bUseStep"+vQID+vStep);
		//hideObject("bDelete"+vStep);
		//showObject("bUseStep"+vStep);
	} else {
		//alert("[+] not visible [X] visible");
		showElement("bDelete"+vQID+vStep);
		showElement("bJUSTIFICATION"+vQID+vStep);
		showElement("inJUSTIFICATION"+vQID+vStep);
		showElement("sCONNECTION"+vQID+vStep);
		showElement("sSTEP"+vQID+vStep);
		hideElement("bUseStep"+vQID+vStep);
		//showObject("bDelete"+vStep);
		//hideObject("bUseStep"+vStep);
	};
	setDisplayOptions();
	var vUnused4Proof = document.getElementById("UNUSEDSTEPS"+vQID);
	var vUnusedList = vUnused4Proof.getElementsByClassName("STUDENTANSWER"+vQID);
	var vCountUnused = vUnusedList.length;
	if (greater(vCountUnused,0)) {
		showElement("bToggleUnused"+vQID); //"+vQID+"
	} else {
		hideElement("bToggleUnused"+vQID);
	}
}
//#################################################################
//# Method: getHideStepIDs()  
//#################################################################
function getHideStepIDs() {
	var vAllSteps = new Array();
	var vListArray = new Array();
	var vList = null;
	vListArray.push(document.getElementsByClassName("PROOFSTEP"+vQID));
	vListArray.push(document.getElementsByClassName("CONCLUSION"+vQID));
	var k=0;
	var j=0;
	while (lower(k,vListArray.length)) {
		vList = vListArray[k];
		//---Define AllSteps-Array-----------
		j=0;
		while (lower(j,vList.length)) if (vList[j].id) {
			vID = vList[j].id;
			vStepDef = vList[j].childNodes[0].nodeValue;
			vAllSteps[vID] = vStepDef;
			j++
		};
		k++;
	};
	return vAllSteps;
}
//#################################################################
//# Method: getAllStepIDs()  
//#################################################################
function getAllStepIDs() {
	var vAllSteps = new Array();
	var vListArray = new Array();
	var vList = null;
	vListArray.push(document.getElementsByClassName("PRECONDITION"+vQID));
	vListArray.push(document.getElementsByClassName("PROOFSTEP"+vQID));
	vListArray.push(document.getElementsByClassName("CONCLUSION"+vQID));
	var k=0;
	var j=0;
	while (lower(k,vListArray.length)) {
		vList = vListArray[k];
		//---Define AllSteps-Array-----------
		j=0;
		while (lower(j,vList.length)) if (vList[j].id) {
			vID = vList[j].id;
			vStepDef = vList[j].childNodes[0].nodeValue;
			vAllSteps[vID] = vStepDef;
			j++;
		};
		k++
	};
	return vAllSteps;
}

//#################################################################
//# EVENT: appendStep(pStep,pCount)
//#################################################################
function appendStep(pStep,pCount) {
	var vStudentAnswer = document.getElementById("STUDENTANSWER"+vQID+pStep);
	//var vListNode      = document.getElementsByClassName("STUDENTANSWER"+vQID);
	//var vProof         = document.getElementById("STUDENTANSWERLIST"+vQID)
	var vUnused4Proof  = document.getElementById("UNUSEDSTEPS"+vQID);
	moveStepOrder(pStep,0,pCount);
	setVisibility4Step(vStudentAnswer);
}
//#################################################################
//# EVENT: deleteProofStep
//#################################################################
function deleteProofStep(pStep,pCount) {
	var vNode4ID = document.getElementById("sSTEP"+vQID+pStep);
	Check = confirm(vLanguage["Delete_Prompt"] + CR + vLanguage["ProofStep"]+" ["+vNode4ID.value+"] ");
	if (Check) {
		moveStepOrder(pStep,pCount+1,pCount);
		//alert(vLanguage["ProofStep"]+" ["+vNode4ID.value+"] "+vLanguage["Deleted"]);
	} else {
		alert("CANCEL: "+ vLanguage["ProofStep"]+" ["+vNode4ID.value+"] "+vLanguage["Deleted"]);
	}
}
//#################################################################
//# positionChange(pOldPos,pNewPos,pCount)
//#################################################################
function positionChange(pStep,pNewPos,pCount) {
	var vListNode     = document.getElementsByClassName("STUDENTANSWER"+vQID);
	//alert("Position CHANGE: pStep=" + pStep + " TO pNewPos="+pNewPos);
	var vOldPos = getList_Position(vListNode,"STUDENTANSWER"+vQID,pStep);
	moveStep(vOldPos,pNewPos);	
}
//#################################################################
//# moveStepOrder(pOldPos,pNewPos,pCount)
//#################################################################
function moveStepOrder(pStep,pNewPos,pCount) {
	var vListNode     = document.getElementsByClassName("STUDENTANSWER"+vQID);
	var vOldPos = getList_Position(vListNode,"STUDENTANSWER"+vQID,pStep);
	//alert("moveStepOrder: pStep=" + pStep + " vOldPos =" +vOldPos+ " TO pNewPos="+pNewPos);
	moveStep(vOldPos,pNewPos);
}
//#################################################################
//# moveStepID(pStep,pID,pCount)
//#################################################################
function moveStepID(pStep,pID,pCount) {
	var vStudentAnswerList     = document.getElementsByClassName("STUDENTANSWER"+vQID);
	var vNewPos = getList_Position(vStudentAnswerList,"STUDENTANSWER"+vQID,pStep);
	var vOldPos = getStepIndex4ID(pID); 
	//alert("moveStepID: pStep=" + pStep + " pID=" +pID+" vOldPos="+vOldPos+ " TO vNewPos="+vNewPos);
	moveStep(vOldPos,vNewPos);
	updateStepChange(pStep);
}

//#################################################################
//# moveStep(pOldPos,pNewPos)
//#################################################################
function moveStep(pOldPos,pNewPos) {
	//-----LIST and COUNT------
	var vListNode     = document.getElementsByClassName("STUDENTANSWER"+vQID);
	//var vSelectorID   = "sPOSITION"+pStep;
	var vOldPos		  =  pOldPos; 
	var vNewPos		  =  pNewPos; 
	var vProof        = document.getElementById("STUDENTANSWERLIST"+vQID)
	var vUnused4Proof = document.getElementById("UNUSEDSTEPS"+vQID);
	var vUnused4Nodes = vUnused4Proof.getElementsByClassName("STUDENTANSWER"+vQID);
	var vCount        = vListNode.length;
	var vCountUnused  = vUnused4Nodes.length;
    var vCountProof   = vListNode.length - vCountUnused;
	//alert("Move Step="+vListNode[pOldPos-1].id+" from "+vOldPos+" to "+pNewPos+" with "+vCount+" items");
	//-------------------------
	//alert("MOVE vOldPos=" + vOldPos + " TO vNewPos="+vNewPos);
	//alert("vListNode.length="+vListNode.length+"\nvCountUnused="+vCountUnused);
    if (pNewPos == -1) {
    	alert("No Move-Operation with pNewPos="+vNewPos+"=-1");
    } else if (vOldPos == vNewPos) {
    	//alert("No Move-Operation vOldPos="+vOldPos+"=vNewPos");
    } else {
    	var vOldNode = vListNode[vOldPos-1]; //document.getElementById("STUDENTANSWER"+pStep);
 		var vOldParentNode = vOldNode.parentNode;
 		//alert("vOldNode.id="+vOldNode.id+" vOldPos="+vOldPos+": vOldParentNode.id="+vOldParentNode.id);
		var vRemovedChild = vOldParentNode.removeChild(vOldNode);
		if (pNewPos == 0) {
	    	vProof.appendChild(vRemovedChild);
	    	vCountProof++;
	    	pNewPos = vCountProof;
	    } else if (lower(pNewPos , vCount - vCountUnused)) {
	    	//alert("PROOF: Insert Child"+vOldPos+" before "+vNewPos);
	    	vProof.insertBefore(vRemovedChild,vListNode[vNewPos-1]);
	    } else if (pNewPos == (vCount - vCountUnused)) {
	    	//alert("PROOF: Append Child");
	    	vProof.appendChild(vRemovedChild);
	    } else {
	    	//alert("Append Unused");
		    vUnused4Proof.appendChild(vRemovedChild);
	    };
	    vCountProof   = vListNode.length - vUnused4Proof.childNodes.length;
		append_PreviousStep_Justification();
		setVisibility4Step(vRemovedChild);
		updateInput();
	}
}
//#################################################################
//# EVENT: setJustification
//#################################################################
function setJustification(pObjectID,pNr,pID) {
    var vObject = document.getElementById(pObjectID);
    if (vObject) {
	    if (vObject.value == "") {
    	    vObject.value = pID
    	} else {
    		var vString = "#,"+vObject.value+",";
    		if (greater(0,vString.indexOf(","+pID+",")) ) {
        		vObject.value += ","+pID;
        	}
    	}
    	alert("Begruendung - Beweisfragment "+pNr+": ["+vObject.value+"]");
    } else {
    	alertDOM("DOM Object "+pObjectID+" does not exist"); 
    }
}
//#################################################################
//# EVENT: changeEditJustification
//#################################################################
function changeEditJustification(pStep) {
	setJustificationCheckbox(pStep);
	changeViewJustification(pStep);
}
//#################################################################
//# Method: changeViewJustification 
//#################################################################
function changeViewJustification(pStep) {
	//var vCheckboxes = document.getElementsByClassName("cVIEWJUSTIFICATION"+pStep);
	//alert("vCheckboxes.length="+vCheckboxes.length);
	var vCheckViewBox = document.getElementById("cVIEWJUSTIFICATION"+vQID+pStep);  
	var vCheckEditBox = document.getElementById("cEDITJUSTIFICATION"+vQID+pStep);  
	var vInJustifications = document.getElementById("inJUSTIFICATION"+vQID+pStep).value;  
	//alert("vInJustifications='"+vInJustifications+"'");
	hideAllJustifications(pStep);
	if (vCheckEditBox.checked) {
		//alert("VIEW not checked");
		hideObject("dVIEWJUSTIFICATION"+vQID+pStep);
		showObject("dEDITJUSTIFICATION"+vQID+pStep);
	} else if (vCheckViewBox.checked) {
		//alert("VIEW not checked");
		//No Header if Justifications are empty
		if (vInJustifications != '') {
			showObject("dVIEWJUSTIFICATION"+vQID+pStep);
		} else {
			hideObject("dVIEWJUSTIFICATION"+vQID+pStep);
		}
		hideObject("dEDITJUSTIFICATION"+vQID+pStep);
	} else {
		hideObject("dVIEWJUSTIFICATION"+vQID+pStep);
		hideObject("dEDITJUSTIFICATION"+vQID+pStep);
	};
	updateTextIDs(pStep);
	append_PreviousStep_Justification();
	showSelectedJustifications(pStep);	
}
//#################################################################
//# Method: hideAllJustification 
//#################################################################
function append_PreviousStep_Justification() {
	var vListID = document.getElementsByClassName("sSTEP"+vQID);
	//var vRootNode = document.getElementById("STUDENTANSWER"+vQID);
	var vListNode = document.getElementsByClassName("STUDENTANSWER"+vQID);
	var vVisibleJustArray = new Array();
	var vStepArray = new Array();
	var vStep = 0;
	var vName = "";
	var vCheckName = "";
	var i=0;
	var k=0;
	while (lower(i,vListNode.length))  {
		if (vListNode[i].id) {
			vStep = getStep4NodeID(vListNode[i].id);
			//vStep = vListNode[i].step;
			//alert("id="+vListNode[i].id+" vStep="+vStep);
			vName = "checkboxJUSTIFICATION"+vQID+vStep;
			//alert("hideAllJustification: vQID="+vQID);
			k=0;
			while (lower(k,vVisibleJustArray.length)) { 
				vCheckName = vName+"-"+vVisibleJustArray[k]; 
				//alert("vCheckName="+vCheckName);
				showObject(vCheckName);
				//hideObject(vName+"-J1");
				k++;
			};
			vStepArray.push(vListNode[i].step);
			vVisibleJustArray.push(vListID[i].value);
		};
		i++;
	}
}
//#################################################################
//# Method: hideAllJustification 
//#################################################################
function hideAllJustifications(pStep) {
  //alert("hideAllJustifications(pStep) - pStep="+pStep);
  if (pStep) {
    var vOutName    = "outJUSTIFICATION"+vQID+pStep;
    var vSelectName = "sJUSTIFICATION"+vQID+pStep;
    var vCheckName  = "checkboxJUSTIFICATION"+vQID+pStep;
    //alert ("vOutName="+vOutName+" vSelectName="+vSelectName+" vCheckName="+vCheckName);
    var vViewList = document.getElementsByClassName(vOutName);
    var k=0;
	while (lower(k,vViewList.length)) if (vViewList[k].style) {
      vViewList[k].style.display = "none";
      k++;
    };
    var vHideSteps = getHideStepIDs();
    var vCheckboxes = document.getElementsByClassName(vSelectName);
    for (var vID in vHideSteps) if (pStep) {
      //alert ("2vOutName="+vOutName+" vSelectName="+vSelectName+" vCheckName="+vCheckName);
      hideObject(vCheckName +"-"+vID);
    }; 
  }
}
//#################################################################
//# Method: hideAllSteps 
//#################################################################
function hideAllSteps(pStep) {
  //alert("hideAllSteps(pStep) - pStep="+pStep);
  var vAllSteps = getAllStepIDs();
  if (pStep) {
    var vOutName = "outSTEPDISPLAY"+vQID+pStep;
    //alert ("vOutName="+vOutName+" vSelectName="+vSelectName+" vCheckName="+vCheckName);
    var vViewList = document.getElementsByClassName(vOutName);
    var k=0;
	while (lower(k,vViewList.length)) if (vViewList[k].style) {
      vViewList[k].style.display = "none";
      k++;
    };
  }
}
//#################################################################
//# EVENT: toggleEdit(pStep)
//#################################################################
function toggleEdit(pStep) {
	//alert("toggleEdit("+pStep+")");
	var vListIDs      = document.getElementsByClassName("inSTEPID"+vQID);
	var vStepDefNode  = document.getElementById("inSTEPDEF"+vQID+pStep);
	var vTextareaNode = document.getElementById(vEditorID + vQID + pStep);
	vTextareaNode.value = vStepDefNode.value.replace(/__n__/g,CR);
	toggleHide("STEPEDITOR"+vQID+pStep);
	//showObject("inSTEPDEF"+vQID+pStep);
	hideObject("inSTEPDEF"+vQID+pStep);
	//toggleHide(vEditorID + pStep);
	//changeViewJustification(pStep);
}
//#################################################################
//# EVENT: toggleJustification(pStep)
//#################################################################
function toggleJustification(pStep) {
  if (!pStep) {
    alert("pStep is not defined in toggleJustification");
  } else if (pStep > 0) {
    var vCheckViewBox = document.getElementById("cVIEWJUSTIFICATION"+vQID+pStep);  
    var vCheckEditBox = document.getElementById("cEDITJUSTIFICATION"+vQID+pStep);  
    var vID = document.getElementById("inSTEPID"+vQID+pStep).value;  
    vCheckEditBox.checked = !vCheckEditBox.checked;
    //alert("toggleJustification() pStep="+pStep);
    hideAllJustifications(pStep);
    //alert("hideAllJustification() pStep="+pStep);
    append_PreviousStep_Justification();
    //alert("Previous");
    showSelectedJustifications(pStep);
    //alert("show Selected");
    changeViewJustification(pStep);
    //alert("changeView")
  } else {
  	alert("Toggle New Step");
  }
}

//#################################################################
//# Method: showSelectedJustifications(pStep)  
//# Comment:    Loads IDs from inJUSTIFICATION1,... and hides/display                    
//#             the relevant checkboxes
//#################################################################
function showSelectedJustifications(pStep) {
	var vInputNode = document.getElementById("inJUSTIFICATION"+vQID+pStep);
	var vJustString = vInputNode.value.replace(/\s/g,"");
	if (vJustString != "") {
		var vID_Array = vJustString.split(",");
		var vNode = null;
		var vOutNodeID = ""
		var k=0;
		while (lower(k,vID_Array.length)) {
			vOutNodeID = "outJUSTIFICATION"+vQID+pStep+"-"+vID_Array[k];
			vNode = document.getElementById(vOutNodeID);
			if(vNode) {
				showObject(vOutNodeID);
			} else {
				alertDOM("Error (Node="+vOutNodeID+"): Justification with the ID='"+vID_Array[k]+"' does not exist!");
			};
			k++;
		}
	}
}
//#################################################################
//# Method: setJustificationCheckbox(pStep)  
//# Comment:    Loads IDs from inJUSTIFICATION1,... and checks/unchecks                    
//#             the relevant checkboxes
//#################################################################
function setJustificationCheckbox(pStep) {
	var vInJustification
	var vCheckboxes = document.getElementsByClassName("sJUSTIFICATION"+vQID+pStep);
	var vInputNode = document.getElementById("inJUSTIFICATION"+vQID+pStep);
	var vJustString = vInputNode.value.replace(/\s/g,"");
	var vID_Array = vJustString.split(",");
	var k=0;
	var i=0;
	while (lower(k,vID_Array.length)) {
		i=0;
		while (lower(i,vCheckboxes.length)) {
		//alert("vCheckboxes[i].value="+vCheckboxes[i].value);
			if (vID_Array[k] == vCheckboxes[i].value) {
				vCheckboxes[i].checked = true;
			};
			i++;
		};
		k++;
	};
	showSelectedJustifications(pStep);
}
//#################################################################
//# Method: getStepDef4ID(pID)
//#################################################################
function getStepDef4ID(pID) {
  var vNode = document.getElementById(pID);
  if (vNode.id) {
    return  " ["+vNode.id+"] " + vSpace + decodeValue(vNode.childNodes[0].nodeValue);
  } else {
    return " [pID] ???";
  }
}
//#################################################################
//# Method: getStepDef(pNode)
//#################################################################
function getStepDef(pNode) {
  if (pNode.id) {
    return " ["+pNode.id+"] " + vSpace + decodeValue(pNode.childNodes[0].nodeValue);
  } else {
    return " [???] getStepDef(pNode??)";
  }
}
//#################################################################
//# Method: saveASCIImath
//# Comment: Write ASCII Math Definition to DIV Node and                       
//#          remove all previous Child Content
//#################################################################
function saveASCIImath(pNodeName,pString) {
	var vOutNode = removeChildContent(pNodeName);
	//vOutNode.appendChild(document.createTextNode(pString));
	vOutNode.innerHTML = decodeTextarea(pString);
	AMprocessNode(vOutNode);
}

//#################################################################
//# Method: removeChildContent(pNodeID)
//# Comment: Write ASCII Math Definition to DIV Node and                       
//#          remove all previous Child Content
//# returns: the DOM Node with deleted childs
//#################################################################
function removeChildContent(pNodeID) {
	var vOutNode = document.getElementById(pNodeID);
	if (!vOutNode) {
		alert("No vOutNode for DOM-Node with ID='"+pNodeID+"'");
	} else {
		var i=0;
		var n=vOutNode.childNodes.length;
		while (lower(i,n)) {
			vOutNode.removeChild(vOutNode.firstChild);
			i++;
		};
	};
	return vOutNode;
}

//#################################################################
//# Method: getList_Position(pList,pStep) 
//#################################################################
function getList_Position(pList,pName,pStep) { 
  var vReturn = pList.length+1;
  var i=0;
  while (lower(i,pList.length)) {
    if   (pList[i].id == pName+pStep) {
      vReturn = i+1;
    };
    i++;
  };
  return vReturn;
}
//#################################################################
//# Method: getStepCountSelectorHTML()  
//#################################################################
function getStepCountSelectorHTML()  {
	var vAllSteps = getAllStepIDs();
	var vContent = "";
	var vContent = "<SELECT class='sSTEPCOUNT"+vQID+"'  id='sSTEPCOUNT"+vQID+"' onchange=\"updateStepCount(this.value)\">";
	var vNr=0;
	var vMax=0;
	for (var iID in vAllSteps) {
		vNr++;
	};
	vMax = vNr;
	vNr=1;
	while (lower(vNr,vMax+1)) {
		if (vNr == vMax) {
			vContent +="<option class='COUNT"+iID+"' value='"+vNr+"' selected>"+vNr+"</option>";
    	} else {
    		vContent +="<option class='COUNT"+iID+"' value='"+vNr+"'>"+vNr+"</option>";
    	}
		vNr++;
    }
	vContent +="</SELECT>";
	return vContent;
}
//#################################################################
//# Method: getListIMathAS(pTextareaID)  
//#################################################################
function getListIMathAS(pTextareaID) {
	//var vContent = "Length of List="+pList.length;
	var vInput = document.getElementById("imath"+pTextareaID).value;
	//alert("getListIMathAS(pTextareaID) "+vInput);
	var vListArray = vInput.split(CR);
	var vContent = "";
	if (vInput) {
		vContent += "<ul>";
		vContent += getItemsIMathAS(vListArray);
		vContent +="</ul>";
	} else {
		alert("Textarea: 'imath"+pTextareaID+"' was undefined!");
	}
	return vContent;
}
//#################################################################
//# Method: getItemsIMathAS(pListArray)  
//#################################################################
function getItemsIMathAS(pListArray) {
	//var vContent = "Length of List="+pList.length;
	var vContent = "";
	if (pListArray) {
		var k=0;
		while (lower(k,pListArray.length)) {
			if (greater(pListArray[k].indexOf("#__co__#") , 0)) {
				var vSplitStep = pListArray[k].split("#__co__#"); 
				vContent += "<li>";
				vContent += "["+vSplitStep[0]+"] "+decodeValue(vSplitStep[1]);
				vContent +="</li>";
			}
			k++;
		};
	}
	return vContent;
}
//#################################################################
//# Method: getItemsHTML(pList)  
//#################################################################
function getItemsHTML(pList) {
	//var vContent = "Length of List="+pList.length;
	var vContent = "";
	if (pList) {
		var k=0;
		while (lower(k,pList.length)) {
			if (pList[k].id) {
				vContent += "<li>";
				vContent += "["+pList[k].id+"] "+decodeValue(pList[k].childNodes[0].nodeValue);
				vContent +="</li>";
			}
			k++;
		};
	}
	return vContent;
}
//#################################################################
//# Method: getStepIndex4ID(pID) 
//#################################################################
function getStepIndex4ID(pID) {
	var vListID    = document.getElementsByClassName("inSTEPID"+vQID);
	var i = 0;
	var vIndex = -1;
	while (lower(i,vListID.length)) {
		if (pID == vListID[i].value) {
			vIndex = i+1;
		};
		i++;
	};
	return vIndex;
}
//#################################################################
//# Method: loadInput2IMathAS()  
//#################################################################
function loadInput2IMathAS()  {
	//alert("qn"+ThisQ+"000");
	//----------------------------------------------------
	//---STEPCOUNT and DISPLAYOPTION and STUDENTANSWER: Performed in postProcessProof() 
	//loadStepCount2IMathAS("iMathAS Steps Visible","imathSTEPCOUNT"+vQID);
	//loadDisplayOption2IMathAS("DISPLAYOPTION","qn"+ThisQ+"001");
	//loadAnswer2IMathAS("STUDENTANSWER","qn"+ThisQ+"002");
	//-----Do not load these parameters already here -----
	//-----because HTML-Element do not exist yet----------
	loadSteps2IMathAS("PRECONDITION","qn"+ThisQ+"003"); 
	loadSteps2IMathAS("CONCLUSION","qn"+ThisQ+"004"); 
	loadSteps2IMathAS("JUSTIFICATION","qn"+ThisQ+"005"); 
	loadSteps2IMathAS("PROOFSTEP","qn"+ThisQ+"006"); 
	//loadSolution2IMathAS("SOLUTION","qn1006"); 
	//updateInput();
}
//#################################################################
//# Method: saveInput2IMathAS()  
//#################################################################
function saveInput2IMathAS()  {
	saveStepCount2IMathAS("iMathAS Steps Visible","qn"+ThisQ+"000");
	saveDisplayOption2IMathAS("DISPLAYOPTION"+vQID,"qn"+ThisQ+"001");
	saveAnswer2IMathAS("STUDENTANSWER","qn"+ThisQ+"002");
	saveSteps2IMathAS("PRECONDITION","qn"+ThisQ+"003"); 
	saveSteps2IMathAS("CONCLUSION","qn"+ThisQ+"004"); 
	saveSteps2IMathAS("JUSTIFICATION","qn"+ThisQ+"005"); 
	saveSteps2IMathAS("PROOFSTEP","qn"+ThisQ+"006"); 
	//saveSolution2IMathAS("SOLUTION"+vQID,"qn"+ThisQ+"007"); 
}
//#################################################################
//# Method: loadStepCount2IMathAS(pID,pIMathAS_ID) 
//#################################################################
function loadStepCount2IMathAS(pLabel,pIMathAS_ID) {
	var vNode = createNodeQN(pLabel,pIMathAS_ID);
	var eProofInput = document.getElementById("sSTEPCOUNT"+vQID);
	var vInput = document.getElementById("imathSTEPCOUNT"+vQID);
	//var vCount = parseInt(vNode.value);
	var vCount = vNode.value;
	if (!vInput) {
		vInput = createNodeQN("imathSTEPCOUNT","imathSTEPCOUNT"+vQID);
	};
	vInput.value = vCount;
	if (eProofInput) {
		eProofInput.value = parseInt(vCount+"");
	} else {
		alert("sSTEPCOUNT"+vQID+" is undefined");
	};
	
	//eProofInput.value = vCount;
	//alert("Set to "+vCount+" number of Steps");
}
//#################################################################
//# Method: saveStepCount2IMathAS(pID) 
//#################################################################
function saveStepCount2IMathAS(pLabel,pIMathAS_ID) {
	//alert("update all Steps in iMathAS Form");
	var vListNode     = document.getElementsByClassName("STUDENTANSWER"+vQID);
	var vCount        = vListNode.length;
	var vUnused = document.getElementById("UNUSEDSTEPS"+vQID);
	var vUnused4Proof = vUnused.getElementsByClassName("STUDENTANSWER"+vQID);
	var vCountUnused  = vUnused4Proof.length;
    var vCountProof   = vListNode.length - vCountUnused;
	var vStepCountNode = createNodeQN("("+pLabel+")",pIMathAS_ID);
	var imathStepCountNode = document.getElementById("imathSTEPCOUNT"+vQID);
	//alert("StepCount="+vCountProof);
	if (imathStepCountNode) {
		imathStepCountNode.value = vCountProof;
	};
	vStepCountNode.value = vCountProof;
}
//#################################################################
//# Method: loadDisplayOption2IMathAS(pID) 
//#################################################################
function loadDisplayOption2IMathAS(pLabel,pIMathAS_ID) {
	//alert("update all Steps in iMathAS Form");
	var vDisplaySelector = document.getElementById("sDISPLAYOPTION"+vQID);
	var vIMathNode = createNodeQN("("+pLabel+")",pIMathAS_ID);
	var vEProofNode = document.getElementById("imathDISPLAYOPTION"+vQID);
	if (vEProofNode) {
	    //alert("imathDISPLAYOPTION exists with imathDISPLAYOPTION.value="+vEProofNode.value);
		vDisplaySelector.value = vEProofNode.value;
	} else if (vIMathNode) {
	    //alert("imathDISPLAYOPTION does NOT exists with imathDISPLAYOPTION.value=undefined");
		vDisplaySelector.value = vIMathNode.value;
	} else {
		alert("sDISPLAYOPTION"+vQID+ " and imathDISPLAYOPTION"+vQID+" do not exist!");
	}
}
//#################################################################
//# Method: saveDisplayOption2IMathAS(pID) 
//#################################################################
function saveDisplayOption2IMathAS(pLabel,pIMathAS_ID) {
	//alert("update all Steps in iMathAS Form");
	var vDisplaySelector = document.getElementById("sDISPLAYOPTION"+vQID);
	var vIMathNode = createNodeQN("("+pLabel+")",pIMathAS_ID);
	vIMathNode.value = vDisplaySelector.value;
}
//#################################################################
//# Method: loadSteps2IMathAS(pID) 
//#################################################################
function loadSteps2IMathAS(pClassName,pIMathAS_ID) {
	//e.g. pID = "PRECONDITION"
	var vInputNode = createNodeQN("("+pClassName+")",pIMathAS_ID);
	var vTextArea = document.getElementById("imath"+pClassName+vQID);
	//vTextArea.value = decodeCR(vInputNode.value); 
	var vRootNode = document.getElementById(pClassName+"LIST"+vQID);
	var vStepNode = null;
	var vTextNode = null;
	// 	<div class="PRECONDITIONLIST" id="PRECONDITIONLIST" >
	// 	  <div class="PRECONDITION" id="P1">P erster Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
	// 	  <div class="PRECONDITION" id="P2">P zweiter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
	// 	  <div class="PRECONDITION" id="P3">P Dritter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
	// 	  <div class="PRECONDITION" id="P4">P Vierter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
	// 	</div>
	//removeChildContent(pClassName);
	var vListArray = vTextArea.value.split(CR);
	var k=0;
	var vNr = 0;
	while (lower(k,vListArray.length)) { 
		//alert("("+k+") "+vListArray[k]);
		if (greater(vListArray[vNr].indexOf("#__co__#") , 0)) {
			var vStepArray = vListArray[vNr].split("#__co__#") ;
			var vStepDef = convertMeta2Comma(vStepArray[1]);
			if (vStepArray.length != 2) alert("Wrong Format Answer Step='"+vListArray[vNr]+"'");
			vStepNode = document.getElementById(vStepArray[0]);
			if (!vStepNode) {
				//alert("Node with '"+vStepArray[0]+"' was created!");
				vStepNode = document.createElement("DIV");
				vStepNode.className = pClassName+vQID;
				vStepNode.id = vStepArray[0];
				vTextNode = document.createTextNode(vStepDef);
				vStepNode.appendChild(vTextNode);
				vRootNode.appendChild(vStepNode);
			} else {
				vStepNode.innerHTML = vStepDef;
			};
			vNr++;
		};
		k++;
	};
	//var vListXML = document.getElementById(pID+"LIST");
	//vListXML.innerHTML = vListArray.join(CR);
}
//#################################################################
//# Method: saveSteps2IMathAS(pID) 
//#################################################################
function saveSteps2IMathAS(pID,pIMathAS_ID) {
	//e.g. pID = "PRECONDITION"
	var vList = document.getElementsByClassName(pID+vQID);
	var vTextArea = document.getElementById("imath"+pID+vQID);
	var vCR = "";
	var vContent = "";
	var vStepDef = "";
	var k=0;
	while (lower(k,vList.length)) { 
		vStepDef = convertComma2Meta(vList[k].childNodes[0].nodeValue);
		vContent += vCR + vList[k].id+"#__co__#"+vStepDef;
		vCR = CR;
		k++;
	};
	vTextArea.value = vContent;
	var vValue = encodeCR(vContent);
	vInputNode = createNodeQN("("+pID+")",pIMathAS_ID);
	vInputNode.value = vValue;
}
//#################################################################
//# Method: loadAnswers2IMathAS()
//#################################################################
function loadAnswer2IMathAS(pID,pIMathAS_ID) {
	//alert("loadAnswer2IMathAS('"+pID+"','"+pIMathAS_ID)+"')");
	//alert("loadAnswer2IMathAS("+pID+","+pIMathAS_ID+")")
	var vListID = document.getElementsByClassName("inSTEPID"+vQID);
	var vList = document.getElementsByClassName("STUDENTANSWER"+vQID);
	//vInputNode = createNodeQN("("+pID+")",pIMathAS_ID);
	//var vOutArray = vInputNode.value.split(",");
	//----------------------------------------
	//---READ STUDENTANSWER from Textarea-----
	//---The Load Function expect all Steps to be defined.
	var vInputNode = document.getElementById("imathSTUDENTANSWER"+vQID);
	vOutArray = vInputNode.value.split(CR);
	//----------------------------------------
	var vAllSteps = getAllStepIDs();
	var k=0;
	var vLine = "";
	var vStep = 0;
	var vMove2Step = 0;
	var vNode = null;
	var vNr = 0
	while (lower(k,vOutArray.length)) {
		//alert("("+k+") "+vOutArray[k]);
		if (greater(vOutArray[k].indexOf("#__co__#") , 0)) {
			vLine = vOutArray[k];
			vAnswerArray = vLine.split("#__co__#");
			if (vAnswerArray.length != 3) {
				alert("Answer Array for Line"+k+" has no proper format!"+CR+vOutArray[k]);
			} else {
				vNr++;
				vStep = vNr;
				//vStep = getStepIndex4ID(vAnswerArray[1]);
				var vID = vAnswerArray[1];
				//alert("loadAnswer2IMathAS(ID="+vAnswerArray[1]+") vStep="+vStep+"\n"+vLine);
				//alert("vAnswerArray.length="+vAnswerArray.length);
				//alert(vStep+"Step: "+vLine+"\nvAnswerArray[0]="+vAnswerArray[0]);
				//alert("Select"+vStep+"="+document.getElementById("sCONNECTION"+vStep).value);
				vNode = document.getElementById("sCONNECTION"+vQID+vStep);
				if (vAnswerArray[0] == "???") {
					vNode.value = 0;
				} else {
					vNode.value = vConnection2Index[vAnswerArray[0]];
				};
				vNode = document.getElementById("inSTEPID"+vQID+vStep);
				//alert("inSTEPID has "+vNodes.length+" child and Step"+vList[k].step);
				vNode.value = vID;
				vNode = document.getElementById("sSTEP"+vQID+vStep);
				vNode.value = vID;
				vNode = document.getElementById("inSTEPDEF"+vQID+vStep);
				vNode.value = vAllSteps[vAnswerArray[1]];
				vNode = document.getElementById("inJUSTIFICATION"+vQID+vStep);
				vNode.value = vAnswerArray[2].replace(/#_co_#/g,",");
				//updateStepChange(vStep);
				updateStep(vStep);
				setJustificationCheckbox(vStep);
				showSelectedJustifications(vStep);
				//alert("move vID="+vID+" from Pos="+vStep+" to Pos="+vMove2Step);
				//updateInput();
			};
		};
		k++;
	};	
}
//#################################################################
//# Method: saveAnswer2IMathAS()
//#################################################################
function saveAnswer2IMathAS(pID,pIMathAS_ID) {
	//alert("update all Steps in iMathAS Form");
	var vOutArray = new Array();
	var vList = this.getElementsByClassName("STUDENTANSWER"+this.aQID);
	var vPosList  = this.getElementsByClassName("sPOSITION"+this.aQID);
	var vConList  = this.getElementsByClassName("sCONNECTION"this.avQID);
	var vIDList   = this.getElementsByClassName("sSTEP"this.avQID);
	var vJustList = this.getElementsByClassName("inJUSTIFICATION"+this.aQID);
	//var vAnswerIMathAS = new Array(6); //POS,CONNECT,sID,inID,inJUST,inSTEPDEF
	var vOutTextarea = this.getElementById("imathSTUDENTANSWER"+this.aQID);
	var vOutString = "";
	var vStepSplit = CR;
	var vColSplit = "#__co__#"
	var vJustSplit = "#_co_#"
	var vStepNode = null;
	var vJustification = "";
	var vPos,vIndex = 0;
	var vPosNode = null;
	var vID = "???";
	var k=0;
	var vMax = 0;
	while (lower(k,vList.length)) {
		vOutString = "";
		if (vList[k].id) {
			vStep = this.getStep4NodeID(vList[k].id);
			//vStep = vProof[k].childNodes[i].step;
			//alert("("+i+") vStep="+vStep+"\nID="+vProof[k].childNodes[i].id);
			//var vNodeID = "sPOSITION"+vQID+vStep;
			//alert("vNodeID="+vNodeID);
			//var vNode = document.getElementById(vNodeID);
			//vPos = parseInt(""+vNode.value);
			//vPos = vPosNode.value;
			//alert("Pos="+vPos);
			//vOutString += vPos + vColSplit;
			//vOutString += "Step"+vStep + vColSplit;
			//---Connection--------------------
			vIndex = vConList[k].value;
			vOutString += vConnectionArray[parseInt(" "+vIndex)];
			vOutString += vColSplit;
			//---Step ID-----------------------
			vID = vIDList[k].value;
			vOutString += vID + vColSplit;
			//---Justification IDs-------------
			vJustification =vJustList[k].value;
			vOutString += vJustification.replace(/,/g,vJustSplit);
			vOutArray.push(vOutString);
		}
		k++;
	}
	vOutTextarea.value = vOutArray.join(vStepSplit);
	vInputNode = createNodeQN("("+pID+")",pIMathAS_ID);
	vInputNode.value = vOutArray.join(",");
}
//#################################################################
//# Method: getStep4NodeID(pID)
//#################################################################
function getStep4NodeID(pID) {
	var vStep = 0;
	if (pID) {
		pID = pID.replace(vQID,"");
		var vStep = pID.replace(/[^0-9]/g,"");
		//alert("vStep='"+vStep+"'");
		vStep = parseInt(vStep);
	};
	return vStep;	
}
//#################################################################
//# Method: getElementQN(pStep,pCol)  
//#################################################################
function getElementQN(pStep,pCol)  {
	var vNameQN = getFormElementName(pStep,pCol);
	var vReturnNode = createNodeQN("(S"+pStep+"C"+pCol+")",vNameQN);
    return vReturnNode;
}
//#################################################################
//# Method: createQN(pNameQN)  
//#################################################################
function createNodeQN(pLabel,pNameQN)  {
	var vReturnNode = document.getElementById(pNameQN);
	if (!vReturnNode) {
		var vReturnNode = document.createElement("input");
		var vParent = document.getElementById("iMathASINOUT"+vQID);
		vReturnNode.type = "text";
		vReturnNode.name = pNameQN;
		vReturnNode.id   = pNameQN;
		vReturnNode.size = "8";
		var vLabelNode = document.createTextNode(pLabel+" "+pNameQN +":");
		var vBR = document.createElement("hr");
		if(greater(pLabel.indexOf("C0)"),0)) vParent.appendChild(vBR);
		vParent.appendChild(vLabelNode);
		vParent.appendChild(vReturnNode);
	 };
     return vReturnNode;		
} 
//#################################################################
//# Method: updateStepCount(pCount)  
//#################################################################
function updateStepCount(pCount)  {
	var vListNode    = document.getElementsByClassName("STUDENTANSWER"+vQID);
	var vProof       = document.getElementById("STUDENTANSWERLIST"+vQID);
	var vUnused      = document.getElementById("UNUSEDSTEPS"+vQID);
	//if (vUnused) if (vUnused.childNodes) vUnusedCount = vUnused.childNodes.length;
	var  vUnusedCount = 0;
	var vRemovedChild = null; 
	//vProofCount  = vListNode.length - vUnusedCount;
	var k=0;
	while (lower(k,vListNode.length)) {
		if(vListNode[k].parentNode.id == "UNUSEDSTEPS"+vQID) {
			vUnusedCount++;
		};
		k++;
	};
	var vProofCount  = vListNode.length - vUnusedCount;
	//alert("Set Number of Proof Steps="+pCount+"(All="+vListNode.length+" vProofCount="+vProofCount+" Unused="+vUnusedCount+")");
	vProofCount = vListNode.length - vUnusedCount;
	if (lower(pCount,vProofCount)) {
		//---vProof [0,1,2,3,4,5] vUnused [6,7,8,9] pCount=3
		//alert("Reduce Number of Steps form "+vProofCount +" to "+pCount);
		//var vParentNode = vListNode[pCount-1].parentNode;
		while (lower(pCount,vProofCount)) {
			vRemovedChild = vProof.removeChild(vListNode[pCount-1]);
 			vUnused.insertBefore(vRemovedChild,vUnused.firstChild);
			vProofCount--;
		}	
	} else if (greater(pCount , vProofCount)) {
		//---Proof [0,1,2,3,4] Unused [5,6,7,8,9] pCount=6
		//alert("Increase Number of Steps form "+vProofCount +" to "+pCount);
		while (lower(vProofCount,pCount)) {
 			vRemovedChild = vUnused.removeChild(vListNode[vProofCount]);
 			vProof.appendChild(vRemovedChild);
			vProofCount++;
		}	
	};
	setVisibility4Unused();
	updateInput();
}
//#################################################################
//# Method: decodeEditBox() 
//#################################################################
function decodeEditBox() {
	var vListNode = document.getElementsByClassName("inSTEPDEF"+vQID);
	//alert("vListNode[0].value="+vListNode[0].value);
	i=0;
	while (lower(i,vListNode.length)) {
		//alert("vListNode[i].firstChild.id="+vListNode[i].firstChild.id + " ");
		vListNode[i].value = decodeValue(vListNode[i].value);	
		//alert("vListNode["+i+"].id="+vListNode[i].id);
		updateTextIDs(i+1);
		i++;
	};	
}
//#################################################################
//# Method: showEditBox() 
//#################################################################
function showEditBox() {
  var vID = "";
  var vListNode = document.getElementsByClassName("inSTEPID"+vQID);
  var vAuthoringMode = getSetting("AuthoringMode");
  var i=0;
  while (lower(i,vListNode.length)) {
    vID = vListNode[i].value;
    vID = vID.replace(/[^A-Z]/g,"");
    if ((vID == "MY") || (vAuthoringMode+"" == "1")) { 
      //alert("show 'bEdit"+vQID+vListNode[i].step+"'")	
      showElement("bEdit"+vQID+vListNode[i].step);
    } else {
      //alert("hide 'bEdit"+vQID+vListNode[i].step+"'")	
      hideElement("bEdit"+vQID+vListNode[i].step);
    };
    
    i++;
  };  
}
//#################################################################
//# Method: convertComma2Meta(pString)
//#################################################################
function convertComma2Meta(pString) {
	return pString.replace(/,/g,"#_co_#");
}
//#################################################################
//# Method: saveSteps2IMathAS(pID) 
//#################################################################
function convertMeta2Comma(pString) {
	return pString.replace(/#_co_#/g,",");
}
//#################################################################
//# Method: decodeValue  
//#################################################################
function decodeValue(pValue) {
	if (pValue) {
		pValue = pValue.replace(/__math__/g,AP);
		pValue = pValue.replace(/__eq__/g,"=");
		eval("pValue = pValue.replace(/__gt__/g,\""+GT+"\");");
		eval("pValue = pValue.replace(/__lt__/g,\""+LT+"\");");
		pValue = pValue.replace(/__qu__/g,"\"");
		pValue = pValue.replace(/__ae__/g,"ä");
		pValue = pValue.replace(/__oe__/g,"ö");
		pValue = pValue.replace(/__ue__/g,"ü");
		pValue = pValue.replace(/__AE__/g,"Ä");
		pValue = pValue.replace(/__OE__/g,"Ö");
		eval(decodeURI("pValue=pValue.replace(/__OE__/g,%22%EF%BF%BD%22);"))
		pValue = pValue.replace(/__UE__/g,"Ü");
		pValue = pValue.replace(/__sz__/g,"ß");
		return pValue;
  	} else {
  		return "";
  	}
}
//#################################################################
//# Method: encodeCR  
//#################################################################
function encodeCR(pValue) {
	// __n__ eval(decodeURI("pValue=pValue.replace(/%5C%5Cn/g,%22__n__%22);"));
	eval(decodeURI("pValue=pValue.replace(/%5Cn/g,%22,%22)"));
	return pValue;
}
//#################################################################
//# Method: decodeCR  
//#################################################################
function decodeCR(pValue) {
	//pValue = pValue.replace(/__n__/g,CR);
	pValue = pValue.replace(/,/g,CR);
	return pValue;
}
//#################################################################
//# Method: decodeTextarea  
//#################################################################
function decodeTextarea(pValue) {
  pValue = decodeValue(pValue);
  pValue = pValue.replace(/__n__/g,CR);
  //eval(decodeURI("pValue%20=%20pValue.replace(/__n__/g,%22%5Cn%22);"));
  return pValue;
}      
//#################################################################
//# Method: encodeValue  
//#################################################################
function encodeValue(pValue) {
	if (pValue) {
		eval("pValue = pValue.replace(/"+AP+"/g,\"__math__\")");
		eval("pValue = pValue.replace(/"+LT+"/g,\"__lt__\")");
		eval("pValue = pValue.replace(/"+GT+"/g,\"__gt__\")");
		pValue = pValue.replace(/=/g,"__eq__");
		pValue = pValue.replace(/"/g,"__qu__");
		pValue = pValue.replace(/ä/g,"__ae__");
		pValue = pValue.replace(/ö/g,"__oe__");
		pValue = pValue.replace(/ü/g,"__ue__");
		pValue = pValue.replace(/Ä/g,"__AE__");
		//pValue = pValue.replace(/Ö/g,"__OE__");
		eval(decodeURI("pValue%20=%20pValue.replace(/%EF%BF%BD/g,%22__OE__%22);"));
		pValue = pValue.replace(/Ü/g,"__UE__");
		pValue = pValue.replace(/ß/g,"__sz__");
		return pValue;
  	} else {
  		return "";
  	}
}
//#################################################################
//# Method: getSetting(pID) 
//#################################################################
function getSetting(pID) {
	// var vNode = document.getElementById(pID);
	// if (vNode) {
	// 	return vNode.childNodes[0].nodeValue;
	// } else {
	// 	alert("Setting with ID='"+pID+"' is not defined");
	// 	return  0;
	// }
	return vSettings[pID];
}
//#################################################################
//# Method: getFormElementName(pStep,pCol) 
//#         iMathAS Input Form Names = qn1000 
//#         first StdentAnswer with qn1010 first 
//#################################################################
function getFormElementName(pStep,pCol) {
	var vNr = 1004 + 6 * pStep + pCol;
	//alert("Formelement=qn"+vNr);
	return "qn"+vNr;
}
//#################################################################
//# Method: setNumberOfSteps()
//#################################################################
function setNumberOfSteps() {
	var vNode = createNodeQN("Step COUNT","qn"+ThisQ+"000");
	var vNodeIMath = createNodeQN("imathSTEPCOUNT","imathSTEPCOUNT"+vQID);
	var vInput = document.getElementById("sSTEPCOUNT"+vQID);
	vNodeIMath.value = vInput.value;
	vNode.value = vInput.value; 
	saveInput2IMathAS();
}
//#################################################################
//# Method: postProcessProof() 
//#################################################################
function postProcessProof() {
	loadStepCount2IMathAS("iMathAS Steps Visible","imathSTEPCOUNT"+vQID);
	//setTimeout("loadAnswer2IMathAS('STUDENTANSWER','qn"+ThisQ+"002')",2000);
	loadAnswer2IMathAS('STUDENTANSWER'+vQID,'imathSTUDENTANSWER'+vQID);
	loadDisplayOption2IMathAS("DISPLAYOPTION"+vQID,"imathSTEPCOUNT"+vQID);
	setDisplayOptions();
	decodeEditBox();
	showEditBox();
	setVisibility4Unused()
	//setNumberOfSteps();
	//setTimeout("decodeEditBox()",300);
	//setTimeout("showEditBox()",1000);
	//setTimeout("setVisibility4Unused()",1500);
}
