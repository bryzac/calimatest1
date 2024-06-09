import { createNotification } from "../../components/notification.js";
const bio = document.querySelector('#bio');
const knowledge = document.querySelector('#knowledge');
const projects = document.querySelector('#projects');
const contact = document.querySelector('#contact');

const path = window.location.pathname.split('/')[2];

(async () => {
    try {
        const { data } = await axios.get(`/api/users/profile/${path}`);

        const { name, id, semblance } = data;
        const titleHtml = document.querySelector('title');
        titleHtml.innerHTML = `${name}`;
        knowledge.href = `/profileDetails/${id}`;

        bio.innerHTML = `${semblance}`;
        
        const { instagram, twitter, linktr, allmylinks, whatsapp, telegram, facebookUrl, facebook, youtubeUrl, youtube, linkedInUrl, linkedIn } = data;
        
        let instagramHTML = '';
        let twitterHTML = '';
        let linktrHTML = '';
        let allmylinksHTML = '';
        let whatsappHTML = '';
        let telegramHTML = '';
        let facebookHTML = '';
        let youtubeHTML = '';
        let linkedInHTML = '';

        if (instagram !== '') {
            instagramHTML = `
             <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/instagram.svg" class="w-[40px] justify-self-center">
                <a href="https://www.instagram.com/${instagram}/" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">@${instagram}</p>
                </a>
            </article>
            `;
        }
        if (twitter !== '') {
            twitterHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/twitter.svg" class="w-[40px] justify-self-center">
                <a href="https://www.twitter.com/${twitter}/" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">@${twitter}</p>
                </a>
            </article>
            `;
        }
        if (linktr !== '') {
            linktrHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/linktree.svg" class="w-[40px] justify-self-center">
                <a href="https://www.linktr.ee/${linktr}/" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">${linktr}</p>
                </a>
            </article>
            `;
        }
        if (allmylinks !== '') {
            allmylinksHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/allmylinks.svg" class="w-[40px] justify-self-center">
                <a href="https://www.allmylinks.com/${allmylinks}/" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">${allmylinks}</p>
                </a>
            </article>
            `;
        }
        if (whatsapp !== '') {
            whatsappHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/whatsapp.svg" class="w-[40px] justify-self-center">
                <a href="https://wa.me/${whatsapp}/" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">WhatsApp</p>
                </a>
            </article>
            `;
        }
        if (telegram !== '') {
            telegramHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/telegram.svg" class="w-[40px] justify-self-center">
                <a href="https://t.me/${telegram}/" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">Telegram</p>
                </a>
            </article>
            `;
        }
        if (facebookUrl !== '') {
            console.log('arepa')
            facebookHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/facebook.svg" class="w-[40px] justify-self-center">
                <a href="${facebookUrl}" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">${facebook}</p>
                </a>
            </article>
            `;
        }
        if (youtubeUrl !== '') {
            youtubeHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/youtube.svg" class="w-[40px] justify-self-center">
                <a href="${youtubeUrl}" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">${youtube}</p>
                </a>
            </article>
            `;
        }
        if (linkedInUrl !== '') {
            linkedInHTML = `
            <article class="grid gap-4 justify-self-center w-[150px] my-0 mx-auto transition ease-in-out hover:font-bold">
                <img src="/images/linkedIn.svg" class="w-[40px] justify-self-center">
                <a href="${linkedInUrl}" class="grid gap-4 justify-items-center my-0 mx-auto no-underline justify-self-center">
                    <p class="justify-self-center">${linkedIn}</p>
                </a>
            </article>
            `;
        }
        
        contact.innerHTML = `
        <div id="contact-title" class="grid gap-4 justify-self-center w-[180px] my-0 mx-auto">
            <img src="/images/phone.svg" class="w-[40px] justify-self-center">
            <h2 class="text-2xl font-bold">Contacto</h2>
        </div>
        
        <div class="gap-8 md:gap-8 pt-10 flex flex-wrap my-0 mx-auto pb-8">
            ${instagramHTML}
            ${twitterHTML}
            ${linktrHTML}
            ${allmylinksHTML}
            ${whatsappHTML}
            ${telegramHTML}
            ${facebookHTML}
            ${youtubeHTML}
            ${linkedInHTML}
        </div>
        `;

    } catch (error) {
        console.log(error);
    }    
})();

(async () => {
    try {
        const { data } = await axios.get(`/api/project/profile/${path}`);
        
        data.projects.forEach(project => {
            const name = project.name;
            const icon = project.icon;
            const artistic = project.artistic;

            const article = document.createElement('article');
            article.id = project.id;
            article.classList.add('grid', 'gap-4', 'justify-self-center', 'w-[150px]', 'my-0', 'mx-auto',);
            article.innerHTML = `
                <img src="/images/${icon}" class="w-[40px] justify-self-center">
                <a href="/project/${project.id}" class="w-[150px] justify-self-center grid gap-0 my-0 mx-auto no-underline bg-[#f97020ec] py-[13px] px-[22px] rounded-[24px] transition duration-300 hover:bg-[#ff4800c2]">
                    <h1 class="font-bold text-lg">${name}</h1> 
                    <h2 class="text-sm">${artistic}</h2>
                </a>
            `;
            projects.append(article);
        });

        const isOwner = data.isOwner;
        if (isOwner) {
            const main = document.querySelector('#main');
            const notification = document.querySelector('#notification');
            main.innerHTML = `
            <!-- Secciones -->
            <form id="form" class="grid gap-4 justify-self-center h-11 content-center w-[180px] my-12 mx-auto">
                <button class="w-auto justify-self-center grid gap-0 my-0 mx-auto no-underline bg-white py-[13px] px-[22px] rounded-[24px] transition duration-300 hover:bg-[#f97020ec] text-black ring-4 ring-[#f97020ec] hover:ring-white">
                    <img src="/images/add.svg" class="w-[40px] justify-self-center">
                    <h1 class="font-bold">Crear nueva sección</h1>
                </button>
            </form>
            `;

            const form = document.querySelector('#form');
            form.addEventListener('submit', async e => {
                e.preventDefault();
                main.innerHTML = `
                <form id="form-add" class="flex flex-col gap-4 bg-black p-4 rounded-lg text-md shadow-2xl w-[250px] min-[400px]:w-[350px] min-[600px]:w-[500px] border-2 border-white">
                    <div class="flex flex-col gap-2 w-full">
                        <label for="name-input" class="font-bold">
                            Nombre de la nueva sección
                        </label>
                        <input 
                            type="text" 
                            id="name-input" 
                            name="name-input" 
                            autocomplete="off" 
                            class="text-black rounded-lg p-2 bg-zinc-100 focus:outline-slate-700"
                        >
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="icon-input" class="font-bold">
                            Ícono
                        </label>
                        <select id="icon-input" class="text-black rounded-lg p-2 bg-zinc-100 focus:outline-slate-700">
                            <option value="" disabled Selected>Selecciona un ícono</option>
                            <option value="hojita.svg">Hojita</option>
                            <option value="pino.svg">Pino</option>
                            <option value="pincel.svg">Pincel</option>
                            <option value="flor.svg">Flor</option>
                            <option value="castillo.svg">Castillo</option>
                        </select>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="artistic-input" class="font-bold">
                            Expresión artística
                        </label>
                        <select id="artistic-input" class="text-black rounded-lg p-2 bg-zinc-100 focus:outline-slate-700">
                            <option value="" disabled Selected>Selecciona</option>
                            <option value="Poesía">Poesía</option>
                            <option value="Dibujo">Dibujo</option>
                            <option value="Escultura">Escultura</option>
                            <option value="Narrativa">Narrativa</option>
                            <option value="Fotografía">Fotografía</option>
                            <option value="Novela">Novela</option>
                            <option value="Poemario">Poemario</option>
                            <option value=""></option>
                        </select>
                    </div>

                    <button 
                        disabled
                        id="save-btn"
                        class="bg-[#f97020ec] py-2 px-4 rounded-lg font-bold hover:bg-[#ff4800c2] text-center transition ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
                    >
                        Guardar cambios
                    </button>

                    <button 
                        id="cancel-btn"
                        class="bg-red-600 py-2 px-4 rounded-lg font-bold hover:bg-red-500 text-center transition ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black w-2/3 mx-auto"
                    >
                        Cancelar
                    </button>
                </form>
                `;

                const formAdd = document.querySelector('#form-add');
                const nameInput = document.querySelector('#name-input');
                const iconInput = document.querySelector('#icon-input');
                const artisticInput = document.querySelector('#artistic-input');
                const saveBtn = document.querySelector('#save-btn');
                const NAME_VALIDATION = /[\s\S]/;

                // Validations
                let nameValidation = false;
                let iconValidation = false;
                let artisticValidation = false;

                const validation = (input, regexValidation) => {
                    saveBtn.disabled = nameValidation && iconValidation && artisticValidation ? false : true;
                
                    if (input.value === '') {
                        input.classList.remove('focus:outline-slate-700', 'outline-green-700');
                        input.classList.add('outline-red-700', 'outline-2', 'outline');
                    } else if (regexValidation) {
                        input.classList.remove('focus:outline-slate-700', 'outline-red-700');
                        input.classList.add('outline-green-700', 'outline-2', 'outline');
                    } else {
                        input.classList.remove('focus:outline-slate-700', 'outline-green-700');
                        input.classList.add('outline-red-700', 'outline-2', 'outline');
                    };
                };

                // Events
                nameInput.addEventListener('input', e => {
                    nameValidation = NAME_VALIDATION.test(e.target.value);
                    validation(nameInput, nameValidation);
                });
                iconInput.addEventListener('input', e => {
                    const optionSelected = [...e.target.children].find(option => option.selected);
                    iconValidation = optionSelected.value;
                    validation(iconInput, iconValidation);
                });

                artisticInput.addEventListener('input', e => {
                    const optionSelected = [...e.target.children].find(option => option.selected);
                    artisticValidation = optionSelected.value;
                    validation(artisticInput, artisticValidation);
                });


                formAdd.addEventListener('submit', async e => {
                    e.preventDefault();
                    if (e.submitter.id === 'save-btn') {
                        try {
                            const newProject = {
                                name: nameInput.value,
                                icon: iconInput.value,
                                artistic: artisticInput.value,
                            };
                            await axios.post('/api/project/publish', newProject);
                            
                            const notificationText = 'Nueva sección creada';
                            createNotification(false, notificationText);
                            setTimeout(() => {
                                notification.innerHTML = '';
                            }, 5000);

                            window.location.reload();
                        } catch (error) {
                            console.log(error);
                            createNotification(true, error.response.data.error);
                            setTimeout(() => {
                                notification.innerHTML = '';
                            }, 5000);
                        }
                    }
                    
                    if (e.submitter.id === 'cancel-btn') {
                        const notificationText = 'Sección cancelada';
                        createNotification(true, notificationText);
                        setTimeout(() => {
                            notification.innerHTML = '';
                        }, 750);
                        setTimeout(() => {
                            window.location.reload();
                        }, 750);
                    }
                });
            });
        };
    } catch (error) {
        console.log(error);
    }
})();

