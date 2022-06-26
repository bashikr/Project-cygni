import {
    submitButtonKeyboardEvent,
    aTagKeboardEvent,
    fetchAndCache,
} from "./functions";

const gallery = document.getElementById("gallery");
const popup = document.getElementById("popup");
const selectedImage = document.getElementById("selectedImage");
const searchInput = document.getElementById("searchInput");
const submit = document.getElementById("submit");
const warn = document.createElement("h1");
var searchString = "Star Wars";
const cacheFile = "cachedRequests";

var data;
var page = 1;

searchInput.addEventListener("change", (e) => {
    searchString = e.target.value;
});

async function main() {
    var response = await fetchAndCache(searchString, page, cacheFile);
    data = JSON.parse(JSON.stringify(await response.json())).data;

    data.photo.map((element) => {
        const title = document.createElement("p");
        const image = document.createElement("img");
        const a = document.createElement("a");
        const card = document.createElement("div");

        title.innerHTML = element.title;

        var imgUrl =
            "http://farm" +
            element.farm +
            ".staticflickr.com/" +
            element.server +
            "/" +
            element.id +
            "_" +
            element.secret;

        var thumbnailImgURL = imgUrl + "_" + "q" + ".jpg";

        image.id = data.page;
        image.src = thumbnailImgURL;
        image.alt = element.title;
        a.setAttribute("tabindex", "0");

        image.classList.add("galleryImg");

        var mediumImgURL = imgUrl + ".jpg";

        a.appendChild(image);
        a.setAttribute("aria-haspopup", true);

        a.addEventListener("click", () => {
            popup.style.transform = "translateY(0)";
            a.setAttribute("aria-expanded", true);
            selectedImage.src = mediumImgURL;
            selectedImage.alt = title;
        });

        a.addEventListener("keydown", (event) =>
            aTagKeboardEvent(mediumImgURL, element.title, event)
        );

        card.appendChild(a);
        card.appendChild(title);
        card.classList.add("card");
        gallery.appendChild(card);
    });
    document.getElementById("loading").style.display = "none";
}

window.addEventListener("load", async () => {
    await main();
    searchInput.value = "";
});

window.addEventListener("scroll", async () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (data && page <= data.pages) {
            page += 1;
            await main();
        }
    }
});

submit.addEventListener("click", async () => {
    gallery.innerHTML = "";
    searchInput.dispatchEvent(new Event("change"));
    await main();
});

submit.onkeydown = submitButtonKeyboardEvent;

popup.addEventListener("click", () => {
    popup.style.transform = "translateY(-100%)";
    warn.innerText = "";
    document
        .querySelector("[aria-expanded=true]")
        .setAttribute("aria-expanded", false);
});
