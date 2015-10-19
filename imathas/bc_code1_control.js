//--------------------------------------------------------------
//--------------E-PROOF-BACKGROUND-CODE 1:----------------------
//--------------------------------------------------------------
//For Programmers: Set Code4Answers=1 if you want to DEBUG the Background Code
$Code4Answers = 0
if ($SelectedPreconditionID) {
	if ($JustificationID) {
		$JustificationID  = mergearrays($SelectedPreconditionID,$JustificationID)
		$Justification    = mergearrays($SelectedPrecondition,$Justification)
	} else {
		$JustificationID  = $SelectedPreconditionID
		$Justification    = $SelectedPrecondition
	}
}
//--------------------------------------------------------------
//-------ALL IDs -----------------------------------------------
//--------------------------------------------------------------
$preAllID    = mergearrays(array("-???-"),$PreconditionID)
$preAllStep  = mergearrays(array("-???-"),$Precondition)
$postAllID   = mergearrays($ProofStepID,$ConclusionID)
$postAllStep = mergearrays($ProofStep,$Conclusion)
$AllID   = mergearrays($preAllID,$postAllID)
$AllStep = mergearrays($preAllStep,$postAllStep)
$AllJustificationsID   = mergearrays($AllID,$SelectedPreconditionID)
$AllJustificationsStep = mergearrays($AllStep,$SelectedPrecondition)
//--------------------------------------------------------------
//-----READ STUDENT ANSWERS: Questions--------------------------
//--------------------------------------------------------------
$DisplaySelector  = getstuans($stuanswers,$thisq,0)
$inStudentAnswers = getstuans($stuanswers,$thisq,1)
$defPRECONDITION  = getstuans($stuanswers,$thisq,2)
$defCONCLUSION    = getstuans($stuanswers,$thisq,3)
$defJUSTIFICATION = getstuans($stuanswers,$thisq,4)
$defPROOFSTEP     = getstuans($stuanswers,$thisq,5)
//$inStudentAnswers = "=>#__co__#S1#__co__#J1#_co_#J2#_co_#J3,subset#__co__#S2#__co__#J2#_co_#J3,S3 ohne ID"
$vLineSplit = listtoarray($inStudentAnswers)
$max_i = count($inStudentAnswers) - 1
$qi = 0
for ($i=0..$max_i) { 
   if (stringpos("#__co__#",$vLineSplit[$i]) >0 ) {
   	 $qi++
     $vLineSplit[$i] = str_replace("#__co__#",",",$vLineSplit[$i]) 
     $vStepRecord = listtoarray($inStudentAnswers)
     $inConnection = $vStepRecord[0] 
     $inID = $vStepRecord[1] 
     $inJustifications = $vStepRecord[2] 
     $inJustifications = str_replace("#_co_#",",",$inJustifications) 
     //--------------------------
     // Identify Students Justifications 
     $QuestionPreconditionArray[$qi] = listtoarray($inJustifications)
     $QuestionPreconditionIndex[$qi] = array()
     $max_Q = count($QuestionPreconditionArray[$qi])-1
     for ($j=0..$max_Q) {
        // arrayfindindex(needle,haystack)
        $found_j = -1
        $vID = $QuestionPreconditionArray[$qi][$j]
        if ($vID != "") {
           $found_j = arrayfindindex($vID,$AllID) 
        }
        $QuestionPreconditionIndex[$qi][$j] = $found_j
        if ($found_j > 0) {
           $QuestionPreconditionText[$qi][$j] = $AllStep[$found_j]
        } else {
           $QuestionPreconditionText[$qi][$j]  = "<font color='red'><b>Error:</b> "
           $QuestionPreconditionText[$qi][$j] .= "[".$QuestionPreconditionArray[$qi][$j]."] does not exist!</font>" 
        }
    }
    //-------------------------
    //----Step Defintion----
    // arrayfindindex(needle,haystack)
    // Find Step-ID in Students Answer in AllStepID
    $found_j = arrayfindindex($inID,$AllID)
    $inStepDef  = "<font color='red'><b>Error:</b> Step for ID"
    $inStepDef .= "[".$inID."] does not exist!</font>" 
    if ($found_j > 0) {
      $inStepDef = $AllStep[$found_j]
    }        
    $QuestionConnectionTAG[$i] = $inConnection 
    $QuestionStepID[$i]        = $inID
    $QuestionStep[$i]          = $inStepDef
  }
}
//------------------------------------------------------------
//-------SETTING JS------------------------------------------
//------------------------------------------------------------
$SettingsJS = "var vSettings = new Array();\n"
$TextArray = array($Theorem_Title,$Theorem_Appendix)
$max_i = count($TextArray)-1
for ($k=0..$max_i) {
   $XML_Text  = str_replace("`","__math__",$TextArray[$k])
  $XML_Text  = str_replace("=","__eq__",$XML_Text)
  $XML_Text  = str_replace(">","__gt__",$XML_Text)
  $XML_Text  = str_replace("<","__lt__",$XML_Text)
  $XML_Text  = str_replace("\"","__qu__",$XML_Text)
  $XML_Text  = str_replace("\'","__ap__",$XML_Text)
  $XML_Text  = str_replace("'","__ap__",$XML_Text)
  $XML_Text  = str_replace("ä","__ae__",$XML_Text)
  $XML_Text  = str_replace("ö","__oe__",$XML_Text)
  $XML_Text  = str_replace("ü","__ue__",$XML_Text)
  $XML_Text  = str_replace("Ä","__AE__",$XML_Text)   
  $XML_Text  = str_replace("O","__OE__",$XML_Text)
  $XML_Text  = str_replace("Ü","__UE__",$XML_Text)
  $XML_Text  = str_replace("ß","__sz__",$XML_Text)
  $TextArray[$k] = $XML_Text
}
$SettingsJS.="vSettings[\"Theorem_Title\"] = \"".$TextArray[0]."\";\n"
$SettingsJS.="vSettings[\"Theorem_Appendix\"] = \"".$TextArray[1]."\";\n"
if ($unnecessary_preconditions>0) {
     $STR_insert = "$unnecessary_preconditions"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"unnecessary_preconditions\"] = \"".$STR_insert."\";\n"
if ($unnecessary_proofsteps>0) {
  $STR_insert = "$unnecessary_proofsteps"
} else {
  $STR_insert = "0"
}
$SettingsJS.="vSettings[\"unnecessary_proofsteps\"] = \"".$STR_insert."\";\n"
if ($unnecessary_connections>0) {
     $STR_insert = "$unnecessary_connections"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"unnecessary_connections\"] = \"".$STR_insert."\";\n"
if ($selectbox_proofsteps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"selectbox_proofsteps\"] = \"".$STR_insert."\";\n"
if ($allow_own_proofsteps >0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"allow_own_proofsteps\"] = \"".$STR_insert."\";\n"
if ($remap_proofstep_IDs>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"remap_proofstep_IDs\"] = \"".$STR_insert."\";\n"
if ($randomize_proofstep_IDs>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"randomize_proofstep_IDs\"] = \"".$STR_insert."\";\n"
if ($show_links>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"show_links\"] = \"".$STR_insert."\";\n"
if ($show_feedback_score>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"show_feedback_score\"] = \"".$STR_insert."\";\n"
if ($show_proof_solution>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"show_proof_solution\"] = \"".$STR_insert."\";\n"
if ($AuthoringMode>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"AuthoringMode\"] = \"".$STR_insert."\";\n"
if ($max_input_steps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"max_input_steps\"] = \"".$STR_insert."\";\n"
if ($max_authoring_steps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$SettingsJS.="vSettings[\"max_authoring_steps\"] = \"".$STR_insert."\";\n"
$SettingsJS.="vSettings[\"CODE_ID_I\"] = \"".$qid_import1."\";\n"
$SettingsJS.="vSettings[\"CODE_ID_II\"] = \"".$qid_import2."\";\n"
$SettingsJS.="vSettings[\"CODE_ID_III\"] = \"".$qid_import3."\";\n"
//------------------------------------------------------------
//--------CREATE STEPS for TEXTAREA---------------------------
//------------------------------------------------------------
$vNameXML = array("PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP")
$vID_XML = array($PreconditionID,$ConclusionID,$SelectedPreconditionID,$ProofStepID)
$vStep_XML = array($Precondition,$Conclusion,$SelectedPrecondition,$ProofStep)
$inStudentAnswer = array("-?-")
$max_k = count($vNameXML) - 1
for ($k=0..$max_k) {
   $inStudentAnswer[$k] = ""
   $vCR = ""
   $max_i = count($vID_XML[$k])-1
   for ($i=0..$max_i) {
    $XML_Text  = str_replace("`","__math__",$vStep_XML[$k][$i])
    $XML_Text  = str_replace("=","__eq__",$XML_Text)
    $XML_Text  = str_replace(">","__gt__",$XML_Text)
    $XML_Text  = str_replace("<","__lt__",$XML_Text)
    $XML_Text  = str_replace("\"","__qu__",$XML_Text)
    $XML_Text  = str_replace("\'","__ap__",$XML_Text)
    $XML_Text  = str_replace("'","__ap__",$XML_Text)
    $XML_Text  = str_replace("ä","__ae__",$XML_Text)
    $XML_Text  = str_replace("ö","__oe__",$XML_Text)
    $XML_Text  = str_replace("ü","__ue__",$XML_Text)
    $XML_Text  = str_replace("Ä","__AE__",$XML_Text)   
    $XML_Text  = str_replace("O","__OE__",$XML_Text)
    $XML_Text  = str_replace("Ü","__UE__",$XML_Text)
    $XML_Text  = str_replace("ß","__sz__",$XML_Text)
    $XML_Text  = str_replace(",","#_co_#",$XML_Text)
    $inStudentAnswer[$k] .= $vCR.$vID_XML[$k][$i]."#__co__#".$XML_Text
    $vCR = "\n"
   }
}
$StepDefXML.="</div>" //END---DIV---pSETTINGS
//$StepDefXML.="</textarea>"
//------------------------------------------------------------
