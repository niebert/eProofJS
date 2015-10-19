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
        $inSTEPDEF  = str_replace("__ae__","ä",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__oe__","ö",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__ue__","ü",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__AE__","Ä",$inSTEPDEF)   
        $inSTEPDEF  = str_replace("__OE__","O",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__UE__","Ü",$inSTEPDEF)
        $inSTEPDEF  = str_replace("__sz__","ß",$inSTEPDEF)
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
  }
}