const popup = document.getElementById("popup");
const warn = document.createElement("h1");
const selectedImage = document.getElementById("selectedImage");
const loading = document.getElementById("loading");

async function fetchAndCache(searchString, page, cacheFile) {
    let url = `http://localhost:1337/${searchString}/${page}`;
    let cacheFileObj = window.caches && (await caches.open(cacheFile));
    cacheDeletionTimer(cacheFile);
    loading.style.display = "block";

    try {
        let cacheResponse = await cacheFileObj.match(url);
        warn.innerHTML = "";

        if (
            cacheResponse &&
            cacheResponse.status < 400 &&
            cacheResponse.headers.has("content-type") &&
            cacheResponse.headers.get("content-type").match(/^application\//i)
        ) {
            return cacheResponse;
        } else {
            let response = await fetch(url);
            loading.style.display = "block";

            if (!response.ok) throw response.statusText;
            await cacheFileObj.put(url, response.clone());

            return response;
        }
    } catch (error) {
        popup.style.transform = "translateY(0)";
        selectedImage.src = "";
        selectedImage.alt = "";

        if (error === "Not Found") {
            warn.innerText = "Not valid search string!";
            popup.appendChild(warn);
        } else {
            warn.innerText = "Obs! Something went wrong!";
            popup.appendChild(warn);
        }
        document.getElementById("loading").style.display = "none";
    }
}

function cacheDeletionTimer(cacheFile) {
    let initialCacheIndexString = localStorage.getItem("initialCacheIndex");
    if (initialCacheIndexString == "NaN") {
        localStorage.setItem("initialCacheIndex", 0);
    }

    let initialCacheIndex = parseInt(localStorage.getItem("initialCacheIndex"));

    if (initialCacheIndex === 0) {
        localStorage.setItem("cacheIniailDate", new Date());
        let cachePurgeDate = new Date();
        cachePurgeDate.setDate(
            new Date(localStorage.getItem("cacheIniailDate")).getDate() + 1
        );
        localStorage.setItem("cachePurgeDate", cachePurgeDate);
        initialCacheIndex += 1;
    }

    localStorage.setItem("initialCacheIndex", initialCacheIndex);
    let cachePurgeDate = new Date(localStorage.getItem("cachePurgeDate"));

    if (cachePurgeDate - new Date() <= 0) {
        localStorage.setItem("initialCacheIndex", "NaN");
        window.caches && caches.delete(cacheFile);
    }
}

async function submitButtonKeyboardEvent(event) {
    if (event.key == "Enter") {
        gallery.innerHTML = "";
        var _ = undefined;
        selectedImage.src = "undefined";
        await fetchAndCache(_, 1, _);
    }
    if (event.key == "Escape") {
        popup.style.transform = "translateY(-100%)";
        warn.innerText = "";
    }
}

function aTagKeboardEvent(mediumImgURL, title, event) {
    if (event.key == "Enter") {
        popup.style.transform = "translateY(0)";
        selectedImage.src = mediumImgURL;
        selectedImage.alt = title;

        event.target.setAttribute("aria-expanded", true);
    }
    if (event.key == "Escape") {
        popup.style.transform = "translateY(-100%)";
        warn.innerText = "";
        event.target.setAttribute("aria-expanded", false);
    }
    if (event.key == "ArrowLeft") {
        event.target.parentElement.previousSibling.childNodes[0].focus();
    }
    if (event.key == "ArrowRight") {
        event.target.parentElement.nextSibling.childNodes[0].focus();
    }
}

module.exports = {
    fetchAndCache: fetchAndCache,
    aTagKeboardEvent: aTagKeboardEvent,
    submitButtonKeyboardEvent: submitButtonKeyboardEvent,
};
