
#Version 1.0
if ($PSScriptRoot) {
    $ScriptRoot = $PSScriptRoot
}
else {
    $ScriptRoot = Resolve-Path "."
}
$ProfileList = @(Get-Content (Join-path -Path $ScriptRoot -ChildPath "Profiles.ini"))
try {
    Start-Transcript (Join-Path -path $ScriptRoot -ChildPath "Update-FloorpSettingsBootstrap.ps1")
    $ScriptUrl = "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/FloorpSettingsAsCode/Update-FloorpSettings.ps1"
    $ScriptPath = Join-path -path $ScriptRoot -ChildPath "Update-FloorpSettings.ps1"
    Invoke-WebRequest -Uri $ScriptUrl -OutFile $ScriptPath
    . $ScriptPath -ProfilesToUpdate $ProfileList
}
finally {
    if (Test-Path $ScriptPath) {
        Remove-Item $ScriptPath
    }
    Stop-Transcript
}