const request = obj => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(obj.method, obj.url, true);
        xhr.send();

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        });
    });
};

document.addEventListener('click', e => {
    const el = e.target;

    if (el.classList.contains('get-link')) {
        e.preventDefault();
        loadPage(el);
    }
});

async function loadPage(el) {
    let href = el.getAttribute('href');

    if (!href) {
        href = el.parentElement.getAttribute('href');
    }

    const objConfig = {
        method: 'GET',
        url: href
    };

    try {
        const response = await request(objConfig);
        loadResult(response);
    } catch (e) {
        console.log(e);
    }
}

function loadResult(response) {
    const aboutContainer = document.querySelector('.about-container');
    aboutContainer.innerHTML = response;
}