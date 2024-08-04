try {
    # Dowload files
    
    try {
        $ProfileDir = Resolve-Path "$env:APPDATA\Floorp\Profiles\" -ErrorAction Stop
    }
    catch {
        throw "Profile root not found"
    }
    
    try {
        #[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%~1', '%~2') -ErrorAction Stop
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/ArkenFoxOverrides/user-overrides.4tw%20L.js" -SslProtocol Tls12 -OutFile "user-overrides.4tw L.js" -ErrorAction Stop
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/ArkenFoxOverrides/user-overrides.Vitec.js" -SslProtocol Tls12 -OutFile "user-overrides.Vitec.js" -ErrorAction Stop
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/arkenfox/user.js/master/prefsCleaner.bat" -SslProtocol Tls12 -OutFile "prefsCleaner.bat" -ErrorAction Stop
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/arkenfox/user.js/master/updater.bat" -SslProtocol Tls12 -OutFile "updater.bat" -ErrorAction Stop
    }
    catch {
        throw "Download of required files failed."
    }
    
    Try {
        $ResvProfileDir = Resolve-Path -Path $ProfileDir -ErrorAction Stop
        $PrefCleaner = Resolve-Path -Path ".\prefsCleaner.bat" -ErrorAction Stop
        $updater = Resolve-Path -Path ".\updater.bat" -ErrorAction Stop
    }
    Catch {
        throw "Required files not found (prefsCleaner.bat, updater.bat)"
    }
    $Profiles = Get-ChildItem -Path $ResvProfileDir
    Write-Host "Found these profiles $Profiles"
    foreach ($Profile in $Profiles) {
        $userOverride = $null
        $ProfileName = $Profile.Name
        if ($ProfileName -like "*.*") {
            $ProfileName = ($ProfileName.Split("."))[1]
        }
        try {
            $userOverride = Resolve-Path -Path ".\user-overrides.$($ProfileName).js" -ErrorAction Stop
        }
        catch {
            Write-Warning ('User-overrides.js not found for profile "{0}"' -f $ProfileName)
            continue
        }
        Write-Host "Copying files to profile $($ProfileName)"
        try {
            $ProfileUserOverride = Join-Path -Path $Profile.FullName -ChildPath "user-overrides.js" -ErrorAction Stop
            $ProfileUserUpdater = Join-Path -Path $Profile.FullName -ChildPath "updater.bat" -ErrorAction Stop
            $ProfilePrefCleaner = Join-Path -Path $Profile.FullName -ChildPath "prefsCleaner.bat" -ErrorAction Stop
            $ProfileUserJs = Join-Path -Path $Profile.FullName -ChildPath "user.js" -ErrorAction Stop
            if (Test-Path $ProfileUserOverride) {
                Remove-Item $ProfileUserOverride -Force -ErrorAction Stop
            }
            if (Test-Path $ProfileUserUpdater) {
                Remove-Item $ProfileUserUpdater -Force -ErrorAction Stop
            }
            if (Test-Path $ProfilePrefCleaner) {
                Remove-Item $ProfilePrefCleaner -Force -ErrorAction Stop
            }
            if (Test-Path $ProfileUserJs) {
                Remove-Item $ProfileUserJs -Force -ErrorAction Stop
            }
            $BackupFiles = Get-ChildItem -Path $Profile.FullName | Where-Object { $_.Name -match 'prefs-backup-\d{8}_\d{6}.js' -or $_.Name -match 'user-backup-\d{8}_\d{6}.js' }
            foreach ($File in $BackupFiles) {
                Remove-Item $file.FullName -Force -ErrorAction Stop
            }
            Copy-Item -Path $userOverride.ToString() -Destination $ProfileUserOverride -Force -ErrorAction Stop
            Copy-Item -Path $updater -Destination $ProfileUserUpdater -Force -ErrorAction Stop
            Copy-Item -Path $PrefCleaner -Destination $ProfilePrefCleaner -Force -ErrorAction Stop
        }
        catch {
            $_
            throw "Somthing happend cleaning the profile and copy new files"
        }
        try {
            Start-Process -Wait -NoNewWindow -FilePath $ProfileUserUpdater -ArgumentList "-unattended" -ErrorAction Stop
             
            if (Test-Path $ProfileUserJs) {
                Start-Process -Wait -NoNewWindow -FilePath $ProfilePrefCleaner -ArgumentList "-unattended" -ErrorAction Stop
            }
        }
        catch {
            throw "ArkenFox update failed :("
        }
        try {
            Remove-Item $ProfileUserOverride -Force -ErrorAction Stop
            Remove-Item $ProfileUserUpdater -Force -ErrorAction Stop
            Remove-Item $ProfilePrefCleaner -Force -ErrorAction Stop
        }
        catch {
            throw "Clean up couldn't delete all files in profile $($ProfileName)"
        }
    }

}
finally {
    try {
        if (Test-Path $userOverride) {
            Remove-Item $userOverride -Force -ErrorAction Stop
        }
        if (Test-Path $updater) {
            Remove-Item $updater -Force -ErrorAction Stop
        }
        if (Test-Path $PrefCleaner) {
            Remove-Item $PrefCleaner -Force -ErrorAction Stop
        }
    }
    catch {
        Write-Error "Clean up couldn't delete all runtime files"
    }
}
