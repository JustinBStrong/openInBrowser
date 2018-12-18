/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */


define(function (require, exports, module) {
    "use strict";
    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        NativeApp = brackets.getModule("utils/NativeApp"),
        ProjectManager = brackets.getModule("project/ProjectManager"),
        Commands = brackets.getModule("command/Commands"),
        PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
        prefs = PreferencesManager.getExtensionPrefs("OpenInBrowser");

    function handleOpenInBrowser() {
        if (prefs.get("SaveFileBeforeOpening")) {
            CommandManager.execute("file.save");
        }
        var doc = ProjectManager.getSelectedItem();
        if (doc) {
            //console.log(doc._path);
            var path = "file://" + doc._path;
            var finalPath = path.replace(/\s/g, "%20");
            //console.log(path);
            //console.log(finalPath);
            NativeApp.openURLInDefaultBrowser(finalPath);
        } else {
            console.log("error 1");
        }
    }

    var openInBrowser = "strong.justin.openinbrowser";
    CommandManager.register("Open in Browser", openInBrowser, handleOpenInBrowser);
    var workingsetMenu = Menus.getContextMenu(Menus.ContextMenuIds.WORKING_SET_CONTEXT_MENU);
    workingsetMenu.addMenuItem(openInBrowser, "Ctrl-2");

    //This sets the default preference for saving files before opening them. If this preference is changed to false files will no longer be saved before opening them.
    prefs.definePreference("SaveFileBeforeOpening", "boolean", true);
    if (prefs.get("SaveFileBeforeOpening")) {
        prefs.set("SaveFileBeforeOpening", true)
    }
    prefs.save();
});
