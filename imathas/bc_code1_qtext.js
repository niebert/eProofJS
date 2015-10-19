  //--------------------------------------------
  var vLink_Screencast = "http://e-proof.weebly.com/german-tutorials.html";
  var vLink_Tutorial   = "http://math.uni-landau.de/download/IMathAS/eProof_iMathAS_Tutorial.pdf";
  var vMaxQuestionPart = 6;
  var CR = String.fromCharCode(10); //newline symbol /n
  var GT = String.fromCharCode(62); //greater than symbol &gt;
  var LT = String.fromCharCode(60); //lower than symbol &gt;
  var vStepMap  = new Array();
  var vEditorID = "mceEditor";
  var vUpdateButton = "<input type='button' name='bUpdate' value=' Update ' onclick=\"updateInput2IMathAS(this.form)\">";
  var vSpace =  " &nbsp;&nbsp; " 
  var vConnection2Index = new Array();
  var vConnectionArray = new Array("???","TYP"," ","="+GT,"=",LT+"=",LT,GT+"=",GT,"subseteq","DEF","TEXT","q.e.d.");
  var vNr = 1;
  vConnection2Index["TYP"] = vNr;
  vNr++;
  vConnection2Index[" "] = vNr; //START: Beweissequenz
  vNr++;
  vConnection2Index["="+GT] = vNr;
  vNr++;
  vConnection2Index['='] = vNr;
  vNr++;
  vConnection2Index[LT+"="] = vNr;
  vNr++;
  vConnection2Index[LT] = vNr;
  vNr++;
  vConnection2Index[GT+'='] = vNr;
  vNr++;
  vConnection2Index[GT] = vNr;
  vNr++;
  vConnection2Index['subseteq'] = vNr;
  vNr++;
  vConnection2Index['DEF'] = vNr;
  vNr++;
  vConnection2Index['TEXT'] = vNr;
  vNr++;
  vConnection2Index['q.e.d.'] = vNr;
function greater(a,b) {
  eval(decodeURI("var vReturn%20=%20(a%3Eb);"));
  return vReturn;
}
function lower(a,b) {
  eval(decodeURI("vReturn%20=%20(a%3Cb);"));
  return vReturn;
}
function toggleHide(pObjectID) {
  var vNode = document.getElementById(pObjectID);
  if (!vNode) {
    alert("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
  } else {
    if (vNode.style.display=="none") {
      vNode.style.visibility = "visible";
      vNode.style.display = "block";
    } else {
      vNode.style.visibility = "hidden";
      vNode.style.display = "none";
    }
  }  
}
function toggleElementHide(pObjectID) {
  var vNode = document.getElementById(pObjectID);
  if (!vNode) {
    alert("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
  } else {
    if (vNode.style.visibility=="hidden") {
      vNode.style.visibility = "visible";
    } else {
      vNode.style.visibility = "hidden";
    }
  }  
}
function hideElement(pObjectID) {
  var vNode = document.getElementById(pObjectID);
  if (!vNode) {
    alert("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
  } else {
    vNode.style.visibility = "hidden";
  }   
}
function showElement(pObjectID) {
  var vNode = document.getElementById(pObjectID);
  if (!vNode) {
    alert("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
  } else {
    vNode.style.visibility ="visible";
  }   
}
function hideObject(pObjectID) {
  var vNode = document.getElementById(pObjectID);
  if (!vNode) {
    alert("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
  } else {
    vNode.style.display = "none";
    vNode.style.visibility = "hidden";
  } 
}
function showObject(pObjectID) {
  var vNode = document.getElementById(pObjectID);
  if (!vNode) {
    alert("DOM Node with ID='"+pObjectID+"' undefined! e-Proof Emulator.html:170")
  } else {
    vNode.style.display = "block";
    vNode.style.visibility ="visible"
  }
}
function hideEditLines(pCount) {
  var vListArray = document.getElementsByClassName("editSTUDENTANSWER");
  var vNr = 0;
  while (lower(vNr,pCount)) {
    vNr++;
    hideObject("editSTUDENTANSWER"+vNr);
  }
}
function showEditLines(pCount) {
  var vNr = 0;
  while (lower(vNr,pCount)) {
    vNr++;
    showObject("editSTUDENTANSWER"+vNr);
  }
}
function setVisibility4Proof(pSelected) {
  var vNode = createNodeQN("Display Selector","qn1000");
  vNode.value = pSelected;
  var vListArray = document.getElementsByClassName("cVIEWJUSTIFICATION");
  if (pSelected=="Short") {
    showObject("EDITPROOF");
    showObject("STUDENTANSWERLIST");
    showEditLines(vListArray.length);
    hideObject("ASSESSMENT");
    hideObject("SOLUTION");
    setShortJustification(vListArray,true);
  } else   if (pSelected=="Complete") {
    showObject("EDITPROOF");
    showObject("STUDENTANSWERLIST");
    showEditLines(vListArray.length);
    hideObject("ASSESSMENT");
    hideObject("SOLUTION");
    setShortJustification(vListArray,false);
  } else   if (pSelected=="Hide") {
    showObject("EDITPROOF");
    showObject("STUDENTANSWERLIST");
    hideEditLines(vListArray.length);
    hideObject("ASSESSMENT");
    hideObject("SOLUTION");
  } else   if (pSelected=="Assessment") {
    showObject("ASSESSMENT");
    hideObject("EDITPROOF");
    hideObject("STUDENTANSWERLIST");
    hideObject("SOLUTION");
  } else   if (pSelected=="Solution") {
    showObject("SOLUTION");
    hideObject("EDITPROOF");
    hideObject("ASSESSMENT");
    hideObject("STUDENTANSWERLIST");
    }
}
function setShortJustification(pListArray,pBoolean) {
  var i=0;
  while (lower(i,pListArray.length)) {
    pListArray[i].checked = !(pBoolean);
    i++;
  };
  i = 0;
  while (lower(i,pListArray.length)) {
    i++;
    changeViewJustification(i);
  }
  if (pBoolean) {
    i = 0;
    while (lower(i,pListArray.length)) {
      i++;
      hideElement("bJUSTIFICATION"+i);
      hideElement("inJUSTIFICATION"+i);
    }
  } else {
    i = 0;
    while (lower(i,pListArray.length)) {
      i++;
      showElement("bJUSTIFICATION"+i);
      showElement("inJUSTIFICATION"+i);
    }
  }
}
function setVisibility4Step(pStep,pNode,pCountUnused) {
  if (pNode.parentNode.id == "UNUSEDSTEPS") {
    hideElement("bDelete"+pStep);
    hideElement("bJUSTIFICATION"+pStep);
    hideElement("inJUSTIFICATION"+pStep);
    hideElement("sCONNECTION"+pStep);
    hideElement("sSTEP"+pStep);
    showElement("bUseStep"+pStep);
  } else {
    showElement("bDelete"+pStep);
    showElement("bJUSTIFICATION"+pStep);
    showElement("inJUSTIFICATION"+pStep);
    showElement("sCONNECTION"+pStep);
    showElement("sSTEP"+pStep);
    hideElement("bUseStep"+pStep);
  };
  if (greater(pCountUnused,0)) {
    showElement('bToggleUnused');
  } else {
    hideElement('bToggleUnused');
  }
}
function getHideStepIDs() {
  var vAllSteps = new Array();
  var vListArray = new Array();
  var vList = null;
  vListArray.push(document.getElementsByClassName("PROOFSTEP"));
  vListArray.push(document.getElementsByClassName("CONCLUSION"));
  var k=0;
  var j=0;
  while (lower(k,vListArray.length)) {
    vList = vListArray[k];
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
function getAllStepIDs() {
  var vAllSteps = new Array();
  var vListArray = new Array();
  var vList = null;
  vListArray.push(document.getElementsByClassName("PRECONDITION"));
  vListArray.push(document.getElementsByClassName("PROOFSTEP"));
  vListArray.push(document.getElementsByClassName("CONCLUSION"));
  var k=0;
  var j=0;
  while (lower(k,vListArray.length)) {
    vList = vListArray[k];
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
function getStudentAnswerHTML() {
  var vListArray = new Array();
  var vCount = 0;
  var vAllSteps = new Array();
  var vID = "";
  var vStepDef = "";
  var vList = null; 
  vListArray.push(document.getElementsByClassName("PRECONDITION"));
  vListArray.push(document.getElementsByClassName("PROOFSTEP"));
  vListArray.push(document.getElementsByClassName("CONCLUSION"));
  var k=0;
  var j=0;
  while (lower(k,vListArray.length)) {
    vList = vListArray[k];
    vCount += vList.length;
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
  vContent += "<DIV class='STUDENTANSWERLIST' id='STUDENTANSWERLIST'>";
  var vJustList = document.getElementsByClassName("JUSTIFICATION");
  k=0;
  while (lower(k,vListArray.length)) {
    vContent += getAnswerItemHTML(vListArray[k],vJustList,vStart,vCount,vAllSteps);
    vStart += vListArray[k].length;
    k++;
  }
  vContent +="</DIV>";
  return vContent;
}
function getAnswerHeaderHTML() {
  var vShow_Links = getSetting("show_links");
  var vContent = "";
  vContent += "<hr><table align=\"center\"><tbody><tr>";
  vContent += "<td><b>" +vLanguage["Number_of"]+" "+vLanguage["ProofSteps"]+":</b></td>";
    vContent += "<td>" + getStepCountSelectorHTML() + "</td>"
    vContent += "<td>" + " " +"</td>";
    if (vShow_Links != "0") {
       vContent += "<td>";
       vContent += "<a href=\""+vLink_Tutorial+"\" target=\"_blank\">PDF-Tutorial</a>"
     vContent += "</td>";
   }
     vContent += "</tr><tr>";
     vContent += "</tr><tr>";
  vContent += "<tr><td><b>" +vLanguage["Display"]+" "+vLanguage["Proof"]+":</b>";
    vContent += "<td><SELECT id='sDISPLAYOPTION' onchange=\"setVisibility4Proof(this.value)\">"
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
function getAnswerItemHTML(pList,pJustList,pNrStart,pCount,pAllSteps) {
  var vName = "";
  var vContent = "";
  var vNr=pNrStart;
  var k=0;
  while (lower(k,pList.length)) if (pList[k].id) {
      vNr++;
      vStepMap["STUDENTANSWER"+vNr] = vNr;
    vContent += "<DIV class='STUDENTANSWER' id='STUDENTANSWER"+vNr+"' step='"+vNr+"' >";
    vContent += "<DIV class='editSTUDENTANSWER' id='editSTUDENTANSWER"+vNr+"'>";
    vContent += setStepPosition(vNr,pCount);
    vContent += "<input type='button' class='bUseStep' step='"+vNr+"'  id='bUseStep"+vNr+"' class='bUseStep"+vNr+"' value=' + ' onclick=\"appendStep("+vNr+")\" style='visibility:hidden' />"; //style='visibility:hidden'
    vContent += setStepConnection(vNr,pCount);
    vContent += "<input type='button' class='bEdit' step='"+vNr+"'  id='bEdit"+vNr+"'  class='bEdit"+vNr+"' value=' EDIT ' onclick=\"toggleEdit("+vNr+")\" />";
    vContent += " <b>[</b><b class='VIEWID"+vNr+"' id='outVIEWID"+vNr+"'>??ID??</b><b>]</b> ";
    vContent += setStepDefinition(vNr,pCount,pAllSteps,pList[k].id);
    vContent += "<input type='button' class='bDelete' step='"+vNr+"'  id='bDelete"+vNr+"'  class='bDelete"+vNr+"' value=' X ' onclick=\"deleteProofStep("+vNr+","+pCount+")\" style='color:red'/>";
    vName = "cVIEWJUSTIFICATION";
    vContent += "<input type='checkbox' class='"+vName+"' name='"+vName+vNr+"' step='"+vNr+"' id='"+vName+vNr+"' value='VIEW' onchange=\"changeViewJustification("+vNr+")\" checked='checked' style='display:none'/> "; // style='visibility:hidden'
    vName = "cEDITJUSTIFICATION";
    vContent += "<input type='checkbox' class='"+vName+"' name='"+vName+vNr+"' step='"+vNr+"' id='"+vName+vNr+"' value='EDIT' onchange=\"changeViewJustification("+vNr+")\" style='display:none' /> "; //style='display:none'
    vContent += "<input type='button' class='bJUSTIFICATION"+vNr+"' step='"+vNr+"'  id='bJUSTIFICATION"+vNr+"' value='"+ vLanguage["Justifications"]+"'onclick=\"toggleJustification("+vNr+")\" />";
    vContent += "<input type='text' size='15' class='inJUSTIFICATION' step='"+vNr+"' id='inJUSTIFICATION"+vNr+"' value='' onchange=\"changeEditJustification("+vNr+")\"/>";
    vContent += "<input class=\"inSTEPID\" type='text' size='3'  step='"+vNr+"' id='inSTEPID"+vNr+"'  value=\""+pList[k].id+"\" style='display:none' />"; // style='display:none' style='visibility:hidden'
    vContent += "<input class=\"STEP\" type='text' size='3'  value='"+vNr+"' id='STEP"+vNr+"' style='display:none' />"; // style='display:none' style='visibility:hidden'
    vContent += "<DIV class='STEPEDITOR' id='STEPEDITOR"+vNr+"' style='display:none'>"; 
    vContent += "<textarea rows='9' \""+ vEditorID + "\" id='"+ vEditorID +vNr+"' style='width:98%;'  onkeyup=\"updateTextarea("+vNr+")\" ></textarea>";
    vContent += "<input class=\"inSTEPDEF\" type='text' size='92' step='"+vNr+"' id='inSTEPDEF"+vNr+"'  value=\""+pList[k].childNodes[0].nodeValue+"\"  onchange=\"updateStepEdit("+vNr+")\" />";
    vContent += "</DIV>";
    vContent += "</DIV>";
    vContent += "<DIV class='outIDandSTEP' id='outIDandSTEP"+vNr+"'>";
    vContent +="<OUTSTEP class='outSTEP' id='outSTEP"+vNr+"'>";
    vContent += "("+vNr+") "+vSpace;
    vContent += "`???` "+ vSpace + getStepDef(pList[k]);
    vContent +="</OUTSTEP>";
    vContent +="</DIV>";
    vContent +="<DIV class='dVIEWJUSTIFICATION' id='dVIEWJUSTIFICATION"+vNr+"' style='display:none' >";
    vContent += getJustificationHTML(pJustList,pAllSteps,vNr,pCount);
    vContent +="</DIV>";
    vContent +="<DIV class='dEDITJUSTIFICATION' id='dEDITJUSTIFICATION"+vNr+"' style='display:none' >";
    vContent += getJustificationCheckboxHTML(pJustList,pAllSteps,vNr,pCount);
    vContent +="</DIV>";
    vContent +="</DIV>";
    k++;
  };
  return vContent;
}
function appendStep(pStep,pCount) {
  var vStudentAnswer = document.getElementById("STUDENTANSWER"+pStep);
  var vUnused4Proof  = document.getElementById("UNUSEDSTEPS");
  moveStepOrder(pStep,0,pCount);
  setVisibility4Step(pStep,vStudentAnswer,vUnused4Proof.childNodes.length);
}
function deleteProofStep(pStep,pCount) {
  var vNode4ID = document.getElementById("sSTEP"+pStep);
  Check = confirm(vLanguage["Delete_Prompt"] + CR + vLanguage["ProofStep"]+" ["+vNode4ID.value+"] ");
  if (Check) {
    moveStepOrder(pStep,pCount+1,pCount);
    alert(vLanguage["ProofStep"]+" ["+vNode4ID.value+"] "+vLanguage["Deleted"]);
  }
}
function changeEditJustification(pStep) {
  setJustificationCheckbox(pStep);
  changeViewJustification(pStep);
}
function changeViewJustification(pStep) {
  var vCheckViewBox = document.getElementById("cVIEWJUSTIFICATION"+pStep);  
  var vCheckEditBox = document.getElementById("cEDITJUSTIFICATION"+pStep);  
  var vInJustifications = document.getElementById("inJUSTIFICATION"+pStep).value;  
  hideAllJustifications(pStep);
  if (vCheckEditBox.checked) {
    hideObject("dVIEWJUSTIFICATION"+pStep);
    showObject("dEDITJUSTIFICATION"+pStep);
  } else if (vCheckViewBox.checked) {
    if (vInJustifications != '') {
      showObject("dVIEWJUSTIFICATION"+pStep);
    } else {
      hideObject("dVIEWJUSTIFICATION"+pStep);
    }
    hideObject("dEDITJUSTIFICATION"+pStep);
  } else {
    hideObject("dVIEWJUSTIFICATION"+pStep);
    hideObject("dEDITJUSTIFICATION"+pStep);
  };
  updateTextIDs(pStep);
  append_PreviousStep_Justification();
  showSelectedJustifications(pStep);  
}
function append_PreviousStep_Justification() {
  var vListID = document.getElementsByClassName("sSTEP");
  var vListNode = document.getElementsByClassName("STUDENTANSWER");
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
      vName = "checkboxJUSTIFICATION"+vStep;
      k=0;
      while (lower(k,vVisibleJustArray.length)) { 
        vCheckName = vName+"-"+vVisibleJustArray[k]; 
        showObject(vCheckName);
        k++;
      };
      vStepArray.push(vListNode[i].step);
      vVisibleJustArray.push(vListID[i].value);
    };
    i++;
  }
}
function hideAllJustifications(pStep) {
  if (pStep) {
    var vOutName    = "outJUSTIFICATION"+pStep;
    var vSelectName = "sJUSTIFICATION"+pStep;
    var vCheckName  = "checkboxJUSTIFICATION"+pStep;
    var vViewList = document.getElementsByClassName(vOutName);
    var k=0;
  while (lower(k,vViewList.length)) if (vViewList[k].style) {
      vViewList[k].style.display = "none";
      k++;
    };
    var vHideSteps = getHideStepIDs();
    var vCheckboxes = document.getElementsByClassName(vSelectName);
    for (var vID in vHideSteps) if (pStep) {
      hideObject(vCheckName +"-"+vID);
    }; 
  }
}
function toggleEdit(pStep) {
  var vListIDs      = document.getElementsByClassName("inSTEPID");
  var vStepDefNode  = document.getElementById("inSTEPDEF"+pStep);
  var vTextareaNode = document.getElementById(vEditorID + pStep);
  vTextareaNode.value = vStepDefNode.value.replace(/__n__/g,CR);
  toggleHide("STEPEDITOR"+pStep);
  hideObject("inSTEPDEF"+pStep);
}
function toggleJustification(pStep) {
  if (pStep) {
    var vCheckViewBox = document.getElementById("cVIEWJUSTIFICATION"+pStep);  
    var vCheckEditBox = document.getElementById("cEDITJUSTIFICATION"+pStep);  
    var vID = document.getElementById("inSTEPID"+pStep).value;  
    vCheckEditBox.checked = !vCheckEditBox.checked;
    hideAllJustifications(pStep);
    append_PreviousStep_Justification();
    showSelectedJustifications(pStep);
    changeViewJustification(pStep);
  } else {
    alert("pStep is not defined in toggleJustification");
  }
}
function setStepPosition(pStep,pCount) {
  var vName = "sPOSITION"+pStep;
  var vDeleteName = "DEL";
  var vNr = 0;
  var vContent = "<SELECT class='sPOSITION' step='"+pStep+"' class='"+vName+"' id='"+vName+"' onchange=\"moveStepOrder("+pStep+",this.value,"+pCount+")\">";
  while (lower(vNr,pCount)) {
    vNr++;
    if (pStep != vNr) {
    vContent +="<OPTION VALUE='"+vNr+"'>"+vNr+"</OPTION>";
    } else {
    vContent +="<OPTION VALUE='"+vNr+"' selected='selected'>"+vNr+"</OPTION>";
    }
  };
  vContent +="</SELECT>";
  return vContent;
}
function setStepConnection(pStep,pCount) {
  var vName = "sCONNECTION"+pStep;
  var vDeleteName = "DEL";
  var vContent = "<SELECT class='sCONNECTION' step='"+pStep+"' id='"+vName+"' class='"+vName+"'  onchange=\"updateStep("+pStep+")\">";
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
  vContent +="</select>";
  return vContent;
}
function setStepDefinition(pStep,pCount,pAllSteps,pSelectedID) {
  var vName = "sSTEP"+pStep;
  var vContent = "<SELECT class='sSTEP' step='"+pStep+"' class='"+vName+"' id='"+vName+"' onchange=\"updateStepChange("+pStep+")\" >";
  for (var iID in pAllSteps) {
      if (pSelectedID != iID) {
      vContent +="<option class='OPTION_"+iID+"' value='"+iID+"'>"+iID+"</option>";
    } else {
      vContent +="<option class='OPTION_"+iID+"' value='"+iID+"' selected='selected'>"+iID+"</option>";
    }
    }
  vContent +="</select>";
  return vContent;
}
function showSelectedJustifications(pStep) {
  var vInputNode = document.getElementById("inJUSTIFICATION"+pStep);
  var vJustString = vInputNode.value.replace(/\s/g,"");
  if (vJustString != "") {
    var vID_Array = vJustString.split(",");
    var vNode = null;
    var vOutNodeID = ""
    var k=0;
    while (lower(k,vID_Array.length)) {
      vOutNodeID = "outJUSTIFICATION"+pStep+"-"+vID_Array[k];
      vNode = document.getElementById(vOutNodeID);
      if(vNode) {
        showObject(vOutNodeID);
      } else {
        alert("Error (Node="+vOutNodeID+"): Justification with the ID='"+vID_Array[k]+"' does not exist!");
      };
      k++;
    }
  }
}
function setJustificationCheckbox(pStep) {
  var vInJustification
  var vCheckboxes = document.getElementsByClassName("sJUSTIFICATION"+pStep);
  var vInputNode = document.getElementById("inJUSTIFICATION"+pStep);
  var vJustString = vInputNode.value.replace(/\s/g,"");
  var vID_Array = vJustString.split(",");
  var k=0;
  var i=0;
  while (lower(k,vID_Array.length)) {
    i=0;
    while (lower(i,vCheckboxes.length)) {
      if (vID_Array[k] == vCheckboxes[i].value) {
        vCheckboxes[i].checked = true;
      };
      i++;
    };
    k++;
  };
  showSelectedJustifications(pStep);
}
function getJustificationCheckboxHTML(pList,pAllSteps,pStep,pCount) {
  var vContent = "";
  var vName = "sJUSTIFICATION"+pStep;
  var vID = "";
  var vStepDef = "";
  vContent += "<b>"+vLanguage["Justifications"]+": [</b><b class='VIEWID"+pStep+"' id='cVIEW"+pStep+"'>??ID??</b><b>]</b>";
  vContent += "<input type='button'  value='  OK  ' step='"+pStep+"' name='bOK"+pStep+"' onclick=\"toggleJustification("+pStep+")\" ><br/>";
  var k=0;
  while (lower(k,pList.length)) {
    vContent += getCheckbox4Step(pStep, vName ,pList[k].id ,getStepDef(pList[k]) );
    k++;
  };
  for (var vID in pAllSteps)  {
    vContent += getCheckbox4Step(pStep, vName ,vID ,getStepDef4ID(vID) )
  };
  return vContent;
}
function getCheckbox4Step(pStep,pName,pID,pStepDef) {
  var vContent = "<DIV class='checkboxJUSTIFICATION' id='checkboxJUSTIFICATION"+pStep+"-"+pID+"'>";
  vContent += "<input type='checkbox' class='"+pName+"' name=='"+pName+"' step='"+pStep+"' id='"+pName+"' value='"+pID+"' onchange=\"updateJustifications("+pStep+")\" /> ";
    vContent += pStepDef +"</DIV>";
    return vContent;
}
function getJustificationHTML(pList,pAllSteps,pStep,pCount) {
  var vContent = "";
  var vName = "outJUSTIFICATION"+pStep;
  var vID = "";
  vContent += "<u>"+ vLanguage["Justifications"]+":</u> [<IDTAG class='VIEWID"+pStep+"' id='dVIEW"+pStep+"'>??ID??</IDTAG>]";
  vContent +="<ul>";
  var k=0;
  while (lower(k,pList.length))  {
    vID = pList[k].id;
    vContent += "<li class='outJUSTIFICATION"+pStep+"' id='outJUSTIFICATION"+pStep+"-"+vID+"' stepid='"+vID+"'>"+getStepDef(pList[k]) +"</li>";
    k++;
  };
  for (var vID in pAllSteps) {
      vContent += "<li class='outJUSTIFICATION"+pStep+"' id='outJUSTIFICATION"+pStep+"-"+vID+"' stepid='"+vID+"'>"+getStepDef4ID(vID) +"</li>";
  };
  vContent += "</ul>";
  return vContent;
}
function getStepDef4ID(pID) {
  var vNode = document.getElementById(pID);
  if (vNode.id) {
    return  " ["+vNode.id+"] " + vSpace + decodeValue(vNode.childNodes[0].nodeValue);
  } else {
    return " [pID] ???";
  }
}
function getStepDef(pNode) {
  if (pNode.id) {
    return " ["+pNode.id+"] " + vSpace + decodeValue(pNode.childNodes[0].nodeValue);
  } else {
    return " [???] getStepDef(pNode??)";
  }
}
function saveASCIImath(pNodeName,pString) {
  var vOutNode = removeChildContent(pNodeName);
  vOutNode.innerHTML = decodeTextarea(pString);
  AMprocessNode(vOutNode);
}
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
function moveStepOrder(pStep,pNewPos,pCount) {
  var vListNode     = document.getElementsByClassName("STUDENTANSWER");
  var vSelectorID   = "sPOSITION"+pStep;
  var vOldPos      =  getList_Position(vListNode,"STUDENTANSWER",pStep);
  var vProof        = document.getElementById("STUDENTANSWERLIST")
  var vUnused4Proof = document.getElementById("UNUSEDSTEPS");
  var vCount        = vListNode.length;
  var vCountUnused  = vUnused4Proof.childNodes.length;
    var vCountProof   = vListNode.length - vCountUnused;
    if (pNewPos == -1) {
      alert("No Move-Operation with pNewPos="+pNewPos+"=-1");
    } else if (vOldPos == pNewPos) {
      alert("No Move-Operation vOldPos="+vOldPos+"=pNewPos");
    } else {
      var vOldNode = document.getElementById("STUDENTANSWER"+pStep);
     var vOldParentNode = vOldNode.parentNode;
    var vRemovedChild = vOldParentNode.removeChild(vOldNode);
    if (pNewPos == 0) {
        vProof.appendChild(vRemovedChild);
        vCountProof++;
        pNewPos = vCountProof;
      } else if (lower(pNewPos , vCount - vCountUnused)) {
        vProof.insertBefore(vRemovedChild,vListNode[pNewPos-1]);
      } else if (pNewPos == (vCount - vCountUnused)) {
        vProof.appendChild(vRemovedChild);
      } else {
        vUnused4Proof.appendChild(vRemovedChild);
      };
      vCountProof   = vListNode.length - vUnused4Proof.childNodes.length;
    append_PreviousStep_Justification();
    setVisibility4Step(pStep,vRemovedChild,vUnused4Proof.childNodes.length);
    updateInput();
  }
}
function updateInput() {
  var vListNode = document.getElementsByClassName("sPOSITION");
  var vNr = 0;
  while (lower(vNr,vListNode.length)) {
    vNr++;
    vListNode[vNr-1].value = vNr;
  };
  var k=0;
  while (lower(k,vListNode.length)) { 
    k++;
    updateStep(k);
    };
    saveInput2IMathAS() ;
}
function updateStepChange(pStep) {
  var vListOldID    = document.getElementsByClassName("inSTEPID");
  var vOldIDnode = document.getElementById("inSTEPID"+pStep);
  var vNewIDnode = document.getElementById("sSTEP"+pStep);
  var vNewPos    = document.getElementById("sPOSITION"+pStep).value;
  var vSwapStep  = 0;
  var vSwapNode  = null;
  var vOldID = vOldIDnode.value;
  var vNewID = vNewIDnode.value;
  var i = 0;
  while (lower(i,vListOldID.length)) {
    if (vNewIDnode.value == vListOldID[i].value) {
      vSwapStep = vListOldID[i].step;
      vSwapNode = document.getElementById("sPOSITION"+vSwapStep);
      vSwapStep = vSwapNode.value;
    };
    i++;
  };  
  vNewIDnode.value = vOldIDnode.value;
    moveStepOrder(vSwapStep,vNewPos,vListOldID.length);
}
function updateJustifications(pStep) {
  var vCheckboxes = document.getElementsByClassName("sJUSTIFICATION"+pStep);
  var vInputNode = document.getElementById("inJUSTIFICATION"+pStep);
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
function updateTextIDs(pStep) {
  var vArrayNodeID = document.getElementsByClassName("VIEWID"+pStep);  
  var vID = document.getElementById("inSTEPID"+pStep).value; 
  var i=0;
  while (lower(i,vArrayNodeID.length)) {
    vArrayNodeID[i].innerHTML = vID;
    i++;
  };
}
function updateTextarea(pStep) {
  var vNodeStepDef  = document.getElementById("inSTEPDEF"+pStep);
  var vNodeEditor   = document.getElementById(vEditorID + pStep);
  var vValue = vNodeEditor.value;
  eval(decodeURI("vValue%20=%20vValue.replace(/%5Cn/g,%22__n__%22);"));
  vNodeStepDef.value = vValue;
  updateStepEdit(pStep);
}
function updateStepEdit(pStep) {
  var vStepDef  = document.getElementById("inSTEPDEF"+pStep).value;
  var vID       = document.getElementById("inSTEPID"+pStep).value;
  var vStepNode = document.getElementById(vID);
  if (vStepNode) {
    vStepNode.childNodes[0].nodeValue = encodeValue(vStepDef);
    updateStep(pStep);
    saveInput2IMathAS();
  } else {
    alert("vStepNode not found for ID='"+vID+"'");
  }
}
function updateStep(pStep) {
  var vOutString = ""
  var vPos = document.getElementById("sPOSITION"+pStep);
  vOutString += "("+vPos.value+") " + vSpace;
  var vCon = document.getElementById("sCONNECTION"+pStep);
  vConIndex = parseInt(vCon.value);
  vConnection = "???"; //vConnectionArray[]
  if (vCon.value != "NA") {
      vConnection = vConnectionArray[parseInt(vCon.value)];
  };
  if (vConnection != " ") {
    vOutString +=  " `"+ vConnection +"`  " +vSpace;
  };
  var vStepID = document.getElementById("sSTEP"+pStep);
  var vStepDef_Node = document.getElementById("inSTEPDEF"+pStep);
  var vStepNode = document.getElementById(vStepID.value);
  if (vStepNode) {
    vOutString += " "+getStepDef(vStepNode)+ " ";
    vStepDef_Node.value = decodeValue(vStepNode.childNodes[0].nodeValue);
  } else {
    vOutString += " "+vLanguage["ProofStep"]+" "+vLanguage["for"]+" ID=["+vStepID.value+"] undefined!";
  };
  updateTextIDs(pStep);
  showSelectedJustifications(pStep);
  saveASCIImath("outSTEP"+pStep,vOutString);
}
function updateInput2IMathAS(pForm)  {
  //alert("Update to iMathAS");
  saveInput2IMathAS();
  //alert("Submit to iMathAS (disabled)");
  pForm.submit();
}
function loadInput2IMathAS()  {
  loadSteps2iMathAS("PRECONDITION","qn1002"); 
  loadSteps2iMathAS("CONCLUSION","qn1003"); 
  loadSteps2iMathAS("JUSTIFICATION","qn1004"); 
  loadSteps2iMathAS("PROOFSTEP","qn1005"); 
}
function saveInput2IMathAS()  {
  saveAnswer2IMathAS("STUDENTANSWER","qn1001");
  saveSteps2iMathAS("PRECONDITION","qn1002"); 
  saveSteps2iMathAS("CONCLUSION","qn1003"); 
  saveSteps2iMathAS("JUSTIFICATION","qn1004"); 
  saveSteps2iMathAS("PROOFSTEP","qn1005"); 
  saveStepCount2iMathAS("iMathAS Steps Visible","qn1007");
}
function loadStepCount2iMathAS(pLabel,pIMathAS_ID) {
  var vProof = document.getElementById("STUDENTANSWERLIST");
  var vCountStepNode = createNodeQN("("+pLabel+")",pIMathAS_ID);
  updateStepCount(parseInt(""+vCountStepNode.value));
}
function loadStepCount2iMathAS(pLabel,pIMathAS_ID) {
  var vDisplaySelector = document.getElementById("sDISPLAYOPTION");
  var vIMathNode = createNodeQN("("+pLabel+")",pIMathAS_ID);
  vDisplaySelector.value = vIMathNode.value;
}
function saveStepCount2iMathAS(pLabel,pIMathAS_ID) {
  var vProof = document.getElementById("STUDENTANSWERLIST");
  var vCountStepNode = createNodeQN("("+pLabel+")",pIMathAS_ID);
  vCountStepNode.value = vProof.childNodes.length;
}
function loadSteps2iMathAS(pClassName,pIMathAS_ID) {
  var vInputNode = createNodeQN("("+pClassName+")",pIMathAS_ID);
  var vTextArea = document.getElementById("imath"+pClassName);
  var vRootNode = document.getElementById(pClassName+"LIST");
  var vStepNode = null;
  var vTextNode = null;
  var vListArray = vTextArea.value.split(CR);
  var k=0;
  var vNr = 0;
  while (lower(k,vListArray.length)) { 
    if (greater(vListArray[vNr].indexOf("#__co__#") , 0)) {
      var vStepArray = vListArray[vNr].split("#__co__#") ;
      var vStepDef = convertMeta2Comma(vStepArray[1]);
      if (vStepArray.length != 2) alert("Wrong Format Answer Step='"+vListArray[vNr]+"'");
      vStepNode = document.getElementById(vStepArray[0]);
      if (!vStepNode) {
        vStepNode = document.createElement("DIV");
        vStepNode.className = pClassName;
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
}
function saveSteps2iMathAS(pID,pIMathAS_ID) {
  var vList = document.getElementsByClassName(pID);
  var vTextArea = document.getElementById("imath"+pID);
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
function loadAnswer2IMathAS(pID,pIMathAS_ID) {
  alert("loadAnswer2IMathAS("+pID+","+pIMathAS_ID+")")
  var vList = document.getElementsByClassName("STUDENTANSWER");
  vInputNode = createNodeQN("("+pID+")",pIMathAS_ID);
  var vOutArray = vInputNode.value.split(",");
  vInputNode = document.getElementById("imathSTUDENTANSWER");
  vOutArray = vInputNode.value.split(CR);
  var k=0;
  var vLine = "";
  var vStep = 0;
  var vNode = null;
  var vNr = 0
  while (lower(k,vOutArray.length)) {
    if (greater(vOutArray[k].indexOf("#__co__#") , 0)) {
      vStep = getStep4NodeID(vList[vNr].id);
      vLine = vOutArray[k];
      vAnswerArray = vLine.split("#__co__#");
      if (vAnswerArray.length != 3) {
        alert("Answer Array for Line"+k+" has no proper format!"+CR+vOutArray[k]);
      } else {
        vNode = document.getElementById("sCONNECTION"+vStep);
        if (vAnswerArray[0] == "???") {
          vNode.value = 0;
        } else {
          vNode.value = vConnection2Index[vAnswerArray[0]];
        };
        vNode = document.getElementById("inSTEPID"+vStep);
        vNode.value = vAnswerArray[1];
        vNode = document.getElementById("sSTEP"+vStep);
        vNode.value = vAnswerArray[1];
        vNode = document.getElementById("inJUSTIFICATION"+vStep);
        vNode.value = vAnswerArray[2].replace(/#_co_#/g,",");
        setJustificationCheckbox(vStep);
        showSelectedJustifications(vStep);
      };
      vNr++;
    };
    k++;
  };
}
function getStep4NodeID(pID) {
  var vStep = 0;
  if (pID) {
    var vStep = pID.replace(/[^0-9]/g,"");
    vStep = parseInt(vStep);
  };
  return vStep;  
}
function saveAnswer2IMathAS(pID,pIMathAS_ID) {
  var vProof = new Array();
  vProof.push(document.getElementById("STUDENTANSWERLIST"));
  vProof.push(document.getElementById("UNUSEDSTEPS"));
  var vCountStepNode = createNodeQN("(iMathAS Steps Visible)","qn1006");
  vCountStepNode.value = vProof[0].childNodes.length;
  var vOutArray = new Array();
  var vOutTextarea = document.getElementById("imathSTUDENTANSWER");
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
  while (lower(k,vProof.length)) {
    vMax = vProof[k].childNodes.length;
    var i=0;
    while (lower(i,vMax)) {
      vOutString = "";
      if (vProof[k].childNodes[i].id) {
        vStep = getStep4NodeID(vProof[k].childNodes[i].id);
        vPos = parseInt(" "+document.getElementById("sPOSITION"+vStep).value);
        vIndex = document.getElementById("sCONNECTION"+vStep).value;
        vOutString += vConnectionArray[parseInt(" "+vIndex)];
        vOutString += vColSplit;
        vID = document.getElementById("sSTEP"+vStep).value;
        vOutString += vID + vColSplit;
        vJustification = document.getElementById("inJUSTIFICATION"+vStep).value;
        vOutString += vJustification.replace(/,/g,vJustSplit);
        vOutArray.push(vOutString);
      };
      i++;
    }
    k++;
  }
  vOutTextarea.value = vOutArray.join(vStepSplit);
  vInputNode = createNodeQN("("+pID+")",pIMathAS_ID);
  vInputNode.value = vOutArray.join(",");
}
function load2form(pStepIMath,pStep,pPosMoveArray)  {
  var vID_Array = new Array("sPOSITION","sCONNECTION,","sSTEP","inSTEPID","inJUSTIFICATION");
  var vAnswerArray = new Array(6);
  var vNameQN = "";
  var vPos = 0;
  var vInputNodeQN = null;
  vPosValue = getElementQN(pStepIMath,0).value;
  pPosMoveArray[pStep] = vPosValue;
  var vCol = 1;
  while (lower(vCol,vMaxQuestionPart)) {
    vInputNodeQN = getElementQN(pStepIMath,vCol); // created if necessary
    vAnswerArray[vCol] = vInputNodeQN.value;
    vCol++;
  };
}
function save2form(pStep,pAnswerArray)  {
  var vNameQN = "";
  var vInputNodeQN = null;
  var vCol = 0;
  while (lower(vCol,pAnswerArray.length)) {
    vInputNodeQN = getElementQN(pStep,vCol); // created if necessary
    vInputNodeQN.value = pAnswerArray[vCol];
    vCol++;
  };
}
function getElementQN(pStep,pCol)  {
  var vNameQN = getFormElementName(pStep,pCol);
  var vReturnNode = createNodeQN("(S"+pStep+"C"+pCol+")",vNameQN);
    return vReturnNode;
}
function createNodeQN(pLabel,pNameQN)  {
  var vReturnNode = document.getElementById(pNameQN);
  if (!vReturnNode) {
    var vReturnNode = document.createElement("input");
    var vParent = document.getElementById("iMathASINOUT");
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
function updateStepCount(pCount)  {
  var vListNode    = document.getElementsByClassName("STUDENTANSWER");
  var vProof       = document.getElementById("STUDENTANSWERLIST");
  var vProofCount  = vProof.childNodes.length;
  var vUnused      = document.getElementById("UNUSEDSTEPS");
  var vUnusedCount = vUnused.childNodes.length;
  var vMax = vListNode.length;
  var vStep = "";
  if (lower(pCount,vProofCount)) {
    var vParentNode = vListNode[pCount-1].parentNode;
    var vDiff = vProofCount - pCount;
    var vDelCount =0;
    while (lower(vDelCount,vDiff)) {
      vStep = getStep4NodeID(vListNode[pCount].id);
      moveStepOrder(vStep,vMax+1,vMax);
      vDelCount++;
    }  
  } else if (greater(pCount , vProofCount)) {
    var vDiff = pCount - vProofCount;
    var k = 0;
    while (lower(k,vDiff)) {
      vStep = getStep4NodeID(vListNode[pCount].id);
      moveStepOrder(vStep,0,vMax);
      k++;
    }  
  }
}
function getStepCountSelectorHTML()  {
  var vAllSteps = getAllStepIDs();
  var vContent = "";
  var vContent = "<SELECT class='sSTEPCOUNT'  id='sSTEPCOUNT' onchange=\"updateStepCount(this.value)\">";
  var vNr=0;
  var vMax=0;
  for (var iID in vAllSteps) {
    vNr++;
  };
  vMax = vNr;
  vNr=0;
  for (var iID in vAllSteps) {
    vNr++;
    if (vNr == vMax) {
      vContent +="<option class='COUNT"+iID+"' value='"+vNr+"' selected>"+vNr+"</option>";
      } else {
        vContent +="<option class='COUNT"+iID+"' value='"+vNr+"'>"+vNr+"</option>";
      }
    }
  vContent +="</SELECT>";
  return vContent;
}
function getListIMathAS(pTextareaID) {
  var vInput = document.getElementById("imath"+pTextareaID).value;
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
function getItemsIMathAS(pListArray) {
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
function getItemsHTML(pList) {
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
function decodeEditBox() {
  var vListNode = document.getElementsByClassName("inSTEPDEF");
  i=0;
  while (lower(i,vListNode.length)) {
    vListNode[i].value = decodeValue(vListNode[i].value);  
    updateTextIDs(i+1);
    i++;
  };  
}
function showEditBox() {
  var vID = "";
  var vListNode = document.getElementsByClassName("inSTEPID");
  var vAuthoringMode = getSetting("AuthoringMode")+"";
  var i=0;
  while (lower(i,vListNode.length)) {
    vID = vListNode[i].value;
    vID = vID.replace(/[^A-Z]/g,"");
    if ((vID == "MY") || (vAuthoringMode != "0")) { 
      showElement("bEdit"+vListNode[i].step);
    } else {
      hideElement("bEdit"+vListNode[i].step);
    };
    i++;
  };  
}
function convertComma2Meta(pString) {
  return pString.replace(/,/g,"#_co_#");
}
function convertMeta2Comma(pString) {
  return pString.replace(/#_co_#/g,",");
}
function decodeValue(pValue) {
  if (pValue) {
    pValue = pValue.replace(/__math__/g,"`");
    pValue = pValue.replace(/__eq__/g,"=");
    eval("pValue = pValue.replace(/__gt__/g,\""+GT+"\");");
    eval("pValue = pValue.replace(/__lt__/g,\""+LT+"\");");
    pValue = pValue.replace(/__qu__/g,"\"");
    pValue = pValue.replace(/__ae__/g,"ä");
    pValue = pValue.replace(/__oe__/g,"ö");
    pValue = pValue.replace(/__ue__/g,"ü");
    pValue = pValue.replace(/__AE__/g,"Ä");
    pValue = pValue.replace(/__OE__/g,"�-");
    eval(decodeURI("pValue=pValue.replace(/__OE__/g,%22%EF%BF%BD%22);"))
    pValue = pValue.replace(/__UE__/g,"Ü");
    pValue = pValue.replace(/__sz__/g,"ß");
    return pValue;
    } else {
      return "";
    }
}
function encodeCR(pValue) {
  eval(decodeURI("pValue=pValue.replace(/%5Cn/g,%22,%22)"));
  return pValue;
}
function decodeCR(pValue) {
  pValue = pValue.replace(/,/g,CR);
  return pValue;
}
function decodeTextarea(pValue) {
  pValue = decodeValue(pValue);
  pValue = pValue.replace(/__n__/g,CR);
  return pValue;
}      
function encodeValue(pValue) {
  if (pValue) {
    pValue = pValue.replace(/`/g,"__math__");
    eval("pValue = pValue.replace(/"+LT+"/g,\"__lt__\")");
    eval("pValue = pValue.replace(/"+GT+"/g,\"__gt__\")");
    pValue = pValue.replace(/=/g,"__eq__");
    pValue = pValue.replace(/"/g,"__qu__");
    pValue = pValue.replace(/ä/g,"__ae__");
    pValue = pValue.replace(/ö/g,"__oe__");
    pValue = pValue.replace(/ü/g,"__ue__");
    pValue = pValue.replace(/Ä/g,"__AE__");
    eval(decodeURI("pValue%20=%20pValue.replace(/%EF%BF%BD/g,%22__OE__%22);"));
    pValue = pValue.replace(/Ü/g,"__UE__");
    pValue = pValue.replace(/ß/g,"__sz__");
    return pValue;
    } else {
      return "";
    }
}
function getSetting(pID) {
  return vSettings[pID];
}
function getFormElementName(pStep,pCol) {
  var vNr = 1004 + 6 * pStep + pCol;
  return "qn"+vNr;
}
function loadFromIMathAS() {
}
function postProcessProof() {
   decodeEditBox();
   showEditBox();
}