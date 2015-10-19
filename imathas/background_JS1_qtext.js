<font color='red'><DIV id="LOADINFO$vQID">Load e-Proof ID$vQID - Please Wait</DIV>$ErrorHTML</font>
$SettingsJS
$LanguageJS
$eProofJS
<div class="IMATHASINOUT$vQID" id="iMathASINOUT$vQID"  style="display:none">
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

<div class="PRECONDITIONLIST$vQID" id="PRECONDITIONLIST$vQID" ></div>
<div class="CONCLUSIONLIST$vQID" id="CONCLUSIONLIST$vQID"></div>
<div class="JUSTIFICATIONLIST$vQID" id="JUSTIFICATIONLIST$vQID"></div>
<div class="PROOFSTEPLIST$vQID" id="PROOFSTEPLIST$vQID"></div>
<hr/>
<b>imathSTEPCOUNT:</b> <input type="text" id="imathSTEPCOUNT$vQID" name="imathSTEPCOUNT$vQID" value="$maxSteps"/>
<hr/>
<b>imathDISPLAYOPTION:</b> <input type="text" id="imathDISPLAYOPTION$vQID" name="imathDISPLAYOPTION$vQID" value="$DisplaySelector"/>
<hr/>
<b>Student Answers:</b><br/>
<textarea class="imathSTUDENTANSWER$vQID" name="imathSTUDENTANSWER$vQID" id="imathSTUDENTANSWER$vQID" rows="10" cols="125">$imathSTUDENTANSWER</textarea>
<hr/>
<b>Preconditions:</b><br/>
<textarea class="imathPRECONDITION$vQID" name="imathPRECONDITION$vQID" id="imathPRECONDITION$vQID" rows="4" cols="125">$inStudentAnswer[0]</textarea>
<hr/>
<b>Conclusions:</b><br/>
<textarea class="imathCONCLUSION$vQID" name="imathCONCLUSION$vQID" id="imathCONCLUSION$vQID" rows="4" cols="125">$inStudentAnswer[1]</textarea>
<hr/>
<b>Justifications:</b><br/>
<textarea class="imathJUSTIFICATION$vQID" name="imathJUSTIFICATION$vQID" id="imathJUSTIFICATION$vQID" rows="4" cols="125">$inStudentAnswer[2]</textarea>
<hr/>
<b>Proof Steps:</b><br/>
<textarea class="imathPROOFSTEP$vQID" name="imathPROOFSTEP$vQID" id="imathPROOFSTEP$vQID" rows="4" cols="125">$inStudentAnswer[3]</textarea>
<hr/>
<b>Settings:</b><br/>
<textarea class="imathSETTINGS$vQID" name="imathSETTINGS$vQID" id="imathSETTINGS$vQID" rows="4" cols="125">$SettingsJS</textarea>
</div>
<script type="text/javascript">
loadInput2IMathAS();
</script> 
$TheoremHTML
<div class="HELP$vQID" id="HELP$vQID" style="display:none">
<hr/><h3>Hilfe: <input type="button" name="bHELP$vQID" value=" OK " onclick="toggleHide('HELP$vQID')"></h3>
<ul>
  <li><b>Beweisfragmente verschieben:</b> Die Beweisfragmente k&ouml;nnen mit der Positionsnummer an eine andere Stelle im Beweis verschoben werden. Die zugeh&ouml;rigen Begr&uuml;ndungen und Bez&uuml;ge bilden eine Einheit mit dem Beweisfragment und werden daher ebenfalls verschoben.</li>
  <li><b>3 Fragezeichen:</b> Wenn in dem Beweisfragement links noch 3 Fragezeichen stehen "???", so ist noch kein Bezug zum vorherigen Beweisschritt gesetzt worden. Diesen sollte man angeben oder wenn es keinen Bezug zum vorherigen Beweisschritt gibt, sollte man den Bezug auf "START" einer neuen Beweissequenz setzen.</li>
  <li><b>Identifikatoren f&uuml;r Beweisfragmente:</b> Jedes Beweisfragment und jede Begr&uuml;ndung hat einen Identifikator (z.B. [S1],[J1],...). Dieser ist eindeutig in einem Beweis gew&auml;hlt.</li>
  <li><b>Begr&uuml;ndungen:</b> Jeder Beweisschritt kann Begr&uuml;ndungen enthalten, wenn Sie diese ausw&auml;hlen wollen, dr&uuml;cken Sie einfach auf [Begr&uuml;ndungen:]. Danach erscheint eine Liste aller verf&uuml;gbaren Begr&uuml;ndungen, aus denen Sie die relevanten Begr&uuml;ndungen ausw&auml;hlen k&ouml;nnen. Nach der Auswahl auf [OK] dr&uuml;cken und die Ihre Auswahl der Begr&uuml;ndungen wird zu dem jeweilgen Schritt angezeigt.</li>
  <li><b>Editierm&ouml;glichkeiten ausblenden:</b> F&uuml;r jeden Schritt sind die Editierm&ouml;glichkeiten eingeblendet. F&uuml;r die abschlie&szlig;ende Korrektur kann man diese Editierm&ouml;glichkeiten ausblenden. Dies ist oben bei Darstellung des Beweise m&ouml;glich. </li>
  <li><b>[X]-Button:</b> Mit dem [X]-Knopf in dem jeweilgen Beweisschritt kann man das Beweisfragment aus Ihrem Beweis entfernen. Dieser ist dann aber nicht unwiederbringlich gel&ouml;scht, sondern kann unten bei [Nicht verwendete Beweisschritte] mit [+] wieder eingeblendet werden.</li>
  <li><b>Nicht verwendete Beweisschritte:</b> In einem Beweis k&ouml;nnen auch Beweisschritte enthalten, die nicht f&uuml;r den Beweis notwendig sind. Diese landen hinter dem Beweis unten auf der Seite in einem Container der <i>"nicht verwendeten Beweisschritte"</i>. Auch gel&ouml;schte Beweisfragemente finden sich hier. Mit dem [+] oder der Angabe der Position im Beweis kann man diese wieder an einer bestimmten Stelle in Ihren Beweis integrieren.</li>
  <li>Editierbare Beweisschritte [EDIT]:</li> Wenn ein Beweisfragement den Identifikator [MY..] besitzt, kann dieser auch ver&auml;ndert werden. Um den Beweisschritt zu ver&auml;ndern, klicken Sie auf den [EDIT]-Knopf, der aber nur angezeigt wird, wenn die Einstellungen des e-Beweises dieses vorsehen.
  <li><b>Ausblenden der Hilfe:</b> Diese Hilfe kann wieder ausgeblendet werden, wenn Sie wieder auf den Hilfe-Knopf dr&uuml;cken.</li>
</ul>
<hr/>
</div>

$StudentAnswerHeader
<script type="text/javascript">
//document.write(getAnswerHeaderHTML())
</script> 
<div class="EDITPROOF$vQID" id="EDITPROOF$vQID">
<h2>$STR_Proof:</h2>
$StudentAnswerList
<script type="text/javascript">
//alert(getStudentAnswerHTML());
//document.write(getStudentAnswerHTML());
</script> 
</div>
<div class="SOLUTION$vQID" id="SOLUTION$vQID" style="display:none">
<h2>$STR_Proof - $STR_Solution:</h2>
$SolutionHTML</div>
<div class="ASSESSMENT$vQID" id="ASSESSMENT$vQID" style="display:none">
<h2>$STR_Proof - $STR_Assessment:</h2> $AssessmentHTML</div>
<script type="text/javascript">
//alert("Before Postprocess");
postProcessProof();
//setTimeout("postProcessProof()",1000);
alert("Update ID-$vQID");
hideObject("LOADINFO$vQID");
//alert("Mathematische Formeln erzeugen");
</script>
<COMMENT value="GeneratedProofHTML">
$EProofXML
$AuthoringHTML
<hr>
<tt>e-Proof: ID$vQID</tt>
<hr>

