// ArkenFox overrides
/*** [SECTION 0400]: SAFE BROWSING (SB)
    SB has taken many steps to preserve privacy. If required, a full url is never sent
    to Google, only a part-hash of the prefix, hidden with noise of other real part-hashes.
    Firefox takes measures such as stripping out identifying parameters and since SBv4 (FF57+)
    doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)
 
    [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
    [2] https://wiki.mozilla.org/Security/Safe_Browsing
    [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
    [4] https://educatedguesswork.org/posts/safe-browsing-privacy/
 ***/
user_pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/* 0401: disable SB (Safe Browsing)
* [WARNING] Do this at your own risk! These are the master switches
* [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content ***/
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
/* 0402: disable SB checks for downloads (both local lookups + remote)
* This is the master switch for the safebrowsing.downloads* prefs (0403, 0404)
* [SETTING] Privacy & Security>Security>... "Block dangerous downloads" ***/
user_pref("browser.safebrowsing.downloads.enabled", false);
/* 0403: disable SB checks for downloads (remote)
* To verify the safety of certain executable files, Firefox may submit some information about the
* file, including the name, origin, size and a cryptographic hash of the contents, to the Google
* Safe Browsing service which helps Firefox determine whether or not the file should be blocked
* [SETUP-SECURITY] If you do not understand this, or you want this protection, then override this ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
user_pref("browser.safebrowsing.downloads.remote.url", ""); // Defense-in-depth
/* 0404: disable SB checks for unwanted software
* [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software" ***/
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0405: disable "ignore this warning" on SB warnings [FF45+]
* If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
* [TEST] see https://github.com/arkenfox/user.js/wiki/Appendix-A-Test-Sites#-mozilla
* [1] https://bugzilla.mozilla.org/1226490 ***/
// user_pref("browser.safebrowsing.allowOverride", false);

/* 0610: enforce no "Hyperlink Auditing" (click tracking)
* [1] https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/ ***/
user_pref("browser.send_pings", false); // [DEFAULT: false]

 /* 0710: enable DNS-over-HTTPS (DoH) [FF60+]
  * 0=default, 2=increased (TRR (Trusted Recursive Resolver) first), 3=max (TRR only), 5=off (no rollout)
  * see "doh-rollout.home-region": USA 2019, Canada 2021, Russia/Ukraine 2022 [3]
  * [SETTING] Privacy & Security>DNS over HTTPS
  * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
  * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
  * [3] https://support.mozilla.org/kb/firefox-dns-over-https
  * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
user_pref("network.trr.mode", 3);
 /* 0712: set DoH provider
  * The custom uri is the value shown when you "Choose provider>Custom>"
  * [NOTE] If you USE custom then "network.trr.uri" should be set the same
  * [SETTING] Privacy & Security>DNS over HTTPS>Increased/Max>Choose provider ***/
 user_pref("network.trr.uri", "https://adg.4tw.dk/dns-query");
 user_pref("network.trr.custom_uri", "https://adg.4tw.dk/dns-query");

/* 0820: disable coloring of visited links
  * [SETUP-HARDEN] Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
  * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
  * attacks. Don't forget clearing history on exit (2811). However, social engineering [2#limits][4][5]
  * and advanced targeted timing attacks could still produce usable results
  * [1] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector
  * [2] https://dbaron.org/mozilla/visited-privacy
  * [3] https://bugzilla.mozilla.org/1632765
  * [4] https://earthlng.github.io/testpages/visited_links.html (see github wiki APPENDIX A on how to use)
  * [5] https://lcamtuf.blogspot.com/2016/08/css-mix-blend-mode-is-bad-for-keeping.html ***/
 user_pref("layout.css.visited_links_enabled", false);
 /* 0830: enable separate default search engine in Private Windows and its UI setting
  * [SETTING] Search>Default Search Engine>Choose a different default search engine for Private Windows only ***/
 user_pref("browser.search.separatePrivateDefault", false); // [FF70+]
 user_pref("browser.search.separatePrivateDefault.ui.enabled", false); // [FF71+]

 /* 0906: enforce no automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
  * [SETTING] Privacy & Security>Logins and Passwords>Allow Windows single sign-on for...
  * [1] https://support.mozilla.org/kb/windows-sso ***/
 user_pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]

 /* 1006: disable favicons in shortcuts [WINDOWS]
  * URL shortcuts use a cached randomly named .ico file which is stored in your
  * profile/shortcutCache directory. The .ico remains after the shortcut is deleted
  * If set to false then the shortcuts use a generic Firefox icon ***/
 user_pref("browser.shell.shortcutFavicons", true);

/*** [SECTION 2600]: MISCELLANEOUS ***/
 user_pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
 /* 2603: remove temp files opened from non-PB windows with an external application
  * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=302433,1738574 ***/
 user_pref("browser.download.start_downloads_in_tmp_dir", true); // [FF102+]
 user_pref("browser.helperApps.deleteTempFileOnExit", true);
 /* 2606: disable UITour backend so there is no chance that a remote page can use it ***/
 user_pref("browser.uitour.enabled", false);
 user_pref("browser.uitour.url", ""); // Defense-in-depth
 /* 2608: reset remote debugging to disabled
  * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16222 ***/
 user_pref("devtools.debugger.remote-enabled", false); // [DEFAULT: false]
 /* 2615: disable websites overriding Firefox's keyboard shortcuts [FF58+]
  * 0 (default) or 1=allow, 2=block
  * [SETTING] to add site exceptions: Ctrl+I>Permissions>Override Keyboard Shortcuts ***/
 user_pref("permissions.default.shortcuts", 2);

 /** DOWNLOADS ***/
 /* 2651: enable user interaction for security by always asking where to download
  * [SETUP-CHROME] On Android this blocks longtapping and saving images
  * [SETTING] General>Downloads>Always ask you where to save files ***/
 user_pref("browser.download.useDownloadDir", true);
 /* 2652: disable downloads panel opening on every download [FF96+] ***/
 user_pref("browser.download.alwaysOpenPanel", false);
 /* 2653: disable adding downloads to the system's "recent documents" list ***/
 user_pref("browser.download.manager.addToRecentDocs", false);
 /* 2654: enable user interaction for security by always asking how to handle new mimetypes [FF101+]
  * [SETTING] General>Files and Applications>What should Firefox do with other files ***/
 user_pref("browser.download.always_ask_before_handling_new_types", false);

 /** EXTENSIONS ***/
 /* 2660: limit allowed extension directories
  * 1=profile, 2=user, 4=application, 8=system, 16=temporary, 31=all
  * The pref value represents the sum: e.g. 5 would be profile and application directories
  * [SETUP-CHROME] Breaks usage of files which are installed outside allowed directories
  * [1] https://archive.is/DYjAM ***/
 user_pref("extensions.enabledScopes", 1); // [HIDDEN PREF]

 /*** [SECTION 2700]: ETP (ENHANCED TRACKING PROTECTION) ***/
 user_pref("_user.js.parrot", "2700 syntax error: the parrot's joined the bleedin' choir invisible!");
 /* 2701: enable ETP Strict Mode [FF86+]
  * ETP Strict Mode enables Total Cookie Protection (TCP)
  * [NOTE] Adding site exceptions disables all ETP protections for that site and increases the risk of
  * cross-site state tracking e.g. exceptions for SiteA and SiteB means PartyC on both sites is shared
  * [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
  * [SETTING] to add site exceptions: Urlbar>ETP Shield
  * [SETTING] to manage site exceptions: Options>Privacy & Security>Enhanced Tracking Protection>Manage Exceptions ***/
 //user_pref("browser.contentblocking.category", "strict"); // [HIDDEN PREF]
 /* 2702: disable ETP web compat features [FF93+]
  * [SETUP-HARDEN] Includes skip lists, heuristics (SmartBlock) and automatic grants
  * Opener and redirect heuristics are granted for 30 days, see [3]
  * [1] https://blog.mozilla.org/security/2021/07/13/smartblock-v2/
  * [2] https://hg.mozilla.org/mozilla-central/rev/e5483fd469ab#l4.12
  * [3] https://developer.mozilla.org/docs/Web/Privacy/State_Partitioning#storage_access_heuristics ***/
  user_pref("privacy.antitracking.enableWebcompat", false);

/** SANITIZE ON SHUTDOWN: IGNORES "ALLOW" SITE EXCEPTIONS | v2 migration is FF128+ ***/
 /* 2811: set/enforce what items to clear on shutdown (if 2810 is true) [SETUP-CHROME]
  * [NOTE] If "history" is true, downloads will also be cleared ***/
 //user_pref("privacy.clearOnShutdown.cache", true);     // [DEFAULT: true]
 //user_pref("privacy.clearOnShutdown_v2.cache", true);  // [FF128+] [DEFAULT: true]
 //user_pref("privacy.clearOnShutdown.downloads", true); // [DEFAULT: true]
 //user_pref("privacy.clearOnShutdown.formdata", true);  // [DEFAULT: true]
 user_pref("privacy.clearOnShutdown.history", false);   // [DEFAULT: true]
 //user_pref("privacy.clearOnShutdown_v2.historyFormDataAndDownloads", true); // [FF128+] [DEFAULT: true]

/* 4501: enable RFP
  * [NOTE] pbmode applies if true and the original pref is false
  * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a canvas site exception via the urlbar.
  * RFP also has a few side effects: mainly that timezone is GMT, and websites will prefer light theme ***/
 user_pref("privacy.resistFingerprinting", true); // [FF41+]
 user_pref("privacy.resistFingerprinting.pbmode", true); // [FF114+]
 /* 4510: disable using system colors
  * [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors ***/
 user_pref("browser.display.use_system_colors", true); // [DEFAULT: false NON-WINDOWS]
 /* 4520: disable WebGL (Web Graphics Library) ***/
 user_pref("webgl.disabled", true);

 /* 5003: disable saving passwords
  * [NOTE] This does not clear any passwords already saved
  * [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites ***/
 user_pref("signon.rememberSignons", false);
/* 5004: disable permissions manager from writing to disk [FF41+] [RESTART]
  * [NOTE] This means any permission changes are session only
  * [1] https://bugzilla.mozilla.org/967812 ***/
    // user_pref("permissions.memory_only", true); // [HIDDEN PREF]
 /* 5005: disable intermediate certificate caching [FF41+] [RESTART]
  * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
  * Saved logins and passwords are not available. Reset the pref and restart to return them ***/
    // user_pref("security.nocertdb", true);
 /* 5006: disable favicons in history and bookmarks
  * [NOTE] Stored as data blobs in favicons.sqlite, these don't reveal anything that your
  * actual history (and bookmarks) already do. Your history is more detailed, so
  * control that instead; e.g. disable history, clear history on exit, use PB mode
  * [NOTE] favicons.sqlite is sanitized on Firefox close ***/
 user_pref("browser.chrome.site_icons", true);
 /* 5007: exclude "Undo Closed Tabs" in Session Restore ***/
    // user_pref("browser.sessionstore.max_tabs_undo", 0);
 /* 5008: disable resuming session from crash
  * [TEST] about:crashparent ***/
 user_pref("browser.sessionstore.resume_from_crash", false);
 /* 5009: disable "open with" in download dialog [FF50+]
  * Application data isolation [1]
  * [1] https://bugzilla.mozilla.org/1281959 ***/
 user_pref("browser.download.forbid_open_with", true);
 /* 5010: disable location bar suggestion types
  * [SETTING] Search>Address Bar>When using the address bar, suggest ***/
    // user_pref("browser.urlbar.suggest.history", false);
    // user_pref("browser.urlbar.suggest.bookmark", false);
 user_pref("browser.urlbar.suggest.openpage", false);
 user_pref("browser.urlbar.suggest.topsites", false); // [FF78+]
 /* 5011: disable location bar dropdown
  * This value controls the total number of entries to appear in the location bar dropdown ***/
    // user_pref("browser.urlbar.maxRichResults", 0);
 /* 5012: disable location bar autofill
  * [1] https://support.mozilla.org/kb/address-bar-autocomplete-firefox#w_url-autocomplete ***/
 user_pref("browser.urlbar.autoFill", false);
 /* 5013: disable browsing and download history
  * [NOTE] We also clear history and downloads on exit (2811)
  * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
    // user_pref("places.history.enabled", false);
 /* 5014: disable Windows jumplist [WINDOWS] ***/
 user_pref("browser.taskbar.lists.enabled", false);
 user_pref("browser.taskbar.lists.frequent.enabled", false);
 user_pref("browser.taskbar.lists.recent.enabled", false);
 user_pref("browser.taskbar.lists.tasks.enabled", false);
 /* 5016: discourage downloading to desktop
  * 0=desktop, 1=downloads (default), 2=custom
  * [SETTING] To set your custom default "downloads": General>Downloads>Save files to ***/
    // user_pref("browser.download.folderList", 2);
 /* 5017: disable Form Autofill
  * If .supportedCountries includes your region (browser.search.region) and .supported
  * is "detect" (default), then the UI will show. Stored data is not secure, uses JSON
  * [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
  * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
 user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
 user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
 /* 5018: limit events that can cause a pop-up ***/
    // user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");
 /* 5019: disable page thumbnail collection ***/
 user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]
 /* 5020: disable Windows native notifications and use app notications instead [FF111+] [WINDOWS] ***/
    // user_pref("alerts.useSystemBackend.windows.notificationserver.enabled", false);
 /* 5021: disable location bar using search
  * Don't leak URL typos to a search engine, give an error message instead
  * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
  * [NOTE] This does not affect explicit user action such as using search buttons in the
  * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo) ***/
 user_pref("keyword.enabled", false);

 /* 7001: disable APIs
  * Location-Aware Browsing, Full Screen
  * [WHY] The API state is easily fingerprintable.
  * Geo is behind a prompt (7002). Full screen requires user interaction ***/
 user_pref("geo.enabled", false);

// My own:
user_pref("browser.download.panel.shown", true);
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref("browser.newtabpage.activity-stream.floorp.newtab.backdrop.blur.disable", true);
user_pref("browser.newtabpage.activity-stream.floorp.newtab.imagecredit.hide", true);
user_pref("browser.newtabpage.activity-stream.floorp.newtab.releasenote.hide", true);
user_pref("browser.newtabpage.activity-stream.improvesearch.topSiteSearchShortcuts.havePinned", "google");
user_pref("browser.newtabpage.activity-stream.showSearch", false);
user_pref("browser.newtabpage.pinned", "");
user_pref("browser.search.separatePrivateDefault", false);
user_pref("browser.tabs.warnOnClose", false);
user_pref("browser.urlbar.placeholderName", "Startpage");
user_pref("browser.urlbar.placeholderName.private", "Startpage");
user_pref("browser.urlbar.shortcuts.bookmarks", false);
user_pref("browser.urlbar.shortcuts.history", false);
user_pref("browser.urlbar.shortcuts.tabs", false);
user_pref("browser.urlbar.suggest.engines", false);
user_pref("browser.urlbar.suggest.openpage", false);
user_pref("browser.urlbar.suggest.topsites", false);
user_pref("doh-rollout.disable-heuristics", true);
user_pref("floorp.browser.nora.csk.data", "{}");
user_pref("floorp.browser.sidebar.enable", false);
user_pref("floorp.browser.sidebar.is.displayed", false);
user_pref("floorp.browser.sidebar.right", false);
user_pref("floorp.browser.sidebar.useIconProvider", "duckduckgo");
user_pref("floorp.browser.tabs.openNewTabPosition", 0);
user_pref("floorp.browser.workspace.showWorkspaceName", false);
user_pref("floorp.browser.workspaces.enabled", false);
user_pref("floorp.chrome.theme.mode", 1);
user_pref("floorp.delete.browser.border", true);
user_pref("floorp.disable.fullscreen.notification", true);
user_pref("floorp.download.notification", 2);
user_pref("floorp.legacy.dlui.enable", true);
user_pref("floorp.lepton.interface", 1);
user_pref("floorp.search.top.mode", true);
user_pref("general.autoScroll", false);
user_pref("pref.privacy.disable_button.cookie_exceptions", false);
user_pref("privacy.donottrackheader.enabled", true);
user_pref("ui.systemUsesDarkTheme", 1);
user_pref("userChrome.icon.panel_full", false);
user_pref("userChrome.icon.panel_photon", true);
user_pref("userChrome.rounding.square_tab", true);
user_pref("userChrome.tab.bottom_rounded_corner", false);
user_pref("userChrome.tab.dynamic_separator", false);
user_pref("userChrome.tab.lepton_like_padding", false);
user_pref("userChrome.tab.newtab_button_like_tab", false);
user_pref("userChrome.tab.newtab_button_smaller", true);
user_pref("userChrome.tab.photon_like_contextline", true);
user_pref("userChrome.tab.photon_like_padding", true);
user_pref("userChrome.tab.static_separator", true);
user_pref("browser.uiCustomization.state", "{\"placements\":{\"widget-overflow-fixed-list\":[],\"unified-extensions-area\":[],\"nav-bar\":[\"back-button\",\"forward-button\",\"stop-reload-button\",\"home-button\",\"customizableui-special-spring1\",\"urlbar-container\",\"customizableui-special-spring2\",\"downloads-button\",\"fxa-toolbar-menu-button\",\"unified-extensions-button\",\"dwlfirefox_devolutions_net-browser-action\"],\"toolbar-menubar\":[\"menubar-items\"],\"TabsToolbar\":[\"firefox-view-button\",\"tabbrowser-tabs\",\"new-tab-button\",\"alltabs-button\"],\"PersonalToolbar\":[\"personal-bookmarks\"],\"statusBar\":[\"screenshot-button\",\"fullscreen-button\",\"status-text\"]},\"seen\":[\"developer-button\",\"sidebar-reverse-position-toolbar\",\"undo-closed-tab\",\"profile-manager\",\"dwlfirefox_devolutions_net-browser-action\"],\"dirtyAreaCache\":[\"nav-bar\",\"statusBar\",\"PersonalToolbar\",\"toolbar-menubar\",\"TabsToolbar\",\"unified-extensions-area\"],\"currentVersion\":19,\"newElementCount\":3}");
user_pref("browser.uidensity", 1);
user_pref("floorp.newtab.overrides.newtaburl", "https://www.startpage.com/do/mypage.pl?prfe=b1c1900c2cfd73603ac4d1a7d98a987dde7b1cf345206497a62c5d546801bda1b9e7bb0d91e763990790f59c101b15109d1f3e655f6fe39328c09331547b0a4d01dfa16e6ccabb006d55789f79a8");
user_pref("browser.toolbars.bookmarks.visibility", "never");
user_pref("browser.display.statusbar", false);
user_pref("taskbar.grouping.useprofile", true);
