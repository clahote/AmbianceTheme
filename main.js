/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    'use strict';
    
    // Brackets modules
    var CommandManager          = brackets.getModule("command/CommandManager"),
        DocumentManager         = brackets.getModule("document/DocumentManager"),
        ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),
        Menus                   = brackets.getModule("command/Menus");
    
    // Load the theme stylesheet
    ExtensionUtils.loadStyleSheet(module, "ambiance.css");

    var themeName = null;
    
    // Assigne the theme to the editor.
    function setTheme() {
        var name = themeName || "default";
        var currentDoc = DocumentManager.getCurrentDocument();
        
        if (currentDoc) {
            currentDoc._masterEditor._codeMirror.setOption("theme", name);
        }
    }
    
    // Whenever a new document is opened, make sure the theme is set
    $(DocumentManager).on("currentDocumentChange", function () {
        setTheme();
    });
    
    var COMMAND_ID = "theme.ambiance";

    function toggleTheme() {
        var checked = false;
        if (themeName) {
            themeName = null;
        } else {
            themeName = "ambiance";
            checked = true;
        }
        setTheme();
        CommandManager.get(COMMAND_ID).setChecked(checked);
    }
    
    // Add menu item
    CommandManager.register("Ambiance Theme", COMMAND_ID, toggleTheme);
    
    var menu = Menus.getMenu(Menus.AppMenuBar.DEBUG_MENU);
    menu.addMenuItem("debug-ambiance-theme", COMMAND_ID);
});
