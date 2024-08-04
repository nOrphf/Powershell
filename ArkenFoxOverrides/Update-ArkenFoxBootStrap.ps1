try {
    Start-Transcript (Join-Path -path (Resolve-Path -Path ".")  -ChildPath "Update-ArkenFoxBootStrap.log")
    $ScriptUrl = "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/ArkenFoxOverrides/Update-User.js.ps1"
    #Invoke-WebRequest -Uri $ScriptUrl -OutFile "Update-User.js.ps1"
    Start-Process -FilePath "powershell.exe" -ArgumentList ('-ExecutionPolicy Unrestricted -file "{0}"' -f (Resolve-Path ".\Update-User.js.ps1")) -Wait
}
finally {
    Stop-Transcript
}