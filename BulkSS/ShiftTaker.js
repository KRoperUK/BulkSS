// const shiftURL = "https://staff.guildofstudents.com/shifts/available";
wantedShifts = [];

var i;

allShifts = [];


async function automateTake(shiftInt) {
    let shift = allShifts.filter(shift => shift.id == shiftInt)[0];
    // confirmShift(shiftInt);
    // takeShift(shiftInt);
    // location.href = shiftURL;
    if (shift.type == "available") {
        console.log(`[AutomatedTake] Taking shift ${shiftInt}`);
        const takePromise = fetch(`https://staff.guildofstudents.com/ajax/list-covershifts.php?take=${shiftInt}`);
        takePromise.then((response) => {
            wantedAcceptFromDom(shiftInt);
            console.log(`Took shift ${shiftInt}`);
            console.log(response);
            return response.text();
        });
    } else if (shift.type == "offered") {
        console.log(`[AutomatedTake] Cancelling shift ${shiftInt}`);
        const cancelPromise = fetch(`https://staff.guildofstudents.com/ajax/list-covershifts.php?canceloffer=${shiftInt}`);
        cancelPromise.then((response) => {
            wantedAcceptFromDom(shiftInt);
            console.log(`Cancelled shift ${shiftInt}`);
            console.log(response);
            return response.text();
        });
    } else {
        return null;
    }
}

function wantedAddToDom(shiftInt) {
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].style.backgroundColor = "red";
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].innerHTML = "Remove from List";

}

function wantedRemoveFromDom(shiftInt) {
    let shift = allShifts.filter(shift => shift.id == shiftInt)[0];
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].style.backgroundColor = (shift.type == "available" ? "green" : "red");
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].innerHTML = (shift.type == "available" ? "Add to List" : "Add to Cancel List");

}
function wantedAcceptFromDom(shiftInt) {
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].style.backgroundColor = "grey";
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].setAttribute("disabled", "disabled");
    document.querySelectorAll(`#takeShift-${shiftInt}`)[0].innerHTML = "Accepted";
    
}

function addToWanted(shiftInt) {
    if (wantedShifts.includes(shiftInt)) {
        console.log(`Removing shift ${shiftInt}`);
        wantedShifts.splice(wantedShifts.indexOf(shiftInt), 1);
        wantedRemoveFromDom(shiftInt);
        // console.log(wantedShifts);
    } else {
        console.log(`Adding shift ${shiftInt}`);
        wantedShifts.push(shiftInt);
        wantedAddToDom(shiftInt);
        // console.log(wantedShifts);
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
                if (allShifts.filter(shift => shift.id == wantedShift).length > 0) {
                    // Ensure saved wantedShift still exists
                    wantedAddToDom(wantedShift);
                } else {
                    // If it doesn't exist, remove it from the list and save again
                    wantedShifts.splice(wantedShifts.indexOf(wantedShift), 1);
                    console.log(`[INFO] Could not restore wanted shift: ${wantedShift}, shift no longer exists`);
                }
            } catch (error) {
                console.log(`[ERROR] Could not restore wanted shift: ${wantedShift}, ${error} `);
            }
        }

        saveWantedShifts();


        console.log("Restored wanted shifts");
        // console.log(wantedShifts);
        document.getElementById("progress").innerText = `${wantedShifts.length} shifts selected.`;


    }
}
function clearWantedShifts() {
    if (localStorage.getItem("wantedShifts") != null) {
        wantedShifts = JSON.parse(localStorage.getItem("wantedShifts"));
        localStorage.setItem("wantedShifts", JSON.stringify([]));

        for (wantedShift of wantedShifts) {
            try {
                wantedRemoveFromDom(wantedShift);
            } catch (error) {
                console.log(`[ERROR] Could not restore wanted shift: ${wantedShift}, ${error} `);
            }
        }

        wantedShifts = [];

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
    document.getElementById("progress").innerHTML = `Processed. Wait for all buttons to become Accepted`;
    console.log(`Processed wanted shift ${wantedShift}`);

}


function onInit() {
    
    clearButton = document.createElement("a");
    clearButton.id = "clearButton";
    clearButton.className = "button";
    clearButton.style.marginLeft = "1rem";
    clearButton.style.width = "6rem";
    clearButton.style.height = "3rem";
    clearButton.style.backgroundColor = "grey";
    clearButton.href = `javascript:clearWantedShifts()`;
    clearButton.innerText = "Clear List";
    
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
    document.getElementsByClassName('cell small-12')[3].getElementsByTagName('h1')[0].appendChild(clearButton);
    document.getElementsByClassName('cell small-12')[3].getElementsByTagName('h1')[0].appendChild(processButton);
    document.getElementsByClassName('cell small-12')[3].getElementsByTagName('h1')[0].appendChild(progressSpan);

    
    
    tableResults = document.getElementsByTagName("tr");
    for (tableResult of tableResults) {
        // For each row in the table
        shift = {};
        if(tableResult.getAttribute("data-shift")) {
            // If the talbe row has a shift id
            shift.id = tableResult.getAttribute("data-shift");
            // console.log(tableResult);
            // shift.id = tableResult.getElementsByTagName("a")[1].href.match(/\d+/)[0];
            shift.date = tableResult.getElementsByTagName("td")[0].innerText;
            shift.hours = tableResult.getElementsByTagName("td")[1].innerText;
            shift.role = tableResult.getElementsByTagName("td")[3].innerText;
            // shift.time = tableResult.getElementsByTagName("td")[1].innerText;
            // If the table does not have a span
            if (tableResult.getElementsByTagName("span").length > 1) {
                if (tableResult.getElementsByTagName("span")[0].innerText == "Offered to work") {
                    shift.type="offered";
                }
            } else if (tableResult.getElementsByTagName("span").length < 1) {
                shift.type="available";
            } else {
                shift.type="offered";
            }
            try {

                newButton = document.createElement("a");
                newButton.id="takeShift-" + shift.id;
                newButton.className = "button";
                newButton.style.width = "6rem";
                newButton.style.backgroundColor = (shift.type == "available" ? "green" : "red");
                
                newButton.href=`javascript:addToWanted(${shift.id})`;
                newButton.innerText = (shift.type == "available" ? "Add to List" : "Add to Cancel List");
                
                tableResult.getElementsByClassName("button-group stacked-for-small")[0].appendChild(newButton);
            } catch (error) {
                console.log(error);
            }
            allShifts.push(shift);
        }

    }
    restoreWantedShifts();

}

onInit();