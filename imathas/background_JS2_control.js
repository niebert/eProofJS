//----------------------------------------------------------------------
//-------------E-PROOF-BACKGROUND-CODE 2:-------------------------------
//----------------------------------------------------------------------
// E-PROOF-BACKGROUND-CODE 2: Answer Calculation. 
// Include this code in Common Control by includecodeform(4002)
//----------------------------------------------------------------------
$MySCORE = 0.0
$DebugHTML .= "Answer"
//----------------------------------------------------------------------


//------------------------------------------------------------
//------PROOF GENERATOR BY SOLUTION---------------------------
//----SolutionPath is an Array of SolutionStep Indices--------
$AllID_Search = $AllJustificationsID
$AllStep_Search = $AllJustificationsStep
$TypIndices   = array()
$ti = 0
$StartIndices = array()
$si = 0
$max_i = count($SolutionStep)-1
$DebugIndexHTML = "<b>Debug Index:</b> "
//--------------------------------------------
//-[0]-Previous_Step
//-[1]-StepID
//-[2]-Connection
//-[3]-necessary_Justification (array)
//-[4]-optional_Justification (array)
//-[5]-Solution Link Indices (array)
//--------------------------------------------
for ($so=0..$max_i) {
    $SolutionStep[$so][5] = array()
}
//----Find Typ and Start----------------------
for ($so=0..$max_i) {
    $CorrectPrevious      = $SolutionStep[$so][0]
    $CorrectProofStep     = $SolutionStep[$so][1]
    $CorrectConnection    = $SolutionStep[$so][2]
    if ($CorrectConnection == "Typ") {
        $TypIndices[$ti] = $so
        $ti++
    } else if ($CorrectConnection == " ")  {
        $StartIndices[$si] = $so
        $si++
    }
}
//--------------------------------------------
//----Find Previous Indices-------------------
$max_c  = count($ConclusionID)-1
$max_so = count($SolutionStep)-1
$ConclusionIndices = array()
//----Solution Search goes backward from Conclusion-----
for ($c=0..$max_c) {
    $ConclusionIndices[$c] = array() 
    //---Loop over backward solution--------------------
    //---Steps per Conclusion <= count($SolutionStep)
    $max_s = count($SolutionStep) - 1
    $vStep = 0
    $PreviousID = $ConclusionID[$c]
    for ($s=0..$max_s) {
        //---Loop over backward solution-------------------
        $NextPreviousID = ""
        $so_solv = -1
        for ($so=0..$max_so) {
            $CorrectPrevious  = $SolutionStep[$so][0]
            $CorrectProofStep = $SolutionStep[$so][1]
            if ($PreviousID == $CorrectProofStep) {
                 $NextPreviousID = $CorrectPrevious
                 //$DebugIndexHTML .= "[".$PreviousID.">".$NextPreviousID."]"
                 $so_solv = $so
            }
        }
        //---Store the found solution (if exists)----------
        if ($NextPreviousID != "") {
            //if ($NextPreviousID != " ") { 
            if ($PreviousID != " ") {           
            //--Store & init solution Search for next ID---
                $DebugIndexHTML .= "[".$PreviousID.">".$so_solv.">".$NextPreviousID."]"
                $PreviousID = $NextPreviousID
                $ConclusionIndices[$c][$vStep] = $so_solv
                $vStep++
            }
            //--Search finished if $NextPreviousID = " "---
        }
        //-------------------------------------------------
    }
    //---revert solution path (optional)----------------
}
//--------------------------------------------
//----Create HTML Solution Help---------------
//--------------------------------------------
$MinimalProofSteps = 0
$max_c  = count($ConclusionID)-1
$max_so = count($SolutionStep)-1
$HTML_Solution4Conclusion = array()
$Def_TD_I = "<TD valign='top'>"
//---ShowAnswer Index---------
$sa = 10
//----Solution Search goes backward from Conclusion-----
for ($c=0..$max_c) {
    $HTML_Solution4Conclusion[$c] = "" 
    $vHTML  =  "<b>$STR_Proof $STR_for [".$ConclusionID[$c]."]: ".$Conclusion[$c]."</b>"
    $vHTML .= "<table border='0' width='98%'>"
    $max_s = count($ConclusionIndices[$c])-1
    for ($s=0..$max_s) {
        $MinimalProofSteps += 1
        //---Loop over solution backwards---------------
        $vStep = $max_s - $s
        $so = $ConclusionIndices[$c][$vStep]
        //-------- Proof Complete ---------------------
        $CorrectPrevious      = $SolutionStep[$so][0]
        $CorrectProofStep     = $SolutionStep[$so][1]
        $CorrectConnection    = $SolutionStep[$so][2]
        $vID = "[".$CorrectProofStep."] "
        $vText4ID = "<font color='red'>ID ".$vID."not found!</red>"
        $vFound =  arrayfindindex($CorrectProofStep,$AllID_Search)
        if ($vFound > 0) {
            $vText4ID = $AllStep_Search[$vFound]
        }  
        $vNr = $s+1 
        $vHTML .= $Def_TR_I
        $vHTML .= $Def_TD_I."<i>(".$vNr.")</i>".$Def_TD_II
        $vHTML .= $Def_TD_I."<b>`".$CorrectConnection."`</b>".$Def_TD_II
        $vHTML .= $Def_TD_I.$vID.$vText4ID.""
        $vPreconditionArray = $SolutionStep[$so][3]
        $max_j = count($vPreconditionArray)-1
        if ($max_j >= 0) {
           $vHTML .= "<br/><u>".$STR_Justifications."</u><ul>"
           for ($j=0..$max_j) {
               $vFound =  arrayfindindex($vPreconditionArray[$j],$AllID_Search)
               $vText4ID = "<font color='red'>ID [".$vID."] not found!</red>"
               if ($vFound >= 0) {
                    $vText4ID = $AllStep_Search[$vFound]
               }
               $vHTML .= "<LI>[".$vPreconditionArray[$j]."] ".$vText4ID."</LI>"
           }
           $vHTML .= "</ul>"
        }
        $vHTML .= $Def_TD_II
        $vHTML .= $Def_TR_II
    }
    $vHTML .= "</table>"
    $HTML_Solution4Conclusion[$c] .= $vHTML
    $SolutionHTML .= "<hr/>".$vHTML
}
$sa=1
$showanswer[$sa] = $SolutionHTML
if ($Code4Answers > 0) {
  $sa++
  $showanswer[$sa] = "<b>All IDs:</b> ".$AllHTML
}
//-------TYPE OF THE PROOF and COMPLETE PROOF----------------------
if (count($TypIndices)>0) {
    $so = $TypIndices[0] 
    $CorrectProofStep = $SolutionStep[$so][1]
    $vID = "[".$CorrectProofStep."] "
    $vText4ID = "<font color='red'>ID ".$vID."not found!</red>"
    $vFound =  arrayfindindex($CorrectProofStep,$AllID_Search)
    if ($vFound > 0) {
        $vText4ID = $AllStep_Search[$vFound]
    }   
    $vHTML = "<b>".$STR_Proof.":</b><br/>".$vID.$vText4ID."<br/>"
    for ($c=0..$max_c) {
       $vHTML .= "<hr/>".$HTML_Solution4Conclusion[$c]    
    }
    $vHTML .= "<hr/>"
}
$GeneratedProofHTML = $vHTML
//----END GENERATED PROOF-------------------------------------------
//------------------------------------------------------------------


//---------------------------------------
//-------DEFAULTS for SCORING------------
//---------------------------------------
$GREEN_I  = "<FONT color='green'>"
$GREEN_II = "</FONT>"
$RED_I    = "<FONT color='red'>"
$RED_II   = "</FONT>"
$vRULE = "<tr><td colspan='7'><hr/></td></tr>"   
//----- Default Line for False Feedback --------
$FeedbackFalse = array("")       
for ($i=0..$maxSteps) {
    $FeedbackFalse[$i] .= $Def_TR_I
    $FeedbackFalse[$i] .= $Def_TD_I.$RED_I.$STR_WRONG." 0.0%".$RED_II.$Def_TD_II
    $FeedbackFalse[$i] .= $Def_TD_I.$RED_I.$STR_WRONG." ".$RED_II.$Def_TD_II
    $FeedbackFalse[$i] .= $Def_TD_L.$RED_I.$STR_WRONG." ".$STR_Step_for." [".$QuestionStepID[$i-1]."] ".$STR_does_not_exist."!"
    $FeedbackFalse[$i] .= $RED_II.$Def_TD_II
    //--------------------------------------
    //------NEW STEP DEFINED by STUDENT-----
    //--------------------------------------
    if (arrayfindindex($QuestionStepID[$i-1],$New_StepID) >= 0) {
        $FeedbackFalse[$i] .= $Def_TD_I.$RED_I.$STR_manual." ".$STR_Assessment.$RED_II.$Def_TD_II
    } else {      
        $FeedbackFalse[$i] .= $Def_TD_I.$RED_I." ------- ".$RED_II.$Def_TD_II
    }
    $FeedbackFalse[$i] .= $Def_TR_II
}
//---------------------------
//----------SCORING----------
//---------------------------      
$vSCORE = array(0.0)
$vBestSolution = array(-1)
$DebugHTML .= " Scoring"
$SolutionCount = count($SolutionStep) - 1
for ($i=1..$maxSteps) {
    $vSCORE[$i] = -1.0
    $vBestSolution[$i] = -1  
    $ProofFeedback[$i] = $FeedbackFalse[$i]
    //----AutoSet Student Previous Step--------
    if ($i>1) {
        $StudentPreviousStep = $QuestionStepID[$i-2]
    } else {
        $StudentPreviousStep = " "
    }
    //-----Count Steps of non-empty Input------
    if ($QuestionStepID[$i-1] !="" ) {
          $Step_Input_Count++
    }
    //----------------------------
    //------LOOP over SOLUTION----
    for ($so=0..$SolutionCount) {
           //----------------------------------------
           $CorrectPrevious      = $SolutionStep[$so][0]
           $CorrectProofStep     = $SolutionStep[$so][1]
           $CorrectConnection    = $SolutionStep[$so][2]
           $CorrectPreconditions = mergearrays($SolutionStep[$so][3],$SolutionStep[$so][4])
           if ($CorrectConnection == "=>") {
               if (($CorrectPrevious != " ") && ($CorrectPrevious != "")) {
                  $CorrectPreconditions[count($CorrectPreconditions)] = $CorrectPrevious
               }
           }
           //---$CorrectPreconArray[$so] without Optional Array ---
           //---$CorrectPreconditions[$so] with Optional Array ---
           //--- number of correct preconditions ----
           $number_of_preconditions = count($CorrectPreconArray[$so])
           //----------------------------------------
           $ProofStepOK = 0;
           //--------------------------------
           //-----BEGIN SCORE PROOF STEP-----
           $vSCOREtemp = 0.0
           $ErrorCount = 0
           $FeedbackLine = ""
           for($k=0..3) {
              $FeedBackCol[$k]=""
           }
           //$DebugHTML .="<br/>([".$i."] CHECK '".$CorrectProofStep."'=[CorrectID]?=?[QuestionID]'=".$QuestionStepID[$i-1]."')" 
           if ($CorrectProofStep == $QuestionStepID[$i-1]) {
                 $vCOUNTER  = $i - 1
                 $DebugHTML .="<br/>([".$vCOUNTER."]  FOUND: '".$CorrectProofStep."'=[CorrectID]=[QuestionID]'".$QuestionStepID[$i-1]."')" 
                 //------------------------------------------
                 //--- Check Score of this Solution Step ----
                 //------------------------------------------
                 $InterSection = intersectarrays($CorrectPreconditions,$QuestionPreconditionArray[$i-1])
                 if (arraytolist($InterSection) !="") {
                     $FeedBackCol[2] .= "<li>".$GREEN_I."(r) [".arraytolist($InterSection)."]".$GREEN_II."</li>"
                 }
                 if (($QuestionStepID[$i-1] != " ") && ($QuestionStepID[$i-1] != "") && (arrayfindindex($QuestionStepID[$i-1],$AllID) < 0)) {
                     $FeedBackCol[2] .= "<li>".$RED_I.$STR_WRONG." ".$STR_Step_for." [".$QuestionStepID[$i-1]."] ".$STR_does_not_exist."!".$RED_II."</li>"
                 } else if  ($QuestionStepID[$i-1] == "") {
                     $FeedBackCol[2] .= "<li>".$RED_I.$STR_WRONG." ".$i.". ".$STR_Step_for." ".$STR_Proof."  ".$STR_does_not_exist."!".$RED_II."</li>"
                 }
                 //----------------------------
                 //--- Check Previous Step ----
                 //----------------------------
                 if ($i>1) {
                     $ConTAG = $QuestionConnectionTAG[$i-1]
                     if (($QuestionStepID[$i-2] != $CorrectPrevious) && ($ConTAG  != " ") && ($ConTAG  != "Typ"))  {
                        $FeedBackCol[2] .= "<li>".$RED_I.$STR_WRONG." ".$STR_previous_step." ".$STR_should_be." [".$CorrectPrevious."] ".$STR_Instead_of." [".$QuestionStepID[$i-2]."]!".$RED_II."</li>"
                        $ErrorCount++
                     } else {
                        $FeedBackCol[2] .= "<li>".$GREEN_I.$STR_RIGHT." ".$STR_previous_step." [".$QuestionStepID[$i-2]."]".$GREEN_II."</li>"
                     }
                 }
                 //-----------------------------------------
                 //-----Find unnecessary preconditions -----
                 //----------------------------------------- 
                 // diffarrays(array1,array2): Returns all elements in array1 that are not also in array2
                 //$Temp_NotNecessary = diffarrays($StudentsPrecondition[$i],$CorrectPreconditions[$so])
                 $Temp_NotNecessary = diffarrays($QuestionPreconditionArray[$i-1],$CorrectPreconditions)
                 $Temp_Empty = array(" ","")
                 $NotNecessaryErrors = diffarrays($Temp_NotNecessary,$Temp_Empty)
                 if (arraytolist($NotNecessaryErrors) !="") {
                     $FeedBackCol[2] .= "<li>".$RED_I."(f) [".arraytolist($NotNecessaryErrors)."] ".$STR_unnecessary.$RED_II
                     //$FeedBackCol[2] .= " Correct=[".arraytolist($CorrectPreconditions[$so])."]"
                     //$FeedBackCol[2] .= " Count=".count($NotNecessaryErrors)
                     $FeedBackCol[2] .= "</li>"
                     $ErrorCount += count($NotNecessaryErrors)
                 }
                 //------------------------------------
                 //-----Find missing preconditions ----
                 //------------------------------------
                 // diffarrays(array1,array2): Returns all elements in array1 that are not also in array2
                 $Temp_Missing = diffarrays($SolutionStep[$so][3],$QuestionPreconditionArray[$i-1])
                 $MissingErrors = diffarrays($Temp_Missing,$Temp_Empty)
                 if (arraytolist($MissingErrors) !="") {
                     $FeedBackCol[2] .= "<li>".$RED_I."(f) [".arraytolist($MissingErrors)."] ".$STR_missing.$RED_II."</li>"
                     //---- $ErrorCount count all Errors 
                     $ErrorCount += count($MissingErrors)
                 } else {
                 }
                 //---------------------------
                 //--- Find Logical Error ----
                 //---------------------------
                 //--- AvailableJustifications[$i] provides all Justifications at Steo $i 
                 // diffarrays(array1,array2): Returns all elements in array1 that are not also in array2
                 //$LogicalErrors = diffarrays($StudentsPrecondition[$i],$AvailableJustifications[$i])
                 $LogicalErrors = diffarrays($QuestionPreconditionArray[$i-1],$AvailableJustifications[$i])
                 if (arraytolist($LogicalErrors) !="") {
                     $FeedBackCol[2] .= "<li>".$RED_I."(f) $STR_logical $STR_Errors in [".arraytolist($LogicalErrors)."] - $STR_Justification ".$STR_need_a_previous_proofstep.$RED_II."</li>"
                     //---- $ErrorCount count all Errors 
                     $ErrorCount += count($LogicalErrors)
                 }
                 $ErrorConnection = 0
                 //------------------------------------------
                 //----BEGIN Score the connection symbol-----
                 //------------------------------------------
                 if ($i==1) {
                     if (($QuestionConnectionTAG[$i] != " ") && ($QuestionConnectionTAG[$i-1] != "Typ")) {
                        //---STEP ist eine definierte VORAUSSETZUNG---------
                        //---d.h. $QuestionConnectionTAG[$i] = " " ---------
                        $FeedBackCol[2] .= "<li>".$RED_I."(f) $STR_Errors `".$QuestionConnectionTAG[$i-1]."` ".$STR_not_possible_at_first_step."! </li>"
                        $ErrorCount += 1
                        $ErrorConnection += 1
                     }
                 } else { //---- $i>= 1 -------
                     if ($QuestionConnectionTAG[$i] != $CorrectConnection) {
                        $ErrorCount += 1
                        $ErrorConnection += 1
                        if ($QuestionConnectionTAG[$i] != " ") {
                             if ($CorrectConnection != " ") {
                                 $FeedBackCol[2] .= "<li>".$RED_I."(f) ".$STR_Use." `".$CorrectConnection
                                 $FeedBackCol[2] .= "` ".$STR_Instead_of." `".$QuestionConnectionTAG[$i-1]."` ".$RED_II."</li>"
                             } else {
                                 $FeedBackCol[2] .= "<li>".$RED_I."(f) ".$STR_Remove." `".$QuestionConnectionTAG[$i-1]
                                 $FeedBackCol[2] .= "` - ".$STR_No_connection_to_previous."! "
                                 $FeedBackCol[2] .= $STR_Use." `".$StepConnectionID[2]." `".$RED_II."</li>"
                             }
                        } else {
                             if ($CorrectConnection != " ") {
                                 $FeedBackCol[2] .= "<li>".$RED_I."(f) ".$STR_Use." `".$CorrectConnection."` ".$RED_II."</li>"
                             }
                        }
                     } 
                 }
                 //-----------------------------------------
                 //----Connection in Feedback Column 2 -----
                 //-----------------------------------------
                 if ($ErrorConnection == 0) {
                     $FeedBackCol[1] .= "".$GREEN_I."(r) `".$QuestionConnectionTAG[$i-1]."`".$GREEN_II
                 } else {
                     $FeedBackCol[1] .= "".$RED_I."(f) `".$QuestionConnectionTAG[$i-1]."`".$RED_II
                 }
                 //----------------------------------------       
                 
                 //----------------------------------------
                 //----CALCULTATE: SOLUTION STEP SCORE-----
                 //----------------------------------------
                 // $ErrorCount = Number of Errors per Step
                 $vSCOREtemp = 1.0 - $ErrorCount * ($Per_Error_Minus_Percent/100)
                 $vPRE  = $RED_I 
                 $vPOST = $RED_II 
                 if ($vSCOREtemp < 0) {
                      $vSCOREtemp = 0.05
                 }
                 if ($vSCOREtemp >= 0.95) {
                    $vPRE  = $GREEN_I 
                    $vPOST = $GREEN_II
                 } 
                 $FeedBackCol[0] = $vPRE.prettyreal($vSCOREtemp * 100,2)."%".$vPOST
                 if ($ErrorCount>0) {
                    $FeedBackCol[3] = $vPRE.$STR_Errors.":".$ErrorCount.$vPOST
                 } else {
                    $FeedBackCol[3] = $vPRE.$STR_Errors.":0".$vPOST
                 }
           }
           //-------------------------------------------------
           //----END PROOF STEP matches with QuestionStepID---
           //-------------------------------------------------
           
           //----------------------------------
           //-----UPDATE SCORE THE STEP $i-----
           //----------------------------------
           if ($vSCORE[$i] < $vSCOREtemp) {
              $vBest_Sol[$i] = $so
              $vSCORE[$i] = $vSCOREtemp
              if ($vSCOREtemp > 0) {
                 //------FeedbackLine--------------------------------------------------------
                 $FeedbackLine .= $Def_TR_I.$Def_TD_I.$FeedBackCol[0].$Def_TD_II.$Def_TD_I.$FeedBackCol[1].$Def_TD_II
                 $FeedbackLine .= $Def_TD_L.$GREEN_I."(r) [".$QuestionStepID[$i-1]."]".$GREEN_II 
                 $FeedbackLine .= "<UL>".$FeedBackCol[2]."</UL>"
                 $FeedbackLine .= $Def_TD_II.$Def_TD_I.$FeedBackCol[3].$Def_TD_II.$Def_TR_II
                 $ProofFeedback[$i] = $FeedbackLine
              }
           }
           //---------------------------------------------------                
    }
}
//----------------------
//-----TOTAL SCORE------
//----------------------
$vAverageScore = 0.0
if (($maxSteps > 0) && ($MinimalProofSteps>0)) {
   $vAverageScore = (sumarray($vSCORE)/$maxSteps)
   if ($maxSteps > $MinimalProofSteps) {
       $vAnswerScore = $vAverageScore
   } else {
       $vAnswerScore = (sumarray($vSCORE)/$MinimalProofSteps)
   }
} else {
   $vAnswerScore = 0.0
}
//-----------------------------
$answer = $vAnswerScore
//-----------------------------

//-------- FeedbackHTML -------
//$vHTML = "<u>".$STR_Assessment.":</u><br/>"
$vHTML = ""
$vHTML .= "<table border='0' width='97%' >"
$vHTML .= $vRULE
for ($i=1..$maxSteps) {
    $vConnectionTAG = $QuestionConnectionTAG[$i-1]
    $vID = "[".$QuestionStepID[$i-1]."] "
    if ($QuestionStepID[$i-1] != "") {
       $vHTML .= $Def_TR_I
       $vHTML .= $Def_TD_I."<i>(".$i.")</i>".$Def_TD_II
       $vHTML .= $Def_TD_I."<b>`".$vConnectionTAG."`</b>".$Def_TD_II
       $vHTML .= $Def_TD_L.$vID.$QuestionStep[$i-1].$Def_TD_II
       $vHTML .= $Def_TD_I
       $vQuestionPreconditions = $QuestionPreconditionChars[$i-1]
       if ($vQuestionPreconditions != "") {
          $vHTML .= "[".$vQuestionPreconditions."]"
       }
       $vHTML .= $Def_TD_II
       $vHTML .= $Def_TR_II
       $vHTML .= $ProofFeedback[$i]
       $vHTML .= $vRULE
    }
}
//----total score feedback line-------------------
$FeedbackLine .= $Def_TR_I.$Def_TD_I."<b>".prettyreal($vAverageScore * 100,2)."% </b>".$Def_TD_II.$Def_TD_I."<b>$STR_Average</b>".$Def_TD_II
$FeedbackLine .= $Def_TD_I.$maxSteps." ".$STR_ProofSteps." --- Minimal $STR_ProofSteps=".$MinimalProofSteps."  "
$FeedbackLine .= $Def_TD_II.$Def_TD_I."<b>TOTAL: ".prettyreal($vAnswerScore * 100,2)."% </>".$Def_TD_II.$Def_TR_II
$vHTML .= $FeedbackLine
$vHTML .= "</table>"
$ProofFeedbackHTML = $vHTML
$AssessmentHTML = $vHTML
$showanswer[0] = "<b>".$STR_Assessment.":</b><br/>".$AssessmentHTML
//--------END: ASSESSMENT-----------
//----------------------------------
//------Questiontext Generator------
//----------------------------------
$maxInput = 40
$maxCol = $maxQuestionPart-3

$QuestionTextGenerator = "<hr><tt>"
for ($i=0..$maxInput) {
   $iRowAdder = $i*$maxQuestionPart + $StuAnsShift
   $QuestionTextGenerator .= "\$TR_I[".$i."]<br/>"
   for ($j=0..$maxCol) {
      $jCol = $iRowAdder + $j 
      $QuestionTextGenerator .= "   \$TD_I[".$i."] "
      $QuestionTextGenerator .= " \$answerbox[".$jCol."] \$TD_II[".$i."] <br/>"
   }
   $jCol = $iRowAdder + $maxCol +1 
   $QuestionTextGenerator .= "\$TR_II[".$i."]<br/>"
   $QuestionTextGenerator .= "\$TR_EI[".$i."] "
   $QuestionTextGenerator .= " \$answerbox[".$jCol."] "
   $QuestionTextGenerator .= "\$TR_EII[".$i."]"
   $jCol++
   $QuestionTextGenerator .= " \$answerbox[".$jCol."]"
   $QuestionTextGenerator .= "\$TR_EIII[".$i."]<br/>"

   //$QuestionTextGenerator .= "//---------------------------------<br/>"
}
$QuestionTextGenerator .= "</tt><hr>"

//--------------------------------------------------
//---iMATHAS CODE GENERATE: New Author Version
//--------------------------------------------------
$vNewline = "\n"
$CommentLine = "//--------------------------------------------------------------".$vNewline
$vPrefix = "//--------------"
$vPostfix = "----------------------------".$vNewline.$CommentLine

$STR_iMathAS_Pre  = ""
$STR_iMathAS_Pre .= $CommentLine.$vPrefix."SOLUTION DEFINITION-".$vPostfix.$vNewline
$STR_iMathAS_Pre .= "//-[0]Previous_Step---[1]StepID---[2]Connection---[3]necessary_Justification---[4]optional_Just.".$vNewline
$STR_iMathAS_Pre .= "\$so=0".$vNewline
//--------------------------------------------
$iMathASHTML = $STR_iMathAS_Pre
for ($i=1..$maxSteps) {
    $SolutionPreconditionID = "array("
    $Komma = ""
    $maxj = count($QuestionPreconditionArray[$i])-1 
    for ($j=0..$maxj) {
           if ($QuestionPreconditionArray[$i][$j] != "") {
                $SolutionPreconditionID .= $Komma."\"".$QuestionPreconditionArray[$i][$j]."\""
                $Komma = ","
           }
    }
    $SolutionPreconditionID .= ")" 
    if ($i == 1) {
       $SolutionPreviousStep = " "
    } else {
       $SolutionPreviousStep = $QuestionStepID[$i-1]
    }
    $iMathASHTML .= "\$SolutionStep[\$so]=array("
    if ($QuestionConnectionTAG[$i] != " ") {
         $iMathASHTML .= "\"".$SolutionPreviousStep."\","
    } else {
         $iMathASHTML .= "\" \","
    }
    $iMathASHTML .= "\"".$QuestionStepID[$i]."\","
    $iMathASHTML .= "\"".$QuestionConnectionTAG[$i]."\","
    $iMathASHTML .= $SolutionPreconditionID.",array())<br>\$so+=1".$vNewline
}
$iMathASHTML .= "\$MinimalProofSteps = \$so".$vNewline.$vNewline
if ($Code4Answers > 0) {
  $sa++
  // $showanswer[$sa] = "<b>iMathAS-Code of Input:</b><pre><code>".$iMathASHTML."</code></pre>"
  $showanswer[$sa] = "<b>iMathAS-Code of Input:</b>"
  $showanswer[$sa] .= "<textarea name='ExportIMathAS".$sa."' rows=10 cols=90 wrap='off'>".$iMathASHTML."</textarea><hr/>"

}
//---------------------------------------------------------
//---iMATHAS CODE GENERATE: Export defined Author Version
//---------------------------------------------------------
//-[0]Previous_Step---[1]StepID---[2]Connection---[3]necessary_Justification---[4]optional_Justification--
//--------------------------------------------
$Export_iMathASHTML = $STR_iMathAS_Pre
//--------------------------------------------
$max_so = count($SolutionStep)-1
for ($so=0..$max_so) {
    if ($so == $MinimalProofSteps) {
         $Export_iMathASHTML .= "\$MinimalProofSteps = \$so //(Min=$so)".$vNewline
    }
    $SolutionPreconditionID = "array("
    $Komma = ""
    $maxj = count($SolutionStep[$so][3])-1 
    for ($j=0..$maxj) {
        if ($SolutionStep[$so][3][$j] != "") {
           $SolutionPreconditionID .= $Komma."\"".$SolutionStep[$so][3][$j]."\""
           $Komma = ","
        }
    }
    $SolutionPreconditionID .= ")," 
    $SolutionPreconditionID .= "array("
    $Komma = ""
    $maxj = count($SolutionStep[$so][4])-1 
    for ($j=0..$maxj) {
        if ($SolutionStep[$so][4][$j] != "") {
            $SolutionPreconditionID .= $Komma."\"".$SolutionStep[$so][4][$j]."\""
            $Komma = ","
        }
    }
    $SolutionPreconditionID .= ")" 
    $Export_iMathASHTML .= "\$SolutionStep[\$so]=array("
    $Export_iMathASHTML .= "\"".$SolutionStep[$so][0]."\","
    $Export_iMathASHTML .= "\"".$SolutionStep[$so][1]."\","
    $Export_iMathASHTML .= "\"".$SolutionStep[$so][2]."\","
    $vLineSO = $so+1 
    $Export_iMathASHTML .= $SolutionPreconditionID.")<br>\$so+=1 //(\$so=$vLineSO)".$vNewline
}
$Export_iMathASHTML .= "\$MinimalProofSteps = ".$MinimalProofSteps.$vNewline.$vNewline
if ($Code4Answers > 0) {
  $sa++
  //$showanswer[$sa] = "<b>iMathAS-Code of Solution:</b><pre><code>".$Export_iMathASHTML."</code></pre>"
  $showanswer[$sa] = "<b>iMathAS-Code of Solution:</b>"
  $showanswer[$sa] .= "<textarea name='ExportIMathAS".$sa."' rows=10 cols=90 wrap='off'>".$Export_iMathASHTML."</textarea><hr/>"
}

$sai = 6
//----Create HTML for new steps------
$max_i = count($NewStepID)-1
$vHTML = "<ul>"
for ($i=0..$max_i) {
     $vHTML .= "<li>[".$NewStepID[$i]."] ".$NewStep[$i]."</li>"
}
$vHTML .= "</ul>"
if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>New Steps:</b> ".$vHTML
}
//----Create Source for new steps-------
$max_i = count($NewStepID)-1
//$vHTML = "<pre><code>"
$vNewSteps = "<textarea name='NewSteps_IMathAS' rows=10 cols=90 wrap='off'>"

$vNewline = "\n"
for ($i=0..$max_i) {
     $vHTML .= "\$ps += 1".$vNewline
     //$vCode = str_replace("`","&lsquo;",$NewStep[$i])
     //$vCode = str_replace("`","&rsquo;",$NewStep[$i])
     //$vCode = str_replace("`","&#96;",$NewStep[$i])
     $vCode = str_replace("`","#MATH#",$NewStep[$i])
     $vNewSteps .= "\$ProofStep[\$ps] = \"".$vCode."\"".$vNewline
     $vNewSteps .= "\$ProofStepID[\$ps] = \"".$NewStepID[$i]."\"".$vNewline
}
$vNewSteps .= "</textarea><hr/>".$STR_Apostrophe_Warning
if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>New Steps iMathAS-Source</b><br/> ".$vNewSteps
}
//----COMMON-CONTROL-GENERATOR----
$CommonControl = ""

$vDashes  = "//--------------------------------------------------------------------------------------".$vNewline
$vPre  = $vDashes
$vPre .= "//-------1-COMMON CONTROL: Settings and Definition of Theorem and Proof-----------------".$vNewline
$vPre .= $vDashes
$vPre .= "// Documentation: see http://e-proof.weebly.com ".$vNewline.$vNewline
$vPre .= $vDashes
$vPre .= "  \$Theorem_Title = \"". str_replace("`","#MATH#",$Theorem_Title)."\"".$vNewline
$vPre .= $vDashes
$vPre .= "  \$Theorem_Appendix = '". str_replace("`","#MATH#",$Theorem_Appendix)."'".$vNewline
$vPre .= $vDashes.$vNewline
$vPre .= "\$Per_Error_Minus_Percent = ".$Per_Error_Minus_Percent
$vPre .= " // means ".$Per_Error_Minus_Percent."% less Points per Error".$vNewline.$vNewline
$vPre .= $vDashes
$vPre .= "//-----unnecessary options make the proof step more difficult---------------------------".$vNewline
$vPre .= "//--- $unnecessary_... = 0 means very simple".$vNewline
if ($unnecessary_preconditions>0) {
   $STR_insert = "$unnecessary_preconditions"
} else {
   $STR_insert = "0"
}
$vPre .= "\$unnecessary_preconditions = ".$STR_insert.$vNewline
if ($unnecessary_proofsteps>0) {
   $STR_insert = "$unnecessary_proofsteps"
} else {
   $STR_insert = "0"
}
$vPre .= "\$unnecessary_proofsteps    = ".$STR_insert.$vNewline
if ($unnecessary_connections>0) {
   $STR_insert = "$unnecessary_connections"
} else {
   $STR_insert = "0"
}
$vPre .= "\$unnecessary_connections   = ".$STR_insert.$vNewline 
$vPre .= $vDashes
$vPre .= "//------Use Values 1 or 0 --------------------------------------------------------------".$vNewline
$vPre .= $vDashes
if ($selectbox_proofsteps>0) {
   $STR_insert = "1"
} else {
   $STR_insert = "0"
}
$vPre .= "\$selectbox_proofsteps = ".$STR_insert.$vNewline
if ($allow_own_proofsteps >0) {
   $STR_insert = "1"
} else {
   $STR_insert = "0"
}
$vPre .= "\$allow_own_proofsteps = ".$STR_insert.$vNewline
if ($randomize_proofstep_IDs>0) {
   $STR_insert = "1"
} else {
   $STR_insert = "0"
}
$vPre .= "\$randomize_proofstep_IDs  = ".$STR_insert.$vNewline

if ($remap_proofstep_IDs>0) {
   $STR_insert = "1"
} else {
   $STR_insert = "0"
}
$vPre .= "\$remap_proofstep_IDs  = ".$STR_insert.$vNewline

$vPre .= "//-----for Novices----------------------".$vNewline
if ($show_feedback_score>0) {
   $STR_insert = "1"
} else {
   $STR_insert = "0"
}
$vPre .= "\$show_feedback_score = ".$STR_insert.$vNewline
if ($show_proof_solution>0) {
   $STR_insert = "1"
} else {
   $STR_insert = "0"
}
$vPre .= "\$show_proof_solution = ".$STR_insert.$vNewline
$vPre .= "//---For AUTHORS------------------------".$vNewline
//$vPre .= "\$AuthoringMode = ".$AuthoringMode.$vNewline
$vPre .= "\$AuthoringMode       = 0".$vNewline
$vPre .= "\$max_input_steps     = ".$max_input_steps.$vNewline
$vPre .= "\$max_authoring_steps = ".$max_authoring_steps.$vNewline
$vPre .= $vDashes.$vNewline.$vNewline

$CommonControl .= $vPre


//-----------------------------------------
//----Create Source for Preconditions------
$vArray = "Precondition"
$vIDArray = $PreconditionID
$vStepArray = $Precondition
$vI = "pi"

$vHTML = ""
$max_i = count($vStepArray)-1
$vHTML .= "\$".$vI." = 0".$vNewline
for ($i=0..$max_i) {
     $vCode = str_replace("`","#MATH#",$vStepArray[$i])
     $vHTML .= "\$".$vArray."[\$".$vI."] = \"".$vCode."\"".$vNewline
     $vHTML .= "\$".$vArray."ID[\$".$vI."] = \"".$vIDArray[$i]."\"".$vNewline
     $vHTML .= "\$".$vI." += 1".$vNewline
}
$CommonControl .= $CommentLine.$vPrefix.strtoupper($vArray)."--------".$vPostfix.$vHTML.$vNewline
if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>".$vArray." iMathAS-Source</b><br/> <pre><code>".$vHTML."</code></pre>".$STR_Apostrophe_Warning
}
//-----------------------------------
//---CREATE COMMON CONTROL SOURCE----

//---Create Source for Conclusions----
$vArray = "Conclusion"
$vIDArray = $ConclusionID
$vStepArray = $Conclusion
$vI = "pi"

$vHTML = ""
$max_i = count($vStepArray)-1
$vHTML .= "\$".$vI." = 0".$vNewline
for ($i=0..$max_i) {
     $vCode = str_replace("`","#MATH#",$vStepArray[$i])
     $vHTML .= "\$".$vArray."[\$".$vI."] = \"".$vCode."\"".$vNewline
     $vHTML .= "\$".$vArray."ID[\$".$vI."] = \"".$vIDArray[$i]."\"".$vNewline
     $vHTML .= "\$".$vI." += 1".$vNewline
}
$CommonControl .= $CommentLine.$vPrefix.strtoupper($vArray)."----------".$vPostfix.$vHTML.$vNewline

if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>".$vArray." iMathAS-Source</b><br/> <pre><code>".$vHTML."</code></pre>".$STR_Apostrophe_Warning
}
//---Create Source for SelectedPreconditions
$vArray = "SelectedPrecondition"
$vIDArray = $SelectedPreconditionID
$vStepArray = $SelectedPrecondition
$vI = "pi"

$vHTML = ""
$max_i = count($vStepArray)-1
$vHTML .= "\$".$vI." = 0".$vNewline
for ($i=0..$max_i) {
     $vCode = str_replace("`","#MATH#",$vStepArray[$i])
     $vHTML .= "\$".$vArray."[\$".$vI."] = \"".$vCode."\"".$vNewline
     $vHTML .= "\$".$vArray."ID[\$".$vI."] = \"".$vIDArray[$i]."\"".$vNewline
     $vHTML .= "\$".$vI." += 1".$vNewline
}


$CommonControl .= $CommentLine.$vPrefix.strtoupper($vArray).$vPostfix.$vHTML.$vNewline
if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>".$vArray." iMathAS-Source</b><br/> <pre><code>".$vHTML."</code></pre>".$STR_Apostrophe_Warning
}
//----Create Source for ProofSteps----
$vArray = "ProofStep"
$vIDArray = $ProofStepID
$vStepArray = $ProofStep
$vI = "pi"

$vHTML = ""
$max_i = count($vStepArray)-1
$vHTML .= "\$".$vI." = 0".$vNewline
for ($i=0..$max_i) {
     $vCode = str_replace("`","#MATH#",$vStepArray[$i])
     $vHTML .= "\$".$vArray."[\$".$vI."] = \"".$vCode."\"".$vNewline
     $vHTML .= "\$".$vArray."ID[\$".$vI."] = \"".$vIDArray[$i]."\"".$vNewline
     $vHTML .= "\$".$vI." += 1".$vNewline
}
$CommonControl .= $CommentLine.$vPrefix.strtoupper($vArray)."-----------".$vPostfix.$vHTML.$vNewline
$CommonControl0 = $CommonControl 
$CommonControl1 .= $CommentLine.$vPrefix."SOLUTION DEFINITION-".$vPostfix
$CommonControl1 .= "//-[0]Previous_Step---[1]StepID---[2]Connection---[3]necessary_Justification---[4]optional_Just.".$vNewline
$CommonControl1 .= $vNewline."//---Insert Solution here---".$vNewline.$vNewline.$vNewline

$CommonControl_Include  = "//--------------------------------------".$vNewline
$CommonControl_Include .= "//------INCLUDE LIBRARIES---------------".$vNewline
$CommonControl_Include .= "//--------------------------------------".$vNewline
$CommonControl_Include .= "//includecodefrom(".$qid_import3.")".$vNewline
$CommonControl_Include .= "includecodefrom(".$qid_import1.")".$vNewline
$CommonControl_Include .= "includecodefrom(".$qid_import2.")".$vNewline
$CommonControl_Include .= "//--------------------------------------".$vNewline
$CommonControl_Include .= "//----insert in question control--------".$vNewline
$CommonControl_Include .= "// includeqtextfrom(".$qid_import1.")".$vNewline
$CommonControl_Include .= "//--------------------------------------".$vNewline

$CommonControl2 = $CommonControl_Include
//$CommonControl2 = $CommonControl

$CommonControl = $CommonControl0.$Export_iMathASHTML.$CommonControl2.$CommonControl_Include
$CommonControlNew = $CommonControl0.$iMathASHTML.$CommonControl2.$CommonControl_Include
$CommonControlInsert = $CommonControl0.$CommonControl1.$CommonControl2
if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>Common Control iMathAS-Source (with generated solution)</b><br/> <pre><code>".$CommonControlNew."</code> </pre>".$STR_Apostrophe_Warning 
}
//---------------------------------------
if ($Code4Answers > 0) {
  $sai++
  $showanswer[$sai] = "<b>".$vArray." iMathAS-Source</b><br/> <pre><code>".$vHTML."</code></pre>".$STR_Apostrophe_Warning
  $sai++
  $showanswer[$sai] = "<b>Common Control iMathAS-Source</b><br/> <pre><code>".$CommonControl."</code></pre>".$STR_Apostrophe_Warning
  $sai++
  $showanswer[$sai] = "<b>Debugging AnswerTableHTML:</b><br/>".$AnswerTableHTML
}

$AuthoringHTML = ""
if ($AuthoringMode > 0 ) {
    $AuthoringHTML  = "<b>Common Control iMathAS-Source</b><br/> ".$STR_Apostrophe_Warning
    $AuthoringHTML .= "<textarea name='IMathAS1' rows=10 cols=90 wrap='off'>".$CommonControl0.$iMathASHTML.$CommonControl2
    $AuthoringHTML .= "</textarea>".$STR_Apostrophe_Warning."<hr/>"
    $AuthoringHTML .= "<b>iMathAS-Code of Input:</b><textarea name='IMathAS2' rows=10 cols=90 wrap='off'>".$iMathASHTML."</textarea>"
    $AuthoringHTML .= "<hr/>"."<b>iMathAS-Code of Solution:</b>"
    $AuthoringHTML .= "<textarea name='IMathAS3' rows=10 cols=90 wrap='off'>".$Export_iMathASHTML."</textarea>"
}

//------------------------------------------------
//---STUDENTS PROOF / PROOF ASSESSEMENT (optional)
$a = getstuans($stuanswers,$thisq,0)
$vDefault = "<h2>$questiontext[0]</h2> ".$ProofCompleteHTML //$questions[0][0]
//$vHTML = ""
if (!$a) {
    $vHTML = $vDefault 
} else if ($a==0) {
    $vHTML = $vDefault 
} else if ($a==1){
    $vHTML = "<h2>$questiontext[0]</h2> ".$ProofCompleteHTML
} else if ($a==2){
    $vHTML = " "
} else if ($a==3){
    $vHTML = "<h2>$questiontext[0] - $STR_Short</h2> ".$ProofHistoryHTML
} else if ($a==4){
    $vHTML = "<h2>$STR_Assessment - $questiontext[0]</h2> ".$ProofFeedbackHTML
} else if ($a==5){
    $vHTML = "<h2>$questiontext[0] ($STR_Solution)</h2> ".$SolutionHTML
}
//$StudentProofHTML = "(".$a.")".$vHTML
$StudentProofHTML = $vHTML
//------------------------------------------------
//---SELECT PROOF STEPS---------------------------
$vDefault  = $ProofStepHTML //$questions[0][1]
$a = getstuans($stuanswers,$thisq,1) 
if (!$a) {
    $vHTML = $vDefault 
} else if ($a==0) {
    $vHTML = $vDefault 
} else if ($a==1){
    $vHTML = $ProofStepHTML
} else if ($a==2){
    $vHTML = " "
} else if ($a==3){
    $vHTML = $Possible_ProofStepsIDHTML
} 
//$ProofStep_Help_Feedback_HTML = "(".$a.")".$vHTML
$ProofStep_Help_Feedback_HTML = $vHTML
//------------------------------------------------
//---PRECONDITIONS--------------------------------
$vDefault = $PreconditionAllHTML //$questions[0][2]
//$vHTML = ""
$a = getstuans($stuanswers,$thisq,2) 
if (!$a) {
    $vHTML = $vDefault 
} else if ($a==0) {
    $vHTML = $vDefault 
} else if ($a==1){
    $vHTML = $PreconditionAllHTML
} else if ($a==2){
    $vHTML = ""
} else if ($a==3){
    $vHTML = $Possible_ProofStepsIDHTML
}
//$Precondition_Help_HTML = "(".$a.")".$vHTML
$Precondition_Help_HTML = $vHTML

if (($show_XML + $AuthoringMode) > 0) {
   $EProofXML  = "<b>XML-Export e-Proof:</b> Import XML with "
   $EProofXML .= "<a href=\"http://math.uni-landau.de/javascript/iMathAScreator/iMathAScreator.html\" "
   $EProofXML .= "target=\"_blank\">iMathAS-Creator for e-Proofs</a>"
   $EProofXML .= "<textarea name='XMLexport' rows=10 cols=90 wrap='off'>"
   $EProofXML .= "<EPROOF>\n"
   $EProofXML .= "  <VARIABLE NAME='TITLE' VALUE='". str_replace("`","#MATH#",$Theorem_Title)."' />\n"
   $XML_Text  = str_replace("`","#MATH#",$Theorem_Appendix)
   $XML_Text  = str_replace("=","__eq__",$XML_Text)
   $XML_Text  = str_replace(">","__gt__",$XML_Text)
   $XML_Text  = str_replace("<","__lt__",$XML_Text)
   $XML_Text  = str_replace("\"","__qu__",$XML_Text)
   $XML_Text  = str_replace("ä","__ae__",$XML_Text)
   $XML_Text  = str_replace("ö","__oe__",$XML_Text)
   $XML_Text  = str_replace("ü","__ue__",$XML_Text)
   $XML_Text  = str_replace("Ä","__AE__",$XML_Text)   
   $XML_Text  = str_replace("O","__OE__",$XML_Text)
   $XML_Text  = str_replace("Ü","__UE__",$XML_Text)
   $XML_Text  = str_replace("ß","__sz__",$XML_Text)
   $EProofXML .= "  <VARIABLE NAME='THEOREM_APPENDIX' VALUE='". $XML_Text ."' />\n"
   $EProofXML .= "  <VARIABLE NAME='AUTHORINGMODE' VALUE='0' />\n"
   if ($show_feedback_score>0) {
     $STR_insert = "1"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='SHOW_FEEDBACK_SCORE' VALUE='".$STR_insert."' />\n"
   if ($show_proof_solution>0) {
     $STR_insert = "1"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='SHOW_PROOF_SOLUTION' VALUE='".$STR_insert."' />\n"
   if ($selectbox_proofsteps>0) {
     $STR_insert = "1"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='SELECTBOX_PROOFSTEPS' VALUE='".$STR_insert."' />\n"
   if ($allow_own_proofsteps >0) {
     $STR_insert = "1"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='ALLOW_OWN_PROOFSTEPS' VALUE='".$STR_insert."' />\n"
   $EProofXML .= "  <VARIABLE NAME='PER_ERROR_MINUS_PERCENT' VALUE='".$Per_Error_Minus_Percent."' />\n"
   if ($unnecessary_preconditions>0) {
     $STR_insert = "$unnecessary_preconditions"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='UNNECESSARY_PRECONDITIONS' VALUE='".$STR_insert."' />\n"
   if ($unnecessary_proofsteps>0) {
     $STR_insert = "$unnecessary_proofsteps"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='UNNECESSARY_PROOFSTEPS' VALUE='".$STR_insert."' />\n"
   if ($unnecessary_connections>0) {
     $STR_insert = "$unnecessary_connections"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='UNNECESSARY_CONNECTIONS' VALUE='".$STR_insert."' />\n"
   if ($randomize_proofstep_IDs>0) {
     $STR_insert = "1"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='RANDOMIZE_PROOFSTEP_IDS' VALUE='".$STR_insert."' />\n"
   if ($remap_proofstep_IDs>0) {
     $STR_insert = "1"
   } else {
     $STR_insert = "0"
   }
   $EProofXML .= "  <VARIABLE NAME='REMAP_PROOFSTEP_IDS' VALUE='".$STR_insert."' />\n"
   $EProofXML .= "  <VARIABLE NAME='CODE_ID_I' VALUE='".$qid_import1."' />\n"
   $EProofXML .= "  <VARIABLE NAME='CODE_ID_II' VALUE='".$qid_import2."' />\n"
   $EProofXML .= "  <VARIABLE NAME='CODE_ID_III' VALUE='".$qid_import3."' />\n"
   $vNameXML = array("PRECONDITION_OPTIONS","CONCLUSION_OPTIONS","JUSTIFICATION_OPTIONS","PROOFSTEP_OPTIONS")
   $vID_XML = array($PreconditionID,$ConclusionID,$SelectedPreconditionID,$ProofStepID)
   $vStep_XML = array($Precondition,$Conclusion,$SelectedPrecondition,$ProofStep)
   $max_k = count($vNameXML) - 2
   for ($k=0..$max_k) {
     $max_i = count($vID_XML[$k])-1
     $EProofXML .= "  <VARLIST NAME='".$vNameXML[$k]."'>\n"
     for ($i=0..$max_i) {
        $vCode = str_replace("`","#MATH#",$vStep_XML[$k][$i])
        //$vCode = str_replace('<span class=\"AM\">',"",$vCode)
        //$vCode = str_replace('</span>',"",$vCode)
        //$vCode = $vStep_XML[$k][$i]
        $EProofXML .= "    <STEPDEF SIZE='2' ID='".$vID_XML[$k][$i]."' VALUE='".$vCode."' />\n"
     }
     $EProofXML .= "  </VARLIST>\n"
   }
   //-------------------------------
   $EProofXML .= "  <VARLIST NAME='PROOFSTEP_OPTIONS'>\n"
   $max_so = count($SolutionStep)-1
   //---LOOP over Solution---- 
   $Used_IDs = array("???")
   $Previous      = ""
   $Real_Previous = ""
   $XML_ID        = ""
   for ($so=0..$max_so) {
       //-------
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
       if ($so > 0) {
           //----Add a LINK_NODE if Previous and Real Previous do NOT match-----
           if ($XML_Previous != $Real_Previous) {
              $EProofXML .= "    "
              $EProofXML .= "<STEPDEF SIZE='5' ID='".$XML_Previous."' CONNECTION='_LINK_NODE_' JUST='' OPTJUST='' VALUE='' />\n"
           }
       } 
       $Real_Previous = $XML_ID
       $XML_Step     = ""
       //$vID_Array = diffarrays($AllID_Search,$PreConJustID)
       //$vID_Array = mergearrays($vID_Array,$Used_IDs)
       $vID_Array = mergearrays($PreConJustID,$Used_IDs)
       $ID_List = "#ID#,".arraytolist($vID_Array).",#"
       $Used_List = "#USED#,".arraytolist($Used_IDs).",#"
       $vFound =  arrayfindindex($XML_ID,$vID_Array)
       if ($vFound >= 0) { 
           $XML_Step = ""
       } else {
           $ID_Found =  arrayfindindex($XML_ID,$AllID_Search)
           if ($ID_Found >= 0) {
               $XML_Step = $AllStep_Search[$vFound]
           } else {
               $XML_Step = "--UNDEF--"
           }
       }
       $XML_Step  = str_replace("=","__eq__",$XML_Step)
       $XML_Step  = str_replace(">","__gt__",$XML_Step)
       $XML_Step  = str_replace("<","__lt__",$XML_Step)
       $XML_Step  = str_replace("\"","__qu__",$XML_Step)
       $XML_Step  = str_replace("ä","__ae__",$XML_Step)
       $XML_Step  = str_replace("ö","__oe__",$XML_Step)
       $XML_Step  = str_replace("ü","__ue__",$XML_Step)
       $XML_Step  = str_replace("Ä","__AE__",$XML_Step)   
       $XML_Step  = str_replace("O","__OE__",$XML_Step)
       $XML_Step  = str_replace("Ü","__UE__",$XML_Step)
       $XML_Step  = str_replace("ß","__sz__",$XML_Step)
       //--------------
       $EProofXML .= "    <STEPDEF SIZE='5' ID='".$XML_ID."' " 
       $EProofXML .= "CONNECTION='".$XML_Connection."' "
       $EProofXML .= "JUST='".$JustificationID[0]."' OPTJUST='".$JustificationID[1]."' "
       $EProofXML .= "VALUE='".$XML_Step."' />\n"
       //-----ID LIST---------
       //$EProofXML .= $ID_List."\n"
       //$EProofXML .= $Used_List."\n"
       //---------------------
       $u_id = count($Used_IDs)
       $Used_IDs[$u_id] = $XML_ID
       //---------------------       
   }
   $max_i = count($ProofStep)-1
   for ($i=0..$max_i) {
       $XML_ID    = $ProofStepID[$i]
       $XML_Step  = str_replace("`","#MATH#",$ProofStep[$i])
       $XML_Step  = str_replace("=","__eq__",$XML_Step)
       $XML_Step  = str_replace(">","__gt__",$XML_Step)
       $XML_Step  = str_replace("<","__lt__",$XML_Step)
       $XML_Step  = str_replace("\"","__qu__",$XML_Step)
       $XML_Step  = str_replace("ä","__ae__",$XML_Step)
       $XML_Step  = str_replace("ö","__oe__",$XML_Step)
       $XML_Step  = str_replace("ü","__ue__",$XML_Step)
       $XML_Step  = str_replace("Ä","__AE__",$XML_Step)   
       $XML_Step  = str_replace("O","__OE__",$XML_Step)
       $XML_Step  = str_replace("Ü","__UE__",$XML_Step)
       $XML_Step  = str_replace("ß","__sz__",$XML_Step)
       //$vFound =  arrayfindindex($XML_ID,$vID_Array)
       $vFound = stringpos(",".$XML_ID.",",$ID_List)
       if ($vFound >= 0) { 
           // $EProofXML .= " ".$ID_List."\n"
           // $EProofXML .= " USED' ID='".$XML_ID."' \n" 
       } else {
           //--------------
           $EProofXML .= "    <STEPDEF SIZE='5' ID='".$ProofStepID[$i]."' " 
           $EProofXML .= "CONNECTION='".$XML_Connection."' "
           $EProofXML .= "OPTJUST='' "
           $EProofXML .= "JUST='' OPTJUST='' "
           $EProofXML .= "VALUE='".$XML_Step."' />\n"
           //-----ID LIST---------
           // $EProofXML .= $ID_List."\n"
           // $EProofXML .= $Used_List."\n"
           //--------------
       }
       //--------------
   }
   $EProofXML .= "  </VARLIST>\n"
   //--------------------------------
   $EProofXML .= "</EPROOF>\n"
   $EProofXML .= "</textarea>"
   //$EProofXML .= "<input type='button' value='Replace MATH'onclick=\""
   //$EProofXML .= "document.forms[0].XMLexport.value=document.forms[0].XMLexport.value.replace(/#MATH#/g,'`')\">"
   $EProofXML .= "<script language='Javascript'>"
   $EProofXML .= "document.forms[0].XMLexport.value=document.forms[0].XMLexport.value.replace(/#MATH#/g,'`');"
   $EProofXML .= "document.forms[0].XMLexport.value=document.forms[0].XMLexport.value.replace(/<span [^>]+>/g,'');"
   $EProofXML .= "document.forms[0].XMLexport.value=document.forms[0].XMLexport.value.replace(/<\/span>/g,'');"
   $EProofXML .= "</script>"
   $EProofXML .= "<hr/>"
}

//--------------------------------------------------------------
//----E-PROOF-BACKGROUND-CODE 2: Update JS----------------------
//--------------------------------------------------------------
//---BEGIN: eProofJS.js Generator
$vOut.="function updateInput() {\n"
$vOut.="  var vListNode = document.getElementsByClassName(\"sPOSITION\"+vQID);\n"
$vOut.="  var vNr = 0;\n"
$vOut.="  while (lower(vNr,vListNode.length)) {\n"
$vOut.="    vNr++;\n"
$vOut.="    vListNode[vNr-1].value = vNr;\n"
$vOut.="  };\n"
$vOut.="  var k=0;\n"
$vOut.="  while (lower(k,vListNode.length)) { \n"
$vOut.="    k++;\n"
$vOut.="    updateStep(k);\n"
$vOut.="    };\n"
$vOut.="    saveInput2IMathAS() ;\n"
$vOut.="}\n"
$vOut.="function updateStepChange(pStep) {\n"
$vOut.="  var vOldIDnode = document.getElementById(\"inSTEPID\"+vQID+pStep);\n"
$vOut.="  var vNewIDnode = document.getElementById(\"sSTEP\"+vQID+pStep);\n"
$vOut.="  var vOldID = vOldIDnode.value;\n"
$vOut.="  var vNewID = vNewIDnode.value;\n"
$vOut.="  vNewIDnode.value = vOldIDnode.value;\n"
$vOut.="  updateStep(pStep);\n"
$vOut.="}\n"
$vOut.="function updateJustifications(pStep) {\n"
$vOut.="  var vCheckboxes = document.getElementsByClassName(\"sJUSTIFICATION\"+vQID+pStep);\n"
$vOut.="  var vInputNode = document.getElementById(\"inJUSTIFICATION\"+vQID+pStep);\n"
$vOut.="  vInputNode.value = \"\";\n"
$vOut.="  var vComma = \"\";\n"
$vOut.="  var k=0;\n"
$vOut.="  while (lower(k,vCheckboxes.length)) {\n"
$vOut.="    if (vCheckboxes[k].checked) {\n"
$vOut.="      vInputNode.value += vComma + vCheckboxes[k].value;\n"
$vOut.="      vComma = \",\";\n"
$vOut.="    };\n"
$vOut.="    k++;\n"
$vOut.="  };\n"
$vOut.="}\n"
$vOut.="function updateTextIDs(pStep) {\n"
$vOut.="  var vArrayNodeID = document.getElementsByClassName(\"VIEWID\"+vQID+pStep);  \n"
$vOut.="  var vID = document.getElementById(\"inSTEPID\"+vQID+pStep).value; \n"
$vOut.="  var i=0;\n"
$vOut.="  while (lower(i,vArrayNodeID.length)) {\n"
$vOut.="    vArrayNodeID[i].innerHTML = vID;\n"
$vOut.="    i++;\n"
$vOut.="  };\n"
$vOut.="}\n"
$vOut.="function updateTextarea(pStep) {\n"
$vOut.="  var vNodeStepDef  = document.getElementById(\"inSTEPDEF\"+vQID+pStep);\n"
$vOut.="  var vNodeEditor   = document.getElementById(vEditorID +vQID+ pStep);\n"
$vOut.="  var vValue = vNodeEditor.value;\n"
$vOut.="  eval(decodeURI(\"vValue%20=%20vValue.replace(/%5Cn/g,%22__n__%22);\"));\n"
$vOut.="  vNodeStepDef.value = vValue;\n"
$vOut.="  updateStepEdit(pStep);\n"
$vOut.="}\n"
$vOut.="function updateStepEdit(pStep) {\n"
$vOut.="  var vStepDef  = document.getElementById(\"inSTEPDEF\"+vQID+pStep).value;\n"
$vOut.="  var vID       = document.getElementById(\"inSTEPID\"+vQID+pStep).value;\n"
$vOut.="  var vStepNode = document.getElementById(vID);\n"
$vOut.="  var vName = \"outSTEPDISPLAY\"+vQID+pStep+\"-STEP-\"+vID;\n"
$vOut.="  var vStepOutNode = document.getElementById(vName);\n"
$vOut.="  if (vStepOutNode) {\n"
$vOut.="    saveASCIImath(vName,\"[\"+vID+\"] &nbsp; \"+vStepDef);\n"
$vOut.="    };\n"
$vOut.="  if (vStepNode) {\n"
$vOut.="    vStepNode.childNodes[0].nodeValue = encodeValue(vStepDef);\n"
$vOut.="    updateStep(pStep);\n"
$vOut.="    saveInput2IMathAS();\n"
$vOut.="  } else {\n"
$vOut.="    alert(\"vStepNode not found for ID='\"+vID+\"'\");\n"
$vOut.="  }\n"
$vOut.="}\n"
$vOut.="function updateStep(pStep) {\n"
$vOut.="  hideAllSteps(pStep);\n"
$vOut.="  var vName = \"outSTEPDISPLAY\"+vQID+pStep;\n"
$vOut.="  var vObjectID = vName+\"-POS-1\";\n"
$vOut.="  var vPos = document.getElementById(\"sPOSITION\"+vQID+pStep);\n"
$vOut.="  var vOutPos = document.getElementById(vObjectID);\n"
$vOut.="  if (vOutPos) {\n"
$vOut.="    vObjectID = vName+\"-POS-\"+vPos.value;\n"
$vOut.="    showObject(vObjectID);\n"
$vOut.="    var vCon = document.getElementById(\"sCONNECTION\"+vQID+pStep);\n"
$vOut.="    vObjectID = vName+\"-CON-\"+vCon.value;\n"
$vOut.="    showObject(vObjectID);\n"
$vOut.="    var vStepID = document.getElementById(\"sSTEP\"+vQID+pStep);\n"
$vOut.="    var vStepDef_Node = document.getElementById(\"inSTEPDEF\"+vQID+pStep);\n"
$vOut.="    vObjectID = vName+\"-STEP-\"+vStepID.value;\n"
$vOut.="    showObject(vObjectID);\n"
$vOut.="    updateTextIDs(pStep);\n"
$vOut.="    showSelectedJustifications(pStep);\n"
$vOut.="  } else {\n"
$vOut.="  }\n"
$vOut.="}\n"
$vOut.="function updateInput2IMathAS(pForm)  {\n"
$vOut.="  saveInput2IMathAS();\n"
$vOut.="  setDisplayOptions();\n"
$vOut.="  pForm.submit();\n"
$vOut.="}\n"
//--------------------------------------------------------------
$UpdateJS = $vOut
$eProofJS ="<script language=\"javascript\">\n".$eProofJS.$UpdateJS."</script>\n"

//--------------------------------------------------------------
//---END: eProofJS.js Generator---------------------------------
//--------------------------------------------------------------
