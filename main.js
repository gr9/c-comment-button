/*!
 * Brackets c-comment-button 0.1
 * Dreamweaver style comments button for wrapping selected text in C style comments without using your keyboard
 *
 * @author Reece Griffin
 * @license none - steal this software!
 */
define( function( require, exports, module ) {
    'use strict';
    var AppInit = brackets.getModule( 'utils/AppInit' ),
        Document = brackets.getModule( 'document/Document' ),
        Editor = brackets.getModule( 'editor/Editor' ),
        EditorManager = brackets.getModule( 'editor/EditorManager' ),
        CommandManager = brackets.getModule( 'command/CommandManager' ),
        Commands = brackets.getModule( 'command/Commands' ),
        ExtensionUtils = brackets.getModule( 'utils/ExtensionUtils' ),
        $todoIcon = $( '<a href="#" title="Add/remove C style comments to/from selection." id="c-comment-button"></a>' );
    
    ExtensionUtils.loadStyleSheet( module, 'c-comment-button.css' );

    // Register extension.
    CommandManager.register( "Add / Remove C-Style Comment", "com.reecegriffin.c-comment-button.docomment", doComment );
    
    function doComment(){
        var ed = EditorManager.getCurrentFullEditor();
        var selection = ed.getSelection(), doc = ed.document,r;
        if((selection.start.line == selection.end.line) && (selection.start.ch == selection.end.ch)){//no current selection
            return;   
        }
        if((ed.getSelectedText().trim().indexOf("/*") == 0) && (ed.getSelectedText().trim().lastIndexOf("*/") == (ed.getSelectedText().trim().length-2))){//remove an existing comment
            r=ed.getSelectedText().substring(ed.getSelectedText().indexOf("/*")+2, ed.getSelectedText().lastIndexOf("*/"));
            doc.replaceRange(r, selection.start, selection.end);
        }else{
            doc.replaceRange("/*"+ed.getSelectedText()+"*/", selection.start, selection.end);
        }
    }
    
    AppInit.appReady( function() {

        // Add listener for toolbar icon..
        $todoIcon.click( function() {
            CommandManager.execute( "com.reecegriffin.c-comment-button.docomment" );
        } ).appendTo( '#main-toolbar .buttons' );

    } );
});