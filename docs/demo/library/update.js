//#################################################################
//# HTML: alertDOM(pMessage)  
//#################################################################
function alertDOM(pMessage) {
	alert(pMessage);
}
//#################################################################
//# Method: updateInput() 
//#################################################################
function updateInput() {
	//alert("Update Input Student Answers");
	var vListNode = document.getElementsByClassName("sPOSITION"+vQID);
	//alert("updateInput() vListNode.length="+vListNode.length);
	var vNr = 0;
	//----Update POSTION Number----
	while (lower(vNr,vListNode.length)) {
		vNr++;
		vListNode[vNr-1].value = vNr;
	};
	var k=0;
	while (lower(k,vListNode.length)) { 
		k++;
		//alert("updateStep("+k+")");
		updateStep(k);
    };
    saveInput2IMathAS() ;
}
//#################################################################
//# Method: updateStepChange(pStep) 
//#################################################################
function updateStepChange(pStep) {
	//alert("Update Input Student Answers");
	//var vStepSelectNode  = document.getElementsByClassName("sSTEP"+vQID);
	//var vListOldID    = document.getElementsByClassName("inSTEPID"+vQID);
	var vOldIDnode = document.getElementById("inSTEPID"+vQID+pStep);
	var vNewIDnode = document.getElementById("sSTEP"+vQID+pStep);
	var vOldID = vOldIDnode.value;
	var vNewID = vNewIDnode.value;
	//alert("updateStepChange("+pStep+") vOldIDnode.value="+vOldIDnode.value+" vNewIDnode.value="+vNewIDnode.value+" ");
	vNewIDnode.value = vOldIDnode.value;
	updateStep(pStep);
}

//#################################################################
//# Method: updateJustifications
//#################################################################
function updateJustifications(pStep) {
	var vCheckboxes = document.getElementsByClassName("sJUSTIFICATION"+vQID+pStep);
	//alert("vCheckboxes.length="+vCheckboxes.length);
	var vInputNode = document.getElementById("inJUSTIFICATION"+vQID+pStep);
	vInputNode.value = "";
	var vComma = "";
	var k=0;
	while (lower(k,vCheckboxes.length)) {
		if (vCheckboxes[k].checked) {
			vInputNode.value += vComma + vCheckboxes[k].value;
			vComma = ",";
		};
		k++;
	};
		
}
//#################################################################
//# Method: updateTextIDs(pStep) 
//#################################################################
function updateTextIDs(pStep) {
	var vArrayNodeID = document.getElementsByClassName("VIEWID"+vQID+pStep);  
	var vID = document.getElementById("inSTEPID"+vQID+pStep).value; 
	//alert("updateTextIDs("+pStep+") with "+vID);
	var i=0;
	while (lower(i,vArrayNodeID.length)) {
		//alert("VIEWID="+vArrayNodeID[i].id);
		vArrayNodeID[i].innerHTML = vID;
		i++;
	};
}
//#################################################################
//# Method: updateTextarea(pStep) 
//#################################################################
function updateTextarea(pStep) {
  var vNodeStepDef  = document.getElementById("inSTEPDEF"+vQID+pStep);
  var vNodeEditor   = document.getElementById(vEditorID +vQID+ pStep);
  var vValue = vNodeEditor.value;
  eval(decodeURI("vValue%20=%20vValue.replace(/%5Cn/g,%22__n__%22);"));
  //alert(decodeURI("vValue%20=%20vValue.replace(/%5Cn/g,%22__n__%22);"));
  vNodeStepDef.value = vValue;
  updateStepEdit(pStep);
}
//#################################################################
//# Method: updateStepEdit(pStep) 
//#################################################################
function updateStepEdit(pStep) {
	var vStepDef  = document.getElementById("inSTEPDEF"+vQID+pStep).value;
	var vID       = document.getElementById("inSTEPID"+vQID+pStep).value;
	var vStepNode = document.getElementById(vID);
	var vName = "outSTEPDISPLAY"+vQID+pStep+"-STEP-"+vID;
	var vStepOutNode = document.getElementById(vName);
	if (vStepOutNode) {
		//vStepOutNode.innerHTML = vStepDef;
		saveASCIImath(vName,"["+vID+"] &nbsp; "+vStepDef);
    };
	if (vStepNode) {
		vStepNode.childNodes[0].nodeValue = encodeValue(vStepDef);
		updateStep(pStep);
		saveInput2IMathAS();
	} else {
		alert("vStepNode not found for ID='"+vID+"'");
	}
}
//#################################################################
//# Method: updateStep(pStep) 
//#################################################################
function updateStep(pStep) {
	//alert("updateStep("+pStep+")");
	//update Connection
	//update Step Definition
	hideAllSteps(pStep);
	var vName = "outSTEPDISPLAY"+vQID+pStep;
	var vObjectID = vName+"-POS-1";
	var vPos = document.getElementById("sPOSITION"+vQID+pStep);
	var vOutPos = document.getElementById(vObjectID);
	if (vOutPos) {
		//alert("vPos.id="+vPos.id+" value="+vPos.value);
		vObjectID = vName+"-POS-"+vPos.value;
		showObject(vObjectID);
		var vCon = document.getElementById("sCONNECTION"+vQID+pStep);
		vObjectID = vName+"-CON-"+vCon.value;
		showObject(vObjectID);
		var vStepID = document.getElementById("sSTEP"+vQID+pStep);
		var vStepDef_Node = document.getElementById("inSTEPDEF"+vQID+pStep);
		var vStepEditor_Node = document.getElementById(vEditorID +vQID+ +vNr);
		//vStepEditor_Node.value = vStepDef_Node.value;
		//alert("updateStep("+pStep+") vStepID.id="+vPos.id+" value="+vStepID.value);
		vObjectID = vName+"-STEP-"+vStepID.value;
		showObject(vObjectID);
		updateTextIDs(pStep);
		showSelectedJustifications(pStep);
		//saveASCIImath("outSTEP"+pStep,vOutString);
	} else {
		//alert("updateStep("+pStep+")-Call and outSTEPDEF"+pStep+"-POS-"+vPos.value+" was undefined");
	}
}
//#################################################################
//# Method: updateInput2IMathAS()  
//#################################################################
function updateInput2IMathAS(pForm)  {
	//alert("Saved iMathAS");
	saveInput2IMathAS();
	//setDisplayOptions();
	//alert("Submit to iMathAS (disabled)");
	pForm.submit();
}
