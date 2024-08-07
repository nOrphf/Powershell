if ($PSScriptRoot) {
    $ScriptRoot = $PSScriptRoot
}
else {
    $ScriptRoot = "D:\Repos\CodeRepo\Powershell\4tw Group\UpdateArkenfox"
}
$ProfileList = @(Get-Content (Join-path -Path $ScriptRoot -ChildPath "Profiles.ini"))
try {
    Start-Transcript (Join-Path -path $ScriptRoot -ChildPath "Update-ArkenFoxBootStrap.log")
    $ScriptUrl = "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/ArkenFoxOverrides/Update-User.js.ps1"
    Invoke-WebRequest -Uri $ScriptUrl -OutFile (Join-path -path $ScriptRoot -ChildPath "Update-User.js.ps1")
    . (Join-Path -Path $ScriptRoot -ChildPath "\Update-User.js.ps1") -ProfilesToUpdate $ProfileList
}
finally {
    if (Test-Path "$ScriptRoot\Update-User.js.ps1") {
        Remove-Item "$ScriptRoot\Update-User.js.ps1"
    }
    Stop-Transcript
}
