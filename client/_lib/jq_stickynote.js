var afJqueryStickynoteNoteList = new Array();

AutoForm.addInputType("jquery-stickynote", {
  template: "afJqueryStickynote",
  valueOut: function () {
console.log("jquery-stickynote");
console.log(afJqueryStickynoteNoteList);
    return JSON.stringify(afJqueryStickynoteNoteList);
  },
  valueConverters: {
  }
});

Template.afJqueryStickynote.helpers({
});

Template.afJqueryStickynote.rendered = function () {
console.log("Template.afJqueryStickynote.rendered");
console.log("this");
console.log(this);

    // Advanced demo
    $('.divStickyNotesContainer', $('#' + this.data.atts.id)).coaStickyNote({
        resizable: true,
        availableThemes: [
            { text: "Yellow", value: "sticky-note-yellow-theme" },
            { text: "Green", value: "sticky-note-green-theme" },
            { text: "Blue", value: "sticky-note-blue-theme" },
            { text: "Pink", value: "sticky-note-pink-theme" },
            { text: "Orange", value: "sticky-note-orange-theme" }],
        notePosition: { top: "100px", left: "50px" },
        noteDimension: { width: "300px", height: "300px" },
        noteText: "New custom note box!",
        noteHeaderText: "Note title!",
        deleteLinkText: "Close",
        startZIndex: 50,
        beforeCreatingNoteBox: function (note) {
            // Want to do any thing here?
        },
        onNoteBoxCreated: function (note) {
            afJqueryStickynoteNoteList.push(note);
            // Let's save it on server
        },
        onNoteBoxHeaderUpdate: function (note) {
            // Return false, if want to abort the request of header update.
            // Else let's save the updated header text on server, to preserve changes.
        },
        onNoteBoxTextUpdate: function (note) {
            // We can also show confirm box here. Which is common while deleting some thing!
            // Return false, if want to abort the request of text update.
            // Else let's save the updated note text on server, to preserve changes.
        },
        onNoteBoxDelete: function (note) {
            for(i = 0; i < noteList.length; i++){
                if(noteList[i] == note){
                    noteList.splice(i,1);
                }
            }
            // Return false, if want to abort the note delete request .
            // Else let's delete the note details from server, to preserve changes.
        },
        onNoteBoxResizeStop: function (note) {
            // Note box dimension got changed.
            // let's save the updated dimension(width/ height) on server, to preserve changes.
        },
        onNoteBoxDraggingStop: function (note) {
            // Note box position got changed.
            // let's save the updated position(top/ left) on server, to preserve changes.
        },
        onThemeSelectionChange: function (note) {
            // Note box theme got changed.
            // let's save the updated theme on server, to preserve changes.
        },
        onMovingNoteBoxOnTop: function (note) {
            // Note box z-index got changed to be on top of all the notes.
            // let's save the updated the z-index on server, to preserve changes.
        },
    });

console.log("$('.divStickyNotesContainer', $('#' + this.data.atts.id))");
console.log(this.data.value);
    
console.log(JSON.parse(this.data.value));

    var stickynote = $('.divStickyNotesContainer', $('#' + this.data.atts.id)).data('coaStickyNote');
    if (this.data.value != null) {
        stickynote.loadExistingNotes(JSON.parse(this.data.value));
    }
    this.data.stickynote = stickynote;

};

Template.afJqueryStickynote.destroyed = function () {
    if (this.data.stickynote != null) {
        this.data.stickynote.destroy();
    }
};
