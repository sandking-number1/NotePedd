var notesContainer = document.getElementById("notesContainer");
var notesCreatedCount = 0;
var viewerCreatedCount = 0;
var tempString = "";
var offsetX = 0;
var offsetY = 0;
var isDragging = false;
var tempBind;
var lastClickedID = "viewerbar-0";

function generateNoteView(element, index, array){
	tempString += "<textarea class='note' id='note-" + element.id + "' width=300 height=200>" + element.content + "</textarea>";
}

function generateNoteTab(element, index, array){
	tempString += "<a class='notetab' id='notetab-" + element.id +"'>" + element.name +"</a>"
}

function Note(){
	this.id = notesCreatedCount;
	this.content = "random notes";
	this.name = "Note " + this.id;
}

function NoteViewer(notelist){
    this.noteList = notelist;
    this.width = 300;
    this.height = 300;
    this.zIndex = 0;
	
    tempString = "<div class='noteviewer' id='viewer-" + viewerCreatedCount + "'><div class='viewerbar' id='viewerbar-" + viewerCreatedCount + "'></div><div class='viewertabs' id='viewertabs-" + viewerCreatedCount + "'>";
    notelist.forEach(generateNoteTab);
    tempString += "</div>";
    notelist.forEach(generateNoteView);
    tempString += "</div>";
    notesContainer.innerHTML += tempString;

    //document.getElementById("viewerbar-" + viewerCreatedCount).style.zIndex = 0;
	
	for (var i = 0; i < notelist.length; i++){
		console.log(document.getElementById('notetab-' + notelist[i].id));
		document.getElementById('notetab-' + notelist[i].id).addEventListener('mousedown', noteTabMouseDown);
	}
	
    for (var i = 0; i < viewerCreatedCount + 1; i++){
        document.getElementById("viewerbar-" + i).addEventListener('mousedown', viewerBarMouseDown);
        document.getElementById("viewerbar-" + i).addEventListener('mouseup', viewerBarMouseUp);
    }
	
	//document.getElementById().addEventListener( "contextmenu", viewerContextMenu);
}

NoteViewer.prototype.minimize = function(){
	
};

NoteViewer.prototype.maximize = function(){
	
};

function noteTabMouseDown(evt){
	console.log("Note tab was clicked on");
	// childElement = this;
	//console.log(this);
}

function viewerContextMenu(evt){
	evt.preventDefault();
	
}

function viewerBarMouseDown(evt) {
    var viewer = document.getElementById("viewer-" + noteManager.getIndexFromID(this.id));
    document.getElementById("viewer-" + noteManager.getIndexFromID(lastClickedID)).style.zIndex = 4;
    lastClickedID = this.id;
    viewer.style.zIndex = "5";
	if (!isDragging){
		//console.log(viewer);
		var temp = viewer.getBoundingClientRect();
		offsetX = evt.clientX - temp.left;
		offsetY = evt.clientY - temp.top;
		isDragging = true;
		tempBind = dragViewer.bind(null, viewer);
		document.addEventListener("mousemove", tempBind);
	}
}

function dragViewer(viewer, evt){
	if (isDragging){
		viewer.style.left = evt.clientX - offsetX + "px";
		viewer.style.top = evt.clientY - offsetY + "px";
	}
}

function viewerBarMouseUp(evt){
	if (isDragging){
	    isDragging = false;

	    var viewer = document.getElementById("viewer-" + noteManager.getIndexFromID(this.id));
	    document.removeEventListener("mousemove", tempBind);
		//noteManager.getViewerFromID(this.id);
	}
};

var noteManager = {
	noteLists: [],
	viewerLists: [],
	
	newNote: function(){
		var newNote = new Note();
		this.noteLists.push(new Note)
		notesCreatedCount++;
		
		this.newViewer([newNote]);
	},
	
	newViewer: function(notes){
		this.viewerLists.push(new NoteViewer(notes));
		viewerCreatedCount++;
	},
	
	mergeViewer: function(){
		
	},
	
	dragNote: function(){
		
	},
	
	getIndexFromID(id){
		return parseInt(id.slice(id.indexOf("-") + 1));
	}
};

