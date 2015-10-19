//----------------------------------------------------------
//---------Header Student Answer----------------------------
//----------------------------------------------------------
$vUpdateButton = "<input type='button' name='bUpdate' value=' Update ' onclick=\"updateInput2IMathAS(this.form)\">"
$vLink_Screencast = "http://e-proof.weebly.com/german-tutorials.html"
$vLink_Tutorial   = "http://math.uni-landau.de/download/IMathAS/eProof_iMathAS_Tutorial.pdf"

//----Step Count Selector ---------
$StepCountSelectorHTML = ""
$StepCountSelectorHTML .= "<SELECT class='sSTEPCOUNT'  id='sSTEPCOUNT' onchange=\"updateStepCount(this.value)\">"
$maxNr = count($Precondition) + count($Conclusion) + count($ProofStep) 
for ($vNr=1..$maxNr) {
  if ($vNr == $maxSteps) {
    $StepCountSelectorHTML .="<option class='STEPCOUNT' value='".$vNr."' selected>".$vNr."</option>"
  } else {
    $StepCountSelectorHTML .="<option class='STEPCOUNT' value='".$vNr."'>".$vNr."</option>"
  }
}
$StepCountSelectorHTML .="</SELECT>"
//------------STUDENT ANSWER-HEADER------------------
$vContent = ""
$vContent .= "<table align=\"center\"><tbody><tr>"
$vContent .= "<td><b>" .$STR_Number_of." ".$STR_ProofSteps.":</b></td>"
//------------sSTEPCOUNT--------------
$vContent .= "<td>" . $StepCountSelectorHTML . "</td>"
//$vContent .= "<td>" . vUpdateButton ."</td>"
$vContent .= "<td>" . " " ."</td>"
if ($show_links > 0) {
  $vContent .= "<td>"
  $vContent .= "<a href=\"".$vLink_Tutorial."\" target=\"_blank\">PDF-Tutorial</a>"
  $vContent .= "</td>"
}
$vContent .= "</tr><tr>"
$vContent .= "</tr><tr>"
$vContent .= "<td><b>" .$STR_Display." ".$STR_Proof.":</b>"
$vContent .= "<td><SELECT id='sDISPLAYOPTION' onchange=\"setVisibility4Proof(this.value,this.form)\">"
$vContent .= "<OPTION value='Complete' >EDIT: ".$STR_Complete."</OPTION>"
$vContent .= "<OPTION value='Short'>EDIT: ".$STR_Short."</OPTION>"
$vContent .= "<OPTION value='Hide'>EDIT: ".$STR_Hide."</OPTION>"
if ($show_feedback_score > 0) {
  $vContent .= "<OPTION value='Assessment'>".$STR_Assessment."</OPTION>"
}
if ($show_proof_solution > 0) {
  $vContent .= "<OPTION value='Solution'>".$STR_Solution."</OPTION>"
}
$vContent .= "</SELECT></td>"
$vContent .= "<td>" . $vUpdateButton ."</td>"
if ($show_links > 0) {
  $vContent .= "<td>"
  $vContent .= "<a href=\"".$vLink_Screencast."\" target=\"_blank\">Video/Screencast</a>"
  $vContent .= "</td>"
}
$vContent .= "</tr><tr>"
$vContent .= "</tr></tbody></table><hr>"
$StudentAnswerHeader = $vContent
//--------END Student Answer Header--------------------