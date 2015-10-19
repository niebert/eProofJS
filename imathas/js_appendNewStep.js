//#################################################################
//# Method: appendNewStep(pMaxSteps)  
//#################################################################
function appendNewStep(pMaxSteps) {
	var vNewNodeID = document.getElementById("newSTEP"+vQID);
	if (vNewNodeID) {
		var vID = vNewNodeID.value;
		if (vID.indexOf("?") == 0) {
			var iIndex = getStepIndex4ID(vID);
			if (iIndex == -1) {
				alert("ID '"+vID+"' does not exist in e-Proof!");
			} else {
				moveStep(iIndex,pMaxSteps);
			}
		} else {
			alert("vNewNodeID.value='???' no append");
		}
	} else {
		alertDOM("DOM-Node 'newSTEP"+vQID+" does not exist! - appendNewStep()-Call");
	}
}
//#################################################################
//# Method: updateNewStep(pMaxSteps)  
//#################################################################
function updateNewStep(pMaxSteps) {
	var vNewNodeID = document.getElementById("newSTEP"+vQID);
	var vStudentAnswerList = document.getElementsByClassName("STUDENTANSWER"+vQID);
	if (vNewNodeID) {
		var vID = vNewNodeID.value;
		if (vID.indexOf("?") == 0) {
			var iIndex = getStepIndex4ID(vID);
			if (iIndex == -1) {
				alert("ID '"+vID+"' does not exist in e-Proof!");
			} else {
				var vStudentAnswer = vStudentAnswerList[iIndex-1];
				var vEditStudentAnswer = vStudentAnswer.getElementsByClassName("editSTUDENTANSWER"+vQID)[0];
				var vNodeID   = vEditStudentAnswer.getElementsByClassName("sSTEP"+vQID)[0]; 
				var vNodeCon  = vEditStudentAnswer.getElementsByClassName("sCONNECTION"+vQID)[0]; 
				var vNodeJust = vEditStudentAnswer.getElementsByClassName("inJUSTIFICATION"+vQID)[0]; 
				var vNewNodeID   = document.getElementsByClassName("newsSTEP"+vQID)[0]; 
				var vNewNodeCon  = document.getElementsByClassName("newsCONNECTION"+vQID)[0]; 
				var vNewNodeJust = document.getElementsByClassName("newinJUSTIFICATION"+vQID)[0]; 
				moveStep(iIndex,pMaxSteps);
			}
		} else {
			alert("vNewNodeID.value='???' no append");
		}
	} else {
		alertDOM("DOM-Node 'newSTEP"+vQID+" does not exist! - appendNewStep()-Call");
	}
}