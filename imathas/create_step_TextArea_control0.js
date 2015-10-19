//-CONTROL:Student-Input/Suggestions
//-Q-TEXT:Theorem,Javascript e-Proof-StudentAnswer

//$DebugHTML = "Debug TEST String<hr/>"
$StepDefXML  = "<b>XML-Export e-Proof:</b><br/><textarea name='StepExport' rows=10 cols=90 wrap='off'>"
//$StepDefXML = ""
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
$StepDefXML.="<div class=\"pSETTINGS\"  style=\"display:none\" >\n"
$StepDefXML.="  <div class=\"SETTINGLIST\" id=\"SETTINGLIST\">\n"
$StepDefXML.="    <div class=\"SETTING\" id=\"Theorem_Title\">".$TextArray[0]."</div>\n"
$StepDefXML.="    <div class=\"SETTING\" id=\"Theorem_Appendix\">".$TextArray[1]."</div>\n"
//------------------------------------------
if ($unnecessary_preconditions>0) {
     $STR_insert = "$unnecessary_preconditions"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"unnecessary_preconditions\">".$STR_insert."</div>\n"
if ($unnecessary_proofsteps>0) {
	$STR_insert = "$unnecessary_proofsteps"
} else {
	$STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"unnecessary_proofsteps\">".$STR_insert."</div>\n"
if ($unnecessary_connections>0) {
     $STR_insert = "$unnecessary_connections"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"unnecessary_connections\">".$STR_insert."</div>\n"
if ($selectbox_proofsteps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"selectbox_proofsteps\">".$STR_insert."</div>\n"
if ($allow_own_proofsteps >0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"allow_own_proofsteps\">".$STR_insert."</div>\n"
if ($remap_proofstep_IDs>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"remap_proofstep_IDs\">".$STR_insert."s</div>\n"
if ($randomize_proofstep_IDs>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"randomize_proofstep_IDs\"".$STR_insert."</div>\n"
if ($show_links>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"show_links\">".$STR_insert."</div>\n"
if ($show_feedback_score>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"show_feedback_score\">".$STR_insert."</div>\n"
if ($show_proof_solution>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"show_proof_solution\">".$STR_insert."</div>\n"
if ($AuthoringMode>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"AuthoringMode\">".$STR_insert."</div>\n"
if ($max_input_steps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"max_input_steps\">".$STR_insert."</div>\n"
if ($max_authoring_steps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="    <div class=\"SETTING\" id=\"max_authoring_steps\">".$STR_insert."</div>\n"
$StepDefXML.="    <div class=\"SETTING\" id=\"CODE_ID_I\">".$qid_import1."</div>\n"
$StepDefXML.="    <div class=\"SETTING\" id=\"CODE_ID_II\">".$qid_import2."</div>\n"
$StepDefXML.="    <div class=\"SETTING\" id=\"CODE_ID_III\">".$qid_import3."</div>\n"
$StepDefXML.="  </div>\n" //END---DIV---SETTINGS
$StepDefXML.="</div>" //END---DIV---pSETTINGS

$vNameXML = array("PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP")
$vID_XML = array($PreconditionID,$ConclusionID,$SelectedPreconditionID,$ProofStepID)
$vStep_XML = array($Precondition,$Conclusion,$SelectedPrecondition,$ProofStep)
$inStudentAnswer = array("-?-")
$max_k = count($vNameXML) - 1
for ($k=0..$max_k) {
	 $inStudentAnswer[$k] = ""
	 $vCR = ""
	 $max_i = count($vID_XML[$k])-1
	 $StepDefXML .= "  <div class=\"".$vNameXML[$k]."LIST\" id=\"".$vNameXML[$k]."LIST\">\n"
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
	 $StepDefXML .= "  </div>\n"
}
//-------------------------------
