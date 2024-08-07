# Floorp Settings as Code with ArkenFox hardeing
Use, if you find anything useful, every use of the files from this reposetory is on your own risk.

How to use:
Download Update-FloorpSettingsBootstrap.ps1 and Profiles.ini to somewhere on your computer, where you want to keep it.
It is supposed to be a static bootstrap to always get the newest version of the update script.

Put you profiles you want to update with this tool in the Profiles.ini, 1 profilename at a time.
NB: Even if the folder is called xyz1.MyProfile you still only have to type the profilename (MyProfile, in this example)

Run bootstrap.ps1 to update Floorp profile with user-overrides.js

If some profiles have different overrides custom overrides can be appended to each profile.
Create a new file, only containing the changes and call it user-overrides.Profile2.js and add the profile name, in this case Profile2 to CustomOverrides.ini.