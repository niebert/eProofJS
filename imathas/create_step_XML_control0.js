//-CONTROL:Student-Input/Suggestions
//-Q-TEXT:Theorem,Javascript e-Proof-StudentAnswer

//if (($show_XML + $AuthoringMode) > 0) {
$StepDefXML  = "<b>XML-Export e-Proof:</b><br/><textarea name='StepExport' rows=10 cols=90 wrap='off'>"
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
$StepDefXML="<div class=\"pSETTINGS\"  hidden >"
$StepDefXML.="<div class=\"SETTINGLIST\" id=\"SETTINGLIST\">"
$StepDefXML.="  <div class=\"SETTING\" id=\"Theorem_Title\">".$TextArray[0]."</div>"
$StepDefXML.="  <div class=\"SETTING\" id=\"Theorem_Appendix\">".$TextArray[1]."</div>"
//------------------------------------------
if ($unnecessary_preconditions>0) {
     $STR_insert = "$unnecessary_preconditions"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"unnecessary_preconditions\">".$STR_insert."</div>"
if ($unnecessary_proofsteps>0) {
	$STR_insert = "$unnecessary_proofsteps"
} else {
	$STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"unnecessary_proofsteps\">".$STR_insert."</div>"
if ($unnecessary_connections>0) {
     $STR_insert = "$unnecessary_connections"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"unnecessary_connections\">".$STR_insert."</div>"
if ($selectbox_proofsteps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"selectbox_proofsteps\">".$STR_insert."s</div>"
if ($allow_own_proofsteps >0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"allow_own_proofsteps\">".$STR_insert."</div>"
if ($remap_proofstep_IDs>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"remap_proofstep_IDs\">".$STR_insert."s</div>"
if ($randomize_proofstep_IDs>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"randomize_proofstep_IDs\"".$STR_insert."</div>"
if ($show_links>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"show_links\">".$STR_insert."</div>"
if ($show_feedback_score>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"show_feedback_score\">".$STR_insert."</div>"
if ($show_proof_solution>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"show_proof_solution\">".$STR_insert."</div>"
if ($AuthoringMode>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"AuthoringMode\">".$STR_insert."</div>"
if ($max_input_steps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"max_input_steps\">".$STR_insert."</div>"
if ($max_authoring_steps>0) {
     $STR_insert = "1"
} else {
     $STR_insert = "0"
}
$StepDefXML.="  <div class=\"SETTING\" id=\"max_authoring_steps\">".$STR_insert."</div>"
$StepDefXML.="  <div class=\"SETTING\" id=\"CODE_ID_I\">".$qid_import1."</div>\n"
$StepDefXML.="  <div class=\"SETTING\" id=\"CODE_ID_II\">".$qid_import2."</div>\n"
$StepDefXML.="  <div class=\"SETTING\" id=\"CODE_ID_III\">".$qid_import3."</div>\n"
$StepDefXML.="</div>"
$vNameXML = array("PRECONDITION","CONCLUSION","JUSTIFICATION","PROOFSTEP")
$vID_XML = array($PreconditionID,$ConclusionID,$SelectedPreconditionID,$ProofStepID)
$vStep_XML = array($Precondition,$Conclusion,$SelectedPrecondition,$ProofStep)
$max_k = count($vNameXML) - 1
for ($k=0..$max_k) {
	 $max_i = count($vID_XML[$k])-1
	 $StepDefXML .= "  <div class='".$vNameXML[$k]."LIST' id='".$vNameXML[$k]."LIST'>\n"
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
		$StepDefXML .= "    <div class='"..$vNameXML[$k].."' id='".$vID_XML[$k][$i]."'>".$XML_Text." </div>\n"
	 }
	 $StepDefXML .= "  </div>\n"
}
//-------------------------------
if (($show_feedback_score + $Authoring_Mode)>0) {
   $StepDefXML .= "  <div class='SOLUTIONLIST' id='SOLUTIONLIST'>\n"
   $max_so = count($SolutionStep)-1
   //---LOOP over Solution---- 
   $Used_IDs = array("???")
   $Previous      = ""
   $Real_Previous = ""
   $XML_ID        = ""
   for ($so=0..$max_so) {
       //-------
       $vNr = $so+1
       //---LOOP for Justifications----
       $XML_Previous = $Next_Previous
       for ($i_just=3..4) {  
          //-----
          $j_ID =  $i_just - 3
          $JustificationID[$j_ID ] = ""
          $Komma = ""
          $maxj = count($SolutionStep[$so][$i_just])-1 
          //---LOOP over IDs-----
          for ($j=0..$maxj) {
             if ($SolutionStep[$so][$i_just][$j] != "") {
                $JustificationID[$j_ID] .= $Komma.$SolutionStep[$so][$i_just][$j]
                $Komma = ","
             }
          }
          //-----
       }  // Justifications and Optional Justification generated
       //-------Set <STEPDEF .... for PROOFSTEP_OPTIONS
       $XML_Previous   = $SolutionStep[$so][0]
       $XML_ID         = $SolutionStep[$so][1]
       $XML_Connection = $SolutionStep[$so][2]
       $XML_Connection  = str_replace("=","__eq__",$XML_Connection)
       $XML_Connection  = str_replace(">","__gt__",$XML_Connection)
       $XML_Connection  = str_replace("<","__lt__",$XML_Connection)
       if ($so > 0) {
           //----Add a LINK_NODE if Previous and Real Previous do NOT match-----
           if ($XML_Previous != $Real_Previous) {
              $StepDefXML .= "    "
              $StepDefXML .= "<DIV class='SOLUTION_".$XML_Previous."' previous='' stepid='".$XML_ID."' id='SOLUTION_".$vNr."' connection='_LINK_NODE_' just='' optjust='' VALUE='' />\n"
           }
       } 
       $Real_Previous = $XML_ID
       $XML_Step     = ""
       //$vID_Array = diffarrays($AllID_Search,$PreConJustID)
       //$vID_Array = mergearrays($vID_Array,$Used_IDs)
       $vID_Array = mergearrays($PreConJustID,$Used_IDs)
       $ID_List = "#ID#,".arraytolist($vID_Array).",#"
       $Used_List = "#USED#,".arraytolist($Used_IDs).",#"
       //$vFound =  arrayfindindex($XML_ID,$vID_Array)
       $vFound = stringpos(",".$XML_ID.",",$Used_List)
       //$ErrorHTML = "Found=".$vFound." XML-ID=".$XML_ID." Used-List=".$Used_List."<hr/>"
       //if ($vFound >= 0) { 
       //    $XML_Step = ""
       //} else {
           $ID_Found =  arrayfindindex($XML_ID,$AllID_Search)
           if ($ID_Found >= 0) {
               $XML_Step = $AllStep_Search[$ID_Found]
           } else {
               $XML_Step = "---Step $XML_ID is undefined---"
           }
       //}
       $XML_Step  = str_replace("`","__math__",$XML_Step)
       $XML_Step  = str_replace("=","__eq__",$XML_Step)
       $XML_Step  = str_replace(">","__gt__",$XML_Step)
       $XML_Step  = str_replace("<","__lt__",$XML_Step)
       $XML_Step  = str_replace("\"","__qu__",$XML_Step)
       $XML_Text  = str_replace("\'","__ap__",$XML_Text)
       $XML_Text  = str_replace("'","__ap__",$XML_Text)
       $XML_Step  = str_replace("ä","__ae__",$XML_Step)
       $XML_Step  = str_replace("ö","__oe__",$XML_Step)
       $XML_Step  = str_replace("ü","__ue__",$XML_Step)
       $XML_Step  = str_replace("Ä","__AE__",$XML_Step)   
       $XML_Step  = str_replace("O","__OE__",$XML_Step)
       $XML_Step  = str_replace("Ü","__UE__",$XML_Step)
       $XML_Step  = str_replace("ß","__sz__",$XML_Step)
       //--------------
       $StepDefXML .= "    <SOLUTION class='SOLUTION_".$XML_ID."' previous='".$XML_previous."' "
       $StepDefXML .= " id='SOLUTION_".$vNr."' connection='". $XML_Connection."' "
       $StepDefXML .= "just='".$JustificationID[0]."' optjust='".$JustificationID[1]."'>"
       $StepDefXML .= $XML_Step."'<div/>\n"
       //-----ID LIST---------
       //$StepDefXML .= $ID_List."\n"
       //$StepDefXML .= $Used_List."\n"
       //---------------------
       $u_id = count($Used_IDs)
       $Used_IDs[$u_id] = $XML_ID
       //---------------------       
   }
   //--------------
   }
   $StepDefXML .= "  </div>\n"
   //--------------------------------
   $StepDefXML .= "</div>\n"
   $StepDefXML .= "</textarea>"
}