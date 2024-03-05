(function() {
    //ui chast_
    const container = document.querySelector('.container');
    document.body.style.background = '#000'
    const apiUrl = "https://rickandmortyapi.com/api/character";
    async function dataParser() {
        const parsedData = await fetch(apiUrl)
            .then(response => response.json())
        return parsedData;
    };
    dataParser().then(
        charactersInfo => {
            console.log(charactersInfo.results);
            const characters = charactersInfo.results;
            const ulChar = document.createElement('ul');
            const classesForUl = 'grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2';
            classesForUl.split(' ').forEach(otdelny => {
                ulChar.classList.add(otdelny);
            })
            // ulChar.classList.add('p-6', 'grid', 'gap-x-8', 'gap-y-12', 'sm:grid-cols-2', 'sm:gap-y-16', 'xl:col-span-2');
            let fragment = '';
            characters.forEach(chel => {
                chelInHTML = listItemTemplate(chel);
                fragment += chelInHTML; 
            });
            ulChar.insertAdjacentHTML('afterbegin', fragment);
            container.appendChild(ulChar);
        }
    );
    function listItemTemplate({ id, name, status, image, gender, species } = {}) {
        return `
        <li id="${id}">
        <div class="flex items-center gap-x-6 rounded-lg border-4 border-cyan-100 p-2">
          <img class="h-16 w-16 rounded-full" src="${image}" alt="image of ${name}">
          <div>
            <h3 class="text-base font-semibold leading-7 tracking-tight text-slate-100">${name}</h3>
            <p class="text-sm font-semibold leading-6 text-indigo-600">${gender}</p>
            <p class="text-sm font-semibold leading-6 text-teal-600">${species}</p>
            <p class="text-sm font-semibold leading-6 ${status === "Alive" ? 'text-green-400' : 'text-red-600'}">${status}</p>
          </div>
        </div>
      </li>
        `
    }
})();