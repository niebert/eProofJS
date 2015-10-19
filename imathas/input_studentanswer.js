//-----CONST STUDENT ANSWER LIST-----
$vCount = count($AllID) - 1 
$vSpace =  " &nbsp;&nbsp; "
$vEditorID = "mceEditor"
//----AllStepRAW ENCODE--------------
$AllStepRAW[0] = $AllStep[0]
for ($k=1..$vCount) {
  $RAW_Text  = str_replace("`","__math__",$AllStep[$k])
  $RAW_Text  = str_replace("=","__eq__",$RAW_Text)
  $RAW_Text  = str_replace(">","__gt__",$RAW_Text)
  $RAW_Text  = str_replace("<","__lt__",$RAW_Text)
  $RAW_Text  = str_replace("\"","__qu__",$RAW_Text)
  $RAW_Text  = str_replace("\'","__ap__",$RAW_Text)
  $RAW_Text  = str_replace("'","__ap__",$RAW_Text)
  $RAW_Text  = str_replace("ä","__ae__",$RAW_Text)
  $RAW_Text  = str_replace("ö","__oe__",$RAW_Text)
  $RAW_Text  = str_replace("ü","__ue__",$RAW_Text)
  $RAW_Text  = str_replace("Ä","__AE__",$RAW_Text)   
  $RAW_Text  = str_replace("O","__OE__",$RAW_Text)
  $RAW_Text  = str_replace("Ü","__UE__",$RAW_Text)
  $RAW_Text  = str_replace("ß","__sz__",$RAW_Text)
  $RAW_Text  = str_replace("\n","__n__",$RAW_Text)
  $AllStepRAW[$k] = $RAW_Text
}
//----CONNECTION----------------
$setStepConnectionHTML = ""  
$vName = "sCONNECTION__vNr__"
$setStepConnectionHTML = "<SELECT class='sCONNECTION' step='__vNr__' id='".$vName."' class='".$vName."'  onchange=\"updateStep(__vNr__)\">"
//$setStepConnectionHTML .= "\n<option value='NA'>".$STR_Select_Answer . "</option>"
$setStepConnectionHTML .= "\n<option value='0'>".$STR_Connection . "?</option>"
$setStepConnectionHTML .= "\n<option value='1'>".$STR_Type . "</option>"
$setStepConnectionHTML .= "\n<option value='2'>START: ".$STR_ProofSequence . "</option>"
$setStepConnectionHTML .= "\n<option value='3'>".$STR_Implication . "</option>"
$setStepConnectionHTML .= "\n<option value='4'>".$STR_Equality . "</option>"
$setStepConnectionHTML .= "\n<option value='5'>".$STR_lower_equal . "</option>"
$setStepConnectionHTML .= "\n<option value='6'>".$STR_lower . "</option>"
$setStepConnectionHTML .= "\n<option value='7'>".$STR_greater_equal . "</option>"
$setStepConnectionHTML .= "\n<option value='8'>".$STR_greater . "</option>"
$setStepConnectionHTML .= "\n<option value='9'>".$STR_Subset . "</option>"
$setStepConnectionHTML .= "\n<option value='10'>Definition " . $STR_of . " ". $STR_Variables . "</option>"
$setStepConnectionHTML .= "\n<option value='11'>Text ".$STR_or . " ". $STR_Comment . "</option>"
$setStepConnectionHTML .= "\n<option value='12'>q.e.d.</option>"
$setStepConnectionHTML .= "\n</SELECT>"
//----JUSTIFICATION--------------  
$getJustificationHTML = ""
$vName = "outJUSTIFICATION__vNr__"
$vID = ""
$getJustificationHTML .= "\n<u>". $STR_Justifications.":</u> [<IDTAG class='VIEWID__vNr__' id='dVIEW__vNr__'>??ID??</IDTAG>]"
$getJustificationHTML .= "\n<ul>"
$max_i = count($AllJustificationsID) - 1
for ($i=1..$max_i) {
  $vID = $AllJustificationsID[$i]
  $vStepDef = $AllJustificationsStep[$i]
  $getJustificationHTML .= "\n<li class='outJUSTIFICATION__vNr__' id='outJUSTIFICATION__vNr__-".$vID."' stepid='".$vID."'>[".$vID."] ".$vStepDef."</li>"
}
$getJustificationHTML .= "\n</ul>"

//----JUSTIFICATION-CHECKBOX-----  
$getJustificationCheckboxHTML = ""
$vName = "sJUSTIFICATION__vNr__"
$getJustificationCheckboxHTML .= "\n<b>".$STR_Justifications.": [</b><b class='VIEWID__vNr__' id='cVIEW__vNr__'>??ID??</b><b>]</b>"
$getJustificationCheckboxHTML .= "\n<input type='button'  value='  OK  ' step='__vNr__' name='bOK__vNr__' onclick=\"toggleJustification(__vNr__)\" ><br/>"
$max_i = count($AllJustificationsID) - 1
for ($i=1..$max_i) {
  $vID = $AllJustificationsID[$i]
  $vStepDef = $AllJustificationsStep[$i]
  $getJustificationCheckboxHTML .= "\n<DIV class='checkboxJUSTIFICATION' id='checkboxJUSTIFICATION__vNr__-".$vID."'>"
  $getJustificationCheckboxHTML .= "\n<input type='checkbox' class='".$vName."' name='".$vName."-".$vID."' step='__vNr__' id='".$vName."-".$vID."' value='".$vID."' onchange=\"updateJustifications(__vNr__)\" /> "
  $getJustificationCheckboxHTML .= "[".$vID."] ".$vStepDef."</DIV>"
}
//-------------------------------------------
//--------STUDENT ANSWER LIST----------------
//-------------------------------------------
$vContent  = "" 
$vContent .= "\n<DIV class='STUDENTANSWERLIST' id='STUDENTANSWERLIST'>"

for ($vNr=1..$vCount) {
  //if ($vNr <= $maxSteps) {
  //---Begin: STUDENTANSWER---------------------------
  $vContent .= "\n<DIV class='STUDENTANSWER' id='STUDENTANSWER".$vNr."' step='".$vNr."' >"
  //----Begin: EDIT_STUDENTANSWER---------------------
  $vContent .= "\n<DIV class='editSTUDENTANSWER' id='editSTUDENTANSWER".$vNr."'>"
  $vContent .= str_replace("__vNr__","".$vNr."",$setStepPositionHTML)
  //-----POSITION---------
  $vName = "sPOSITION"
  $vContent .= "\n<SELECT class='sPOSITION' step='".$vNr."'  id='".$vName.$vNr"' onchange=\"moveStepOrder(".$vNr.",this.value,".$vCount.")\">"
  for ($vPos=1..$vCount) {
    if ($vPos != $vNr) {
      $vContent .= "\n<OPTION VALUE='".$vPos."'>".$vPos."</OPTION>"
    } else {
      $vContent .= "\n<OPTION VALUE='".$vPos."' selected='selected'>".$vPos."</OPTION>"
    }
  }
  $vContent .= "\n</SELECT>";
  //-----[+]-Button---------
  $vContent .= "\n<input type='button' class='bUseStep' step='".$vNr."'  id='bUseStep".$vNr."'  value=' . ' onclick=\"appendStep(".$vNr.")\" style='visibility:hidden' />" //style='visibility:hidden'
  //$vContent .= setStepConnection($vNr,$vCount)
  $vContent .= str_replace("__vNr__","".$vNr."",$setStepConnectionHTML)
  $vContent .= "\n<input type='button' class='bEdit' step='".$vNr."'  id='bEdit".$vNr."'  value=' EDIT ' onclick=\"toggleEdit(".$vNr.")\" />"
  //---VIEWID----
  //$vContent .= "\n <b>[</b><b class='VIEWID".$vNr."' id='outVIEWID".$vNr."'>??ID??</b><b>]</b> "
  //----STEP DEFINITION ID-----
  $vName = "sSTEP"
  //$vContent .= setStepDefinition($vNr,$vCount,pAllSteps,pList[k].id)
  //var $vContent = "<SELECT class='sSTEP' step='".$vNr."' name='".$vName."' id='".$vName."' onchange=\"updateStepChange(".pStep.")\" style='display:none' >"
  $vContent .= "<SELECT  step='".$vNr."' class='".$vName."' id='".$vName."' onchange=\"moveStepID(".$vNr.",this.value,".$vCount.")\" >"
  for ($i=1..$vCount) {
    $iID = $AllID[$i]
    if ($AllID[$vNr] != $iID) {
      $vContent .= "\n<option class='OPTION_".$iID."' value='".$iID."'>".$iID."</option>"
    } else {
      $vContent .= "\n<option class='OPTION_".$iID."' value='".$iID."' selected='selected'>".$iID."</option>"
    }
  }
  $vContent .= "\n</SELECT>"
  //----[X] DELETE------
  $vContent .= "\n<input type='button' class='bDelete' step='".$vNr."'  id='bDelete".$vNr."'  value=' X ' onclick=\"deleteProofStep(".$vNr.",".$vCount.")\" style='color:red'/>"
  //---------------------------------------
  //----2 CheckBox-Justification-----------
  $vName = "cVIEWJUSTIFICATION"
  $vContent .= "\n<input type='checkbox' class='".$vName."' name='".$vName.$vNr."' step='".$vNr."' id='".$vName.$vNr."' value='VIEW' onchange=\"changeViewJustification(".$vNr.")\" checked='checked' style='display:none'/> " // style='visibility:hidden'
  //$vContent .= "\nEDIT "
  $vName = "cEDITJUSTIFICATION"
  $vContent .= "\n<input type='checkbox' class='".$vName."' name='".$vName.$vNr."' step='".$vNr."' id='".$vName.$vNr."' value='EDIT' onchange=\"changeViewJustification(".$vNr.")\" style='display:none' /> " //style='display:none'
  //------JUSTIFICATION----------------------
  $vContent .= "\n<input type='button' class='bJUSTIFICATION' step='".$vNr."'  id='bJUSTIFICATION".$vNr."' value='". $STR_Justifications."' onclick=\"toggleJustification(".$vNr.")\" />"
  $vContent .= "\n<input type='text' size='15' class='inJUSTIFICATION' step='".$vNr."' id='inJUSTIFICATION".$vNr."' value='' onchange=\"changeEditJustification(".$vNr.")\"/>"
  $vContent .= "\n<input class=\"inSTEPID\" type='text' size='3'  step='".$vNr."' id='inSTEPID".$vNr."'  value=\"".$AllID[$vNr]."\" style='display:none' />" // style='display:none' style='visibility:hidden'
  $vContent .= "\n<input class=\"STEP\" type='text' size='3'  value='".$vNr."' id='STEP".$vNr."' style='display:none' />" // style='display:none' style='visibility:hidden'
  //----Begin: STEPEDITOR------------------
  $vContent .= "\n<DIV class='STEPEDITOR' id='STEPEDITOR".$vNr."' style='display:none'>" 
  $vContent .= "\n<textarea rows='9' class=\"". $vEditorID . "\" id='". $vEditorID .$vNr."' style='width:98%'  onkeyup=\"updateTextarea(".$vNr.")\" ></textarea>"
  $vContent .= "\n<input class=\"inSTEPDEF\" type='text' size='92' step='".$vNr."' id='inSTEPDEF".$vNr."'  value=\"".$AllStepRAW[$vNr]."\"  onchange=\"updateStepEdit(".$vNr.")\" />"
  $vContent .= "\n</DIV>"
  //----End: STEPEDITOR--------------------
  //----End:   EDIT_STUDENTANSWER-----------------
  $vContent .= "\n</DIV>"
  //----Begin: DISPLAY_STUDENTANSWER--------------
  //$vContent .= "\n<DIV class='displaySTUDENTANSWER' id='displaySTUDENTANSWER".$vNr."'>"
  //----outSTEP---------------------
  $vContent .= "\n<DIV class='outIDandSTEP' id='outIDandSTEP".$vNr."'>"
  $vContent .= "\n<OUTSTEP class='outSTEP' id='outSTEP".$vNr."'>"
  $vContent .= "\n(".$vNr.") ".$vSpace
  $vContent .= "\n`???` ". $vSpace . $AllStep[$vNr]
  $vContent .= "\n</OUTSTEP>"
  $vContent .= "\n</DIV>"
  //---LIST of JUSTIFICATION---------
  //$vContent .= "\n<CENTER>"
  $vContent .= "\n<DIV class='dVIEWJUSTIFICATION' id='dVIEWJUSTIFICATION".$vNr."' style='display:none' >"
  $vContent .= str_replace("__vNr__","".$vNr."",$getJustificationHTML)
  $vContent .= "\n</DIV>"
  $vContent .= "\n<DIV class='dEDITJUSTIFICATION' id='dEDITJUSTIFICATION".$vNr."' style='display:none' >"
  $vContent .= str_replace("__vNr__","".$vNr."",$getJustificationCheckboxHTML)
  $vContent .= "\n</DIV>"
  //$vContent .= "\n</CENTER>"
  //------------------------------
  //$vContent .= "\n</DIV>"
  //----End: DISPLAYSTUDENTANSWER----------------
  $vContent .= "\n</DIV>"
  //---END: STUDENTANSWER------------------------
}
$vContent .= "\n</DIV>"
$StudentAnswerList = $vContent