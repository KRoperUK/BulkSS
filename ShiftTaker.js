// const shiftURL = "https://staff.guildofstudents.com/shifts/available";
wantedShifts = [];

var i;


async function automateTake(shiftInt) {
    // confirmShift(shiftInt);
    // takeShift(shiftInt);
    // location.href = shiftURL;
    const response = await fetch(`https://staff.guildofstudents.com/ajax/list-covershifts.php?take=${shiftInt}&type=get`);
    const data = await response.text();
    console.log(`Took shift ${shiftInt}`);
    wantedAcceptFromDom(shiftInt);
    return data;
}

function wantedAddToDom(shiftInt) {
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].style.backgroundColor = "red";
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].innerHTML = "Remove from List";

}

// function confirmShift(shift){
    // $('#dialog').load('/modal/confirm_take_shift.php', {'shift':shift}).sb_dialog();
// }

// function takeShift(shift){
//     $('#dialog').foundation('close');
    
//     $('#covershifts').html('<div class="callout warning">Please wait... confirming shift and loading any other shifts you can take...</div>').load('/ajax/list-covershifts.php',{'take':shift, type:'get'}, function(response, status, xhr){
           

//         }
//       );
//   }

function wantedRemoveFromDom(shiftInt) {
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].style.backgroundColor = "green";
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].innerHTML = "Add to List";

}
function wantedAcceptFromDom(shiftInt) {
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].style.backgroundColor = "grey";
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].setAttribute("disabled", "disabled");
    document.querySelectorAll(`#takeShift-${shiftInt}`)[1].innerHTML = "Accepted";
    
}

function addToWanted(shiftInt) {
    if (wantedShifts.includes(shiftInt)) {
        console.log(`Removing shift ${shiftInt}`);
        wantedShifts.splice(wantedShifts.indexOf(shiftInt), 1);
        wantedRemoveFromDom(shiftInt);
        console.log(wantedShifts);
    } else {
        console.log(`Adding shift ${shiftInt}`);
        wantedShifts.push(shiftInt);
        wantedAddToDom(shiftInt);
        console.log(wantedShifts);
    }
    
    document.getElementById("progress").innerText = `${wantedShifts.length} shifts selected.`;
    saveWantedShifts();
}

for (wantedShift of wantedShifts) {
    console.log(`Wanted shift: ${wantedShift}`);
}

function restoreWantedShifts() {
    if (localStorage.getItem("wantedShifts") != null) {
        wantedShifts = JSON.parse(localStorage.getItem("wantedShifts"));

        for (wantedShift of wantedShifts) {
            try {
                wantedAddToDom(wantedShift);
            } catch (error) {
                console.log(`[ERROR] Could not restore wanted shift: ${wantedShift}, ${error} `);
            }
        }

        console.log("Restored wanted shifts");
        console.log(wantedShifts);
        document.getElementById("progress").innerText = `${wantedShifts.length} shifts selected.`;


    }
}

function saveWantedShifts() {
    localStorage.setItem("wantedShifts", JSON.stringify(wantedShifts));
    console.log("Saved wanted shifts");
}

async function processWantedShifts() {
    processed = [];
    document.getElementById("progress").innerHTML = `Processing. ${wantedShifts.length} shifts left...`;
    for (wantedShift of wantedShifts) {
        console.log(`Processing wanted shift ${wantedShift}`);
        await automateTake(wantedShift);
        document.getElementById("progress").innerHTML = `Processing. ${wantedShifts.length} shifts left...`;
        console.log(`Processed wanted shift ${wantedShift}`);
        processed.push(wantedShift);
    }
    if (wantedShifts.length == 0) {
        console.log("No more shifts to process");
    }
    for (processedShift of processed) {
        wantedShifts.splice(wantedShifts.indexOf(processedShift), 1);
    }
    saveWantedShifts();
    document.getElementById("progress").innerHTML = `Processed`;
    console.log(`Processed wanted shift ${wantedShift}`);

}


function onInit() {
    
    saveButton = document.createElement("a");
    saveButton.id = "saveButton";
    saveButton.className = "button";
    saveButton.style.marginLeft = "1rem";
    saveButton.style.width = "6rem";
    saveButton.style.height = "3rem";
    saveButton.style.backgroundColor = "green";
    saveButton.href = `javascript:saveWantedShifts()`;
    saveButton.innerText = "Save List";
    
    processButton = document.createElement("a");
    processButton.id = "processButton";
    processButton.className = "button";
    processButton.style.marginLeft = "1rem";
    processButton.style.width = "6rem";
    processButton.style.height = "3rem";
    processButton.style.backgroundColor = "purple";
    processButton.href = `javascript:processWantedShifts()`;
    processButton.innerText = "Process List";
    
    progressSpan = document.createElement("span");
    progressSpan.id = "progress";
    progressSpan.style.marginLeft = "1rem";
    progressSpan.style.width = "10rem";
    progressSpan.style.borderStyle = "solid";
    progressSpan.style.borderWidth = "1px";
    progressSpan.style.borderColor = "black";
    progressSpan.innerText = "No shifts selected.";
    progressSpan.style.padding = "0.5rem";
    
    // document.getElementsByClassName('cell small-12')[3].getElementsByTagName('h1')[0].appendChild(saveButton);
    document.getElementsByClassName('cell small-12')[3].getElementsByTagName('h1')[0].appendChild(processButton);
    document.getElementsByClassName('cell small-12')[3].getElementsByTagName('h1')[0].appendChild(progressSpan);

    
    
    tableResults = document.getElementsByTagName("tr");
    for (tableResult of tableResults) {
        if (tableResult.getElementsByTagName("span").length < 1) {
            try {
                const shiftNumber = tableResult.getElementsByTagName("a")[1].href.match(/\d+/)[0];
                newButton = document.createElement("a");
                newButton.id="takeShift-" + shiftNumber;
                newButton.className = "button";
                newButton.style.width = "6rem";
                newButton.style.backgroundColor = "green";
                
                newButton.href=`javascript:addToWanted(${shiftNumber})`;
                newButton.innerText = "Add to List";
                
                tableResult.getElementsByClassName("button-group stacked-for-small")[0].appendChild(newButton);
            } catch (error) {
                console.log(error);
            }
        }
    }
    restoreWantedShifts();

}

onInit();