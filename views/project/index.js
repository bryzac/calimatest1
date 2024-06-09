import { createNotification } from "../../../components/notification.js";
const form = document.querySelector('form');
const titleHtml = document.querySelector('title');
const notification = document.querySelector('#notification');

let textNotification = '';
let isNotificationTrue = '';
const message = (bool, text) => {
    createNotification(bool, text);
    setTimeout(() => {
        notification.innerHTML = '';
    }, 2000);
};

const comentarios = ((commentArray, comment, id, logged) => {
        if (commentArray.includes(comment.id)) {
            const commentId = comment.id;
            const commentText = comment.text;
            const commentIsAsk = comment.isAsk;
            const commentName = comment.name;
            const commentAskTo = comment.askTo;
            const commentAskName = comment.askName;
            const commentAskText = comment.askText;

            let toAsk = '';
            if (logged) {
                toAsk = `
                <button class="text-gray-50 text-opacity-90 text-sm text-left flex self-end underline hover:text-white">Responder</button>
                `;
            };

            const divComments = document.querySelector(`#comments-${id}`);
            const commentDiv = document.createElement('div');
            commentDiv.id = `comment-${commentId}`;
            commentDiv.classList.add('p-2', 'flex', 'flex-col', 'self-center', 'items-center', 'mx-auto', 'left-0', 'right-0', 'w-full');

            let ask = '';
            if (commentIsAsk) {
                ask = `
                <p id="${commentAskTo}" class="px-1 text-sm text-left self-start text-gray-50 text-opacity-60" style="background: radial-gradient(#1f276b, #191e4d00);"><em class="text-white font-bold">${commentAskName}: </em><em>${commentAskText}</em></p>
                `;
            };

            commentDiv.innerHTML = `
            ${ask}
            <p id="comment-content-${commentId}" class="text-left self-start text-gray-50 text-opacity-80"><em class="text-white font-bold">${commentName}: </em>${commentText}</p>
            ${toAsk}
            `;
            divComments.append(commentDiv);
    
        };
});

(async () => {
    try {
        const pathName = window.location.pathname.split('/')[2];
        const { data } = await axios.get(`/api/project/${pathName}`);
        const { name, publishs, isOwner, comments, logged } = data;
        titleHtml.innerHTML = `${name}`;

        if (isOwner) {
            const addPublish = document.querySelector('#addPublish');
            addPublish.innerHTML = `
            <a href="/addPublish/${pathName}">
                <p class="fixed top-[70%] right-[20px] bg-[#747373ec] py-2 px-[16px] rounded-[24px] text-lg font-bold border-[4px] border-white transition duration-300 hover:bg-[#b1b0b0ec] ring-4 ring-black">Editar</p>
                <p class="fixed top-[80%] right-[20px] bg-[#f97020ec] py-8 px-[20px] rounded-[24px] text-lg font-bold border-[4px] border-white transition duration-300 hover:bg-[#dab0a1] ring-4 ring-black">Crear</p>
            </a>
            `;
        };

        if (publishs[0]) {
            publishs.forEach(publish => {
                const id = publish.id;
                const title = publish.title;
                const dedicatory = publish.dedicatory;
                const epigraph = publish.epigraph;
                var epigraphBy = publish.epigraphBy;
                const text = publish.text;
                const date = publish.date;
                const additional = publish.additional;
                const nominations = publish.nominations;
                const awards = publish.awards;
                const link = publish.link;

                const isPublic = publish.public;
                const commentArray = publish.comment;
                
                const image = publish.image;
                
                if (epigraphBy.length > 0) {
                    epigraphBy = '- '+ epigraphBy
                };

                let inputComment = '';
                if (logged) {
                    inputComment = `
                    <input 
                        type="text" 
                        id="comment-input-${id}" 
                        name="comment-input" 
                        autocomplete="off" 
                        placeholder="Comentar..."
                        class="text-black rounded-lg p-2 bg-zinc-100 focus:outline-slate-700 w-[90%]"
                    >
                    <button class="text-gray-50 text-opacity-100 text-sm text-left flex self-end bg-[#f97020ec] p-1 rounded-[24px] font-bold transition duration-300 hover:bg-[#dab0a1]">Comentar</button>
                    `;
                };

                const div = document.createElement('div');
                if (isOwner || isPublic) {
                    div.id = id;
                    div.classList.add('w-[150px]', 'h-[200px]', 'justify-self-center', 'grid', 'gap-0', 'my-0', 'mx-auto', 'no-underline', 'bg-[#f97020ec]', 'pb-[13px]', 'pt-[10px]', 'px-[20px]', 'rounded-[24px]', 'transition', 'duration-300', 'hover:bg-[#ff4800c2]');
                    div.innerHTML = `
                    <button class="grid justify-center">
                        <img src="/images/calimantes.jpg" style="border-radius:50%; -webkit-border-radius:50%; box-shadow: 0px 0px 5px 5px #ec731e; -webkit-box-shadow: 0px 0px 5px 5px #ec731e;" class="w-[150px] m-0 overflow-hidden justify-self-center">
                        <h1 class="font-bold text-lg pt-2">${title}</h1>
                        <p class="py-0 text-sm text-right hidden"><em>${dedicatory}</em></p>
                        <p class="py-0 text-sm text-right hidden"><em>${epigraph}</em></p>
                        <p class="py-0 text-sm text-right hidden"><strong>${epigraphBy}</strong></p>
                        <p class="p-4 whitespace-pre hidden">${text}</p>
                        <p class="py-0 text-sm text-right hidden"><em>${additional}</em></p>
                        <p class="py-0 text-xs text-left text-opacity-70 text-gray-50 hidden">${date}</p>
                        <p class="py-0 text-xs text-left text-opacity-70 text-gray-50 hidden">${nominations}</p>
                        <p class="py-0 text-xs text-left text-opacity-70 text-gray-50 hidden">${awards}</p>
                        <p class="pt-0 pb-4 text-xs text-left hidden"><a href="${link}">${link}</a></p>
                    </button>
                    <button disabled class="hidden text-gray-50 text-opacity-75 text-left self-start">Ver comentarios</button>
                    <div id="showcomment=${id}" class="hidden p-2 mb-2 flex-col gap-2 w-[80%] self-center items-center mx-auto bg-[#191e4dad] rounded-[12px]">
                        ${inputComment}
                        <div id="comments-${id}" class="flex flex-col gap-2 w-[80%] self-center items-center mx-auto">
                        </div>
                    </div>
                    <button disabled id="newcomment-${id}" class="hidden mt-2 text-gray-50 text-opacity-50 text-left bg-gray-50 bg-opacity-10 mr-[50%] rounded-[6px]">Ocultar</button>
                    `;
                    form.append(div);
                };
                
                if (isOwner) {
                    const editBtn = document.createElement('button');
                    editBtn.disabled = true;
                    editBtn.id = `edit-btn-${id}`;
                    editBtn.classList.add('hidden', 'text-yellow-100', 'text-opacity-70', 'text-left', 'bg-yellow-200', 'bg-opacity-10', 'mb-2', 'mr-[50%]', 'rounded-[6px]');
                    editBtn.textContent = 'Editar';
                    
                    const publicStatus = document.createElement('p');
                    publicStatus.id = `public-status-${id}`;
                    publicStatus.classList.add('hidden', 'py-0', 'text-xs', 'text-left', 'text-opacity-70', 'text-gray-50', 'hidden');
                    
                    var status = '';
                    if (isPublic) {
                        status = 'Público';
                    } else {
                        status = 'Privado';
                    }
                    publicStatus.innerText = status;

                    div.append(editBtn);
                    div.append(publicStatus);
                };

                comments.forEach(comment => {
                    comentarios(commentArray, comment, id, logged);
                });

            });
        };

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const submitter = e.submitter;
            submitter.disabled = true;
            
            if (submitter.textContent === 'Ocultar') {
                //OCULTAR
                const contentSubmitter = submitter.parentElement.children[0];
                contentSubmitter.disabled = false;
        
                const divSubmitter = submitter.parentElement;
                divSubmitter.classList = 'w-[150px] h-[200px] justify-self-center grid gap-0 my-0 mx-auto no-underline bg-[#f97020ec] pb-[13px] pt-[10px] px-[20px] rounded-[24px] transition duration-300 hover:bg-[#ff4800c2]';
        
                const imageSubmitter = contentSubmitter.children[0];
                imageSubmitter.classList = 'w-[150px] m-0 overflow-hidden justify-self-center';
                imageSubmitter.style = 'border-radius:50%; -webkit-border-radius:50%; box-shadow: 0px 0px 5px 5px #ec731e; -webkit-box-shadow: 0px 0px 5px 5px #ec731e;';
        
                const titleSubmitter = contentSubmitter.children[1];
                titleSubmitter.classList = 'font-bold text-lg pt-2';
        
                for (let i = 2; i < contentSubmitter.children.length; i++) {
                    contentSubmitter.children[i].classList.add('hidden');
                };
        
                const commentBtnSubmitter = submitter.parentElement.children[1];
                commentBtnSubmitter.classList.remove('flex');
                commentBtnSubmitter.classList.add('hidden');
                commentBtnSubmitter.disabled = true;
        
                for (let i = 3; i < submitter.parentElement.children.length; i++) {
                    const btnSubmitter = submitter.parentElement.children[i]
                    btnSubmitter.classList.add('hidden');
                    btnSubmitter.disabled = true;
                };

                if (!submitter.parentElement.children[2].classList.contains('hidden')) {
                    submitter.parentElement.children[2].classList.remove('flex');
                    submitter.parentElement.children[2].classList.add('hidden');
                    
                    submitter.parentElement.children[1].textContent = 'Ver comentarios';
                };
                

            } else if (submitter.textContent === 'Editar') {
                //EDITAR
                const id = submitter.id.split('edit-btn-')[1];
                window.location.pathname = `/editPublish/${id}`;

                
            } else if (submitter.textContent === 'Ver comentarios') {
                //VER COMENTARIOS
                submitter.disabled = false;
                submitter.textContent = 'Ocultar comentarios';
                const commentsSubmitter = submitter.parentElement.children[2];
                commentsSubmitter.classList.remove('hidden');
                commentsSubmitter.classList.add('flex');
                

            } else if (submitter.textContent === 'Ocultar comentarios') {
                //OCULTAR COMENTARIOS
                submitter.disabled = false;
                submitter.textContent = 'Ver comentarios';
                const commentsSubmitter = submitter.parentElement.children[2];
                commentsSubmitter.classList.remove('flex');
                commentsSubmitter.classList.add('hidden');
                

            } else if (submitter.textContent === 'Comentar') {
                //COMENTAR
                submitter.disabled = false;
                const commentText = submitter.parentElement.children[0];
                const publishId = submitter.parentElement.parentElement.id;

                if (commentText.value !== '') {
                    const { data } = await axios.post('/api/comment/:id', {
                        text: commentText.value,
                        isAsk: false,
                        publish: publishId,
                    });

                    commentText.value = '';
                    comentarios(data.publish, data.savedComment, publishId, logged);
                    
                    textNotification = 'Nuevo comentario agregado';
                    isNotificationTrue = false;
                    message(isNotificationTrue, textNotification);
                };


            } else if (submitter.textContent === 'Responder') {
                //RESPONDER
                submitter.disabled = false;
                const comment = submitter.parentElement;
                const id = comment.id.split('comment-')[1];
                const last = comment.children.length - 1;
                comment.children[last].remove();

                const input = document.createElement('input');
                input.type = 'text';
                input.id = `ask-input-${id}`;
                input.name = `ask-input-${id}`;
                input.autocomplete = 'off';
                input.placeholder = 'Comentar...';
                input.classList.add('my-1', 'text-black', 'rounded-lg', 'p-2', 'bg-zinc-100', 'focus:outline-slate-700', 'w-[90%]');

                const btn = document.createElement('button');
                btn.id = `ask-btn-${id}`;
                btn.classList.add('text-gray-50', 'text-opacity-100', 'text-sm', 'text-left', 'flex', 'self-end', 'bg-[#f97020ec]', 'p-1', 'rounded-[24px]', 'font-bold', 'transition', 'duration-300', 'hover:bg-[#dab0a1]');
                btn.textContent = 'Enviar respuesta';

                comment.append(input,btn);


            } else if (submitter.textContent === 'Enviar respuesta') {
                //ENVIAR RESPUESTA
                submitter.disabled = false;
                const commentId = submitter.id.split('ask-btn-')[1];
                const input = document.querySelector(`#ask-input-${commentId}`);
                const publishId = submitter.parentElement.parentElement.parentElement.parentElement.id;
                
                const commentContent = document.querySelector(`#comment-content-${commentId}`);
                const askWho = commentContent.textContent.split(':')[0];
                const askText = commentContent.textContent.split(': ')[1];
                
                if (input.value !== '') {
                    const { data } = await axios.post('/api/comment/:id', {
                        text: input.value,
                        isAsk: true,
                        publish: publishId,
                        askTo: commentId,
                        askName: askWho,
                        askText: askText
                    });

                    const comment = input.parentElement;
                    comment.lastChild.remove();
                    comment.lastChild.remove();

                    const askBtn = document.createElement('button');
                    askBtn.classList.add('text-gray-50', 'text-opacity-90', 'text-sm', 'text-left', 'flex', 'self-end', 'underline', 'hover:text-white');
                    askBtn.textContent = 'Responder';
                    comment.append(askBtn);
                    
                    comentarios(data.publish, data.savedComment, publishId, logged);

                    textNotification = 'Nueva respuesta agregada';
                    isNotificationTrue = false;
                    message(isNotificationTrue, textNotification);

                    
                };
            } else {
                //MOSTRAR DETALLES
                const divSubmitter = submitter.parentElement;
                divSubmitter.classList = 'w-full lg:w-[80%] lg:mx-20 self-center grid gap-0 my-0 mx-auto no-underline pb-[13px] pt-[10px] px-[20px] rounded-[24px] transition duration-300 border-[4px] border-[#f97020ec] bg-black';
        
                const imageSubmitter = submitter.children[0];
                imageSubmitter.classList = 'w-full md:w-[75%] flex overflow-hidden justify-self-center mt-2 border-2 border-white';
                imageSubmitter.style = '';
        
                const titleSubmitter = submitter.children[1];
                titleSubmitter.classList = 'font-bold text-3xl pt-4';
        
                for (let i = 2; i < submitter.children.length; i++) {
                    submitter.children[i].classList.remove('hidden');
                };
        
                const commentBtnSubmitter = submitter.parentElement.children[1];
                commentBtnSubmitter.classList.remove('hidden');
                commentBtnSubmitter.classList.add('flex');
                commentBtnSubmitter.disabled = false;
        
                for (let i = 3; i < submitter.parentElement.children.length; i++) {
                    const btnSubmitter = submitter.parentElement.children[i]
                    btnSubmitter.classList.remove('hidden');
                    btnSubmitter.disabled = false;
                };
            };
        });
    } catch (error) {
        console.log(error);
    }    
})();