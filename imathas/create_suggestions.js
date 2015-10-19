//---------------------------------
//----CREATE SUGGESTIONS HTML------
//----------------------------------
$Possible_ProofStepsID    = array()
$Possible_ConnectionsID   = array()
$Possible_SolutionIndex   = array()
$Possible_PreconditionsID = array()
//----Set first Component---
$i=0
$Possible_ProofStepsID[$i]    = array()
$Possible_ConnectionsID[$i]   = array()
$Possible_SolutionIndex[$i]   = array()
$Possible_PreconditionsID[$i] = array()
$new_Step=0
//------Collect all StartIDs--------
for ($so=0..$SolutionCount) {
    //-----Is previous Step in Solution == Current Step-----
    if (($SolutionStep[$so][0] == " ") || ($SolutionStep[$so][2] == "Typ")) {
         //--- if YES add the SolutionStepID to Possible Step
         $Possible_ProofStepsID[$i][$new_Step] = $SolutionStep[$so][1]
         // diffarrays(array1,array2): Returns all elements in array1 that are not also in array2
         $TempArray = diffarrays($Possible_PreconditionsID[$i],array(" ")) //unionarrays() diff
         $Possible_PreconditionsID[$i] = unionarrays($TempArray,$CorrectPreconArray[$so])
         $Possible_ConnectionsID[$i][$new_Step] = $SolutionStep[$so][2]
         $Possible_SolutionIndex[$i][$new_Step] = $so
         $new_Step++
    }
}
// $ErrorHTML .= "Possible ConnectionID Step0: [".arraytolist($Possible_ConnectionsID[$i])."] <hr/>"
//------Collect all linked steps for ProofSteps 2,3,...
for ($i=1..$maxSteps) {
    $Possible_ProofStepsID[$i]    = array()
    $Possible_ConnectionsID[$i]   = array()
    $Possible_SolutionIndex[$i]   = array()
    $Possible_PreconditionsID[$i] = array()
    $new_Step=0
    for ($so=0..$SolutionCount) {
         //-----Is previous Step in Solution == Current Step-----
         if ($SolutionStep[$so][0] == $QuestionStepID[$i]) {
              //--- if YES add the SolutionStepID to Possible Step
              $Possible_ProofStepsID[$i][$new_Step] = $SolutionStep[$so][1]
              // diffarrays(array1,array2): Returns all elements in array1 that are not also in array2
              $TempArray = diffarrays($Possible_PreconditionsID[$i],array(" ")) //unionarrays() diff
              $Possible_PreconditionsID[$i] = unionarrays($TempArray,$SolutionStep[$so][3])
    	      $Possible_ConnectionsID[$i][$new_Step] = $SolutionStep[$so][2]
    	      $Possible_SolutionIndex[$i][$new_Step] = $so
    	      $new_Step++
         }
    }
    //-------If No Possible Steps use Start-IDs------------------
    if (count($Possible_ProofStepsID[$i]) == 0) {
       if ($QuestionStepID[$i-1] != "") {
           $Possible_ProofStepsID[$i] = $Possible_ProofStepsID[0]
       }
    }
    //$ErrorHTML .= "Possible ConnectionID Step".$i.": [".arraytolist($Possible_ConnectionsID[$i])."] <hr/>"
}
//-----------Add False Steps, Connections and Justifications
$vUnnecessary = array($unnecessary_proofsteps, $unnecessary_preconditions, $unnecessary_connections)
$vSource_ID_Array = array($ProofStepID,$AllID,$StepConnectionTAG) 
$vDestination_ID_Array = array($Possible_ProofStepsID,$Possible_PreconditionsID,$Possible_ConnectionsID) 
for ($i=0..$maxSteps) {
    for ($ai=0..2) {
       $Source_Array = $vSource_ID_Array[$ai]
       $max_false = count($Source_Array)-1
       $Possible_Array = $vDestination_ID_Array[$ai][$i]
       $false_count = $vUnnecessary[$ai]       
       if ($ai==0) {
            //------ProofSteps-----
            // $ProofStepID[$i_F] = "S4_F1"
            // $FalseStep4ID[$i_F] = $vFalse4ID = "S4"
            $f_count = 0
            $Found_False_ID = array()
            $max_F = count($FalseStep4ID) - 1
            for ($i_F=0..$max_F) {
               $ID_F = $FalseStep4ID[$i_F]
               $ArrayString = "#,".arraytolist($Possible_Array).",#"
               $vFoundFalse = stringpos(",".$ID_F.",",$ArrayString)
               if ($vFoundFalse > 0) {
                   if ($false_count > 0) {
                       $pa = count($Possible_Array)
                       $Possible_Array[$pa] = $ProofStepID[$i_F]
                       $Found_False_ID[$f_count] = $ProofStepID[$i_F]
                       $f_count++
                   }
               }
            }
           //$ErrorHTML .= "False IDs Step".$i.": [".arraytolist($Found_False_ID)."] <hr/>"
       }
       if ($max_false>0) {
          $False_Index = rands(0,$max_false,$false_count)
       } else {
          $False_Index = array()
       }
       $max_k = count($False_Index)-1
       $False_ID = array()
       for ($k=0..$max_k) {
          $False_ID[$k] = $Source_Array[$False_Index[$k]]
       }
       $Union_ID = unionarrays($Possible_Array,$False_ID)
       $Union_Index = array()
       $max_u = count($Union_ID)-1 
       for ($u=0..$max_u) {
           $Union_Index[$u] = arrayfindindex($Union_ID[$u],$Source_Array)
       }
       sortarray(array_unique($Union_Index))
       $max_u = count($Union_Index)-1 
       $Union_ID = array()
       for ($u=0..$max_u) {
           $Union_ID[$u] = $Source_Array[$Union_Index[$u]]
       }
       $vDestination_ID_Array[$ai][$i] = $Union_ID
    }
}
$Possible_ProofStepsID    = $vDestination_ID_Array[0]
$Possible_PreconditionsID = $vDestination_ID_Array[1]
$Possible_ConnectionsID   = $vDestination_ID_Array[2]
//$Possible_ConnectionsID[0] = array("Typ"," ")
//-----------------------------------------------
//------Possible_ProofStepsIDHTML----------------
$Suggestion_Array = array()
$vHTML = "<table border=0  width='98%'>"
$iBegin = 0
if ($maxSteps > 0) {
   $iBegin = $maxSteps - 1
}
for ($i=$iBegin..$maxSteps) {
   $vNr = $i+1
   if ($QuestionStepID[$i+1]!="") {
     //------Answer exists for Proof Step----------------
     $Suggestion_Array[$i] .= "[".$QuestionStepID[$i+1]."] ".$QuestionStep[$i+1]."<br/>"
     $vArrayID  = sortarray(array_unique($Possible_PreconditionsID[$i]))
     $max_c = count($vArrayID) - 1
     $Suggestion_Array[$i] .= "<b>$STR_Suggestion $STR_Justifications $STR_for ($vNr):</b> <input type='button' onclick='this.form.submit()' value='Update'>"
     $Suggestion_Array[$i] .= "<ul>"
     $element_nr = 1013 + $i * $maxQuestionPart
     //$form_input_element = "this.form.qn".$element_nr.".value"
     //$form_input_element = "this.form.qn".$element_nr
     $form_input_element = "'inJUSTIFICATION".$vQID.$i$."'"
     for ($c=0..$max_c) {
            $vIndex = arrayfindindex($vArrayID[$c],$AllID)
            $vButton = "<input type='button' value='$STR_Justifications [".$vArrayID[$c]."]' onclick=\""
            $vButton .= "setJustification(".$form_input_element.",".$vNr.",'".$vArrayID[$c]."')\" >"
            $Suggestion_Array[$i] .= "<li>".$vButton." ".$AllStep[$vIndex]."</li>"
            //$Suggestion_Array[$i] .= "<li>[`".$vArrayID[$c]."`] ".$AllStep[$vIndex]."</li>"
     }
     $Suggestion_Array[$i] .= "</ul>"
     $vHTML .= "<tr><td valign=top><i>($vNr)</i></td><td> ".$Suggestion_Array[$i]."<td></tr>"
   } else if (($i==0) || ($QuestionStepID[$i]!="")) {
     //---------------------------------------------------
     //-------NO Answer for Proof Step-------------------- 
     $vArrayID  = $Possible_ConnectionsID[$i]
     $max_c = count($vArrayID) - 1
     $Suggestion_Array[$i] .= "<b>$STR_Suggestion $STR_Connection: </b>  <input type='button' onclick='this.form.submit()' value='Update'>"
     $Suggestion_Array[$i] .= "<ul>"
     $element_nr = 1011 + $i * $maxQuestionPart
     $form_input_element = "this.form.qn".$element_nr.".value"
     for ($c=0..$max_c) {
            $vIndex = arrayfindindex($vArrayID[$c],$StepConnectionTAG)
            $vButton = "<input type='button' value='".$STR_Connection."' onclick=\""
            $vButton .= "document.getElementById('sCONNECTION".$vQID.$vNr.").value=".$vIndex.";"
            $vButton .= "alert('".$STR_Connection." ".$STR_ProofStep." ".$vNr." OK')\" >"
            if ($StepConnectionID[$vIndex] != "?") {
               $Suggestion_Array[$i] .= "<li>".$vButton." ".$StepConnectionID[$vIndex]."</li>"
            }
     }
     $Suggestion_Array[$i] .= "</ul>"
     //---------------------------------------------------
     $vArrayID  = sortarray(array_unique($Possible_ProofStepsID[$i]))
     $Suggestion_Array[$i] .= "<b>$STR_Suggestion $STR_ProofSteps:</b> [".arraytolist($vArrayID)."] "
     //-----List all Proof Steps with ProofStep Text-----
     $max_c = count($vArrayID) - 1
     $Suggestion_Array[$i] .= "<ul>"
     $element_nr = 1014 + $i * $maxQuestionPart
     $form_input_element = "this.form.qn".$element_nr.".value"
     for ($c=0..$max_c) {
            $vIndex = arrayfindindex($vArrayID[$c],$ProofStepID)
            $vButton = "<input type='button' value='[".$vArrayID[$c]."]' onclick=\""
            $vButton .= "moveStepID(".$vNr.",'".$vArrayID[$c]."',".$maxSteps");"
            $vButton .= "alert('$STR_ProofStep $vNr: [".$vArrayID[$c]."]')\" >"
            $Suggestion_Array[$i] .= "<li> $vButton ".$ProofStep[$vIndex]."</li>"
            //$Suggestion_Array[$i] .= "<li>[".$vArrayID[$c]."] $vButton ".$ProofStep[$vIndex]."</li>"
     }
     $Suggestion_Array[$i] .= "</ul>"
     //-------------------------------
     $vHTML .= "<tr><td valign=top><i>($vNr)</i></td><td> ".$Suggestion_Array[$i]."<td></tr>"
   }
}
$vHTML .= "</table>"
$Possible_ProofStepsIDHTML = $vHTML 
if ($Code4Answers > 0) {
  $showanswer[5] = "<b>Possible Proof Steps:</b> ".$vHTML 
}
//-----------------------------------------------
//------Possible_PreconditionIDHTML--------------
$vHTML = "<ol>"
$max_i = count($vArrayID) - 1
for ($i=0..$maxSteps) {
     $vArrayID  = $Possible_PreconditionsID[$i]
     $vHTML .= "<li>$STR_possible $STR_Preconditions [".arraytolist($vArrayID)."] </li>"
}
$vHTML .= "</ol>"
$Possible_PreconditionsIDHTML = $vHTML 
