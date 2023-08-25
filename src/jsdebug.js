class HTMLLogger {

    constructor(html_element) {
        this.html_element = html_element;
    }

    _log(content, level=undefined){
        let p = document.createElement("p");
        p.classList.add("log-entry");
        p.classList.add("log-" + level);
        let html;
        switch (level) {
            case "error":
                html = `<i class="fa-solid fa-circle-xmark"></i>`;
                break;
            case "warn":
                html = `<i class="fa-solid fa-triangle-exclamation"></i>`;
                break;
            case "info":
                html = `<i class="fa-solid fa-circle-info"></i>`;
                break;
            case "debug":
                html = `<i class="fa-solid fa-code"></i>`;
                break;
            default:
                html = `<i class="fa-solid fa-info"></i>`;
        }
        p.innerHTML = html;
        let span = document.createElement("span");
        span.innerHTML = "&nbsp;" + content;
        p.appendChild(span);
        this.html_element.appendChild(p);
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

}