/* 0103: set HOME+NEWWINDOW page
  * about:home=Firefox Home (default, see 0105), custom URL, about:blank
  * [SETTING] Home>New Windows and Tabs>Homepage and new windows ***/
user_pref("browser.startup.homepage", "chrome://browser/content/places/places.xhtml");
/* 0710: enable DNS-over-HTTPS (DoH) [FF60+]
 * 0=default, 2=increased (TRR (Trusted Recursive Resolver) first), 3=max (TRR only), 5=off (no rollout)
 * see "doh-rollout.home-region": USA 2019, Canada 2021, Russia/Ukraine 2022 [3]
 * [SETTING] Privacy & Security>DNS over HTTPS
 * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
 * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
 * [3] https://support.mozilla.org/en-US/kb/firefox-dns-over-https
 * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
user_pref("network.trr.mode", 3);
/* 0712: set DoH provider
 * The custom uri is the value shown when you "Choose provider>Custom>"
 * [NOTE] If you USE custom then "network.trr.uri" should be set the same
 * [SETTING] Privacy & Security>DNS over HTTPS>Increased/Max>Choose provider ***/
user_pref("network.trr.uri", "https://adg.4tw.dk/dns-query");
user_pref("network.trr.custom_uri", "https://adg.4tw.dk/dns-query");
/* 0810: disable search and form history
 * [SETUP-WEB] Be aware that autocomplete form data can be read by third parties [1][2]
 * [NOTE] We also clear formdata on exit (2811)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
 * [2] https://bugzilla.mozilla.org/381681 ***/
user_pref("browser.formfill.enable", false);
/* 0815: disable tab-to-search [FF85+]
 * Alternatively, you can exclude on a per-engine basis by unchecking them in Options>Search
 * [SETTING] Search>Address Bar>When using the address bar, suggest>Search engines ***/
user_pref("browser.urlbar.suggest.engines", false);
/* 0830: enable separate default search engine in Private Windows and its UI setting
 * [SETTING] Search>Default Search Engine>Choose a different default search engine for Private Windows only ***/
user_pref("browser.search.separatePrivateDefault", false); // [FF70+]
user_pref("browser.search.separatePrivateDefault.ui.enabled", false); // [FF71+]
/* 0906: enforce no automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
 * [SETTING] Privacy & Security>Logins and Passwords>Allow Windows single sign-on for...
 * [1] https://support.mozilla.org/kb/windows-sso ***/
user_pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]
/* 1703: set external links to open in site-specific containers [FF123+]
 * [SETUP-WEB] Depending on your container extension(s) and their settings
 * true=Firefox will not choose a container (so your extension can)
 * false=Firefox will choose the container/no-container (default)
 * [1] https://bugzilla.mozilla.org/1874599 ***/
user_pref("browser.link.force_default_user_context_id_for_external_opens", false);
/** DOWNLOADS ***/
/* 2651: enable user interaction for security by always asking where to download
 * [SETUP-CHROME] On Android this blocks longtapping and saving images
 * [SETTING] General>Downloads>Always ask you where to save files ***/
user_pref("browser.download.useDownloadDir", true);
/* 2654: enable user interaction for security by always asking how to handle new mimetypes [FF101+]
 * [SETTING] General>Files and Applications>What should Firefox do with other files ***/
user_pref("browser.download.always_ask_before_handling_new_types", false);
/*** [SECTION 2800]: SHUTDOWN & SANITIZING ***/
//user_pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/* 2810: enable Firefox to clear items on shutdown
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes | Settings ***/
user_pref("privacy.sanitize.sanitizeOnShutdown", true);

/** SANITIZE ON SHUTDOWN: IGNORES "ALLOW" SITE EXCEPTIONS | v2 migration is FF128+ ***/
/* 2811: set/enforce what items to clear on shutdown (if 2810 is true) [SETUP-CHROME]
 * [NOTE] If "history" is true, downloads will also be cleared ***/
user_pref("privacy.clearOnShutdown.cache", true);     // [DEFAULT: true]
user_pref("privacy.clearOnShutdown_v2.cache", true);  // [FF128+] [DEFAULT: true]
user_pref("privacy.clearOnShutdown.downloads", true); // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.formdata", true);  // [DEFAULT: true]
user_pref("privacy.clearOnShutdown.history", false);   // [DEFAULT: true]
user_pref("privacy.clearOnShutdown_v2.historyFormDataAndDownloads", false); // [FF128+] [DEFAULT: true]
// user_pref("privacy.clearOnShutdown.siteSettings", false); // [DEFAULT: false]
// user_pref("privacy.clearOnShutdown_v2.siteSettings", false); // [FF128+] [DEFAULT: false]
/* 2812: set Session Restore to clear on shutdown (if 2810 is true) [FF34+]
 * [NOTE] Not needed if Session Restore is not used (0102) or it is already cleared with history (2811)
 * [NOTE] If true, this prevents resuming from crashes (also see 5008) ***/
// user_pref("privacy.clearOnShutdown.openWindows", true);

/** SANITIZE ON SHUTDOWN: RESPECTS "ALLOW" SITE EXCEPTIONS FF103+ | v2 migration is FF128+ ***/
/* 2815: set "Cookies" and "Site Data" to clear on shutdown (if 2810 is true) [SETUP-CHROME]
 * [NOTE] Exceptions: A "cookie" block permission also controls "offlineApps" (see note below).
 * serviceWorkers require an "Allow" permission. For cross-domain logins, add exceptions for
 * both sites e.g. https://www.youtube.com (site) + https://accounts.google.com (single sign on)
 * [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
 * [NOTE] "sessions": Active Logins (has no site exceptions): refers to HTTP Basic Authentication [1], not logins via cookies
 * [WARNING] Be selective with what sites you "Allow", as they also disable partitioning (1767271)
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow (when on the website in question)
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings
 * [1] https://en.wikipedia.org/wiki/Basic_access_authentication ***/
user_pref("privacy.clearOnShutdown.cookies", false); // Cookies
user_pref("privacy.clearOnShutdown.offlineApps", true); // Site Data
user_pref("privacy.clearOnShutdown.sessions", false);  // Active Logins [DEFAULT: true]
user_pref("privacy.clearOnShutdown_v2.cookiesAndStorage", false); // Cookies, Site Data, Active Logins [FF128+]

/** SANITIZE SITE DATA: IGNORES "ALLOW" SITE EXCEPTIONS ***/
/* 2820: set manual "Clear Data" items [SETUP-CHROME] [FF128+]
 * Firefox remembers your last choices. This will reset them when you start Firefox
 * [SETTING] Privacy & Security>Browser Privacy>Cookies and Site Data>Clear Data ***/
user_pref("privacy.clearSiteData.cache", true);
user_pref("privacy.clearSiteData.cookiesAndStorage", false); // keep false until it respects "allow" site exceptions
user_pref("privacy.clearSiteData.historyFormDataAndDownloads", true);
// user_pref("privacy.clearSiteData.siteSettings", false);

/** SANITIZE HISTORY: IGNORES "ALLOW" SITE EXCEPTIONS | clearHistory migration is FF128+ ***/
/* 2830: set manual "Clear History" items, also via Ctrl-Shift-Del [SETUP-CHROME]
 * Firefox remembers your last choices. This will reset them when you start Firefox
 * [NOTE] Regardless of what you set "downloads" to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as "history"
 * [SETTING] Privacy & Security>History>Custom Settings>Clear History ***/
user_pref("privacy.cpd.cache", true);    // [DEFAULT: true]
user_pref("privacy.clearHistory.cache", true);
user_pref("privacy.cpd.formdata", true); // [DEFAULT: true]
user_pref("privacy.cpd.history", false);  // [DEFAULT: true]
// user_pref("privacy.cpd.downloads", true); // not used, see note above
user_pref("privacy.clearHistory.historyFormDataAndDownloads", true);
user_pref("privacy.cpd.cookies", false);
user_pref("privacy.cpd.sessions", true); // [DEFAULT: true]
user_pref("privacy.cpd.offlineApps", false); // [DEFAULT: false]
user_pref("privacy.clearHistory.cookiesAndStorage", false);
// user_pref("privacy.cpd.openWindows", false); // Session Restore
// user_pref("privacy.cpd.passwords", false);
// user_pref("privacy.cpd.siteSettings", false);
// user_pref("privacy.clearHistory.siteSettings", false);

/** SANITIZE MANUAL: TIMERANGE ***/
/* 2840: set "Time range to clear" for "Clear Data" (2820) and "Clear History" (2830)
 * Firefox remembers your last choice. This will reset the value when you start Firefox
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
 * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
 * which will display a blank value, and are not guaranteed to work ***/
//user_pref("privacy.sanitize.timeSpan", 0);
//user_pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");

/* 4501: enable RFP
 * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a canvas site exception via the urlbar.
 * RFP also has a few side effects: mainly timezone is UTC, and websites will prefer light theme
 * [NOTE] pbmode applies if true and the original pref is false
 * [1] https://bugzilla.mozilla.org/418986 ***/
user_pref("privacy.resistFingerprinting", true); // [FF41+]
// user_pref("privacy.resistFingerprinting.pbmode", true); // [FF114+]
/* 4502: set new window size rounding max values [FF55+]
 * [SETUP-CHROME] sizes round down in hundreds: width to 200s and height to 100s, to fit your screen
 * [1] https://bugzilla.mozilla.org/1330882 ***/
user_pref("privacy.window.maxInnerWidth", 16000);
user_pref("privacy.window.maxInnerHeight", 9000);
/* 4503: disable mozAddonManager Web API [FF57+]
 * [NOTE] To allow extensions to work on AMO, you also need 2662
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
/* 4504: enable RFP letterboxing [FF67+]
 * Dynamically resizes the inner window by applying margins in stepped ranges [2]
 * If you use the dimension pref, then it will only apply those resolutions.
 * The format is "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000")
 * [SETUP-WEB] This is independent of RFP (4501). If you're not using RFP, or you are but
 * dislike the margins, then flip this pref, keeping in mind that it is effectively fingerprintable
 * [WARNING] DO NOT USE: the dimension pref is only meant for testing
 * [1] https://bugzilla.mozilla.org/1407366
 * [2] https://hg.mozilla.org/mozilla-central/rev/6d2d7856e468#l2.32 ***/
user_pref("privacy.resistFingerprinting.letterboxing", false); // [HIDDEN PREF]
// user_pref("privacy.resistFingerprinting.letterboxing.dimensions", ""); // [HIDDEN PREF]
/* 4505: experimental RFP [FF91+]
 * [WARNING] DO NOT USE unless testing, see [1] comment 12
 * [1] https://bugzilla.mozilla.org/1635603 ***/
// user_pref("privacy.resistFingerprinting.exemptedDomains", "*.example.invalid");
/* 4506: disable RFP spoof english prompt [FF59+]
 * 0=prompt, 1=disabled, 2=enabled (requires RFP)
 * [NOTE] When changing from value 2, preferred languages ('intl.accept_languages') is not reset.
 * [SETUP-WEB] when enabled, sets 'en-US, en' for displaying pages and 'en-US' as locale.
 * [SETTING] General>Language>Choose your preferred language for displaying pages>Choose>Request English... ***/
user_pref("privacy.spoof_english", 1);
/* 4510: disable using system colors
 * [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors ***/
user_pref("browser.display.use_system_colors", false); // [DEFAULT: false NON-WINDOWS]
/* 4511: enforce non-native widget theme
 * Security: removes/reduces system API calls, e.g. win32k API [1]
 * Fingerprinting: provides a uniform look and feel across platforms [2]
 * [1] https://bugzilla.mozilla.org/1381938
 * [2] https://bugzilla.mozilla.org/1411425 ***/
user_pref("widget.non-native-theme.enabled", true); // [DEFAULT: true]
/* 4512: enforce links targeting new windows to open in a new tab instead
 * 1=most recent window or tab, 2=new window, 3=new tab
 * Stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window
 * [SETTING] General>Tabs>Open links in tabs instead of new windows
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/9881 ***/
user_pref("browser.link.open_newwindow", 3); // [DEFAULT: 3]
/* 4513: set all open window methods to abide by "browser.link.open_newwindow" (4512)
 * [1] https://searchfox.org/mozilla-central/source/dom/tests/browser/browser_test_new_window_from_content.js ***/
user_pref("browser.link.open_newwindow.restriction", 0);
/* 4520: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] If you need it then override it. RFP still randomizes canvas for naive scripts ***/
user_pref("webgl.disabled", true);

/*** [SECTION 5000]: OPTIONAL OPSEC
   Disk avoidance, application data isolation, eyeballs...
***/
//user_pref("_user.js.parrot", "5000 syntax error: the parrot's taken 'is last bow");
/* 5002: disable memory cache
 * capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kibibytes ***/
user_pref("browser.cache.memory.enable", false);
user_pref("browser.cache.memory.capacity", 0);
/* 5003: disable saving passwords
 * [NOTE] This does not clear any passwords already saved
 * [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites ***/
user_pref("signon.rememberSignons", false);
/* 5010: disable location bar suggestion types
* [SETTING] Search>Address Bar>When using the address bar, suggest ***/
user_pref("browser.urlbar.suggest.history", true);
user_pref("browser.urlbar.suggest.bookmark", true);
user_pref("browser.urlbar.suggest.openpage", false);
user_pref("browser.urlbar.suggest.topsites", false); // [FF78+]
/* 5012: disable location bar autofill
 * [1] https://support.mozilla.org/kb/address-bar-autocomplete-firefox#w_url-autocomplete ***/
user_pref("browser.urlbar.autoFill", false);
/* 5013: disable browsing and download history
 * [NOTE] We also clear history and downloads on exit (2811)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
user_pref("places.history.enabled", true);
/* 5014: disable Windows jumplist [WINDOWS] ***/
user_pref("browser.taskbar.lists.enabled", true);
user_pref("browser.taskbar.lists.frequent.enabled", false);
user_pref("browser.taskbar.lists.recent.enabled", true);
user_pref("browser.taskbar.lists.tasks.enabled", false);
/* 5016: discourage downloading to desktop
 * 0=desktop, 1=downloads (default), 2=custom
 * [SETTING] To set your custom default "downloads": General>Downloads>Save files to ***/
user_pref("browser.download.folderList", 1);
/* 5017: disable Form Autofill
* If .supportedCountries includes your region (browser.search.region) and .supported
* is "detect" (default), then the UI will show. Stored data is not secure, uses JSON
* [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
* [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
/* 5021: disable location bar using search
* Don't leak URL typos to a search engine, give an error message instead
* Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
* [NOTE] This does not affect explicit user action such as using search buttons in the
* dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo) ***/
user_pref("keyword.enabled", true);
/* 9004: disable search terms [FF110+]
* [SETTING] Search>Search Bar>Use the address bar for search and navigation>Show search terms instead of URL... ***/
user_pref("browser.urlbar.showSearchTerms.enabled", true);
/* 7015: enable the DNT (Do Not Track) HTTP header
 * [WHY] DNT is enforced with Tracking Protection which is used in ETP Strict (2701) ***/
user_pref("privacy.donottrackheader.enabled", true);


// My own:
user_pref("browser.startup.homepage", "chrome://browser/content/places/places.xhtml");
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
user_pref("network.http.windows-sso.enabled", true);
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
user_pref("browser.uiCustomization.state", "{\"placements\":{\"widget-overflow-fixed-list\":[],\"unified-extensions-area\":[],\"nav-bar\":[\"back-button\",\"forward-button\",\"stop-reload-button\",\"home-button\",\"customizableui-special-spring1\",\"urlbar-container\",\"customizableui-special-spring2\",\"downloads-button\",\"fxa-toolbar-menu-button\",\"unified-extensions-button\"],\"toolbar-menubar\":[\"menubar-items\"],\"TabsToolbar\":[\"firefox-view-button\",\"tabbrowser-tabs\",\"new-tab-button\",\"alltabs-button\"],\"PersonalToolbar\":[\"personal-bookmarks\"],\"statusBar\":[\"screenshot-button\",\"fullscreen-button\",\"status-text\"]},\"seen\":[\"developer-button\",\"sidebar-reverse-position-toolbar\",\"undo-closed-tab\",\"profile-manager\"],\"dirtyAreaCache\":[\"nav-bar\",\"statusBar\",\"PersonalToolbar\",\"toolbar-menubar\",\"TabsToolbar\"],\"currentVersion\":19,\"newElementCount\":3}");
user_pref("browser.uidensity", 1);
user_pref("floorp.newtab.overrides.newtaburl", "https://www.startpage.com/do/mypage.pl?prfe=b1c1900c2cfd73603ac4d1a7d98a987dde7b1cf345206497a62c5d546801bda1b9e7bb0d91e763990790f59c101b15109d1f3e655f6fe39328c09331547b0a4d01dfa16e6ccabb006d55789f79a8");
user_pref("browser.toolbars.bookmarks.visibility", "never");
user_pref("browser.display.statusbar", false);
//user_pref("taskbar.grouping.useprofile", true);