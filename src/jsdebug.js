const logLevels = {
    "error": "Error",
    "warn": "Warning",
    "info": "Info",
    "debug": "Debug",
    "log": "No level",
}

class HTMLLogger {

    constructor(logEntriesContainerElement) {
        // entries
        this._entriesContainer = logEntriesContainerElement;
        this.entriesContainer;
        this.id = 0;
        // levelsController
        this._levelsController;
        this._selectedLevelsElement;
        this.selectedLevels = [];
        for (const level in logLevels) {
            this.selectedLevels.push(level);
        }
    }

    // Log entries

    _log(content, level="log"){

        if (this.id == 0) {
            this.entriesContainer = document.createElement("div");
            this.entriesContainer.classList.add("accordion");
            this.entriesContainer.classList.add("accordion-flush");
            this._entriesContainer.appendChild(this.entriesContainer);
        }

        let p = document.createElement("p");
        p.classList.add("log-" + level);
        p.classList.add("m-1");
        p.classList.add("font-monospace");
        let faIcon;
        switch (level) {
            case "error":
                faIcon = "fa-circle-xmark";
                break;
            case "warn":
                faIcon = "fa-triangle-exclamation";
                break;
            case "info":
                faIcon = "fa-circle-info";
                break;
            case "debug":
                faIcon = "fa-code";
                break;
            default:
                faIcon = "fa-comment";
        }

        if (this.selectedLevels.indexOf(level) == -1) {
            p.classList.add("d-none");
        }

        let levelString = logLevels[level];
        if (level == "log") {
            levelString = "";
        }

        p.innerHTML = `
        <div class="accordion-item">
            <div class="accordion-header ">
                <button class="accordion-button collapsed p-0 log-entry log-${level}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${this.id}" aria-expanded="false" aria-controls="flush-collapse-${this.id}">
                    <i class="fa-solid ${faIcon}"></i>&nbsp;${levelString}&nbsp;[@${this._getStack()}]
                </button>
            </div>
                <div id="flush-collapse-${this.id}" class="accordion-collapse collapse">
                <div class="accordion-body log-entry log-${level} text-break">${content}</div>
            </div>
        </div>
        `;

        this.entriesContainer.appendChild(p);
        this.id += 1;
    }

    error(content) {
        this._log(content, "error");
    }
    warn(content) {
        this._log(content, "warn");
    }
    info(content) {
        this._log(content, "info");
    }
    debug(content) {
        this._log(content, "debug");
    }
    log(content) {
        this._log(content);
    }

    _getStack() {
        let stack;
        try {
            throw new Error();
        } catch(e) {
            stack = e.stack;
        }
        stack = stack.split(" at ")[4];  // get caller

        let _x = stack.split("/");
        stack = stack.split("/")[_x.length-1]; // get file:line:chr

        return stack;
    }

    // logLevels controller

    get hasLevelsController() {
        if (this._levelsController) {
            return true;
        }
        return false;
    }

    setLevelsController(levelsControllerElement, selectedLevelsElement) {
        this._levelsController = levelsControllerElement;
        this._levelsController.logger= this;
        this._selectedLevelsElement = selectedLevelsElement;
        this.initLevelsController();
    }

    initLevelsController() {
        if (this.hasLevelsController === false) {
            console.debug("Cannot initialize HTMLLogger levelsController because no levelsControllerElement provided.");
            return;
        }
        console.debug("Initializing HTMLLogger levelsController.");
        // empty log levels options
        for(var i = (this._levelsController.options.length - 1); i >= 0; i--) {
            this._levelsController.remove(i);
        }
        // load levels list
        let opt = document.createElement("option");
        opt.value = 0;
        opt.innerHTML = "All";
        opt.classList.add("dropdown-item");
        this._levelsController.appendChild(opt);
        let hr = document.createElement("hr");
        hr.classList.add("dropdown-divider");
        this._levelsController.appendChild(hr);
        for(var i = 0; i < this.selectedLevels.length; i++) {
            opt = document.createElement("option");
            opt.value = this.selectedLevels[i];
            opt.innerHTML = logLevels[this.selectedLevels[i]];
            opt.classList.add("dropdown-item");
            this._levelsController.appendChild(opt);
        }
        // reset text to All
        this._selectedLevelsElement.innerHTML = "All";
        // activate filtering
        this._levelsController.addEventListener(
            "change",
            function () {
                this.logger.filterLogLevels();
              },
        );
    }

    filterLogLevels() {

        let showLevels = [];

        for(var i = 0; i < this._levelsController.options.length; i++) {
            if (this._levelsController.options[i].selected) {
                showLevels.push(this._levelsController.options[i].value);
            }
        }
        this.selectedLevels = showLevels;

        let showLevelsString = "";
        for(var i = 0; i < showLevels.length; i++) {
            if (showLevels[i] == 0) {
                showLevelsString = "All";
                showLevels = [];
                for (const level in logLevels) {
                    showLevels.push(level);
                }
                break;
            }
            if (i > 0) {
                showLevelsString += ", "
            }
            showLevelsString += logLevels[showLevels[i]];
        }

        this._selectedLevelsElement.innerHTML = showLevelsString;

        for(var i = 0; i < this.entriesContainer.children.length; i++) {
            let hide = true;
            for(var n = 0; n < showLevels.length; n++) {
                if (this.entriesContainer.children[i].classList.contains("log-" + showLevels[n])) {
                    hide = false;
                }
            }
            if (hide === false) {
                this.entriesContainer.children[i].classList.remove("d-none");
            } else {
                this.entriesContainer.children[i].classList.add("d-none");
            }
        }

    }

}