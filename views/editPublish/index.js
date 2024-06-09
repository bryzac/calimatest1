import { createNotification } from "../../components/notification.js";
const notification = document.querySelector('#notification');
const form = document.querySelector('#form');
const titleDocument = document.querySelector('#title');
const titleWindow = document.querySelector('title');

const titleInput = document.querySelector('#title-input');
const dedicatoryInput = document.querySelector('#dedicatory-input');
const epigraphInput = document.querySelector('#epigraph-input');
const epigraphByInput = document.querySelector('#epigraphBy-input');
const textInput = document.querySelector('#text-input');
const imageInput = document.querySelector('#image-input');
const dateInput = document.querySelector('#date-input');
const additionalInput = document.querySelector('#additional-input');
const nominationsInput = document.querySelector('#nominations-input');
const awardsInput = document.querySelector('#awards-input');
const linkInput = document.querySelector('#link-input');
const publicInput = document.querySelector('#public-input');

const saveBtn = document.querySelector('#save-btn');

let textNotification = '';
let isNotificationTrue = '';
const message = (bool, text) => {
    createNotification(bool, text);
    setTimeout(() => {
        notification.innerHTML = '';
    }, 2000);
};

(async () => {
    try {
        const { data } = await axios.get('/api/publish/edit/:id');

        const { title, dedicatory, epigraph, epigraphBy, text, image, date, additional, nominations, awards, link, project, id } = data;
        const isPublic = data.public;
        const newPathname = '/project/' + project;

        titleWindow.textContent = title;
        titleDocument.innerHTML = `
        <h2 class="text-3xl mb-6 font-bold">
            ${title}
        </h2>
        `;

        titleInput.value = title;
        dedicatoryInput.value = dedicatory;
        epigraphInput.value = epigraph;
        epigraphByInput.value = epigraphBy;
        textInput.value = text;
        imageInput.value = image;
        dateInput.value = date;
        additionalInput.value = additional;
        nominationsInput.value = nominations;
        awardsInput.value = awards;
        linkInput.value = link;

        if (!isPublic) {
            publicInput.checked = false;
        };


        let titleValidation = false;
        let dedicatoryValidation = false;
        let epigraphValidation = false;
        let epigraphByValidation = false;
        let textValidation = false;
        let imageValidation = false;
        let dateValidation = false;
        let additionalValidation = false;
        let nominationsValidation = false;
        let awardsValidation = false;
        let linkValidation = false;
        let isPublicValidation = false;

        const validation = () => {
            saveBtn.disabled = titleValidation || dedicatoryValidation || epigraphValidation || epigraphByValidation || textValidation || imageValidation || dateValidation || additionalValidation || nominationsValidation || awardsValidation || linkValidation || isPublicValidation ? false : true;
        };

        form.addEventListener('input', e => {
            titleValidation = titleInput.value === title ? false : true;
            dedicatoryValidation = dedicatoryInput.value === dedicatory ? false : true;
            epigraphValidation = epigraphInput.value === epigraph ? false : true;
            epigraphByValidation = epigraphByInput.value === epigraphBy ? false : true;
            textValidation = textInput.value === text ? false : true;
            imageValidation = imageInput.value === image ? false : true;
            dateValidation = dateInput.value === date ? false : true;
            additionalValidation = additionalInput.value === additional ? false : true;
            nominationsValidation = nominationsInput.value === nominations ? false : true;
            awardsValidation = awardsInput.value === awards ? false : true;
            linkValidation = linkInput.value === link ? false : true;
            isPublicValidation = publicInput.checked === isPublic ? false : true;
            validation()
        });


        form.addEventListener('submit', async e => {
            e.preventDefault()

            if (e.submitter.id === 'cancel-btn') {
                textNotification = 'Cancelado';
                isNotificationTrue = true;
                message(isNotificationTrue, textNotification);
                setTimeout(() => window.location.pathname = newPathname, 500);

            } else if (e.submitter.id === 'save-btn') {
                await axios.patch(`/api/publish/edit/${id}`, {
                    title: titleInput.value,
                    dedicatory: dedicatoryInput.value,
                    epigraph: epigraphInput.value,
                    epigraphBy: epigraphByInput.value,
                    text: textInput.value,
                    image: imageInput.value,
                    date: dateInput.value,
                    additional: additionalInput.value,
                    nominations: nominationsInput.value,
                    awards: awardsInput.value,
                    link: linkInput.value,
                    public: publicInput.checked
                });

                textNotification = 'Nuevos cambios guardados';
                isNotificationTrue = false;
                message(isNotificationTrue, textNotification);
                setTimeout(() => window.location.pathname = newPathname, 500);
            }
        });
        
    } catch (error) {
        console.log(error)
        textNotification = 'No posees permisos de edición';
        isNotificationTrue = true;
        message(isNotificationTrue, textNotification);
        setTimeout(() => window.location.pathname = '/', 2000);
    }
})();