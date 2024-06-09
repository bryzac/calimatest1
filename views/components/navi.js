const navbar = document.querySelector('#navbar');

// Imagen de fondo
let imgSrc = '';
// Título que llevará la página
let title = '';
// Subtítulo de la página
let paragraph = '';

// Variables para el Nav de Home, se modifican dependiendo de si se está logeado o no
let desktopHome = '';
let mobileHome = '';

//Comprueba si es admin o no
let isAdmin = '';

(async () => {
    try {
        // Enviar la data a BE para chequear que estemos logeados
        const { data } = await axios.get('/api/navs');
        console.log(await axios.get('/api/navs'))
        const userLogged = data.name;

        // Booleano para verificar si se ha iniciado sesión
        const logged = data.logged;

        if (data.rol === 'Admin') {
            isAdmin = true;
        } else {
            isAdmin = false;
        };

        //Obtenemos el pathname pathname, dependiendo de la ubicación, los datos cambian
        const pathName = window.location.pathname;

        //QUITAR
        let isProfile = false;
        let isProfileDetails = false;

        // Dependiendo de la página en la que estemos, las variables se modificarán.
        if (pathName === '/') {
            imgSrc = '/images/calimantes.jpg';
            title = 'Habitantes de la Calima';
            paragraph = 'Nací de un sentimiento en ruinas, en el crujir de las cenizas';
        } else if (pathName === '/signup/') {
            imgSrc = '/images/inhabitants.png';
            title = 'Registrarse';
            paragraph = 'Todos nacimos con una palabra que decir';
        } else if (pathName === '/login/') {
            imgSrc = '/images/inhabitants.png';
            title = 'Iniciar sesión';
            paragraph = 'Todos nacimos con una palabra que decir';
        } else if (pathName === '/visitantes/') {
            imgSrc = '/images/inhabitants.png';
            title = 'Visitantes';
            paragraph = 'Otra ilusión toca mi sombra';
        } else if (pathName === '/habitantes/') {
            imgSrc = '/images/inhabitants.png';
            title = 'Habitantes';
            paragraph = 'Otra ilusión toca mi sombra';
        } else if (pathName === '/contacto/') {
            imgSrc = '/images/Algamord.png';
            title = 'Contacto';
            paragraph = 'Puedes contactarnos por nuestras cuentas oficiales';
        } else if (pathName.includes('/profile/')) {
            //const profile = await axios.get('/api/navs/profile');
            isProfile = true;
            imgSrc = '/images/calimantes.jpg';
        } else if (pathName.includes('/profileDetails/')) {
            //const profile = await axios.get('/api/navs/profile');
            isProfileDetails = true;
            imgSrc = '/images/cara.jpg';
        } else if (pathName.includes('/project/')) {
            //const project = await axios.get(`/api/navs/project/:id`);
            imgSrc = '/images/calimahaze.png';
        } else if (pathName.includes('/admin/')) {
            //const admin = await axios.get(`/api/navs/admin/:id`);
            imgSrc = '/images/calimahaze.png';
            title = `Admin`;
        } else if (pathName.includes('/addPublish/')) {
            //const publish = await axios.get(`/api/navs/publish/:id`);
        }
        

        // Constante con el HTML de la imagen de fondo. Contiene un filtro especial para la imagen, y el recortado, sus clases, y solicita la variable de la imagen
        const navImg = `
            <img src="${imgSrc}" 
                id="nav-img"
                style="clip-path:polygon(0 0, 100% 0, 100% 80%, 90% 90%, 75% 95%, 63% 98%, 50% 100%, 38% 98%, 25% 95%, 10% 90%, 0 80%); filter:brightness(50%);"
                class="-z-10 overflow-hidden object-cover w-screen h-screen justify-self-center relative before:absolute before:bg-myshit"
            >
        `
        // Constante con la sección de Header, el logo y el inicio de la versión de escritorio del Nav
        const nav1 = `    
        <header
            class="z-10 h-24 justify-center flex items-center fixed bg-transparent backdrop-blur-xl w-full"
        >
            <a href="/">
                <img src="/images/Logo.jpg" class="rounded-full w-[70px] h-[70px] fixed top-4 left-8 z-50" alt="logo">
            </a>
    
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="z-[105] w-10 h-10 min-[900px]:hidden text-white cursor-pointer p-2 hover:bg-slate-900 absolute top-4 right-8">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
                />
            </svg>  
    
            <!-- Versión escritorio -->
            <ul class="hidden top-4 right-8 h-16 content-center w-48 min-[900px]:w-auto flex-col justify-evenly rounded-xl items-center z-[100] transition duration-tranmenu min-[900px]:ml-auto min-[900px]:grid min-[900px]:grid-flow-col min-[900px]:auto-cols-max gap-6 mr-8">
                <li class="list-none">
                    <a href="/habitantes" class="text-white p-1 hover:bg-[#f97020ec] transition ease-in-out rounded-lg">Habitantes</a>
                </li>
                <li class="list-none">
                    <a href="/visitantes" class="text-white p-1 hover:bg-[#f97020ec] transition ease-in-out rounded-lg">Visitantes</a>
                </li>
                <li class="list-none">
                    <a href="/contacto" class="text-white p-1 hover:bg-[#f97020ec] transition ease-in-out rounded-lg">Contacto</a>
                </li>
        `;
        // Constante con el cierre de la versión de escritorio y el inicio de la versión móvil. Ambas versiones se separan porque dependen de la URL y de si se está logeado o no
        const nav2 = `
        </ul>
        
        <!-- Versión móvil -->
        <ul class="hidden min-[900px]:hidden p-4 fixed top-4 right-8 h-88 w-48 flex-col justify-evenly rounded-xl items-center z-[100] transition duration-tranmenu gap-6 mr-8 bg-gray-900">
            <li class="list-none">
                <a href="/habitantes" class="text-white p-1 hover:bg-[#f97020ec] transition ease-in-out rounded-lg">Habitantes</a>
            </li>
            <li class="list-none">
                <a href="/visitantes" class="text-white p-1 hover:bg-[#f97020ec] transition ease-in-out rounded-lg">Visitantes</a>
            </li>
            <li class="list-none">
                <a href="/contacto" class="text-white p-1 hover:bg-[#f97020ec] transition ease-in-out rounded-lg">Contacto</a>
            </li>
        `;
        // Constante con el cierre de la versión móvil y del header
        const nav3 = `
        </ul>
        </header>
        `;
        // Constante con la sección del título y subtítulo de la página. 
        const navTitle = `
        <div id="nav-title-div" class="z-[1] w-full justify-self-center absolute max-w-[800px] grid auto-rows-max content-end gap-8 text-center p-0 top-24">
            <h1 id="nav-title" class="text-4xl min-[900px]:text-5xl text-center font-bold">
                ${title}
            </h1>
            <p id="nav-paragraph" class="text-base">
                ${paragraph}
            </p>
        </div>
        `;

        // Si se está logeado, el menú del nav se va modificando
        if (logged) {
            desktopHome = `
            <li class="list-none">
                <a href="/profile/${data.userID}" class="text-white px-2 p-1 font-bold hover:bg-[#b81c1cec] transition ease-in-out rounded-lg bg-[#f97020ec]">${userLogged.split(' ')[0]}</a>
            </li>
            <div class="hidden min-[900px]:flex flex-row gap-4">
                <button id="close-btn" class="transition ease-in-out text-white bg-[#191e4dad] font-bold hover:bg-[#e6b9a4] px-2 p-1 rounded-lg">Cerrar sesión</button>
            </div>
            `;
            mobileHome = `
            <li class="list-none">
                <a href="/profile/${data.userID}" class="text-white p-1 font-bold hover:bg-[#FF3300] hover:border-2 hover:border-white transition ease-in-out rounded-lg bg-[#f97020ec]">${userLogged.split(' ')[0]}</a>
            </li>
            <li class="list-none">
                <button id="close-btn" class="transition ease-in-out text-white bg-[#191e4dad] font-bold hover:bg-[#e6b9a4] p-1 rounded-lg">Cerrar sesión</button>
            </li>
            `;

            if (isAdmin) {
                desktopHome = `
                
                <li class="list-none">
                    <a href="/admin/${data.userID}" class="transition ease-in-out text-white bg-[#191e4dad] font-bold hover:bg-[#e6b9a4] p-1 rounded-lg">Admin</a>
                </li>
                ` + desktopHome;
                mobileHome = `
                
                <li class="list-none">
                    <a href="/admin/${data.userID}" class="text-white p-1 font-bold hover:bg-[#FF3300] hover:border-2 hover:border-white transition ease-in-out rounded-lg bg-[#f97020ec]">Admin</a>
                </li>
                ` + mobileHome;
            }
            
        } else {
            desktopHome = `
            <li class="list-none">
                <a href="/login" class="text-white px-2 p-1 font-bold hover:bg-[#e6b9a4] transition ease-in-out rounded-lg bg-[#191e4dad]">Ingresar</a>
            </li>
            <li class="list-none">
                <a href="/signup" class="text-white px-2 p-1 font-bold hover:bg-[#b81c1cec] transition ease-in-out rounded-lg bg-[#f97020ec]">Registrarse</a>
            </li>
            `;
            mobileHome = `
            <li class="list-none">
                <a href="/login" class="text-black px-2 p-1 font-bold hover:bg-[#e6b9a4] transition ease-in-out rounded-lg bg-[#ffffff]">Ingresar</a>
            </li>
            <li class="list-none">
                <a href="/signup" class="text-white px-2 p-1 font-bold hover:bg-[#FF3300] hover:border-2 hover:border-white transition ease-in-out rounded-lg bg-[#f97020ec]">Registrarse</a>
            </li>
            `;
        };

        // Nav de la sección de Home, principalmente. Se distingue por: 1.Tener el título a mitad de la pantalla. 2.Tener las opciones para acceder y registrarse. 3.Modificarse según si se está logeado o nodemon.
        const createNavHome = () => {
            navbar.innerHTML = `
            ${navImg}
            ${nav1}
            ${desktopHome}
            ${nav2}
            ${mobileHome}
            ${nav3}
            <div id="nav-title-div" class="z-[1] w-full justify-self-center absolute max-w-[800px] grid auto-rows-max content-end gap-8 text-center p-0 top-52">
                <h1 id="nav-title" class="text-4xl min-[900px]:text-5xl text-center font-bold">
                    ${title}
                </h1>
                <p id="nav-paragraph" class="text-base">
                    ${paragraph}
                </p>
            </div>
            `;
        };

        // Nav de la sección de Registro. Se distingue por no tener la opción registro en el menú, y por tener el título más arriba que el Home, para dejar una versión más entendible
        const createNavSignup = () => {
            navbar.innerHTML = `
            ${navImg}
            ${nav1}
                    <li class="list-none">
                        <a href="/login" class="text-white px-2 p-1 font-bold hover:bg-[#e6b9a4] transition ease-in-out rounded-lg bg-[#191e4dad]">Ingresar</a>
                    </li>
            ${nav2}
                    <li class="list-none">
                        <a href="/login" class="text-black px-2 p-1 font-bold hover:bg-[#e6b9a4] transition ease-in-out rounded-lg bg-[#ffffff]">Ingresar</a>
                    </li>
            ${nav3}
            ${navTitle}
            `;
        };
        
        // Nav de la sección de Login. Se distingue por no tener la opción login en el menú, y por tener el título más arriba que el Home, para dejar una versión más entendible
        const createNavLogin = () => {
            navbar.innerHTML = `
            ${navImg}
            ${nav1}
                    <li class="list-none">
                        <a href="/signup" class="text-white px-2 p-1 font-bold hover:bg-[#b81c1cec] transition ease-in-out rounded-lg bg-[#f97020ec]">Registrarse</a>
                    </li>
            ${nav2}
                    <li class="list-none">
                        <a href="/signup" class="text-white px-2 p-1 font-bold hover:bg-[#FF3300] hover:border-2 hover:border-white transition ease-in-out rounded-lg bg-[#f97020ec]">Registrarse</a>
                    </li>
            ${nav3}
            ${navTitle}
            `;
        };

        const createNavProfileDetails = () => {
            navbar.innerHTML = `
            ${navImg}
            ${nav1}
            ${desktopHome}
            ${nav2}
            ${mobileHome}
            ${nav3}
            ${navTitle}
            `;
        };

        const createNavAddPublish = () => {
            navbar.innerHTML = `
            <div class="my-12">
            </div>
            ${nav1}
            ${desktopHome}
            ${nav2}
            ${mobileHome}
            ${nav3}
            `;
        };

        const createNavContact = () => {
            navbar.innerHTML = `
            ${navImg}
            ${nav1}
            ${desktopHome}
            ${nav2}
            ${mobileHome}
            ${nav3}
            <div class="z-[1] w-full justify-self-center absolute max-w-[800px] grid auto-rows-max content-end gap-8 text-center p-0 top-40">
                <h1 id="nav-title" class="text-4xl min-[900px]:text-5xl text-center font-bold">
                    ${title}
                </h1>
                <p id="nav-title" class="text-base">
                    ${paragraph}
                </p>
                <div class="pt-8 pb-10 flex flex-wrap justify-self-center justify-between w-full gap-8 px-4">
                    <article class="grid gap-0 w-[100px] my-0 mx-auto">
                        <a href="https://www.facebook.com/habitantesdelacalima" class="justify-self-center"><img src="../../Images/facebook.svg" class="w-[80px] justify-self-center"></a>
                        <a href="https://www.facebook.com/habitantesdelacalima"><h4 class="font-bold text-xl">Facebook</h4></a>
                    </article>
                    <article class="grid gap-0 w-[100px] my-0 mx-auto">
                        <a href="https://www.instagram.com/habitantesdelacalima" class="justify-self-center"><img src="../../Images/instagram.svg" class="w-[80px] justify-self-center"></a>
                        <a href="https://www.instagram.com/habitantesdelacalima"><h4 class="font-bold text-xl">Instagram</h4></a>
                    </article>
                    <article class="grid gap-0 w-[100px] my-0 mx-auto">
                        <a href="mailto:habitantesdelacalima@gmail.com" class="justify-self-center"><img src="../../Images/gmail.svg" class="w-[80px] justify-self-center"></a>
                        <a href="mailto:habitantesdelacalima@gmail.com"><h4 class="font-bold text-xl">Correo</h4></a>
                    </article>
                </div>
            </div>
            `;
        };

        // Dependiendo de la sección en la que se encuentre, se activará un createNav distinto.
        if (window.location.pathname === '/' || isProfile || window.location.pathname === '/visitantes/' || window.location.pathname === '/habitantes/' || window.location.pathname === `/project/${pathName[2]}/` || window.location.pathname === `/admin/${pathName[2]}/`) {
        createNavHome();
        } else if (window.location.pathname === '/signup/') {
            createNavSignup();
        } else if (window.location.pathname === '/login/') {
            createNavLogin();
        } else if (isProfileDetails) {
            createNavProfileDetails();
        } else if (window.location.pathname === `/addPublish/${pathName[2]}/` || window.location.pathname === `/editPublish/${pathName[2]}/`) {
            createNavAddPublish();
        } else if (window.location.pathname === '/contacto/') {
            createNavContact();
        }

        const navBtn = navbar.children[1].children[1];
        const menuMobile = navbar.children[1].children[3];
        
        navBtn.addEventListener('click', e => {
            if (!navBtn.classList.contains('active')) {
                navBtn.classList.add('active');
                navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />"';
                menuMobile.classList.remove('hidden');
                menuMobile.classList.add('flex');
            } else {
                navBtn.classList.remove('active');
                navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />'
                menuMobile.classList.add('hidden');
                menuMobile.classList.remove('flex');
            }
        });

        const closeBtnDesktop = navbar.children[1].children[2].lastElementChild.children[0];
        const closeBtnMobile = navbar.children[1].children[3].lastElementChild.children[0];

        const close = async () => {
            try {
                await axios.get('/api/logout');
                window.location.pathname = '/login';
            } catch (error) {
                console.log(error);
            }
        };
        closeBtnDesktop.addEventListener('click', async e => {
            close()
        });
        closeBtnMobile.addEventListener('click', async e => {
            close()
        });
    } catch (error) {
        console.log(error);
        if (error.response?.data.error === 'Usuario no encontrado') {
            window.location.pathname = '/';
        }
    }
})();