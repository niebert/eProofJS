//#################################################################
//# HTML: getStudentAnswerHTML()  
//#################################################################
function getStudentAnswerHTML() {
	//var vContent = "Length of List="+pList.length;
	var vListArray = new Array();
	var vCount = 0;
	var vAllSteps = new Array();
	var vID = "";
	var vStepDef = "";
	var vList = null; 
	vListArray.push(document.getElementsByClassName("PRECONDITION"+vQID));
	vListArray.push(document.getElementsByClassName("PROOFSTEP"+vQID));
	vListArray.push(document.getElementsByClassName("CONCLUSION"+vQID));
	var k=0;
	var j=0;
	while (lower(k,vListArray.length)) {
		vList = vListArray[k];
		vCount += vList.length;
		//---Define AllSteps-Array-----------
		j=0;
		while (lower(j,vList.length)) if (vList[j].id) {
			vID = vList[j].id;
			vStepDef = vList[j].childNodes[0].nodeValue;
			vAllSteps[vID] = vStepDef;
			j++;
		};
		k++;
	};
	var vStart = 0;
	var vContent = "";
	//vContent += "<table id='STUDENTANSWERLIST' cellspacing='10' border=1>";
	vContent += "<DIV class='STUDENTANSWERLIST"+vQID+"' id='STUDENTANSWERLIST"+vQID+"'>";
	var vJustList = document.getElementsByClassName("JUSTIFICATION"+vQID);
	//alert("vJustList.length="+vJustList.length);
	k=0;
	while (lower(k,vListArray.length)) {
		vContent += getAnswerItemHTML(vListArray[k],vJustList,vStart,vCount,vAllSteps);
		vStart += vListArray[k].length;
		k++;
	}
	//vContent +="</table>";
	vContent +="</DIV>";
	return vContent;
}
//#################################################################
//# HTML: getAnswerHeaderHTML(pList)  
//#################################################################
function getAnswerHeaderHTML() {
	var vShow_Links = getSetting("show_links");
	var vContent = "";
	vContent += "<hr><table align=\"center\"><tbody><tr>";
	vContent += "<td><b>" +vLanguage["Number_of"]+" "+vLanguage["ProofSteps"]+":</b></td>";
    //------------sSTEPCOUNT--------------
    vContent += "<td>" + getStepCountSelectorHTML() + "</td>"
    //vContent += "<td>" + vUpdateButton +"</td>";
    vContent += "<td>" + " " +"</td>";
    if (vShow_Links != "0") {
   		vContent += "<td>";
   		vContent += "<a href=\""+vLink_Tutorial+"\" target=\"_blank\">PDF-Tutorial</a>"
 		vContent += "</td>";
 	}
   	vContent += "</tr><tr>";
   	vContent += "</tr><tr>";
	vContent += "<tr><td><b>" +vLanguage["Display"]+" "+vLanguage["Proof"]+":</b>";
    vContent += "<td><SELECT id='sDISPLAYOPTION"+vQID+"' onchange=\"setVisibility4Proof(this.value,this.form)\">"
    vContent += "<OPTION value='Complete' >EDIT: "+vLanguage["Complete"]+"</OPTION>";
    vContent += "<OPTION value='Short'>EDIT: "+vLanguage["Short"]+"</OPTION>";
    vContent += "<OPTION value='Hide'>EDIT: "+vLanguage["Hide"]+"</OPTION>";
    if (getSetting("show_feedback_score") != "0") {
    	vContent += "<OPTION value='Assessment'>"+vLanguage["Assessment"]+"</OPTION>";
    };
   	if (getSetting("show_proof_solution") != "0") {
    	vContent += "<OPTION value='Solution'>"+vLanguage["Solution"]+"</OPTION>";
    };
   	vContent += "</SELECT></td>";
	vContent += "<td>" + vUpdateButton +"</td>";
    if (vShow_Links != "0") {
   		vContent += "<td>";
   		vContent += "<a href=\""+vLink_Screencast+"\" target=\"_blank\">Video/Screencast</a>"
 		vContent += "</td>";
 	}
	vContent += "</tr><tr>";
	vContent += "</tr></tbody></table><hr>";
	return vContent;
}
//#################################################################
//# HTML: getAnswerItemHTML(pList)  
//#################################################################
function getAnswerItemHTML(pList,pJustList,pNrStart,pCount,pAllSteps) {
	//var vContent = "Length of List="+pList.length;
	var vName = "";
	var vContent = "";
	var vNr=pNrStart;
	var k=0;
	while (lower(k,pList.length)) if (pList[k].id) {
	    vNr++;
	    vStepMap["STUDENTANSWER"+vNr] = vNr;
		//---Begin: STUDENTANSWER---------------------------
		vContent += "<DIV class='STUDENTANSWER"+vQID+"' id='STUDENTANSWER"+vQID+vNr+"' step='"+vNr+"' >";
		//----Begin: EDIT_STUDENTANSWER---------------------
		vContent += "<DIV class='editSTUDENTANSWER"+vQID+"' id='editSTUDENTANSWER"+vQID+vNr+"'>";
		vContent += setStepPosition(vNr,pCount);
		vContent += "<input type='button' class='bUseStep"+vQID+"' step='"+vNr+"'  id='bUseStep"+vQID+vNr+"' value=' + ' onclick=\"appendStep("+vNr+")\" style='visibility:hidden' />"; //style='visibility:hidden'
		vContent += setStepConnection(vNr,pCount);
		vContent += "<input type='button' class='bEdit"+vQID+"' step='"+vNr+"'  id='bEdit"+vQID+vNr+"'  value=' EDIT ' onclick=\"toggleEdit("+vNr+")\" />";
		//-------VIEWID----------------------------
		//vContent += " <b>[</b><b class='VIEWID"+vQID+vNr+"' id='outVIEWID"+vQID+vNr+"'>??ID??</b><b>]</b> ";
		//-------[StepID]-Select-------------------
		vContent += setStepDefinition(vNr,pCount,pAllSteps,pList[k].id);
		//-------[X]-Delete------------------------
		vContent += "<input type='button' class='bDelete"+vQID+"' step='"+vNr+"'  id='bDelete"+vQID+vNr+"' value=' X ' onclick=\"deleteProofStep("+vNr+","+pCount+")\" style='color:red'/>";
		//-------Checkboxes Invisible--------------
		//vContent += "VIEW ";
		vName = "cVIEWJUSTIFICATION"+vQID;
		vContent += "<input type='checkbox' class='"+vName+"' name='"+vName+vNr+"' step='"+vNr+"' id='"+vName+vNr+"' value='VIEW' onchange=\"changeViewJustification("+vNr+")\" checked='checked' style='display:none'/> "; // style='visibility:hidden'
		//vContent += "EDIT ";
		vName = "cEDITJUSTIFICATION"+vQID;
		vContent += "<input type='checkbox' class='"+vName+"' name='"+vName+vNr+"' step='"+vNr+"' id='"+vName+vNr+"' value='EDIT' onchange=\"changeViewJustification("+vNr+")\" style='display:none' /> "; //style='display:none'
		//-------Justifications-------------------
		vContent += "<input type='button' class='bJUSTIFICATION"+vQID+vNr+"' step='"+vNr+"'  id='bJUSTIFICATION"+vQID+vNr+"' value='"+ vLanguage["Justifications"]+"'onclick=\"toggleJustification("+vNr+")\" />";
		vContent += "<input type='text' size='15' class='inJUSTIFICATION"+vQID+"' step='"+vNr+"' id='inJUSTIFICATION"+vQID+vNr+"' value='' onchange=\"changeEditJustification("+vNr+")\"/>";
		vContent += "<input class=\"inSTEPID"+vQID+"\" type='text' size='3'  step='"+vNr+"' id='inSTEPID"+vQID+vNr+"'  value=\""+pList[k].id+"\" style='display:none' />"; // style='display:none' style='visibility:hidden'
		//vContent += "<input class=\"inSTEPID"+vQID+"\" type='text' size='3'  step='"+vNr+"' id='inSTEPID"+vQID+vNr+"'  value=\""+pList[k].id+"\" style='display:none' />"; // style='display:none' style='visibility:hidden'
		vContent += "<input class=\"STEP"+vQID+"\" type='text' size='3'  value='"+vNr+"' id='STEP"+vQID+vNr+"' style='display:none' />"; // style='display:none' style='visibility:hidden'
		//----Begin: STEPEDITOR------------------
		vContent += "<DIV class='STEPEDITOR"+vQID+"' id='STEPEDITOR"+vQID+vNr+"' style='display:none'>"; 
		vContent += "<textarea rows='9' class=\""+ vEditorID + vQID+"\" id='"+ vEditorID +vQID+ +vNr+"' style='width:98%;'  onkeyup=\"updateTextarea("+vNr+")\" ></textarea>";
		vContent += "<input class=\"inSTEPDEF"+vQID+"\" type='text' size='92' step='"+vNr+"' id='inSTEPDEF"+vQID+vNr+"'  value=\""+pList[k].childNodes[0].nodeValue+"\"  onchange=\"updateStepEdit("+vNr+")\" />";
		vContent += "<br/>"+vUpdateButton+"</DIV>";
		//----End: STEPEDITOR--------------------
		//----End:   EDIT_STUDENTANSWER-----------------
		vContent += "</DIV>";
		//----Begin: DISPLAY_STUDENTANSWER--------------
		//vContent += "<DIV class='displaySTUDENTANSWER' id='displaySTUDENTANSWER"+vNr+"'>";
		//----outSTEP---------------------
		vContent += "<DIV class='outIDandSTEP"+vQID+"' id='outIDandSTEP"+vQID+vNr+"'>";
		vContent +="<OUTSTEP class='outSTEP"+vQID+"' id='outSTEP"+vQID+vNr+"' style='display:none'>";
		vContent += "("+vNr+") "+vSpace;
		vContent += AP+"???"+AP+" "+ vSpace + getStepDef(pList[k]);
		vContent +="</OUTSTEP>";
		vContent += getStepDiplayHTML(pAllSteps,vNr,pCount);
		vContent +="</DIV>";
		//---LIST of JUSTIFICATION---------
		//vContent += "<CENTER>";
		vContent +="<DIV class='dVIEWJUSTIFICATION"+vQID+"' id='dVIEWJUSTIFICATION"+vQID+vNr+"' style='display:none' >";
		vContent += getJustificationHTML(pJustList,pAllSteps,vNr,pCount);
		vContent +="</DIV>";
		vContent +="<DIV class='dEDITJUSTIFICATION"+vQID+"' id='dEDITJUSTIFICATION"+vQID+vNr+"' style='display:none' >";
		vContent += getJustificationCheckboxHTML(pJustList,pAllSteps,vNr,pCount);
		vContent +="</DIV>";
		//vContent += "</CENTER>";
		//------------------------------
		//vContent +="</DIV>";
		//----End: DISPLAYSTUDENTANSWER----------------
		vContent +="</DIV>";
		//---END: STUDENTANSWER------------------------
		//alert(vContent);
		k++;
	};
	return vContent;
}
//#################################################################
//# HTML: setStepPosition(pStep,pCount) 
//#################################################################
function setStepPosition(pStep,pCount) {
	var vName = "sPOSITION"+vQID;
	var vDeleteName = "DEL";
	var vNr = 0;
	var vContent = "<SELECT class='"+vName+"' step='"+pStep+"'  id='"+vName+pStep+"' onchange=\"positionChange("+pStep+",this.value,"+pCount+")\">";
	while (lower(vNr,pCount)) {
	  vNr++;
	  //alert("StepPosition: pStep="+pStep+" vNr="+vNr);
	  if (pStep != vNr) {
		vContent +="<OPTION VALUE='"+vNr+"'>"+vNr+"</OPTION>";
	  } else {
		vContent +="<OPTION VALUE='"+vNr+"' selected='selected'>"+vNr+"</OPTION>";
	  }
	};
	//vContent +="<OPTION VALUE='DEL'>"+vDeleteName+"</OPTION>";
	vContent +="</SELECT>";
	return vContent;
}
//#################################################################
//# HTML: setStepConnection
//# Comment:  class= sCONNECTION1, sCONNECTION2, .....                      
//#################################################################
function setStepConnection(pStep,pCount) {
	var vName = "sCONNECTION"+vQID;
	var vDeleteName = "DEL";
	var vContent = "<SELECT  class='"+vName+"' step='"+pStep+"' id='"+vName+pStep+"'  onchange=\"updateStep("+pStep+")\">";
	//vContent +="<option value='NA'>"+vLanguage["Select_Answer"] + "</option>";
	vContent +="<option value='0'>"+vLanguage["Connection"] + "?</option>";
	vContent +="<option value='1'>"+vLanguage["Type"] + "</option>";
	vContent +="<option value='2'>START: "+vLanguage["ProofSequence"] + "</option>";
	vContent +="<option value='3'>"+vLanguage["Implication"] + "</option>";
	vContent +="<option value='4'>"+vLanguage["Equality"] + "</option>";
	vContent +="<option value='5'>"+vLanguage["lower_equal"] + "</option>";
	vContent +="<option value='6'>"+vLanguage["lower"] + "</option>";
	vContent +="<option value='7'>"+vLanguage["greater_equal"] + "</option>";
	vContent +="<option value='8'>"+vLanguage["greater"] + "</option>";
	vContent +="<option value='9'>"+vLanguage["Subset"] + "</option>";
	vContent +="<option value='10'>Definition " + vLanguage["of"] + " "+ vLanguage["Variables"] + "</option>";
	vContent +="<option value='11'>Text "+vLanguage["or"] + " "+ vLanguage["Comment"] + "</option>";
	vContent +="<option value='12'>q.e.d.</option>";
	vContent +="</SELECT>";
	return vContent;
}
//#################################################################
//# HTML: setStepDefinition 
//# Comment:  class=sSTEP1 sSTEP2, ....                      
//#################################################################
function setStepDefinition(pStep,pCount,pAllSteps,pSelectedID) {
	var vName = "sSTEP"+vQID;
	var vContent = "<SELECT class='"+vName+"' step='"+pStep+"' id='"+vName+pStep+"' onchange=\"moveStepID("+pStep+",this.value,"+pCount+")\" >";
	for (var iID in pAllSteps) {
	    if (pSelectedID != iID) {
			vContent +="<option class='OPTION_"+iID+"' value='"+iID+"'>"+iID+"</option>";
		} else {
			vContent +="<option class='OPTION_"+iID+"' value='"+iID+"' selected='selected'>"+iID+"</option>";
		}
    }
	vContent +="</SELECT>";
	return vContent;
}
//#################################################################
//# HTML: getStepDisplayHTML(pAllSteps,pStep,pCount)  
//#################################################################
function getStepDiplayHTML(pAllSteps,pStep,pCount) {
  // Class: outJUSTIFICATION6,  ID: outJUSTIFICATION6-J2
  var vCellWidth = "40px";
  var vContent = "<table width='95%'border='0'><tr><td valign='center'  width='"+vCellWidth+"'>";
  var vName = "outSTEPDISPLAY"+vQID+pStep; 
  var vID = "";
  var vHideShow = "style=\"display:none\""
  var i = 0;
  //var vDisp = "style='display:none'";
  for (var vID in pAllSteps) {
  	i++;
  	if (i == pStep) {
  		vHideShow = "style=\"display:block\"";
  	} else {
  		vHideShow = "style=\"display:none\"";
  	}
    vContent += "<OUTTEXT class='"+vName+"' id='"+vName+"-POS-"+i+"' "+vHideShow+">("+i+")</OUTTEXT>";
  };
  vContent += vSpace+"</td><td valign='center'  width='"+vCellWidth+"'>";
  vHideShow = "style=\"display:block\"";
  vContent += "<OUTTEXT class='"+vName+"' id='"+vName+"-CON-0'  "+vHideShow+">"+AP+ "???" + AP +"</OUTTEXT>";
  vHideShow = "style=\"display:none\"";
  vContent += "<OUTTEXT class='"+vName+"' id='"+vName+"-CON-NA' "+vHideShow+">"+AP+ "???" + AP +"</OUTTEXT>";
  i = 0;
  while (lower(i,vConnectionArray.length)) {
    vContent += "<OUTTEXT class='"+vName+"' id='"+vName+"-CON-"+i+"'  "+vHideShow+">"+AP+vConnectionArray[i] + AP +"</OUTTEXT>";
	i++;
  }
  vContent += vSpace+"</td><td valign='center' align='left'>";
  i = 0;
  for (var vID in pAllSteps) {
	i++;
  	if (i == pStep) {
  		vHideShow = "style=\"display:block\"";
  	} else {
  		vHideShow = "style=\"display:none\"";
  	}
    vContent += "<OUTTEXT class='"+vName+"' id='"+vName+"-STEP-"+vID+"' stepid='"+vID+"' "+vHideShow+">"+getStepDef4ID(vID) +"</OUTTEXT>";
  };
  vContent += "</td></tr></table>"
  return vContent;
}
//#################################################################
//# HTML: getJustificationHTML(pList,pStep,pCount)  
//#################################################################
function getJustificationHTML(pJustList,pAllSteps,pStep,pCount) {
  // Class: outJUSTIFICATION6,  ID: outJUSTIFICATION6-J2
  var vContent = "";
  var vName = "outJUSTIFICATION"+vQID; 
  var vID = "";
  vContent += "<u>"+ vLanguage["Justifications"]+":</u> [<IDTAG class='VIEWID"+vQID+pStep+"' id='dVIEW"+vQID+pStep+"'>??ID??</IDTAG>]";
  vContent +="<ul>";
  var k=0;
  var vStepDef = "";
  while (lower(k,pJustList.length)) {
    vID = pJustList[k].id;
    //alert("JustList["+k+"]="+vID);
    vContent += "<li class='"+vName+pStep+"' id='"+vName+pStep+"-"+vID+"' stepid='"+vID+"'>"+ getStepDef4ID(vID) +"</li>";
    k++;
  }
  for (var vID in pAllSteps) {
      vContent += "<li class='"+vName+pStep+"' id='"+vName+pStep+"-"+vID+"' stepid='"+vID+"'>"+getStepDef4ID(vID) +"</li>";
  };
  vContent += "</ul>";
  return vContent;
}
//#################################################################
//# HTML: getJustificationCheckboxHTML(pList,pAllSteps,pStep,pCount)  
//#################################################################
function getJustificationCheckboxHTML(pJustList,pAllSteps,pStep,pCount) {
	var vContent = "";
	var vName = "sJUSTIFICATION"+vQID+pStep;
	var vID = "";
	var vStepDef = "";
	vContent += "<b>"+vLanguage["Justifications"]+": [</b><b class='VIEWID"+vQID+pStep+"' id='cVIEW"+vQID+pStep+"'>??ID??</b><b>]</b>";
	vContent += "<input type='button'  value='  OK  ' step='"+pStep+"' name='bOK"+vQID+pStep+"' onclick=\"toggleJustification("+pStep+")\" ><br/>";
	var k=0;
    while (lower(k,pJustList.length)) {
      vID = pJustList[k].id;
	  vContent += getCheckbox4Step(pStep, vName ,vID ,getStepDef4ID(vID) )
      k++;
    }
	for (var vID in pAllSteps)  {
		vContent += getCheckbox4Step(pStep, vName ,vID ,getStepDef4ID(vID) )
	};
	//alert("CHECKBOX-Justification:\n"+vContent);
	return vContent;
}
//#################################################################
//# Method: getCheckbox4Step()  
//# Comment:  create a DIV-wrapped Checkbox for Justification                  
//#################################################################
function getCheckbox4Step(pStep,pName,pID,pStepDef) {
	var vContent = "<DIV class='checkboxJUSTIFICATION"+vQID+"' id='checkboxJUSTIFICATION"+vQID+pStep+"-"+pID+"'>";
	vContent += "<input type='checkbox' class='"+pName+"' name='"+pName+"-"+pID+"' step='"+pStep+"' id='"+pName+"-"+pID+"' value='"+pID+"' onchange=\"updateJustifications("+pStep+")\" /> ";
    vContent += pStepDef +"</DIV>";
    return vContent;
}
