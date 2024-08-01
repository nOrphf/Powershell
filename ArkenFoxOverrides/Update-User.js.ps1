# Dowload files

$ProfileDir = "$env:APPDATA\Floorp\Profiles\"

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%~1', '%~2')
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/ArkenFoxOverrides/user-overrides.4tw%20L.js" -SslProtocol Tls12 -OutFile "user-overrides.4tw L.js"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/ArkenFoxOverrides/user-overrides.Vitec.js" -SslProtocol Tls12 -OutFile "user-overrides.Vitec.js"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/arkenfox/user.js/master/prefsCleaner.bat" -SslProtocol Tls12 -OutFile "prefsCleaner.bat"
    Invoke-WebRequest -Uri "https://raw.githubusercontent.com/arkenfox/user.js/master/updater.bat" -SslProtocol Tls12 -OutFile "updater.bat"
}
catch {
    Write-Error "Download of required files failed."
}

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
    if (Test-Path -Path (Join-Path -Path ($Profile.FullName) -ChildPath "\user-overrides.$($ProfileName).js")) {
        <# Action to perform if the condition is true #>
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
