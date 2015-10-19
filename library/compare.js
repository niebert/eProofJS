<script type="text/javascript">
var vLanguage = new Array();
vLanguage["All"]="$STR_All";
vLanguage["Average"]="$STR_Average";
vLanguage["Application_of"]="$STR_Application_of";
vLanguage["are_missing"]="$STR_are_missing";
vLanguage["as_Precondition"]="$STR_as_Precondition";
vLanguage["Assessment"]="$STR_Assessment";
vLanguage["by"]="$STR_by";
vLanguage["Comment"]="$STR_Comment";
vLanguage["Complete"]="$STR_Complete";
vLanguage["Conclusion"]="$STR_Conclusion";
vLanguage["Conclusion_Multi"]="$STR_Conclusion_Multi";
vLanguage["Conclusion_Single"]="$STR_Conclusion_Single";
vLanguage["Connection"]="$STR_Connection";
vLanguage["Delete_Prompt"]="$STR_Delete_Prompt";
vLanguage["Deleted"]="$STR_Deleted";
vLanguage["Deleted_ProofSteps"]="$STR_Deleted_ProofSteps";
vLanguage["Display"]="$STR_Display";
vLanguage["does_not_exist"]="$STR_does_not_exist";
vLanguage["Edit_Proof"]="$STR_Edit_Proof";
vLanguage["Equality"]="$STR_Equality";
vLanguage["Errors"]="$STR_Errors";
vLanguage["Example"]="$STR_Example";
vLanguage["for"]="$STR_for";
vLanguage["greater_equal"]="$STR_greater_equal";
vLanguage["greater"]="$STR_greater";
vLanguage["Help"]="$STR_Help";
vLanguage["Hide"]="$STR_Hide";
vLanguage["impossible"]="$STR_impossible";
vLanguage["in_ProofStep"]="$STR_in_ProofStep";
vLanguage["Instead_of"]="$STR_Instead_of";
vLanguage["Implication"]="$STR_Implication";
vLanguage["is_missing"]="$STR_is_missing";
vLanguage["Justification"]="$STR_Justification";
vLanguage["Justifications"]="$STR_Justifications";
vLanguage["logical"]="$STR_logical";
vLanguage["lower_equal"]="$STR_lower_equal";
vLanguage["lower"]="$STR_lower";
vLanguage["manual"]="$STR_manual";
vLanguage["MinimalProofSteps"]="$STR_MinimalProofSteps";
vLanguage["missing"]="$STR_missing";
vLanguage["MULTIPLE_USED"]="$STR_MULTIPLE_USED";
vLanguage["need_a_previous_proofstep"]="$STR_need_a_previous_proofstep";
vLanguage["No_connection_to_previous"]="$STR_No_connection_to_previous";
vLanguage["No_more_points"]="$STR_No_more_points";
vLanguage["None"]="$STR_None";
vLanguage["not_possible_at_first_step"]="$STR_not_possible_at_first_step";
vLanguage["Number_of"]="$STR_Number_of";
vLanguage["of"]="$STR_of";
vLanguage["or"]="$STR_or";
vLanguage["Own_ProofStep"]="$STR_Own_ProofStep";
vLanguage["Points"]="$STR_Points";
vLanguage["Position"]="$STR_Position";
vLanguage["Precondition"]="$STR_Precondition";
vLanguage["Precondition_Multi"]="$STR_Precondition_Multi";
vLanguage["Precondition_Single"]="$STR_Precondition_Single";
vLanguage["Preconditions"]="$STR_Preconditions";
vLanguage["previous"]="$STR_previous";
vLanguage["previous_step"]="$STR_previous_step";
vLanguage["Proof"]="$STR_Proof";
vLanguage["Proof_Input"]="$STR_Proof_Input";
vLanguage["ProofStep"]="$STR_ProofStep";
vLanguage["ProofSteps"]="$STR_ProofSteps";
vLanguage["ProofSequence"]="$STR_ProofSequence";
vLanguage["ProofType"]="$STR_ProofType";
vLanguage["Questionmark"]="$STR_Questionmark";
vLanguage["Remark"]="$STR_Remark";
vLanguage["Remove"]="$STR_Remove";
vLanguage["replace"]="$STR_replace";
vLanguage["Select_Answer"]="$STR_Select_Answer";
vLanguage["Selected"]="$STR_Selected";
vLanguage["Selected_Precondition"]="$STR_Selected_Precondition";
vLanguage["Selection_of"]="$STR_Selection_of";
vLanguage["Self_Defined"]="$STR_Self_Defined";
vLanguage["Short"]="$STR_Short";
vLanguage["should_be"]="$STR_should_be";
vLanguage["Solution"]="$STR_Solution";
vLanguage["Step"]="$STR_Step";
vLanguage["Step_for"]="$STR_Step_for";
vLanguage["Step_No"]="$STR_Step_No";
vLanguage["Subset"]="$STR_Subset";
vLanguage["Suggestion"]="$STR_Suggestion";
vLanguage["Suggestions"]="$STR_Suggestions";
vLanguage["Type"]="$STR_Type";
vLanguage["Theorem"]="$STR_Theorem";
vLanguage["Theorem_Title"]="$STR_Theorem_Title";
vLanguage["undefined"]="$STR_undefined";
vLanguage["unnecessary"]="$STR_unnecessary";
vLanguage["Use"]="$STR_Use";
vLanguage["USED"]="$STR_USED";
vLanguage["Variables"]="$STR_Variables";
vLanguage["RIGHT"]="$STR_RIGHT";
vLanguage["WRONG"]="$STR_WRONG";
vLanguage["JUSTIFICATION_MISSING"]="$STR_JUSTIFICATION_MISSING";
vLanguage["JUSTIFICATION_UNNECESSARY"]="$STR_JUSTIFICATION_UNNECESSARY";
  //--------------------------------------------
  //--------------------------------------------
  var vLink_Screencast = "http://e-proof.weebly.com/german-tutorials.html";
  var vLink_Tutorial   = "http://math.uni-landau.de/download/IMathAS/eProof_iMathAS_Tutorial.pdf";
  var vEditorID = "mceEditor";
  var vUpdateButton = "<input type='button' name='bUpdate' value=' Update ' onclick=\"updateInput2IMathAS(this.form)\">";
  var vSpace =  " &nbsp;&nbsp; " 
  var vConnection2Index = new Array();
  var vConnectionArray = new Array("???","TYP"," ","=&gt;","=","&lt;=","<",">=","&gt;","subseteq","DEF","TEXT","q.e.d.");
  var vNr = 1;
  vConnection2Index["TYP"] = vNr;
  vNr++;
  vConnection2Index[" "] = vNr; //START: Beweissequenz
  vNr++;
  vConnection2Index["=&gt;"] = vNr;
  vNr++;
  vConnection2Index['='] = vNr;
  vNr++;
  vConnection2Index["&lt;="] = vNr;
  vNr++;
  vConnection2Index["<"] = vNr;
  vNr++;
  vConnection2Index['>='] = vNr;
  vNr++;
  vConnection2Index['&gt;'] = vNr;
  vNr++;
  vConnection2Index['subseteq'] = vNr;
  vNr++;
  vConnection2Index['DEF'] = vNr;
  vNr++;
  vConnection2Index['TEXT'] = vNr;
  vNr++;
  vConnection2Index['q.e.d.'] = vNr;
function greater(a,b) {
  eval(decodeURI("return%20a%3Eb"));
}
function lower(a,b) {
  eval(decodeURI("return%20a%3Cb;"));
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
    //if (pObjectID.indexOf("checkbox")==0) alert("Node '"+pObjectID+"' exists with display="+vNode.style.display);
    vNode.style.display = "block";
    vNode.style.visibility ="visible";
  }
}
function hideEditLines(pCount) {
  var vACount = new Array(pCount);
  for (var k in vACount) {
    i = k+1;
    hideObject("editSTUDENTANSWER"+i);
  }
}
function showEditLines(pCount) {
  var vACount = new Array(pCount);
  for (var k in vACount) {
    i = k+1;
    showObject("editSTUDENTANSWER"+i);
  }
}
function setVisibility4Proof(pSelected) {
  var vListArray = document.getElementsByClassName("cVIEWJUSTIFICATION");
  if (pSelected=="Short") {
    showObject("STUDENTANSWERLIST");
    showEditLines(vListArray.length);
    hideObject("ASSESSMENT");
    hideObject("SOLUTION");
    setShortJustification(vListArray,true);
  } else   if (pSelected=="Complete") {
    showObject("STUDENTANSWERLIST");
    showEditLines(vListArray.length);
    hideObject("ASSESSMENT");
    hideObject("SOLUTION");
    setShortJustification(vListArray,false);
  } else   if (pSelected=="Hide") {
    showObject("STUDENTANSWERLIST");
    hideEditLines(vListArray.length);
    hideObject("ASSESSMENT");
    hideObject("SOLUTION");
  } else   if (pSelected=="Assessment") {
    showObject("ASSESSMENT");
    hideObject("STUDENTANSWERLIST");
    hideObject("SOLUTION");
  } else   if (pSelected=="Solution") {
    showObject("SOLUTION");
    hideObject("ASSESSMENT");
    hideObject("STUDENTANSWERLIST");
    }
}
function setShortJustification(pListArray,pBoolean) {
  for (var i in pListArray) {
    pListArray[i].checked = !(pBoolean);
  };
  for (var i in pListArray) {
    changeViewJustification(i+1);
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
  for (var k in vListArray) {
    vList = vListArray[k];
    for (var j in vList) {
      if (vList[j].id) {
        vID = vList[j].id;
        vStepDef = vList[j].childNodes[0].nodeValue;
        vAllSteps[vID] = vStepDef;
      };
    };
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
  for (var k in vListArray) {
    vList = vListArray[k];
    for (var j in vList) {
      if (vList[j].id) {
        vID = vList[j].id;
        vStepDef = vList[j].childNodes[0].nodeValue;
        vAllSteps[vID] = vStepDef;
      }
    };
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
  for (var k in vListArray) {
    vList = vListArray[k];
    vCount += vList.length;
    for (var j in vList) if (vList[j].id) {
      vID = vList[j].id;
      vStepDef = vList[j].childNodes[0].nodeValue;
      vAllSteps[vID] = vStepDef;
    };
  };
  //alert("getStudentAnswerHTML() - vCount="+vCount);
  var vStart = 0;
  var vContent = "";
  vContent += "<DIV class='STUDENTANSWERLIST' id='STUDENTANSWERLIST'>";
  var vJustList = document.getElementsByClassName("JUSTIFICATION");
  //alert("vListArray.length="+vListArray.length);
  for (var k in vListArray) {
    //alert("StudentAnswerHTML() - vListArray["+k+"].length="+vListArray[k].length);
    vContent += getAnswerItemHTML(vListArray[k],vJustList,vStart,vCount,vAllSteps);
    vStart += vListArray[k].length;
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
    vContent += "<td>" + vUpdateButton +"</td>";
    if (vShow_Links != "0") {
       vContent += "<td>";
       vContent += "<a href=\""+vLink_Tutorial+"\" target=\"_blank\">PDF-Tutorial</a>"
     vContent += "</td>";
   }
   vContent += "</tr><tr>";
   vContent += "</tr><tr>";
   vContent += "<tr><td><b>" +vLanguage["Display"]+" "+vLanguage["Proof"]+":</b>";
   vContent += "<td><SELECT id='sDISPLAYOPTION' onchange=\"setVisibility4Proof(this.value)\">"
   vContent += "<OPTION value='Complete' >"+vLanguage["Complete"]+"</OPTION>";
   vContent += "<OPTION value='Short'>"+vLanguage["Short"]+"</OPTION>";
   vContent += "<OPTION value='Hide'>"+vLanguage["Hide"]+"</OPTION>";
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
  //alert("AnswerItemHTML() pList.length="+pList.length);
  var vName = "";
  var vContent = "";
  var vNr=pNrStart;
  for (var k in pList) if (pList[k].id) {
    vNr++;
    //alert("pNrStart='"+pNrStart+" vNr="+vNr);
    vContent += "<DIV class='STUDENTANSWER' id='STUDENTANSWER"+vNr+"' step='"+vNr+"' >";
    vContent += "<DIV class='editSTUDENTANSWER' id='editSTUDENTANSWER"+vNr+"'>";
    //alert("TEST1 for k="+k);
   vContent += setStepPosition(vNr,pCount);
    vContent += "<input type='button' class='bUseStep' step='"+vNr+"'  id='bUseStep"+vNr+"' class='bUseStep"+vNr+"' value=' + ' onclick=\"appendStep("+vNr+")\" style='visibility:hidden' />"; //style='visibility:hidden'
    vContent += setStepConnection(vNr,pCount);
    vContent += "<input type='button' class='bEdit' step='"+vNr+"'  id='bEdit"+vNr+"'  class='bEdit"+vNr+"' value=' EDIT ' onclick=\"toggleEdit("+vNr+")\" />";
    vContent += setStepDefinition(vNr,pCount,pAllSteps,pList[k].id);
    vContent += "<input type='button' class='bDelete' step='"+vNr+"'  id='bDelete"+vNr+"'  class='bDelete"+vNr+"' value=' X ' onclick=\"deleteProofStep("+vNr+","+pCount+")\" style='color:red'/>";
    vName = "cVIEWJUSTIFICATION";
    vContent += "<input type='checkbox' class='"+vName+"' name='"+vName+vNr+"' step='"+vNr+"' id='"+vName+vNr+"' value='VIEW' onchange=\"changeViewJustification("+vNr+")\" checked='checked' style='display:none'/> "; // style='visibility:hidden'
    vName = "cEDITJUSTIFICATION";
    vContent += "<input type='checkbox' class='"+vName+"' name='"+vName+vNr+"' step='"+vNr+"' id='"+vName+vNr+"' value='EDIT' onchange=\"changeViewJustification("+vNr+")\" style='display:none' /> "; //style='display:none'
    vContent += "<input type='button' class='bJUSTIFICATION"+vNr+"' step='"+vNr+"'  id='bJUSTIFICATION"+vNr+"' value='"+ vLanguage["Justifications"]+"'onclick=\"toggleJustification("+vNr+")\" />";
    vContent += "<input type='text' size='15' class='inJUSTIFICATION' step='"+vNr+"' id='inJUSTIFICATION"+vNr+"' value='' onchange=\"changeEditJustification("+vNr+")\"/>";
    vContent += "<input class=\"inSTEPID\" type='text' size='3'  step='"+vNr+"' id='inSTEPID"+vNr+"'  value=\""+pList[k].id+"\" style='display:none' />"; // style='display:none' style='visibility:hidden'
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
    vContent +="<DIV class='dJUSTIFICATION' id='dJUSTIFICATION"+vNr+"' style='display:none' >";
    vContent += getJustificationCheckboxHTML(pJustList,pAllSteps,vNr,pCount);
    vContent +="</DIV>";
    vContent +="</DIV>";
    //alert("StudentAnswer:"+vContent);
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
  Check = confirm(vLanguage["Delete_Prompt"]+"\\n"+vLanguage["ProofStep"]+" ["+vNode4ID.value+"] ");
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
    showObject("dJUSTIFICATION"+pStep);
  } else if (vCheckViewBox.checked) {
    if (vInJustifications != '') {
      showObject("dVIEWJUSTIFICATION"+pStep);
    } else {
      hideObject("dVIEWJUSTIFICATION"+pStep);
    }
    hideObject("dJUSTIFICATION"+pStep);
  } else {
    hideObject("dVIEWJUSTIFICATION"+pStep);
    hideObject("dJUSTIFICATION"+pStep);
  };
  updateTextIDs(pStep);
  showSelectedJustifications(pStep);  
}
function append_PreviousStep_Justification() {
  var vListNode = document.getElementsByClassName("inSTEPID");
  var vVisibleJustArray = new Array();
  var vStepArray = new Array();
  var vStep = 0;
  var vName = "";
  var vCheckName = "";
  for (var i in vListNode) if (vListNode[i].step) {
    vStep = vListNode[i].step;
    vName = "checkboxJUSTIFICATION"+vStep;
    for (var k in vVisibleJustArray) { 
      vCheckName = vName+"-"+vVisibleJustArray[k]; 
      //alert("vCheckName="+vCheckName);
      showObject(vCheckName);
      //hideObject(vName+"-J1");
    };
    vStepArray.push(vListNode[i].step);
    vVisibleJustArray.push(vListNode[i].value);
  }
}
function hideAllJustifications(pStep) {
  //alert("hideAllJustifications(pStep) - pStep="+pStep);
  if (pStep) {
    var vOutName    = "outJUSTIFICATION"+pStep;
    var vSelectName = "sJUSTIFICATION"+pStep;
    var vCheckName  = "checkboxJUSTIFICATION"+pStep;
    //alert ("vOutName="+vOutName+" vSelectName="+vSelectName+" vCheckName="+vCheckName);
    var vViewList = document.getElementsByClassName(vOutName);
    for (var k in vViewList) if (vViewList[k].style) {
      vViewList[k].style.display = "none";
    };
    var vHideSteps = getHideStepIDs();
    var vCheckboxes = document.getElementsByClassName(vSelectName);
    for (var vID in vHideSteps) if (pStep) {
      //alert ("2vOutName="+vOutName+" vSelectName="+vSelectName+" vCheckName="+vCheckName);
      hideObject(vCheckName +"-"+vID);
    }; 
  }
}
function toggleEdit(pStep) {
  var vListIDs      = document.getElementsByClassName("inSTEPID");
  var vStepDefNode  = document.getElementById("inSTEPDEF"+pStep);
  var vTextareaNode = document.getElementById(vEditorID + pStep);
  vTextareaNode.value = vStepDefNode.value.replace(/__n__/g,"\\n");
  toggleHide("STEPEDITOR"+pStep);
  hideObject("inSTEPDEF"+pStep);
}
function toggleJustification(pStep) {
  if (pStep) {
    var vCheckViewBox = document.getElementById("cVIEWJUSTIFICATION"+pStep);  
    var vCheckEditBox = document.getElementById("cEDITJUSTIFICATION"+pStep);  
    var vID = document.getElementById("inSTEPID"+pStep).value;  
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
    alert("pStep is not defined in toggleJustification");
  }
}
function setStepPosition(pStep,pCount) {
  var vName = "sPOSITION"+pStep;
  var vDeleteName = "DEL";
  var vNr = 1;
  var vACount = getAllStepIDs();
  //alert("POSITION vName="+vName+" pStep="+pStep+" pCount="+pCount+" vACount.length="+vACount.length);
  var vContent = "<SELECT class='sPOSITION' step='"+pStep+"' class='"+vName+"' id='"+vName+"' onchange=\"moveStepOrder("+pStep+",this.value,"+pCount+")\">";
  for (var iNode in vACount) {
    //alert("LOOP"+vNr+" vACount"+vNr);
    if (pStep+"" != vNr+"") {
      vContent +="<OPTION VALUE='"+vNr+"'>"+vNr+"</OPTION>";
      //alert("vNr"+vNr+" not selected in Step="+pStep);
    } else {
      vContent +="<OPTION VALUE='"+vNr+"' selected='selected'>"+vNr+"</OPTION>";
      //alert("vNr"+vNr+" selected in Step="+pStep);
    }
    vNr++;
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
  var vContent = "<SELECT class='sSTEP' step='"+pStep+"' class='"+vName+"' id='"+vName+"' onchange=\"updateStepChange("+pStep+")\">";
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
    for (var k in vID_Array) {
      vOutNodeID = "outJUSTIFICATION"+pStep+"-"+vID_Array[k];
      vNode = document.getElementById(vOutNodeID);
      if(vNode) {
        showObject(vOutNodeID);
      } else {
        alert("Error (Node="+vOutNodeID+"): Justification with the ID='"+vID_Array[k]+"' does not exist!");
      }
    }
  }
}
function setJustificationCheckbox(pStep) {
  var vInJustification
  var vCheckboxes = document.getElementsByClassName("sJUSTIFICATION"+pStep);
  var vInputNode = document.getElementById("inJUSTIFICATION"+pStep);
  var vJustString = vInputNode.value.replace(/\s/g,"");
  var vID_Array = vJustString.split(",");
  for (var k in vID_Array.length) {
    for (var i in vCheckboxes.length) {
      if (vID_Array[k] == vCheckboxes[i].value) {
        vCheckboxes[i].checked = true;
      }
    }
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
  for (var k in pList) if (pList[k].id) {
    vContent += getCheckbox4Step(pStep, vName ,pList[k].id ,getStepDef(pList[k]) )
    };
   for (var vID in pAllSteps) if (pStep) {
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
  vContent += "<u>"+vLanguage["Justifications"]+":</u> [<IDTAG class='VIEWID"+pStep+"' id='dVIEW"+pStep+"'>??ID??</IDTAG>]";
  vContent +="<ul>";
  for (var k in pList) if (pList[k].id) {
    vID = pList[k].id;
    //alert("getJustificationHTML() vID="+vID);
    vContent += "<li class='outJUSTIFICATION"+pStep+"' id='outJUSTIFICATION"+pStep+"-"+vID+"' stepid='"+vID+"'>"+getStepDef(pList[k]) +"</li>";
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
    for (var i in vOutNode.childNodes) {
      vOutNode.removeChild(vOutNode.firstChild);
    };
  };
  return vOutNode;
}
function getList_Position(pList,pName,pStep) { 
  var vReturn = pList.length+1;
  for (var i in pList) {
    if   (pList[i].id == pName+pStep) {
      vReturn = i+1;
    }
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
    setVisibility4Step(pStep,vRemovedChild,vUnused4Proof.childNodes.length);
    updateInput();
  }
}
function updateInput() {
  var vListNode = document.getElementsByClassName("sPOSITION");
  var vNr = 0;
  for (var i in vListNode) {
    vNr = i + 1;
    vListNode[i].value = vNr;
  };  
  for (var k in vListNode) { 
    updateStep(k+1);
    };
    saveInput2IMathAS() ;
}
function updateStepChange(pStep) {
  var vListOldID    = document.getElementsByClassName("inSTEPID");
  var vOldIDnode = document.getElementById("inSTEPID"+pStep);
  var vNewIDnode = document.getElementById("sSTEP"+pStep);
  var vSwapStep  = "";
  var vSwapNode  = null;
  var vOldID = vOldIDnode.value;
  var vNewID = vNewIDnode.value;
  var vNr = 0;
  for (var i in vListOldID) {
    if (vNewIDnode.value == vListOldID[i].value) {
      vSwapStep = vListOldID[i].step;
      vSwapNode = document.getElementById("sSTEP"+vSwapStep);
      vSwapNode.value = vOldIDnode.value;
      updateStep(parseInt(vSwapStep));
    }
  };  
  vSwapNode = document.getElementById("inSTEPID"+vSwapStep);
  vSwapNode.value = vOldID;
  vOldIDnode.value = vNewIDnode.value;
    updateStep(pStep);
}
function updateJustifications(pStep) {
  var vCheckboxes = document.getElementsByClassName("sJUSTIFICATION"+pStep);
  var vInputNode = document.getElementById("inJUSTIFICATION"+pStep);
  vInputNode.value = "";
  var vComma = "";
  for (var k in vCheckboxes) {
    if (vCheckboxes[k].checked) {
      vInputNode.value += vComma + vCheckboxes[k].value;
      vComma = ",";
    }
  };
}
function updateTextIDs(pStep) {
  var vArrayNodeID = document.getElementsByClassName("VIEWID"+pStep);  
  for (var i in vArrayNodeID) {
    vArrayNodeID[i].innerHTML = vID;
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
  saveASCIImath("outSTEP"+pStep,vOutString);
}
function updateInput2IMathAS(pForm)  {
  alert("Update to iMathAS");
  saveInput2IMathAS();
  pForm.submit();
}
function saveInput2IMathAS()  {
  saveAnswer2IMathAS("qn1005");
  saveSteps2iMathAS("PRECONDITION","qn1007"); 
  saveSteps2iMathAS("CONCLUSION","qn1008"); 
  saveSteps2iMathAS("JUSTIFICATION","qn1009"); 
  saveSteps2iMathAS("PROOFSTEP","qn1006"); 
}
function saveSteps2iMathAS(pID,pTextareaID) {
  var vList = document.getElementsByClassName(pID);
  var vTextArea = document.getElementById("imath"+pID);
  var vCR = "";
  var vContent = "";
  for (var k in vList) { 
    vContent += vCR + vList[k].id+"#"+vList[k].childNodes[0].nodeValue;
    vCR = "\\n";
  };
  vTextArea.value = vContent;
}
function saveAnswer2IMathAS() {
  var vProof = document.getElementById("STUDENTANSWERLIST");
  var vOutArray = new Array();
  var vOutTextarea = document.getElementById("imathSTUDENTANSWER");
  var vOutString = "";
  var vStepSplit = "\\n";
  var vColSplit = "#"
  var vJustSplit = "|"
  var vStepNode = null;
  var vJustification = "";
  var vPos,vIndex = 0;
  var vPosNode = null;
  for (var i in vProof.childNodes) {
    vOutString = "";
    vStep = vProof.childNodes[i].id;
    vStep = vStep.replace(/[^0-9]/g,"");
    vPos = parseInt(" "+document.getElementById("sPOSITION"+vStep).value);
    vIndex = document.getElementById("sCONNECTION"+vStep).value;
    vOutString += vConnectionArray[parseInt(" "+vIndex)];
    vOutString += vColSplit;
    vOutString += document.getElementById("sSTEP"+vStep).value;
    vOutString += vColSplit;
    vJustification = document.getElementById("inJUSTIFICATION"+vStep).value;
    vOutString += vJustification.replace(/,/g,vJustSplit);
    vOutArray.push(vOutString);
  }
  vOutTextarea.value = vOutArray.join(vStepSplit);
}
function updateStepCount(pCount)  {
  var vListNode    = document.getElementsByClassName("STUDENTANSWER");
  var vProof       = document.getElementById("STUDENTANSWERLIST");
  var vProofCount  = vProof.childNodes.length;
  var vUnused      = document.getElementById("UNUSEDSTEPS");
  var vUnusedCount = vUnused.childNodes.length;
  var vMax = vListNode.length;
  var vStep = "";
  if (lower(pCount,vProofCount) ) {
    var vParentNode = vListNode[pCount-1].parentNode;
    var vDiff = vProofCount - pCount;
    var vADiff = new Array(vDiff);
     for (var k in vADiff) {
      vStep = vListNode[pCount].id.replace(/[^0-9]/g,"");
      moveStepOrder(vStep,vMax+1,vMax);
    }  
  } else if (greater(pCount , vProofCount)) {
    var vDiff = pCount - vProofCount;
    var vADiff = new Array(vDiff);
    for (var k in vADiff) {
      vStep = vListNode[vProofCount+k].id.replace(/[^0-9]/g,"");
      moveStepOrder(vStep,0,vMax);
    }  
  }
}
function getListHTML(pList) {
  var vContent = "";
  vContent += "<ul>";
  vContent += getItemsHTML(pList);
  vContent +="</ul>";
  return vContent;
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
function getItemsHTML(pList) {
  var vContent = "";
  //alert("getItemsHTML pList.length="+pList.length);
  for (var k in pList) { 
    if (pList[k].id) {
      //alert("pList[k].id="+pList[k].id);
      vContent += "<li>";
      vContent += "["+pList[k].id+"] "+decodeValue(pList[k].childNodes[0].nodeValue);
      vContent +="</li>";
    }
  };
  return vContent;
}
function decodeEditBox() {
  var vListNode = document.getElementsByClassName("inSTEPDEF");
  for (var i in vListNode) {
    vListNode[i].value = decodeValue(vListNode[i].value);  
  };  
}
function showEditBox() {
  var vID = "";
  var vListNode = document.getElementsByClassName("inSTEPID");
  var vAuthoringMode = getSetting("AuthoringMode")+"";
  for (var i in vListNode) if (vListNode[i].id) {
    vID = vListNode[i].value;
    vID = vID.replace(/[^A-Z]/g,"");
    if ((vID == "MY") || (vAuthoringMode != "0")) { 
      showElement("bEdit"+vListNode[i].step);
    } else {
      hideElement("bEdit"+vListNode[i].step);
    }
  };  
}
function decodeValue(pValue) {
  if (pValue) {
    pValue = pValue.replace(/__math__/g,"`");
    pValue = pValue.replace(/__eq__/g,"=");
    pValue = pValue.replace(/__gt__/g,"&gt;");
    pValue = pValue.replace(/__lt__/g,"&lt;");
    pValue = pValue.replace(/__qu__/g,"\"");
    pValue = pValue.replace(/__ae__/g,"ä");
    pValue = pValue.replace(/__oe__/g,"ö");
    pValue = pValue.replace(/__ue__/g,"ü");
    pValue = pValue.replace(/__AE__/g,"Ä");
    eval(decodeURI("pValue%20=%20pValue.replace(/__OE__/g,%22%EF%BF%BD%22);"));
    pValue = pValue.replace(/__UE__/g,"Ü");
    pValue = pValue.replace(/__sz__/g,"ß");
    return pValue;
  } else {
    return "???";
  }
}      
function decodeTextarea(pValue) {
  pValue = decodeValue(pValue);
  pValue = pValue.replace(/__n__/g,"\\n");
  eval(decodeURI("pValue%20=%20pValue.replace(/%0A/g,%22__n__%22);"));
  return pValue;
}      
function encodeValue(pValue) {
  pValue = pValue.replace(/`/g,"__math__");
  pValue = pValue.replace(/</g,"__lt__");
  pValue = pValue.replace(/>/g,"__gt__");
  pValue = pValue.replace(/=/g,"__eq__");
  pValue = pValue.replace(/"/g,"__qu__");
  pValue = pValue.replace(/ä/g,"__ae__");
  pValue = pValue.replace(/ö/g,"__oe__");
  pValue = pValue.replace(/ü/g,"__ue__");
  pValue = pValue.replace(/Ä/g,"__AE__");
  eval(decodeURI("pValue%20=%20pValue.replace(/%EF%BF%BD/g,%22__OE__%22);"));
  pValue = pValue.replace(/Ü/g,"__UE__");
  pValue = pValue.replace(/ß/g,"__sz__");
  eval(decodeURI("pValue%20=%20pValue.replace(/%5C%5Cn/g,%22__n__%22);"));
  return pValue;
}
function getSetting(pID) {
  var vNode = document.getElementById(pID);
  if (vNode) {
    return vNode.childNodes[0].nodeValue;
  } else {
    alert("Setting with ID='"+pID+"' is not defined");
    return  0;
  }
}
function postProcessProof() {
   decodeEditBox();
   showEditBox();
}
</script>
<div class="pSETTINGS"  hidden >
<div class="SETTINGLIST" id="SETTINGLIST">
  <div class="SETTING" id="Theorem_Title">Title of the Proof __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
  <div class="SETTING" id="Theorem_Appendix">Theorem Appendix __math____lt__a href="http://ifm.uni-landau.de" target="_blank"__gt__Uni Mathe__lt__/a__gt____math__</div>
  <div class="SETTING" id="unnecessary_preconditions">2</div>
  <div class="SETTING" id="unnecessary_proofsteps">3</div>
  <div class="SETTING" id="unnecessary_connections">2</div>
  <div class="SETTING" id="selectbox_proofsteps">1</div>
  <div class="SETTING" id="allow_own_proofsteps">1</div>
  <div class="SETTING" id="remap_proofstep_IDs">1</div>
  <div class="SETTING" id="randomize_proofstep_IDs">1</div>
  <div class="SETTING" id="show_links">1</div>
  <div class="SETTING" id="show_feedback_score">1</div>
  <div class="SETTING" id="show_proof_solution">1</div>
  <div class="SETTING" id="AuthoringMode">0</div>
  <div class="SETTING" id="max_input_steps">40</div>
  <div class="SETTING" id="max_authoring_steps">12</div>
</div>

Ein Punkt bei der PRECONDITIONLIST ausgeblendet:
<div class="PRECONDITIONLIST" id="LP" >
  <div class="PRECONDITION" id="P1">P erster Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
  <div class="PRECONDITION" id="P2">P zweiter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
  <div class="PRECONDITION" id="P3" hidden>P Dritter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
  <div class="PRECONDITION" id="P4">P Vierter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
</div>
<div class="CONCLUSIONLIST" id="LC">
  <div class="CONCLUSION" id="C1">C erster Punkt</div>
  <div class="CONCLUSION" id="C2">C zweiter Punkt</div>
  <div class="CONCLUSION" id="C3">C Dritter Punkt</div>
  <div class="CONCLUSION" id="C4">C Vierter Punkt<input type='text' size=15 value="Test"/> wird umgeh&auml;ngt.</div>
  <div class="CONCLUSION" id="C5">C Fuenfter Punkt</div>
</div>
<div class="JUSTIFICATIONLIST" id="LJ">
  <div class="JUSTIFICATION" id="J1">J Begründung 1</div>
  <div class="JUSTIFICATION" id="J2">J Begründung 2</div>
  <div class="JUSTIFICATION" id="J3">J Begründung 3</div>
  <div class="JUSTIFICATION" id="J4">J Begründung 4</div>
</div>
<div class="PROOFSTEPLIST" id="LS">
  <div class="PROOFSTEP" id="S1">S erster Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__ Move The Input</div>
  <div class="PROOFSTEP" id="S2">S zweiter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
  <div class="PROOFSTEP" id="S3">S Dritter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__ </div>
  <div class="PROOFSTEP" id="MY1">MY1 Edit this Step __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__ </div>
  <div class="PROOFSTEP" id="S4">S Vierter Punkt __math__0 __gt__ sum_{k=1}^{oo} 1/{k^2} __math__</div>
</div>
</div>

<table border=0 bgcolor="#D7DFFA" width="96%" align="center"><tr><td>&nbsp;</td><td>
<!-- BEGIN of E-PROOF-Table ------------------------------>
<script type="text/javascript">
//--------THEOREM_TITLE---------------------------------------------
document.write("<hr/><h2>"+vLanguage["Theorem"]);
var vTitle = document.getElementById("Theorem_Title").childNodes[0];
document.write(":  ("+ decodeValue(vTitle.nodeValue)+")</h2>");
//--------PRECONDITIONS--------------------------------------
var vList = document.getElementsByClassName("PRECONDITION");
//alert("vList.length="+vList.length);
//var vList = document.getElementById("PRECONDITIONLIST").childNodes;
if (vList.length == 1) {
	document.write(vLanguage["Precondition_Single"]);
} else {
	document.write(vLanguage["Precondition_Multi"]);
};
document.write(getListHTML(vList));
//--------CONCLUSIONS---------------------------------------
var vList = document.getElementsByClassName("CONCLUSION");
if (vList.length == 1) {
	document.write(vLanguage["Conclusion_Single"]);
} else {
	document.write(vLanguage["Conclusion_Multi"]);
};
document.write(getListHTML(vList));
//--------THEOREM_APPENDIX---------------------------------------------
var vAppendix = document.getElementById("Theorem_Appendix").childNodes[0];
if (getSetting("show_links") != "0") {
	document.write("<hr/>"+ decodeValue(vAppendix.nodeValue)+" ");
}
//--------STUDENT_ANSWER-----------------------------------------------
document.write("<hr/><h2>"+vLanguage["Proof"]+"</h2>");
document.write(getAnswerHeaderHTML());
document.write(getStudentAnswerHTML());
</script>
<!-- END of E-PROOF-Table ------------------------------>
<script type="text/javascript">
document.write("<hr/>");
document.write("<input type='button' class='ToggleUnused' id='bToggleUnused' value=' "+vLanguage["Deleted_ProofSteps"]+" ' onclick=\"toggleHide('UNUSEDSTEPS')\" style='visibility:hidden'/>");
//-----Proof Post-Processing------
 postProcessProof();
</script>
<div class="UNUSEDSTEPS" id="UNUSEDSTEPS" style="display:none"></div>
<div class="SOLUTION" id="SOLUTION" style="display:none">$SolutionHTML</div>
<div class="ASSESSMENT" id="ASSESSMENT" style="display:none">$FeedbackHTML</div>
<div class="IMATHASINOUT" id="iMathASINOUT">
<hr/>
<b>Student Answers:</b><br/>
<textarea class="imathSTUDENTANSWER" name="imathSTUDENTANSWER" id="imathSTUDENTANSWER" rows="10" cols="125"></textarea>
<hr/>
<b>Preconditions:</b><br/>
<textarea class="imathPRECONDITION" name="imathPRECONDITION" id="imathPRECONDITION" rows="4" cols="125"></textarea>
<hr/>
<b>Conclusions:</b><br/>
<textarea class="imathCONCLUSION" name="imathCONCLUSION" id="imathCONCLUSION" rows="4" cols="125"></textarea>
<hr/>
<b>Proof Steps:</b><br/>
<textarea class="imathPROOFSTEP" name="imathPROOFSTEP" id="imathPROOFSTEP" rows="4" cols="125"></textarea>
<hr/>
<b>Justifications:</b><br/>
<textarea class="imathJUSTIFICATION" name="imathJUSTIFICATION" id="imathJUSTIFICATION" rows="4" cols="125"></textarea>
</div>
</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>
<hr/>
</td><td>&nbsp;</td></tr>
</table>

