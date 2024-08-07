[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [Array]
    $ProfilesToUpdate
)
$CustomOverrides = (Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/FloorpSettingsAsCode/CustomOverrides.ini").Content
if ($PSScriptRoot) {
    $ScriptRoot = $PSScriptRoot
}
else {
    $ScriptRoot = Resolve-Path "."
}
try {
    # Dowload files
    
    try {
        $ProfileDir = Resolve-Path "$env:APPDATA\Floorp\Profiles\" -ErrorAction Stop
    }
    catch {
        throw "Profile root not found"
    }
    
    try {
        Write-Host (Resolve-Path $ScriptRoot)
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/FloorpSettingsAsCode/user-overrides.js" -OutFile "$ScriptRoot\user-overrides.js" -ErrorAction Stop
        foreach ($CustomOverride in $CustomOverrides) {
            if ($ProfilesToUpdate -contains $CustomOverride) {
                Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nOrphf/MyToolBox/main/FloorpSettingsAsCode/user-overrides.$($CustomOverride.Replace(" ","%20")).js" -OutFile "$ScriptRoot\user-overrides.$CustomOverride.js" -ErrorAction Stop
            }
        }
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/arkenfox/user.js/master/prefsCleaner.bat" -OutFile "$ScriptRoot\prefsCleaner.bat" -ErrorAction Stop
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/arkenfox/user.js/master/updater.bat" -OutFile "$ScriptRoot\updater.bat" -ErrorAction Stop
    }
    catch {
        throw "Download of required files failed."
    }
    try {
        $c = Get-Content "$ScriptRoot\prefsCleaner.bat" -Raw
        [IO.File]::WriteAllLines("$ScriptRoot\prefsCleaner.bat", ($c -iReplace("CLS", "REM CLS") -iReplace("timeout","REM TIMEOUT")))
        $c = Get-Content "$ScriptRoot\updater.bat" -Raw
        [IO.File]::WriteAllLines("$ScriptRoot\updater.bat", ($c -iReplace("CLS", "REM CLS") -iReplace("timeout","REM TIMEOUT")))
    }
    catch {
        Write-Warning "REM of CLS failed, som CLS might happen."
    }
    Try {
        $ResvProfileDir = Resolve-Path -Path $ProfileDir -ErrorAction Stop
        $PrefCleaner = Resolve-Path -Path "$ScriptRoot\prefsCleaner.bat" -ErrorAction Stop
        $updater = Resolve-Path -Path "$ScriptRoot\updater.bat" -ErrorAction Stop
        $userOverride = Resolve-Path -Path "$ScriptRoot\user-overrides.js" -ErrorAction Stop
    }
    Catch {
        throw "Required files not found (prefsCleaner.bat, updater.bat)"
    }
    $Profiles = Get-ChildItem -Path $ResvProfileDir
    Write-Host "Found these profiles $Profiles.name"
    foreach ($Profile in $Profiles) {
        $ProfileName = $Profile.Name
        if ($ProfileName -like "*.*") {
            $ProfileName = ($ProfileName.Split("."))[1]
        }
        if ($ProfilesToUpdate -contains $ProfileName) {
            $CustomOverride = $null
            try {
                $CustomOverride = Get-content -Path (Resolve-Path -Path "$ScriptRoot\user-overrides.$($ProfileName).js" -ErrorAction Stop) -ErrorAction Stop
                Write-Host "user-overrides.$($ProfileName).js found"
            }
            catch {
                Write-host "No Custom override found for profile $($ProfileName)"
            }
            Write-Host "Deleting old files from profile $($ProfileName), if exists"
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
            }
            catch {
                $_
                throw "Somthing happend cleaning the profile"
            }
            Write-Host "Copying files to profile $($ProfileName)"
            try{
                Copy-Item -Path $userOverride -Destination $ProfileUserOverride -Force -ErrorAction Stop
                Copy-Item -Path $updater -Destination $ProfileUserUpdater -Force -ErrorAction Stop
                Copy-Item -Path $PrefCleaner -Destination $ProfilePrefCleaner -Force -ErrorAction Stop
                if ($CustomOverride) {
                    [IO.File]::AppendAllLines([string]$ProfileUserOverride,[string[]]$CustomOverride)
                }
            }
            catch {
                $_
                throw "Somthing happend copying new files"
            }
            Write-Host "Updating ArkenFox in profile $($ProfileName)"
            try {
                Start-Process -Wait -NoNewWindow -FilePath $ProfileUserUpdater -ArgumentList "-unattended" -ErrorAction Stop
                if (Test-Path $ProfileUserJs) {
                    Start-Process -Wait -NoNewWindow -FilePath $ProfilePrefCleaner -ArgumentList "-unattended" -ErrorAction Stop
                }
            }
            catch {
                throw "ArkenFox update failed :("
            }
            Write-Host "Cleaning up profile $($ProfileName)"
            try {
                Remove-Item $ProfileUserOverride -Force -ErrorAction Stop
                Remove-Item $ProfileUserUpdater -Force -ErrorAction Stop
                Remove-Item $ProfilePrefCleaner -Force -ErrorAction Stop
            }
            catch {
                throw "Clean up couldn't delete all files in profile $($ProfileName)"
            }
        }
        else {
            Write-Host "Useroverride not downloaded for profile $ProfileName"
        }
    }
}
finally {
    try {
        if (Test-Path $updater) {
            Remove-Item $updater -Force -ErrorAction Stop
        }
        if (Test-Path $PrefCleaner) {
            Remove-Item $PrefCleaner -Force -ErrorAction Stop
        }
        if (Test-Path $userOverride) {
            Remove-Item $userOverride -Force -ErrorAction Stop
        }
        foreach ($UseroverrideName in $CustomOverrides) {
            remove-item "$ScriptRoot\user-overrides.$UseroverrideName.js"
        }
    }
    catch {
        Write-Error "Clean up couldn't delete all runtime files"
    }
}
