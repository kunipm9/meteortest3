var afJqueryStickynoteNoteList = [];

AutoForm.addInputType("jquery-stickynote", {
  template: "afJqueryStickynote",
  valueOut: function () {
console.log("jquery-stickynote");
console.log(this.val());
    if (this.val()) {
console.log(this.context);
      return this.context.value;
    }
    return null;
  },
  valueConverters: {
  }
});

Template.afJqueryStickynote.helpers({
});

Template.afJqueryStickynote.rendered = function () {
console.log("Template.afJqueryStickynote.rendered");
console.log(data);

    // Advanced demo
    $('#divStickyNotesContainer').coaStickyNote({
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

    var data = this.data;
    loadExistingNotes(data);
};

Template.afJqueryStickynote.destroyed = function () {
};
