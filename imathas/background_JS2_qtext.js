<script type="text/javascript">
$SettingsJS
</script>
<div class="IMATHASINOUT" id="iMathASINOUT">
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
</div>
<b>Settings:</b><br/>
<textarea class="imathSETTINGS" name="imathSETTINGS" id="imathSETTINGS" rows="4" cols="125">$SettingsJS</textarea>
</div>

<!-- table border=0 bgcolor="#D7DFFA" width="96%" align="center"><tr><td>&nbsp;</td><td -->
<!-- BEGIN of E-PROOF-Table ------------------------------>
<script type="text/javascript">
loadInput2IMathAS();
//--------THEOREM_TITLE---------------------------------------------
document.write("<hr/><h2>"+vLanguage["Theorem"]);
var vTitle = vSettings["Theorem_Title"];
document.write(":  ("+ decodeValue(vTitle)+")</h2>");
//--------PRECONDITIONS---------------------------------------------
var vList = document.getElementById("imathPRECONDITION").value;
if (vList.match(/#__co__#/).length == 1) {
	document.write(vLanguage["Precondition_Single"]);
} else {
	document.write(vLanguage["Precondition_Multi"]);
};
document.write(getListIMathAS("PRECONDITION"));
//--------CONCLUSIONS-----------------------------------------------
var vList = document.getElementById("imathCONCLUSION").value;
if (vList.match(/#__co__#/).length == 1) {
	document.write(vLanguage["Conclusion_Single"]);
} else {
	document.write(vLanguage["Conclusion_Multi"]);
};
document.write(getListIMathAS("CONCLUSION"));
//--------THEOREM_APPENDIX-----------------------------------------
var vAppendix = vSettings["Theorem_Appendix"];
if (getSetting("show_links") != "0") {
	document.write("<hr/>"+ decodeValue(vAppendix)+" ");
}
//--------STUDENT_ANSWER-----------------------------------------------
document.write("<hr/><h2>"+vLanguage["Proof"]+"</h2>");
document.write(getAnswerHeaderHTML());
</script>
<div class="EDITPROOF" id="EDITPROOF">
<script type="text/javascript">
document.write(getStudentAnswerHTML());
</script>
<!-- END of E-PROOF-Table ------------------------------>
<script type="text/javascript">
document.write("<hr/>");
document.write("<input type='button' class='ToggleUnused' id='bToggleUnused' value=' "+vLanguage["Deleted_ProofSteps"]+" ' onclick=\"toggleHide('UNUSEDSTEPS')\" style='visibility:hidden'/>");
//-----Proof Post-Processing------
 postProcessProof();
</script>
  <div class="UNUSEDSTEPS" id="UNUSEDSTEPS" style="display:none">
</div><!--- END div class="EDITPROOF" id="EDITPROOF" --->
<div class="SOLUTION" id="SOLUTION" style="display:none">$SolutionHTML</div>
<div class="ASSESSMENT" id="ASSESSMENT" style="display:none">$FeedbackHTML</div>
<!-- /td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>
<hr/>
</td><td>&nbsp;</td></tr>
</table -->

