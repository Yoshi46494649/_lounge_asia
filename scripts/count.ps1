foreach ($file in @("brisbane.html", "sydney.html", "melbourne.html", "bangkok.html", "hcmc.html", "tokyo.html")) {
    $count = (Get-Content $file | Select-String "<details").Length
    Write-Host "QA $file: $count"
    $b_count = (Get-Content $file | Select-String "\bBrisbane\b").Length
    Write-Host "Brisbane in $file: $b_count"
}
