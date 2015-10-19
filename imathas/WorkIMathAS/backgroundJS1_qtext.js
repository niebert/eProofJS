<font color='red'>$ErrorHTML</font>
$SettingsJS
$LanguageJS
$eProofJS
<div class="IMATHASINOUT" id="iMathASINOUT" style="display:none">
$DebugHTML <hr/>
$ErrorHTML <hr/>
STEP COUNT qn1000 [AB0]<br/>
DISPLAY Select qn1001 [AB1]<br/>
STUDENT ANSWER qn1002 [AB2]<br/>
PRECONDITION qn1003[AB3]<br/>
CONCLUSION qn1004 [AB4]<br/>
JUSTIFICATION qn1005 [AB5]<br/>
PROOFSTEP qn1006 [AB6]<br/>
SOLTUION  qn1007 [AB7]<br/>

<div class="PRECONDITIONLIST" id="PRECONDITIONLIST" ></div>
<div class="CONCLUSIONLIST" id="CONCLUSIONLIST"></div>
<div class="JUSTIFICATIONLIST" id="JUSTIFICATIONLIST"></div>
<div class="PROOFSTEPLIST" id="PROOFSTEPLIST"></div>

<hr/>
<b>Student Answers:</b><br/>
<textarea class="imathSTUDENTANSWER" name="imathSTUDENTANSWER" id="imathSTUDENTANSWER" rows="10" cols="125"></textarea>
<hr/>
<b>Preconditions:</b><br/>
<textarea class="imathPRECONDITION" name="imathPRECONDITION" id="imathPRECONDITION" rows="4" cols="125">$inStudentAnswer[0]</textarea>
<hr/>
<b>Conclusions:</b><br/>
<textarea class="imathCONCLUSION" name="imathCONCLUSION" id="imathCONCLUSION" rows="4" cols="125">$inStudentAnswer[1]</textarea>
<hr/>
<b>Justifications:</b><br/>
<textarea class="imathJUSTIFICATION" name="imathJUSTIFICATION" id="imathJUSTIFICATION" rows="4" cols="125">$inStudentAnswer[2]</textarea>
<hr/>
<b>Proof Steps:</b><br/>
<textarea class="imathPROOFSTEP" name="imathPROOFSTEP" id="imathPROOFSTEP" rows="4" cols="125">$inStudentAnswer[3]</textarea>
<hr/>
<b>Settings:</b><br/>
<textarea class="imathSETTINGS" name="imathSETTINGS" id="imathSETTINGS" rows="4" cols="125">$SettingsJS</textarea>
</div>
<script type="text/javascript">
loadInput2IMathAS();
</script> 
$TheoremHTML
$StudentAnswerHeader
<div class="EDITPROOF" id="EDITPROOF">
<h2>$STR_Proof:</h2>
$StudentAnswerList
<hr/>
<input type='button' class='ToggleUnused' id='bToggleUnused' value=" $STR_Deleted_ProofSteps " onclick="toggleHide('UNUSEDSTEPS')" style='visibility:hidden'/>
<div class="UNUSEDSTEPS" id="UNUSEDSTEPS" style="display:none"></div>
</div>
<div class="SOLUTION" id="SOLUTION" style="display:none">
<h2>$STR_Proof - $STR_Solution:</h2>
$SolutionHTML</div>
<div class="ASSESSMENT" id="ASSESSMENT" style="display:none">
<h2>$STR_Proof - $STR_Assessment:</h2> $AssessmentHTML</div>
<script type="text/javascript">
setTimeout("postProcessProof()",1000);
</script>
<COMMENT value="GeneratedProofHTML">
$EProofXML
$AuthoringHTML

