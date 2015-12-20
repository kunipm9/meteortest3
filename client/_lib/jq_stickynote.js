var afJqueryStickynoteNoteList = [];

afJqueryStickynoteNoteList_remove = function(id, note) {
//console.log("afJqueryStickynoteNoteList_remove");
//console.log("id");
//console.log(id);
    for(i = 0; i < afJqueryStickynoteNoteList[id].length; i++){
        if(afJqueryStickynoteNoteList[id][i].id == note.id){
            afJqueryStickynoteNoteList[id].splice(i,1);
        }
    }
};

AutoForm.addInputType("jquery-stickynote", {
    template: "afJqueryStickynote",
    valueOut: function () {
//console.log("valueOut jquery-stickynote");
//console.log("this");
//console.log(this);
        var id = this.context.id;
//console.log(afJqueryStickynoteNoteList);
        return JSON.stringify(afJqueryStickynoteNoteList[id]);
    },
    valueConverters: {
    }
});

Template.afJqueryStickynote.helpers({
});

Template.afJqueryStickynote.rendered = function () {
//console.log("Template.afJqueryStickynote.rendered");
//console.log("this");
//console.log(this);

//console.log("this.data");
//console.log(this.data);
    if (this.data.stickynote == null)  {

//console.log("setup ccoaStickyNote");

    var id = this.data.atts.id;

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
        noteDimension: { width: "200px", height: "64px" },
        noteText: "New custom note box!",
        noteHeaderText: "Note title!",
        deleteLinkText: "Close",
        startZIndex: 50,
        beforeCreatingNoteBox: function (note) {
            // Want to do any thing here?
        },
        onNoteBoxCreated: function (note) {
//console.log("afJqueryStickynoteNoteList");
//console.log("id");
//console.log(id);
//console.log("note");
//console.log(note);

            if (afJqueryStickynoteNoteList[id] == null) {
                afJqueryStickynoteNoteList[id] = [];
            }

//console.log("--------------");
            for(i = 0; i < afJqueryStickynoteNoteList[id].length; i++){
//console.log(afJqueryStickynoteNoteList[id][i]);
            }

            afJqueryStickynoteNoteList[id].push(note);
            // Let's save it on server
        },
        onNoteBoxHeaderUpdate: function (note) {
//console.log("onNoteBoxHeaderUpdate");
//console.log(note);
            afJqueryStickynoteNoteList_remove(id, note);
            afJqueryStickynoteNoteList[id].push(note);
            // Return false, if want to abort the request of header update.
            // Else let's save the updated header text on server, to preserve changes.
        },
        onNoteBoxTextUpdate: function (note) {
//console.log("onNoteBoxTextUpdate");
//console.log(note);
            afJqueryStickynoteNoteList_remove(id, note);
            afJqueryStickynoteNoteList[id].push(note);

            // We can also show confirm box here. Which is common while deleting some thing!
            // Return false, if want to abort the request of text update.
            // Else let's save the updated note text on server, to preserve changes.
        },
        onNoteBoxDelete: function (note) {
//console.log("onNoteBoxDelete");
//console.log(note);
            afJqueryStickynoteNoteList_remove(id, note);

            // Return false, if want to abort the note delete request .
            // Else let's delete the note details from server, to preserve changes.
        },
        onNoteBoxResizeStop: function (note) {
            afJqueryStickynoteNoteList_remove(id, note);
            afJqueryStickynoteNoteList[id].push(note);

            // Note box dimension got changed.
            // let's save the updated dimension(width/ height) on server, to preserve changes.
        },
        onNoteBoxDraggingStop: function (note) {
            afJqueryStickynoteNoteList_remove(id, note);
            afJqueryStickynoteNoteList[id].push(note);

            // Note box position got changed.
            // let's save the updated position(top/ left) on server, to preserve changes.
        },
        onThemeSelectionChange: function (note) {
            afJqueryStickynoteNoteList_remove(id, note);
            afJqueryStickynoteNoteList[id].push(note);

            // Note box theme got changed.
            // let's save the updated theme on server, to preserve changes.
        },
        onMovingNoteBoxOnTop: function (note) {
            afJqueryStickynoteNoteList_remove(id, note);
            afJqueryStickynoteNoteList[id].push(note);

            // Note box z-index got changed to be on top of all the notes.
            // let's save the updated the z-index on server, to preserve changes.
        },
    });

//console.log("$('.divStickyNotesContainer', $('#' + this.data.atts.id))");
    var val = this.data.value || "";
    
    var stickynote = $('.divStickyNotesContainer', $('#' + this.data.atts.id)).data('coaStickyNote');
    this.data.stickynote = stickynote;
    if (this.data.value.length > 0) {
        stickynote.loadExistingNotes(JSON.parse(this.data.value));
        afJqueryStickynoteNoteList[id] = JSON.parse(this.data.value);
//console.log(JSON.parse(this.data.value));
    }

    s_stickynote = stickynote;
}
};

Template.afJqueryStickynote.destroyed = function () {
//console.log("Template.afJqueryStickynote.destroyed");
//console.log(this.data.stickynote);
    if (this.data.stickynote != null) {
//        this.data.stickynote.destroy();
    }
    this.data.stickynote = null;
    afJqueryStickynoteNoteList = [];
};

Template.afJqueryStickynote.events({
    'blur .jq_stickynote_destroy': function(event) {
//console.log("click .jq_stickynote_destroy start");
//console.log(this);
        if (this.stickynote != null) {
            this.stickynote.destroyAll();
        }
        afJqueryStickynoteNoteList = [];
//console.log("click .jq_stickynote_destroy end");
    }
});
