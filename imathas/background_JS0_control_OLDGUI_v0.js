//--------------------------------------------------------------
//------E-PROOF-BACKGROUND-CODE 0:--Remapper/Randomizer---------
//--------------------------------------------------------------
// E-PROOF-BACKGROUND-CODE(4647): Remapping of IDS - Randomizer. Imported by all e-Proofs in this iMathAS-System
//-CONTROL:Remap and Randomize
//-Q-TEXT:Language Module
//--------------------------------------------------------------
$qid_import1 = 4586 // 4001 //82
$qid_import2 = 4587 // 4002 //83 
$qid_import3 = 4588 // 4200 //130
//--------------------------------------------------------------
$vEditorID = "XmceEditor"
//--------------------------------------------------------------
//$ErrorHTML = "thisq=".$thisq
if (!$vQID) {
 $vQID = "-QID".rand(1000,9999)."X"
 //$vQID = "GOURSAT"
 //$ErrorHTML = "vQID is undefined - vQID=".$vQID
} else {
  $vQID = "-".$vQID
}
//--------------------------------------------------------------
//-----ANSWER TYPE DEFINITION-----------------------------------
//--------------------------------------------------------------
$max_qi = 7
for ($qi=0..$max_qi) {
  //--------------------
  $anstypes[$qi] = "string"
  //--------------------
}
//--------------------------------------------------------------
//-----APPEND PRECONDITION TO SOLUTION--------------------------
//--------------------------------------------------------------
$max_i = count($Precondition)-1
$sol_i = count($SolutionStep)
for ($i=0..$max_i) {
     $SolutionStep[$sol_i] = array(" ",$PreconditionID[$i]," ",array(),array())
     $sol_i+=1 
}
//---------------------------------------------------------------------------
//-------TEXT CONSTANTS------------------------------------------------------
//---- Overwrite ErrorDisplay Variable for Debugging of the code-------------
$ErrorDisplay = "No Errors found"
//For Programmers: Set Code4Answers=1 if you want to DEBUG the Background Code
$Code4Answers = 0
//---------------------------------------------------------------------------
//---------String Definitions----Language Adaptation-------------------------
if ($LANGUAGE == "EN") {
$STR_All      = "All"
$STR_Average  = "Average"
$STR_Application_of = "Application of"
$STR_are_missing = "are missing"
$STR_as_Precondition = "as Precondition"
$STR_Assessment = "Assessment"
$STR_by = "by"
$STR_Comment = "Comment"
$STR_Complete = "Complete"
$STR_Conclusion = "Conclusion"
$STR_Conclusion_Multi = "Proof the following Conclusions:"
$STR_Conclusion_Single = "Proof, that the following Conclusion is valid as logical consequence of the premises:"
$STR_Connection   = "Connection"
$STR_Delete_Prompt = "Do you want to delete the following Step of Proof?"
$STR_Deleted = "deleted"
$STR_Deleted_ProofSteps = "Unused Steps of the Proof"
$STR_Display = "Display"
$STR_does_not_exist = "does not exist"
$STR_Edit_Proof     = "Edit Proof"
$STR_Equality = "Equality"
$STR_Errors = "Errors"
$STR_Example = "Example"
$STR_greater_equal = "greater equal"
$STR_greater       = "greater than"
$STR_Help = "Suggestions"
$STR_Hide     = "Hide"
$STR_impossible     = "impossible"
$STR_in_ProofStep   = "in Proof Step"
$STR_Implication = "Implication"
$STR_Instead_of = "instead of"
$STR_is_missing  = "is missing"
$STR_Justification = "Justification"
$STR_Justifications = "Justifications"
$STR_logical = "logische"
$STR_lower_equal = "lower equal"
$STR_lower       = "lower than"
$STR_manual     = "manual"
$STR_MinimalProofSteps = "For a correct proof the author suggests a number of $MinimalProofSteps minimal steps."
$STR_missing = "missing"
$STR_MULTIPLE_USED = "USED MULTIPLE TIMES"
$STR_need_a_previous_proofstep = "needs a previous proof step before"
$STR_No_connection_to_previous = "No connection to previous step!"
$STR_No_more_points = "You used one proof step more times than allowed - more points for the following proof steps"
$STR_None     = "None"
$STR_not_possible_at_first_step = "not possible as first step!"
$STR_Number_of   = "Number of"
$STR_of = "of"
$STR_or = "or"
$STR_Own_ProofStep = "Self-defined Proof Step"
$STR_Points = "Points"
$STR_Precondition = "Precondition"
$STR_Preconditions = "Preconditions"
$STR_Precondition_Multi  = "Preconditions of the Proof: "
$STR_Precondition_Single = "Precondition of the Proof: "
$STR_previous = "previous"
$STR_previous_step = "Previous Step"
$STR_Proof        = "Proof"
$STR_ProofStep    = "Fragment of Proof"
$STR_ProofSteps   = "Fragments of Proof"
$STR_ProofSequence = "Sequence of Steps"
$STR_ProofType = "Type of Proof"
$STR_Questionmark = "?"
$STR_Remark = "Remark"
$STR_Remove = "Remove "
$STR_replace = "replace"
$STR_Selected = "Possible"
$STR_Selected_Precondition = "Selected Precondition for Justification"
$STR_Selection_of = "Selection of"
$STR_Short    = "Short"
$STR_should_be = "should be"
$STR_Solution = "Solution"
$STR_Step = "Step"
$STR_Step_for       = "Step for"
$STR_Step_No      = "Step-No"
$STR_Subset       = "Subset"
$STR_Suggestion   = "Suggestion"
$STR_Suggestions  = "Suggestions"
$STR_Theorem = "Theorem"
$STR_Theorem_Title = "Title of Theorem"
$STR_Type = "Type of Proof"
$STR_undefined   = "undefined"
$STR_unnecessary   = "unnecessary"
$STR_Use = "Use"
$STR_USED = "USED"
$STR_Variables = "Variablen"

$STR_RIGHT = "(r)"
$STR_WRONG = "(w)"

$STR_JUSTIFICATION_MISSING     = "(jm)"
$STR_JUSTIFICATION_UNNECESSARY = "(ju)"

//--- endif($LANGUAGE=="EN)----
} else {
//---GERMAN LABELS------------
$STR_All      = "Alle"
$STR_Average  = "Durchschnitt"
$STR_Application_of = "Anwendung von"
$STR_are_missing = "fehlen"
$STR_as_Precondition = "als Voraussetzung"
$STR_Assessment = "Bewertung"
$STR_by = "mit"
$STR_Comment = "Kommentar"
$STR_Complete = "Vollst&auml;ndig"
$STR_Conclusion = "Behauptung"
$STR_Conclusion_Multi  = "Zeigen Sie nun, dass die folgenden Behauptungen gelten:"
$STR_Conclusion_Single = "Zeigen Sie nun, dass die folgende Behauptung gilt:"
$STR_Connection   = "Bezug"
$STR_Delete_Prompt = "Wollen Sie den folgenden Beweisschritt entfernen?"
$STR_Deleted = "geloescht"
$STR_Deleted_ProofSteps = "Nicht verwendete Beweisschritte"
$STR_Display = "Darstellung"
$STR_does_not_exist = "existiert nicht"
$STR_Edit_Proof     = "Beweis-Eingabe:"
$STR_Equality = "Gleichheit"
$STR_Errors = "Fehler"
$STR_Example = "Beispiel"
$STR_for = "f&uuml;r"
$STR_greater_equal = "gr&ouml;&szlig;er gleich"
$STR_greater       = "gr&ouml;&szlig;er"
$STR_Help = "Vorschl&auml;ge"
$STR_Hide     = "Ausblenden"
$STR_impossible     = "nicht m&ouml;glich"
$STR_in_ProofStep   = "im Beweisschritt"
$STR_Instead_of = "statt"
$STR_Implication = "FOLGERUNG"
$STR_is_missing  = "fehlt"
$STR_Justification = "Begruendung"
$STR_Justifications = "Begr&uuml;ndungen"
$STR_logical = "logical"
$STR_lower_equal = "kleiner gleich"
$STR_lower       = "kleiner"
$STR_manual     = "manuelle"
$STR_MinimalProofSteps = "F&uuml;r den Beweis sind mindestens $MinimalProofSteps Beweisschritte vorgesehen."
$STR_missing = "fehlen"
$STR_MULTIPLE_USED = "MEHRFACH VERWENDET"
$STR_need_a_previous_proofstep = "ben&ouml;tigt weiteren Beweischritt vor diesem Schritt"
$STR_No_connection_to_previous = "Kein Bezug zum vorherigen Beweisschritt!"
$STR_No_more_points = "Sie den Beweisschritt &ouml;fter als erlaubt verwendet, daher gibt es keine weiteren Punkte mehr f&uuml;r die folgenden Beweisschritte"
$STR_None     = "Keine"
$STR_not_possible_at_first_step = "nicht m&ouml;glich als 1. Schritt!"
$STR_Number_of   = "Anzahl der"
$STR_of = "von"
$STR_or = "oder"
$STR_Own_ProofStep = "selbstdefinierter Beweisschritt"
$STR_Points = "Punkte"
$STR_Precondition = "Voraussetzung"
$STR_Precondition_Multi  = "Gegeben sind die folgenden Voraussetzungen f&uuml;r den Beweis: "
$STR_Precondition_Single = "Gegeben ist die folgende Voraussetzung f&uuml;r den Beweis: "
$STR_Preconditions = "Voraussetzungen"
$STR_previous = "vorheriger"
$STR_previous_step = "Vorheriger Schritt"
$STR_Proof         = "Beweis"
$STR_ProofStep     = "Beweisfragment"
$STR_ProofSteps    = "Beweisfragmente"
$STR_ProofSequence = "Beweissequenz"
$STR_ProofType = "Beweistyp"
$STR_Questionmark = "?"
$STR_Remark = "Hinweis"
$STR_Remove = "Entfernen Sie "
$STR_replace = "Ersetzen Sie "
$STR_Selected = "M&ouml;gliche"
$STR_Selected_Precondition = "Zus&auml;tzliche Voraussetzung f&uuml;r die Begr&uuml;ndung"
$STR_Selection_of = "Auswahl von"
$STR_Short    = "Kurz"
$STR_should_be = "sollte sein"
$STR_Solution = "L&ouml;sung"
$STR_Step = "Schritt"
$STR_Step_for       = "Schritt f&uuml;r"
$STR_Step_No      = "Positionsnr."
$STR_Subset       = "Teilmenge"
$STR_Suggestion   = "Vorschlag"
$STR_Suggestions  = "Vorschl&auml;ge"
$STR_Type = "Typ Beweis"
$STR_Theorem = "Satz"
$STR_Theorem_Title = "Bezeichnung des Satzes"
$STR_undefined   = "undefiniert"
$STR_unnecessary   = "unn&ouml;tig"
$STR_Use = "Verwenden Sie"
$STR_USED = "VERWENDET"
$STR_Variables = "Variablen"

$STR_RIGHT = "(r)"
$STR_WRONG = "(f)"

$STR_JUSTIFICATION_MISSING     = "(ff)"
$STR_JUSTIFICATION_UNNECESSARY = "(fu)"

} //---end else if(LANGUAGE=="EN")---
//-----------------------------------
$STR_Proof_Input = $STR_Edit_Proof
//--------------------------------------------------------------
//------Create LanguageJS---------------------------------------
//--------------------------------------------------------------
$vOut="<script language=\"javascript\">\n"
$vOut.="var vLanguage = new Array();\n"
$vOut.="vLanguage[\"All\"]=\"$STR_All\";\n"
$vOut.="vLanguage[\"Average\"]=\"$STR_Average\";\n"
$vOut.="vLanguage[\"Application_of\"]=\"$STR_Application_of\";\n"
$vOut.="vLanguage[\"are_missing\"]=\"$STR_are_missing\";\n"
$vOut.="vLanguage[\"as_Precondition\"]=\"$STR_as_Precondition\";\n"
$vOut.="vLanguage[\"Assessment\"]=\"$STR_Assessment\";\n"
$vOut.="vLanguage[\"by\"]=\"$STR_by\";\n"
$vOut.="vLanguage[\"Comment\"]=\"$STR_Comment\";\n"
$vOut.="vLanguage[\"Complete\"]=\"$STR_Complete\";\n"
$vOut.="vLanguage[\"Conclusion\"]=\"$STR_Conclusion\";\n"
$vOut.="vLanguage[\"Conclusion_Multi\"]=\"$STR_Conclusion_Multi\";\n"
$vOut.="vLanguage[\"Conclusion_Single\"]=\"$STR_Conclusion_Single\";\n"
$vOut.="vLanguage[\"Connection\"]=\"$STR_Connection\";\n"
$vOut.="vLanguage[\"Delete_Prompt\"]=\"$STR_Delete_Prompt\";\n"
$vOut.="vLanguage[\"Deleted\"]=\"$STR_Deleted\";\n"
$vOut.="vLanguage[\"Deleted_ProofSteps\"]=\"$STR_Deleted_ProofSteps\";\n"
$vOut.="vLanguage[\"Display\"]=\"$STR_Display\";\n"
$vOut.="vLanguage[\"does_not_exist\"]=\"$STR_does_not_exist\";\n"
$vOut.="vLanguage[\"Edit_Proof\"]=\"$STR_Edit_Proof\";\n"
$vOut.="vLanguage[\"Equality\"]=\"$STR_Equality\";\n"
$vOut.="vLanguage[\"Errors\"]=\"$STR_Errors\";\n"
$vOut.="vLanguage[\"Example\"]=\"$STR_Example\";\n"
$vOut.="vLanguage[\"for\"]=\"$STR_for\";\n"
$vOut.="vLanguage[\"greater_equal\"]=\"$STR_greater_equal\";\n"
$vOut.="vLanguage[\"greater\"]=\"$STR_greater\";\n"
$vOut.="vLanguage[\"Help\"]=\"$STR_Help\";\n"
$vOut.="vLanguage[\"Hide\"]=\"$STR_Hide\";\n"
$vOut.="vLanguage[\"impossible\"]=\"$STR_impossible\";\n"
$vOut.="vLanguage[\"in_ProofStep\"]=\"$STR_in_ProofStep\";\n"
$vOut.="vLanguage[\"Instead_of\"]=\"$STR_Instead_of\";\n"
$vOut.="vLanguage[\"Implication\"]=\"$STR_Implication\";\n"
$vOut.="vLanguage[\"is_missing\"]=\"$STR_is_missing\";\n"
$vOut.="vLanguage[\"Justification\"]=\"$STR_Justification\";\n"
$vOut.="vLanguage[\"Justifications\"]=\"$STR_Justifications\";\n"
$vOut.="vLanguage[\"logical\"]=\"$STR_logical\";\n"
$vOut.="vLanguage[\"lower_equal\"]=\"$STR_lower_equal\";\n"
$vOut.="vLanguage[\"lower\"]=\"$STR_lower\";\n"
$vOut.="vLanguage[\"manual\"]=\"$STR_manual\";\n"
$vOut.="vLanguage[\"MinimalProofSteps\"]=\"$STR_MinimalProofSteps\";\n"
$vOut.="vLanguage[\"missing\"]=\"$STR_missing\";\n"
$vOut.="vLanguage[\"MULTIPLE_USED\"]=\"$STR_MULTIPLE_USED\";\n"
$vOut.="vLanguage[\"need_a_previous_proofstep\"]=\"$STR_need_a_previous_proofstep\";\n"
$vOut.="vLanguage[\"No_connection_to_previous\"]=\"$STR_No_connection_to_previous\";\n"
$vOut.="vLanguage[\"No_more_points\"]=\"$STR_No_more_points\";\n"
$vOut.="vLanguage[\"None\"]=\"$STR_None\";\n"
$vOut.="vLanguage[\"not_possible_at_first_step\"]=\"$STR_not_possible_at_first_step\";\n"
$vOut.="vLanguage[\"Number_of\"]=\"$STR_Number_of\";\n"
$vOut.="vLanguage[\"of\"]=\"$STR_of\";\n"
$vOut.="vLanguage[\"or\"]=\"$STR_or\";\n"
$vOut.="vLanguage[\"Own_ProofStep\"]=\"$STR_Own_ProofStep\";\n"
$vOut.="vLanguage[\"Points\"]=\"$STR_Points\";\n"
$vOut.="vLanguage[\"Position\"]=\"$STR_Position\";\n"
$vOut.="vLanguage[\"Precondition\"]=\"$STR_Precondition\";\n"
$vOut.="vLanguage[\"Precondition_Multi\"]=\"$STR_Precondition_Multi\";\n"
$vOut.="vLanguage[\"Precondition_Single\"]=\"$STR_Precondition_Single\";\n"
$vOut.="vLanguage[\"Preconditions\"]=\"$STR_Preconditions\";\n"
$vOut.="vLanguage[\"previous\"]=\"$STR_previous\";\n"
$vOut.="vLanguage[\"previous_step\"]=\"$STR_previous_step\";\n"
$vOut.="vLanguage[\"Proof\"]=\"$STR_Proof\";\n"
$vOut.="vLanguage[\"Proof_Input\"]=\"$STR_Proof_Input\";\n"
$vOut.="vLanguage[\"ProofStep\"]=\"$STR_ProofStep\";\n"
$vOut.="vLanguage[\"ProofSteps\"]=\"$STR_ProofSteps\";\n"
$vOut.="vLanguage[\"ProofSequence\"]=\"$STR_ProofSequence\";\n"
$vOut.="vLanguage[\"ProofType\"]=\"$STR_ProofType\";\n"
$vOut.="vLanguage[\"Questionmark\"]=\"$STR_Questionmark\";\n"
$vOut.="vLanguage[\"Remark\"]=\"$STR_Remark\";\n"
$vOut.="vLanguage[\"Remove\"]=\"$STR_Remove\";\n"
$vOut.="vLanguage[\"replace\"]=\"$STR_replace\";\n"
$vOut.="vLanguage[\"Select_Answer\"]=\"$STR_Select_Answer\";\n"
$vOut.="vLanguage[\"Selected\"]=\"$STR_Selected\";\n"
$vOut.="vLanguage[\"Selected_Precondition\"]=\"$STR_Selected_Precondition\";\n"
$vOut.="vLanguage[\"Selection_of\"]=\"$STR_Selection_of\";\n"
$vOut.="vLanguage[\"Self_Defined\"]=\"$STR_Self_Defined\";\n"
$vOut.="vLanguage[\"Short\"]=\"$STR_Short\";\n"
$vOut.="vLanguage[\"should_be\"]=\"$STR_should_be\";\n"
$vOut.="vLanguage[\"Solution\"]=\"$STR_Solution\";\n"
$vOut.="vLanguage[\"Step\"]=\"$STR_Step\";\n"
$vOut.="vLanguage[\"Step_for\"]=\"$STR_Step_for\";\n"
$vOut.="vLanguage[\"Step_No\"]=\"$STR_Step_No\";\n"
$vOut.="vLanguage[\"Subset\"]=\"$STR_Subset\";\n"
$vOut.="vLanguage[\"Suggestion\"]=\"$STR_Suggestion\";\n"
$vOut.="vLanguage[\"Suggestions\"]=\"$STR_Suggestions\";\n"
$vOut.="vLanguage[\"Type\"]=\"$STR_Type\";\n"
$vOut.="vLanguage[\"Theorem\"]=\"$STR_Theorem\";\n"
$vOut.="vLanguage[\"Theorem_Title\"]=\"$STR_Theorem_Title\";\n"
$vOut.="vLanguage[\"undefined\"]=\"$STR_undefined\";\n"
$vOut.="vLanguage[\"unnecessary\"]=\"$STR_unnecessary\";\n"
$vOut.="vLanguage[\"Use\"]=\"$STR_Use\";\n"
$vOut.="vLanguage[\"USED\"]=\"$STR_USED\";\n"
$vOut.="vLanguage[\"Variables\"]=\"$STR_Variables\";\n"
$vOut.="vLanguage[\"RIGHT\"]=\"$STR_RIGHT\";\n"
$vOut.="vLanguage[\"WRONG\"]=\"$STR_WRONG\";\n"
$vOut.="vLanguage[\"JUSTIFICATION_MISSING\"]=\"$STR_JUSTIFICATION_MISSING\";\n"
$vOut.="vLanguage[\"JUSTIFICATION_UNNECESSARY\"]=\"$STR_JUSTIFICATION_UNNECESSARY\"; \n"
$vOut.="</script>\n"
//--------------------------------------------------------------
$LanguageJS = $vOut
//--------------------------------------------------------------
if ($StepConnectionTAG) {
  $ErrorHTML .= "Please delete StepConnectionTAG in Definition of Theorem/Proof<br/>"
} else {
    $ju = 0
    $StepConnectionTAG[$ju] = "???" 
    $StepConnectionID[$ju]  = "?" 
    $StepConnection[$ju]    = $STR_Connection."?"
    $ju +=1
    $StepConnectionTAG[$ju] = "Typ" 
    $StepConnectionID[$ju]  = "Typ" 
    $StepConnection[$ju]    = $STR_Type
    $ju +=1
    $StepConnectionTAG[$ju] = " " 
    $StepConnectionID[$ju]  = "START:" 
    $StepConnection[$ju]   = "START: ".$STR_ProofSequence 
    $ju +=1
    $StepConnectionTAG[$ju] = "=>"
    $StepConnectionID[$ju]  = $STR_Implication.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_Implication
    $ju +=1
    $StepConnectionTAG[$ju] = "=" 
    $StepConnectionID[$ju]  = $STR_Equality.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_Equality
    $ju +=1
    $StepConnectionTAG[$ju] = "<=" 
    $StepConnectionID[$ju]  = $STR_lower_equal.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_lower_equal
    $ju +=1
    $StepConnectionTAG[$ju] = "<" 
    $StepConnectionID[$ju]  = $STR_lower.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_lower
    $ju +=1
    $StepConnectionTAG[$ju] = ">=" 
    $StepConnectionID[$ju]  = $STR_greater_equal.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_greater_equal
    $ju +=1
    $StepConnectionTAG[$ju] = ">" 
    $StepConnectionID[$ju] = $STR_greater.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_greater
    $ju +=1
    $StepConnectionTAG[$ju] = "subseteq" 
    $StepConnectionID[$ju] = $STR_Subset.": `".$StepConnectionTAG[$ju]."`" 
    $StepConnection[$ju] = $STR_Subset
    $ju +=1
    $StepConnectionTAG[$ju] = "DEF" 
    $StepConnectionID[$ju] = "DEF"  
    $StepConnection[$ju] = "Definition ".$STR_of." ".$STR_Variables 
    $ju +=1
    $StepConnectionTAG[$ju] = "TEXT" 
    $StepConnectionID[$ju] = "Text ".$STR_or." ".$STR_Comment  
    $StepConnection[$ju] = "Text ".$STR_or." ".$STR_Comment
    $ju +=1
    $StepConnectionTAG[$ju] = "q.e.d." 
    $StepConnectionID[$ju] = "q.e.d."  
    $StepConnection[$ju] = "q.e.d."
} 

//-----------------------------------
//-----------------------------------
$Def_TR_I = "<TR>"
$Def_TR_II = "</TR>"
$Def_TD_I = "<TD valign='top' align='center'>"
$Def_TD_L = "<TD valign='top' align='left'>"
$Def_TD_II = "</TD><TD>&nbsp;&nbsp;</TD>"
//-----------------------------------

//--------------------------------------------------------------
//----Determine: False PROOFSTEPS-------------------------------
$max_i = count($ProofStepID)-1
$FalseStep4ID = array()
for ($new_pos=0..$max_i) {
   $vFalse4ID = "-"
   $vFoundFalse = stringpos("_F",$ProofStepID[$new_pos]);
   if ($vFoundFalse > 0) {
      $vFalse4ID = substr($ProofStepID[$new_pos],0,$vFoundFalse)
      if (($AuthoringMode + $show_XML) > 0) {
         $ProofStep[$new_pos] .=" <font color=red><b>FALSE</b></font>"
      }
   }
   $FalseStep4ID[$new_pos] = $vFalse4ID
}
//$randomize_proofsteps = 1
//----Randomize: PROOFSTEPS----------------------------
if ($randomize_proofstep_IDs > 0 ) {
   $max_i = count($ProofStepID)-1
   if ($max_i > 1) {
      $Random_Position = diffrands(0,$max_i,$max_i+1)
      $Randomize_ID       = array() 
      $Randomize_False_ID = array() 
      $Randomize_Text     = array()
      for ($old_pos=0..$max_i) {
         $new_pos = $Random_Position[$old_pos]
         //---Store old Position--------------------
         $Randomize_ID[$old_pos]   = $ProofStepID[$new_pos]
         $Randomize_False_ID[$old_pos] = $FalseStep4ID[$new_pos]
         $Randomize_Text[$old_pos] = $ProofStep[$new_pos]
         //$Randomize_Text[$old_pos] = "(".$old_pos."to".$new_pos.") (F4='".$FalseStep4ID[$new_pos]."')".$ProofStep[$new_pos]
      } // For   
   } //----IF max_i>0 End Rondomize: ProofStep Position-------
   $ProofStepID  = $Randomize_ID
   $FalseStep4ID = $Randomize_False_ID
   $ProofStep    = $Randomize_Text
} //---/If randomize_ProofSteps-------

$Org_ID = array("-???-"," ")
$Map_ID = array("-???-"," ")
$Keep_ID = array("???","AG","KG","DG","MY0","MY1","MY2","MY3","MY4")
$Keep_ID = mergearrays(array("-???-"),$SelectedPreconditionID)
$qi = 1
//----Remap: PRECONDITION-----------------------------
if ($remap_proofstep_IDs>0) {
//-------------------------
$max_i = count($PreconditionID)-1
$vChar = "P"
$nr = 0
for ($i=0..$max_i) {
     $qi++
     $Org_ID[$qi] = $PreconditionID[$i]
     $vChar = $Org_ID[$qi]
     $vChar = str_replace("0","",$vChar)
     $vChar = str_replace("1","",$vChar)
     $vChar = str_replace("2","",$vChar)
     $vChar = str_replace("3","",$vChar)
     $vChar = str_replace("4","",$vChar)
     $vChar = str_replace("5","",$vChar)
     $vChar = str_replace("6","",$vChar)
     $vChar = str_replace("7","",$vChar)
     $vChar = str_replace("8","",$vChar)
     $vChar = str_replace("9","",$vChar)
     $vChar = str_replace("_F","",$vChar)
     $found_i = arrayfindindex($Org_ID[$qi],$Keep_ID) 
     if ($found_i >0) {
        $Map_ID[$qi] =  $Org_ID[$qi]
     } else {
        $nr++
        if ($nr < 10) {
          $Map_ID[$qi] = $vChar."-$nr"
        } else {
          $Map_ID[$qi] = $vChar."$nr"
        }
     }
     $PreconditionID[$i] = $Map_ID[$qi]
}
//----Remap: CONCLUSION-------------------------------
$max_i = count($ConclusionID)-1
$vChar = "C"
$nr = 0
for ($i=0..$max_i) {
     $qi++
     $Org_ID[$qi] = $ConclusionID[$i]
     $vChar = $Org_ID[$qi]
     $vChar = str_replace("0","",$vChar)
     $vChar = str_replace("1","",$vChar)
     $vChar = str_replace("2","",$vChar)
     $vChar = str_replace("3","",$vChar)
     $vChar = str_replace("4","",$vChar)
     $vChar = str_replace("5","",$vChar)
     $vChar = str_replace("6","",$vChar)
     $vChar = str_replace("7","",$vChar)
     $vChar = str_replace("8","",$vChar)
     $vChar = str_replace("9","",$vChar)
     $vChar = str_replace("_F","",$vChar)
     $found_i = arrayfindindex($Org_ID[$qi],$Keep_ID) 
     if ($found_i >0) {
        $Map_ID[$qi] =  $Org_ID[$qi]
     } else {
        $nr++
        if ($nr < 10) {
          $Map_ID[$qi] = $vChar."-$nr"
        } else {
          $Map_ID[$qi] = $vChar."$nr"
        }
     }
     $ConclusionID[$i] = $Map_ID[$qi]
}
//----Remap: JUSTIFICATION----------------------------
$max_i = count($SelectedPreconditionID)-1
$vChar = "J"
$nr = 0
for ($i=0..$max_i) {
     $qi++
     $Org_ID[$qi] = $SelectedPreconditionID[$i]
     $vChar = $Org_ID[$qi]
     $vChar = str_replace("0","",$vChar)
     $vChar = str_replace("1","",$vChar)
     $vChar = str_replace("2","",$vChar)
     $vChar = str_replace("3","",$vChar)
     $vChar = str_replace("4","",$vChar)
     $vChar = str_replace("5","",$vChar)
     $vChar = str_replace("6","",$vChar)
     $vChar = str_replace("7","",$vChar)
     $vChar = str_replace("8","",$vChar)
     $vChar = str_replace("9","",$vChar)
     $vChar = str_replace("_F","",$vChar)
     $found_i = arrayfindindex($Org_ID[$qi],$Keep_ID) 
     if ($found_i >0) {
        $Map_ID[$qi] =  $Org_ID[$qi]
     } else {
        $nr++
        if ($nr < 10) {
          $Map_ID[$qi] = $vChar."-$nr"
        } else {
          $Map_ID[$qi] = $vChar."$nr"
        }
     }
     $SelectedPreconditionID[$i] = $Map_ID[$qi]
}
//----Remap: PROOFSTEP----------------------------
$max_i = count($ProofStepID)-1
$vChar = "S"
$nr = 0
for ($i=0..$max_i) {
     $qi++
     $Org_ID[$qi] = $ProofStepID[$i]
     $vChar = $Org_ID[$qi]
     $vChar = str_replace("0","",$vChar)
     $vChar = str_replace("1","",$vChar)
     $vChar = str_replace("2","",$vChar)
     $vChar = str_replace("3","",$vChar)
     $vChar = str_replace("4","",$vChar)
     $vChar = str_replace("5","",$vChar)
     $vChar = str_replace("6","",$vChar)
     $vChar = str_replace("7","",$vChar)
     $vChar = str_replace("8","",$vChar)
     $vChar = str_replace("9","",$vChar)
     $vChar = str_replace("_F","",$vChar)
     $found_i = arrayfindindex($Org_ID[$qi],$Keep_ID) 
     if ($found_i >0) {
        $Map_ID[$qi] =  $Org_ID[$qi]
     } else {
        $nr++
        if ($nr < 10) {
          $Map_ID[$qi] = $vChar."-$nr" 
        } else {
          $Map_ID[$qi] = $vChar."$nr"
        }
     }
     $ProofStepID[$i] = $Map_ID[$qi]
}
//----Remap: ORIGINAL PROOFSTEP to MAPPED ------------
$max_i = count($Org_ProofStepID)-1
$nr = 0
for ($i=0..$max_i) {
     $mapID = $Org_ProofStepID[$i]
     $found_i = arrayfindindex($mapID,$Org_ID) 
     if ($found_i >0) {
        $Org_ProofStepID[$i] = $Map_ID[$found_i]
     } else {
        $Org_ProofStepID[$i] .="???exists???"
     }
}
//---Remap: SOLUTION----------------------------------
// $SolutionStep[$so]=array("E5","E8","=>",array("R10","E0"),array("E1","E3","E4"))
$max_so = count($SolutionStep)-1
for ($so=0..$max_so) {
    //-----Remap previous-----
    for ($mi=0..1) {
       $mapID = $SolutionStep[$so][$mi]
       $found_i = arrayfindindex($mapID,$Org_ID) 
       if ($found_i >0) {
          $SolutionStep[$so][$mi] = $Map_ID[$found_i]
       } else {
          $SolutionStep[$so][$mi] .="???exists???"
       }
    }
    //----Justification Arrays------------------
    for ($mi=3..4) {
        //----Loop over Justification Array-----
        $vSolutionArray = $SolutionStep[$so][$mi]
        $max_i = count($vSolutionArray)-1
        if ($max_i>=0) {
            //---Make replacement if Justifications exist
            for ($i=0..$max_i) {
               $mapID = $vSolutionArray[$i]
               $found_i = arrayfindindex($mapID,$Org_ID) 
               if ($found_i >0) {
                   $vSolutionArray[$i] = $Map_ID[$found_i]
               } else {
                   $vSolutionArray[$i] .= "???exists???"
               }
               //$vSolutionArray[$i] = "S".$so."A".$mi."I".$i
               $SolutionStep[$so][$mi] = $vSolutionArray
            }
            //end: For array Loop
        }
        //end 
    }
}
//-------------------------
} //endif ($remap_proofsteps>0) {
//-------------------------

//--------------------------------------------------------------
//------------- CREATE STUDENT ANSWER and HEADER:---------------
//--------------------------------------------------------------
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
$maxSteps         = getstuans($stuanswers,$thisq,0)
$DisplaySelector  = getstuans($stuanswers,$thisq,1)
$inStudentAnswers = getstuans($stuanswers,$thisq,2)
$defPRECONDITION  = getstuans($stuanswers,$thisq,3)
$defCONCLUSION    = getstuans($stuanswers,$thisq,4)
$defJUSTIFICATION = getstuans($stuanswers,$thisq,5)
$defPROOFSTEP     = getstuans($stuanswers,$thisq,6)
$imathSTUDENTANSWER = str_replace(",","\n",$inStudentAnswers)
$imathSTEPCOUNT = count($AllStep) - 1
//$ErrorHTML .= "<hr/>maxSteps=".$maxSteps."<hr/>"
if ($maxSteps != "") {
   $imathSTEPCOUNT = $maxSteps
}
if ($inStudentAnswers == "") {
  $inStudentAnswers = ""
  $vCR = ""
  $min_k = count($Precondition)+1
  $max_k = count($AllID) - 1
  $maxSteps = $max_k - $min_k + 1
  $imathSTEPCOUNT = $maxSteps
  $vSep = "#__co__#"
  for ($k=$min_k..$max_k) {
    $inStudentAnswers .= $vCR."???".$vSep.$AllID[$k].$vSep.""
    $vCR = ","
  }
  $min_k = count($Precondition)
  for ($k=1..$min_k) {
    $inStudentAnswers .= $vCR."???".$vSep.$AllID[$k].$vSep.""
    $vCR = ","
  }
}
//--------------------------------------------------------------
//-----BEGIN: Overwrite StepDefs from Input
//--------------------------------------------------------------
$defINPUT = array($defPRECONDITION,$defCONCLUSION,$defJUSTIFICATION,$defPROOFSTEP)
$defID    = array($PreconditionID,$ConclusionID,$SelectedPreconditionID,$ProofStepID)
$defSTEP  = array($Precondition,$Conclusion,$SelectedPrecondition,$ProofStep)

$max_k = count($defINPUT) - 1
for ($k=0..$max_k) {
  if ($defINPUT[$k] != "") {
    $inStudentAnswer[$k] = str_replace(",","\n",$defINPUT[$k])
    $vLineSplit = listtoarray($defINPUT[$k])
    $max_i = count($vLineSplit) - 1
    for ($i=0..$max_i) { 
      if (stringpos("#__co__#",$vLineSplit[$i]) >0 ) {
        $qi++
        $vLineSplit[$i] = str_replace("#__co__#",",",$vLineSplit[$i]) 
        $vStepRecord = listtoarray($vLineSplit[$i])
        $inID = $vStepRecord[0] 
        $inSTEPDEF = $vStepRecord[1] 
        $inSTEPDEF  = str_replace("__math__","`",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__eq__","=",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__gt__",">",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__lt__","<",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__qu__","\"",$inSTEPDEF)
        //$inSTEPDEF  = str_replace("__ap__","\'",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__ap__","'",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__ae__","√§",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__oe__","√∂",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__ue__","√º",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__AE__","√�'",$inSTEPDEF)   
        $inSTEPDEF  = str_replace("__OE__","O",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__UE__","√ú",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__sz__","√ü",$inSTEPDEF)
        $inSTEPDEF  = str_replace("#_co_#",",",$inSTEPDEF)
        $found_j = -1
        if ($inID != "") {
          $found_j = arrayfindindex($inID,$defID[$k]) 
        }
        if ($found_j > 0) {
          $defSTEP[$k][$found_j] = $inSTEPDEF
        }
      }
    }
  } else {
    $inStudentAnswer[$k] = ""
  }
}
//--------------------------------------------------------------
//------END: Overwrite StepDefs from Input
//--------------------------------------------------------------
//$inStudentAnswers = "=>#__co__#S1#__co__#J1#_co_#J2#_co_#J3,subset#__co__#S2#__co__#J2#_co_#J3,S3 ohne ID"
//--------------------------------------------------------------
//-------ALL IDs -----------------------------------------------
//--------------------------------------------------------------
$preAllID    = mergearrays(array("-???-"),$defID[0])
$preAllStep  = mergearrays(array("-???-"),$defSTEP[0])
$postAllID   = mergearrays($defID[3],$defID[1])
$postAllStep = mergearrays($defSTEP[3],$defSTEP[1])
$AllID   = mergearrays($preAllID,$postAllID)
$AllStep = mergearrays($preAllStep,$postAllStep)
$AllJustificationsID   = mergearrays($AllID,$defID[2])
$AllJustificationsStep = mergearrays($AllStep,$defSTEP[2])
//--------------------------------------------------------------
//------SPLIT STUDENT ANSWER------------------------------------
//--------------------------------------------------------------
$qi = 0
$QuestionStep[$qi] = "" //"Step $i"
$QuestionStepID[$qi] = "" //"ID$i"
$QuestionStepIndex[$qi] = 0 // $i
$QuestionConnectionTAG[$qi] = "" //"C$i"
$QuestionPreconditionArray[$qi] = array() //array("J1","J2")
$QuestionPreconditionIndex[$qi] = array() //array(1,2)
$QuestionPreconditionText[$qi]  = array() 
$qi = 0
$vLineSplit = listtoarray($inStudentAnswers)
$max_i = count($vLineSplit) - 1
for ($i=0..$max_i) { 
   //$ErrorHTML .= $vLineSplit[$i]."<br/>"
   if (stringpos("#__co__#",$vLineSplit[$i]) >0 ) {
     $qi++
     $vLineSplit[$i] = str_replace("#__co__#",",",$vLineSplit[$i]) 
     $vStepRecord = listtoarray($vLineSplit[$i])
     $inConnection = $vStepRecord[0] 
     $inID = $vStepRecord[1] 
     //$inJustifications = $vStepRecord[2] 
     $inJustifications = str_replace(" ","",$vStepRecord[2]) 
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
     $QuestionConnectionTAG[$qi] = $inConnection 
     $QuestionStepID[$qi]        = $inID
     $QuestionStep[$qi]          = $inStepDef
  }
} 
//----------------------------------------------------------
//---------HEADER STUDENT ANSWER----------------------------
//----------------------------------------------------------
$vUpdateButton = "<input type='button' name='bUpdate".$vQID."' value=' Update ' onclick=\"updateInput2IMathAS(this.form)\">"
$vHelpButton = "<input type='button' name='bHelp".$vQID."' value=' Hilfe zur Eingabe ' onclick=\"toggleHide('HELP".$vQID."')\">"
$vLink_Screencast = "http://e-proof.weebly.com/german-tutorials.html"
$vLink_Tutorial   = "http://math.uni-landau.de/download/IMathAS/eProof_iMathAS_Tutorial.pdf"

//----Step Count Selector ---------
$StepCountSelectorHTML = ""
$StepCountSelectorHTML .= "<SELECT class='sSTEPCOUNT".$vQID."'  id='sSTEPCOUNT".$vQID."' onchange=\"updateStepCount(this.value)\">"
//$StepCountSelectorHTML .= "<SELECT class='sSTEPCOUNT".$vQID."'  id='sSTEPCOUNT".$vQID."' onchange=\"setNumberOfSteps()\">"
//$StepCountSelectorHTML .= "<SELECT class='sSTEPCOUNT".$vQID."'  id='sSTEPCOUNT".$vQID."' >"
$maxNr = count($Precondition) + count($Conclusion) + count($ProofStep) -1
for ($vNr=1..$maxNr) {
  if ($vNr == $maxNr) {
    $StepCountSelectorHTML .="<option class='STEPCOUNT' value='".$vNr."' selected>".$vNr."</option>"
  } else {
    $StepCountSelectorHTML .="<option class='STEPCOUNT' value='".$vNr."'>".$vNr."</option>"
  }
}
$StepCountSelectorHTML .="</SELECT>"
//------------STUDENT ANSWER-HEADER------------------
$vContent = "<hr/>"
$vContent .= "<table align=\"center\"><tbody><tr>"
$vContent .= "<td><b>" .$STR_Number_of." ".$STR_ProofSteps.":</b></td>"
//------------sSTEPCOUNT--------------
$vContent .= "<td>" . $StepCountSelectorHTML . "</td>"
//$vContent .= "<td>" . vUpdateButton ."</td>"
$vContent .= "<td>" . $vHelpButton ."</td>"
if ($show_links > 0) {
  $vContent .= "<td>"
  $vContent .= "<a href=\"".$vLink_Tutorial."\" target=\"_blank\">PDF-Tutorial</a>"
  $vContent .= "</td>"
}
$vContent .= "</tr><tr>"
$vContent .= "</tr><tr>"
$vContent .= "<td><b>" .$STR_Display." ".$STR_Proof.":</b>"
$vContent .= "<td><SELECT id='sDISPLAYOPTION".$vQID."' onchange=\"setVisibility4Proof(this.value,this.form)\">"
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
$vContent .= "</tr></tbody></table><hr/>"
$StudentAnswerHeader = $vContent

//----------------------------------------------------------
//---------STUDENT ANSWER LIST------------------------------
//----------------------------------------------------------
//-----CONST STUDENT ANSWER LIST-----
$vCount = count($AllID) - 1 
$vSpace =  " &nbsp;&nbsp; "
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
  $RAW_Text  = str_replace("√§","__ae__",$RAW_Text)
  $RAW_Text  = str_replace("√∂","__oe__",$RAW_Text)
  $RAW_Text  = str_replace("√º","__ue__",$RAW_Text)
  $RAW_Text  = str_replace("√�'","__AE__",$RAW_Text)   
  $RAW_Text  = str_replace("O","__OE__",$RAW_Text)
  $RAW_Text  = str_replace("√ú","__UE__",$RAW_Text)
  $RAW_Text  = str_replace("√ü","__sz__",$RAW_Text)
  $RAW_Text  = str_replace("\n","__n__",$RAW_Text)
  $AllStepRAW[$k] = $RAW_Text
}
//-------------------------------------------
//--------STUDENT ANSWER TEMPLATE------------
//----JUSTIFICATION-TEMPLATE CHECKBOX--------  
$getJustificationCheckboxHTML = ""
$vName = "sJUSTIFICATION".$vQID."__vNr__"
$getJustificationCheckboxHTML .= "\n<b>".$STR_Justifications.": [</b><b class='VIEWID".$vQID."__vNr__' id='cVIEW".$vQID."__vNr__'>??ID??</b><b>]</b>"
$getJustificationCheckboxHTML .= "\n<input type='button'  value='  OK  ' step='__vNr__' name='bOK".$vQID."__vNr__' onclick=\"toggleJustification(__vNr__)\" ><br/>"
$max_i = count($AllJustificationsID) - 1
for ($i=1..$max_i) {
  $vID = $AllJustificationsID[$i]
  $vStepDef = $AllJustificationsStep[$i]
  $getJustificationCheckboxHTML .= "\n<DIV class='checkboxJUSTIFICATION".$vQID."' id='checkboxJUSTIFICATION".$vQID."__vNr__-".$vID."'>"
  $getJustificationCheckboxHTML .= "\n<input type='checkbox' class='".$vName."' name='".$vName."-".$vID."' step='__vNr__' id='".$vName."-".$vID."' value='".$vID."' onchange=\"updateJustifications(__vNr__)\" /> "
  $getJustificationCheckboxHTML .= "[".$vID."] ".$vStepDef."</DIV>"
}
//-------------------------------------------
//--------STUDENT ANSWER LIST----------------
//-------------------------------------------
//$maxSteps = 5
//$vContent  = "imathSTEPCOUNT=".$imathSTEPCOUNT."<br/>" 
$vContent  = "" 
$vContent .= "\n<DIV class='STUDENTANSWERLIST".$vQID."' id='STUDENTANSWERLIST".$vQID."'>"
$vSteps_Unused = 0
for ($vNr=1..$vCount) {
  //----SET STUDENT ANSWER----------------------------
  $Q_StepID = $QuestionStepID[$vNr]
  $found_j = arrayfindindex($Q_StepID,$AllID) 
  $Q_StepDefRAW = "[".$Q_StepID."] is undefined!"
  $Q_StepDef = $Q_StepDefRAW
  if ($found_j > 0) {
    $Q_StepDefRAW = $AllStepRAW[$found_j]
    $Q_StepDef = $AllStep[$found_j]
  }
  $Q_ConnectionTAG      = $QuestionConnectionTAG[$vNr]
  $Q_Justification_List = arraytolist($QuestionPreconditionArray[$vNr])  
  //----COUNT HIDE-SHOW----------------------
  $vHideShowCount = "style=\"visibility:hidden\""
  $vHideShowRedCount = "style=\"visibility:hidden;color:red\""
  $vShowHideCount = ""
  if ($vNr <= $imathSTEPCOUNT) {
    $vHideShowCount = ""
    $vHideShowRedCount = "style=\"color:red\""
    $vShowHideCount = "style=\"visibility:hidden\""
  }
  //---Begin: STUDENTANSWER---------------------------
  $vContent .= "\n<DIV class='STUDENTANSWER".$vQID."' id='STUDENTANSWER".$vQID.$vNr."' step='".$vNr."' >"
  //----Begin: EDIT_STUDENTANSWER---------------------
  $vContent .= "\n<DIV class='editSTUDENTANSWER".$vQID."' id='editSTUDENTANSWER".$vQID.$vNr."'>"
  //$vContent .= str_replace("__vNr__","".$vNr."",$setStepPositionHTML)
  //-----POSITION---------
  $vName = "sPOSITION".$vQID
  $vContent .= "\n<SELECT step='".$vNr."' class='".$vName."' id='".$vName.$vNr."' onchange=\"moveStepOrder(".$vNr.",this.value,".$vCount.")\">"
  for ($vPos=1..$vCount) {
    if ($vPos != $vNr) {
      $vContent .= "\n<OPTION VALUE='".$vPos."'>".$vPos."</OPTION>"
    } else {
      $vContent .= "\n<OPTION VALUE='".$vPos."' selected='selected'>".$vPos."</OPTION>"
    }
  }
  $vContent .= "\n</SELECT>";
  //-----[+]-Button---------
  $vContent .= "\n<input type='button' class='bUseStep".$vQID."' step='".$vNr."'  id='bUseStep".$vQID.$vNr."' value=' + ' onclick=\"appendStep(".$vNr.")\" ".$vShowHideCount." />" 
  //$vContent .= setStepConnection($vNr,$vCount)
  //$vContent .= str_replace("__vNr__","".$vNr."",$setStepConnectionHTML)
  //---CONNECTION-----------
  $vName = "sCONNECTION".$vQID
  $vContent .= "<SELECT class='".$vName."' step='".$vNr."' id='".$vName.$vNr."'  onchange=\"updateStep(".$vNr.")\" ".$vHideShowCount.">"
  $max_con = count($StepConnection)-1
  for ($con=0..$max_con) {
    if ($Q_ConnectionTAG == $StepConnectionTAG[$con]) {
      $vContent .= "\n<option value='".$con."' selected='selected'>`".$StepConnection[$con]."`</option>"
    } else {
      $vContent .= "\n<option value='".$con."'>".$StepConnection[$con]. "</option>"
    }
  }
  $vContent .= "\n</SELECT>"
  //-----[EDIT]-Button---------
  $vHideShow = "style=\"display:none\""
  if ($vNr <= $imathSTEPCOUNT) {
    if (($AuthoriungMode>0) || (stringpos("MY","#".$QuestionStepID[$vNr]) > 0)) {
      $vHideShow = "style=\"display:block\""
    }
  }
  $vContent .= "\n<input type='button' class='bEdit".$vQID."' step='".$vNr."'  id='bEdit".$vQID.$vNr."' value=' EDIT ' onclick=\"toggleEdit(".$vNr.")\" ".$vHideShowCount."/>"
  //---VIEWID----
  //$vContent .= "\n <b>[</b><b class='VIEWID".$vQID.$vNr."' id='outVIEWID".$vQID.$vNr."'>".$Q_StepID."</b><b>]</b> "
  //----STEP DEFINITION ID-----
  $vName = "sSTEP".$vQID
  $vContent .= "\n<SELECT step='".$vNr."' class='".$vName."' id='".$vName.$vNr."' onchange=\"moveStepID(".$vNr.",this.value,".$vCount.")\" ".$vHideShowCount.">"
  for ($i=1..$vCount) {
    $iID = $AllID[$i]
    if ($Q_StepID != $iID) {
      $vContent .= "\n<option class='OPTION_".$iID."' value='".$iID."'>".$iID."</option>"
    } else {
      $vContent .= "\n<option class='OPTION_".$iID."' value='".$iID."' selected='selected'>".$iID."</option>"
    }
  }
  $vContent .= "\n</SELECT>"
  //----[ID] inSTEPID------
  $vContent .= "\n<input class=\"inSTEPID".$vQID."\" type='text' size='3'  step='".$vNr."' id='inSTEPID".$vQID.$vNr."'  value=\"".$Q_StepID."\" style='display:none' />" // style='display:none' style='visibility:hidden'
  //----[X] DELETE------
  //$vContent .= "\n<input type='button' class='bDelete".$vQID."' step='".$vNr."'  id='bDelete".$vQID.$vNr."' value=' X ' onclick=\"deleteProofStep(".$vNr.",".$vCount.")\" ".$vHideShowRedCount."/>"
  //---------------------------------------
  //----2 CheckBox-Justification-----------
  $vName = "cVIEWJUSTIFICATION".$vQID
  $vContent .= "\n<input type='checkbox' class='".$vName."' name='".$vName.$vNr."' step='".$vNr."' id='".$vName.$vNr."' value='VIEW' onchange=\"changeViewJustification(".$vNr.")\" checked='checked' style='display:none'/> " // style='visibility:hidden'
  //$vContent .= "\nEDIT "
  $vName = "cEDITJUSTIFICATION".$vQID
  $vContent .= "\n<input type='checkbox' class='".$vName."' name='".$vName.$vNr."' step='".$vNr."' id='".$vName.$vNr."' value='EDIT' onchange=\"changeViewJustification(".$vNr.")\" style='display:none' /> " //style='display:none'
  //------JUSTIFICATION----------------------
  $vContent .= "\n<input type='button' class='bJUSTIFICATION".$vQID."' step='".$vNr."'  id='bJUSTIFICATION".$vQID.$vNr."' value='". $STR_Justifications."' onclick=\"toggleJustification(".$vNr.")\" />"
   //joinarray(array,symbol)
  $vContent .= "\n<input type='text' size='15' class='inJUSTIFICATION".$vQID."' step='".$vNr."' id='inJUSTIFICATION".$vQID.$vNr."' value='".$Q_Justification_List."' onchange=\"changeEditJustification(".$vNr.")\" ".$vHideShowCount."/>"
  //$vContent .= "\n<input class=\"inSTEPID".$vQID."\" type='text' size='3'  step='".$vNr."' id='inSTEPID".$vQID.$vNr."'  value=\"".$AllID[$vNr]."\" style='display:none' />" // style='display:none' style='visibility:hidden'
  $vContent .= "\n<input class=\"STEP".$vQID."\" type='text' size='3'  value='".$vNr."' id='STEP".$vQID.$vNr."' style='display:none' />" // style='display:none' style='visibility:hidden'
  //----Begin: STEPEDITOR------------------
  $vContent .= "\n<DIV class='STEPEDITOR".$vQID."' id='STEPEDITOR".$vQID.$vNr."' style='display:none'>" 
  $vContent .= "\n<textarea rows='9' class=\"". $vEditorID.$vQID. "\" id='". $vEditorID.$vQID.$vNr."' style='width:98%'  onkeyup=\"updateTextarea(".$vNr.")\" ></textarea>"
  $vContent .= "\n<input class=\"inSTEPDEF".$vQID."\" type='text' size='92' step='".$vNr."' id='inSTEPDEF".$vQID.$vNr."'  value=\"".$Q_StepDefRAW."\"  onchange=\"updateStepEdit(".$vNr.")\" style='display:none'/>"
  $vContent .= "\n <br/>".$vUpdateButton."</DIV>"
  //----End: STEPEDITOR--------------------
  //----End:   EDIT_STUDENTANSWER-----------------
  $vContent .= "\n</DIV>"
  //----Begin: DISPLAY_STUDENTANSWER--------------
  //$vContent .= "\n<DIV class='displaySTUDENTANSWER".$vQID."' id='displaySTUDENTANSWER".$vQID.$vNr."'>"
  //----outSTEP---------------------
  $vContent .= "\n<DIV class='outIDandSTEP".$vQID."' id='outIDandSTEP".$vQID.$vNr."'>"
  $vContent .= "\n<OUTSTEP class='outSTEP".$vQID."' id='outSTEP".$vQID.$vNr."' style='display:none'>"
  $vContent .= "\n(".$vNr.") ".$vSpace
  $vContent .= "\n`???` ". $vSpace ."[".$Q_StepID."] ".$Q_StepDef
  $vContent .= "\n</OUTSTEP>"
  //$vContent .= str_replace("__vNr__","".$vNr."",$getStepDiplayHTML)
  //--------------------------------
  //----Begin: STEP-DISPLAY-HTML----
  $vCellWidth = "40px"
  $vContent .= "\n<table width='95%' border='0'><tr><td valign='top'  width='".$vCellWidth."'>"
  $max_i = count($AllID) - 1
  $vName = "outSTEPDISPLAY".$vQID.$vNr
  if ($Q_JustificationList != "") {
    $vContent .= "\n<u>".$STR_Justifications.":</u> [<OUTTEXT class='VIEWID".$vQID.$vNr."' id='cVIEW".$vQID.$vNr."'>".$Q_StepID."</OUTTEXT>]"
  }
  for ($i=1..$max_i) {
    $vID = $AllJustificationsID[$i]
    $vStepDef = $AllJustificationsStep[$i]
    $vHideShow = "style=\"display:none\""
    if ($i == $vNr) {
      $vHideShow = "style=\"display:block\""
      $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-POS-".$i."' ".$vHideShow." >(".$i.")</OUTTEXT>"
    }
    //$vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-POS-".$i."' ".$vHideShow." >(".$i.")</OUTTEXT>"
  }
  $vContent .= "\n</td><td valign='top' align='center' width='".$vCellWidth."'>"
  $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-NA' style=\"display:none\">`???`</OUTTEXT>"
  $max_i = count($StepConnectionTAG) - 1
  for ($i=0..$max_i) {
    $vHideShow = "style=\"display:none\""
    if ($StepConnectionTAG[$i] == $QuestionConnectionTAG[$vNr]) {
      $vHideShow = "style=\"display:block\""
      $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-".$i."' ".$vHideShow." >`".$StepConnectionTAG[$i]."`</OUTTEXT>";
    }
    //$vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-CON-".$i."' ".$vHideShow." >`".$StepConnectionTAG[$i]."`</OUTTEXT>";
  }
  $vContent .= "\n</td><td valign='top' align='left'>"
  $max_i = count($AllID) - 1
  for ($i=1..$max_i) {
    $vID = $AllID[$i]
    $vStepDef = $AllStep[$i]
    $vHideShow = "style=\"display:none\""
    if ($Q_StepID == $vID) {
      $vHideShow = "style=\"display:block\""
      $vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-STEP' ".$vHideShow." >[".$vID."]&nbsp; ".$vStepDef." </OUTTEXT>"
    }
    //$vContent .= "\n<OUTTEXT class='".$vName."' id='".$vName."-STEP-".$vID."' ".$vHideShow." >[".$vID."]&nbsp; ".$vStepDef." </OUTTEXT>"
  }
  $vContent .= "\n</td></tr></table>"
  //----End: STEP-DISPLAY-HTML------
  //--------------------------------
  $vContent .= "\n</DIV>"
  //---LIST of JUSTIFICATION---------
  //$vContent .= "\n<CENTER>"
  $vContent .= "\n<DIV class='dVIEWJUSTIFICATION".$vQID."' id='dVIEWJUSTIFICATION".$vQID.$vNr."' style='display:none' >"
  //$vContent .= str_replace("__vNr__","".$vNr."",$getJustificationHTML)
  $vContent .= "\n<UL>"
  $max_i = count($AllJustificationsID) - 1
  for ($i=1..$max_i) {
    $vID = $AllJustificationsID[$i]
    $vStepDef = $AllJustificationsStep[$i]
    $vHideShow = "style=\"display:none\""
    if (stringpos(",".$vID.",","#,".$Q_JustificationList.",#") > 0) {
      $vHideShow = "style=\"display:block\""
      $vContent .= "\n<li class='outJUSTIFICATION".$vQID.$vNr."' id='outJUSTIFICATION".$vQID.$vNr."-".$vID."' stepid='".$vID."' ".$vHideShow.">[".$vID."] ".$vStepDef."</li>"
    }
    //$vContent .= "\n<li class='outJUSTIFICATION".$vQID.$vNr."' id='outJUSTIFICATION".$vQID.$vNr."-".$vID."' stepid='".$vID."' ".$vHideShow.">[".$vID."] ".$vStepDef."</li>"
  }
  $vContent .= "\n</UL>"

  $vContent .= "\n</DIV>"
  $vContent .= "\n<DIV class='dEDITJUSTIFICATION".$vQID."' id='dEDITJUSTIFICATION".$vQID.$vNr."' style='display:none' >"
  $vContent .= str_replace("__vNr__","".$vNr."",$getJustificationCheckboxHTML)
  $vContent .= "\n</DIV>"
  //$vContent .= "\n</CENTER>"
  //------------------------------
  //$vContent .= "\n</DIV>"
  //----End: DISPLAYSTUDENTANSWER----------------
  $vContent .= "\n</DIV>"
  //---END: STUDENTANSWER------------------------
  //if ($vNr == $maxSteps) {
  if ($vNr == $imathSTEPCOUNT) {
     $vContent.="</DIV>\n"
     $vContent.="<hr/> \n"
     $vContent.="<input type='button' class='ToggleUnused".$vQID."' id='bToggleUnused".$vQID."' value=\" $STR_Deleted_ProofSteps \"  onclick=\"toggleHide('UNUSEDSTEPS".$vQID."')\" style='visibility:hidden'/>\n"
     $vContent.="<DIV class=\"UNUSEDSTEPS".$vQID."\" id=\"UNUSEDSTEPS".$vQID."\" style=\"display:none\">\n"
  }  
}
$vContent .= "\n</DIV>"
$StudentAnswerList = $vContent
//----END: StudentAnswerList----------------------------------
