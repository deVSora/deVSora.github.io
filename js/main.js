// Usando XHR para o carregamento de páginas dinamicas  
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

// Função para pegar evento de click
document.addEventListener('click', e => {
    const el = e.target;

    if (el.classList.contains('get-link')) {
        e.preventDefault();
        loadPage(el);
    }
});

//Função para carregar a página dinamica pegando o href
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

//Função para carregar o resultado do carregamento da página por href
function loadResult(response) {
    const aboutContainer = document.querySelector('.about-container');
    aboutContainer.innerHTML = response;
};

//Dicenator (Calculadora de dados) - Abre uma nova aba
document.addEventListener('click', e => {
    e.preventDefault();
    el = e.target

    if (el.id == 'dicenator') {
        const width = (screen.width / 2) - 150;
        const height = (screen.height / 2) - 400;
        window.open('dicenator.html', '_blank', `width=400, height=600, screenX=${width}, screenY=${height}`)
    }
})