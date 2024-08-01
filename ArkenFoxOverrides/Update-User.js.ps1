# Dowload files

$ProfileDir = "$env:APPDATA\Floorp\Profiles\"

Try {
    $ResvProfileDir = Resolve-Path -Path $ProfileDir
    $PrefCleaner = Resolve-Path -Path ".\prefsCleaner.bat"
    $updater = Resolve-Path -Path ".\updater.bat"
}
Catch {
    Write-Error "Required files not found (prefsCleaner.bat, updater.bat)"
}
$Profiles = Get-ChildItem -Path $ResvProfileDir
foreach ($Profile in $Profiles) {
    $ProfileName = $Profile.Name
    if ($ProfileName -like "*.*") {
        $ProfileName = ($ProfileName.Split("."))[1]
    }
    try {
        $userOverride = Resolve-Path -Path ".\user-overrides.$($ProfileName).js"
    }
    catch {
        Write-Error ('User-overrides.js not found for profile "{0}"' -f $ProfileName)
    }
    Write-Host "Copying files to profile"
    try {
        $ProfileUserOverride = Join-Path -Path $Profile.FullName -ChildPath "user-overrides.js"
        $ProfileUserUpdater = Join-Path -Path $Profile.FullName -ChildPath "updater.bat"
        $ProfilePrefCleaner = Join-Path -Path $Profile.FullName -ChildPath "prefsCleaner.bat"
        $ProfileUserJs = Join-Path -Path $Profile.FullName -ChildPath "user.js"
        if (Test-Path $ProfileUserOverride) {
            Remove-Item $ProfileUserOverride -Force
        }
        if (Test-Path $ProfileUserUpdater) {
            Remove-Item $ProfileUserUpdater -Force
        }
        if (Test-Path $ProfilePrefCleaner) {
            Remove-Item $ProfilePrefCleaner -Force
        }
        if (Test-Path $ProfileUserJs) {
            Remove-Item $ProfileUserJs -Force
        }
        $BackupFiles = Get-ChildItem -Path $Profile.FullName | Where-Object {$_.Name -match 'prefs-backup-\d{8}_\d{6}.js' -or $_.Name -match 'user-backup-\d{8}_\d{6}.js'}
        foreach ($File in $BackupFiles) {
            Remove-Item $file.FullName -Force
        }
        Copy-Item -Path $userOverride -Destination $ProfileUserOverride -Force
        Copy-Item -Path $updater -Destination $ProfileUserUpdater -Force
        Copy-Item -Path $PrefCleaner -Destination $ProfilePrefCleaner -Force
    }
    catch {
        Write-Error "Somthing happend cleaning the profile and copy new files"
    }
    try {
        Start-Process -Wait -NoNewWindow -FilePath $ProfileUserUpdater -ArgumentList "-unattended"
        $ProfileUserJs = Join-Path -Path $Profile.FullName -ChildPath "prefs.js"
        if (Test-Path $ProfileUserJs) {
            Start-Process -Wait -NoNewWindow -FilePath $ProfilePrefCleaner -ArgumentList "-unattended"
        }
    }
    catch {
        Write-Error "ArkenFox update failed :("
    }
    try {
        Remove-Item $ProfileUserOverride -Force
        Remove-Item $ProfileUserUpdater -Force
        Remove-Item $ProfilePrefCleaner -Force
    }
    catch {
        Write-Error "Clean up couldn't delete all files"
    }
}