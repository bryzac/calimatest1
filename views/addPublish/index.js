import { createNotification } from "../../components/notification.js";
const notification = document.querySelector('#notification');
const form = document.querySelector('#form');
const title = document.querySelector('#title');

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
        const { data } = await axios.get(`/api/publish/${id}`);
        const nameProject = data.name;
        title.innerHTML = `
        <h2 class="text-3xl mb-6 font-bold">
            ${nameProject}
        </h2>
        `;


        form.addEventListener('submit', async e => {
            e.preventDefault();
            console.log(publicInput.checked)

            if (e.submitter.id === 'save-btn') {
                await axios.post('/api/publish/:id', {
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
                
                const newPathname = '/project' + window.location.pathname.split('/addPublish')[1];

                textNotification = 'Se ha guardado una nueva publicación';
                isNotificationTrue = false;
                message(isNotificationTrue, textNotification);
                //setTimeout(() => window.location.pathname = newPathname, 1500);
            };
            
            if (e.submitter.id === 'cancel-btn') {
                const newPathname = '/project' + window.location.pathname.split('/addPublish')[1];
                textNotification = 'Cancelado';
                isNotificationTrue = true;
                message(isNotificationTrue, textNotification);
                setTimeout(() => window.location.pathname = newPathname, 500);
            };
        })
        
    } catch (error) {
        console.log(error)
        textNotification = 'No posees permisos de edición';
        isNotificationTrue = true;
        message(isNotificationTrue, textNotification);
        setTimeout(() => window.location.pathname = '/', 2000);
    }
})();