// Use this URL to fetch NASA APOD JSON data.
//const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

fun_fact = ["The earth is flate!", "The US goverment has good diplomatic relations with the Martians.", "Thomas Jefferson was a Martian.", "Space tastes like chocolate!", "The only reason the Earth still has an atmosphere is the giant glass dome", "Its important to stop global warming! Otherwise the ice walls will melt and all Earths water will drain over the edge! Protect our planet <3", "Pluto is a planet.", "Our galexy is held together by the giant flying speghetti monster", "Dark nights are inconvienient, but neccessary, we dont wanna run out of sun power do we?"];
window.addEventListener('load', function () {
    // Get the element that will show the random fact
    const fun = document.getElementById('funny');
    if (!fun) return; // safety check if element not present

    // Pick a random index from 0 to fun_fact.length-1
    const index = getRndInteger(0, fun_fact.length - 1);

    // Show the random fact
    fun.textContent = fun_fact[index];
});





let button = document.getElementById("getImageBtn");

button.addEventListener('click', handleClick);

async function handleClick() {
    button.remove();
    let place = document.getElementsByClassName("placeholder");
    place[0].innerHTML = '<div class="placeholder-icon">🔄</div><p>Loading space photos…</p>';

    await galleryGen()
    place[0].remove();

}

async function getData() {
    const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';
    try {
        const response = await fetch(apodData);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

async function galleryGen() {
    let gal = await getData();
    let area = document.getElementById("gallery");
    console.log(gal.length);
    for (let i = 0; i < gal.length; i++) {
        let el = document.createElement("div");

        let image = gal[i]['url'];
        let date = gal[i]['date'];
        let title = gal[i]['title'];
        let explain = gal[i]['explanation'];

        let EI = document.createElement('img');
        let ET = document.createElement('p');
        let ED = document.createElement('p');
        let EE = document.createElement('p');

        if (gal[i]['media_type'] == 'image') {
            EI = document.createElement('img');
            EI.src = image;
        }
        else {
            EI = document.createElement('a');
            EI.style.alignSelf = 'center';
            EI.style.justifySelf = 'center';
            EI.textContent = "video";
            EI.href = image;

        }

        EI.src = image;
        ET.textContent = title;
        ED.textContent = date;
        EE.textContent = explain

        EE.style.display = 'none';

        el.appendChild(EI);
        el.appendChild(ET);
        el.appendChild(EE);
        el.appendChild(ED);

        el.classList.add("gallery-item")
        area.appendChild(el);

        el.addEventListener('click', function () {
            if (el.style.position === 'fixed') {
                // Reset all styles to default
                el.style.position = '';
                el.style.top = '';
                el.style.left = '';
                el.style.zIndex = '';
                el.style.width = '';
                el.style.height = '';
                el.style.backgroundColor = '';
                // Hide the explanation
                EE.style.display = 'none';
                EI.style.height = '';
                EI.style.maxHeight = '';
                EI.style.maxWidth = '';
                EI.style.justifySelf = '';
                EI.style.alignSelf = '';
                if (gal[i]['media_type'] == 'image') {
                    EI.src = gal[i]['url'];
                }
            } else {
                // Expand the element to full screen
                el.style.position = 'fixed';
                el.style.top = '0';
                el.style.left = '0';
                el.style.zIndex = '1000';
                el.style.width = '100vw';
                el.style.height = '100vh';
                // Show the explanation
                EE.style.display = 'block';
                EI.style.height = '80vw';
                EI.style.maxHeight = '80vh';
                EI.style.maxWidth = '80vw';
                EI.style.justifySelf = 'center';
                EI.style.alignSelf = 'center';
                if (gal[i]['media_type'] == 'image') {
                    EI.src = gal[i]['hdurl'];
                }

            }
        });
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}