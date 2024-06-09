const textInfo = document.querySelector('#text-info');

(async () =>{
    try {
        const token = window.location.pathname.split('/')[3];
        const id = window.location.pathname.split('/')[2];
        await axios.patch(`/api/users/verify/${id}/${token}`);

        const instagram = '';
        const twitter = '';
        const linktr = '';
        const allmylinks = '';
        const whatsapp = '';
        const telegram = '';
        const facebookUrl = '';
        const facebook = '';
        const youtubeUrl = '';
        const youtube = '';
        const linkedInUrl = '';
        const linkedIn = '';
        const newContact = {
            instagram: instagram,
            twitter: twitter,
            linktr: linktr,
            allmylinks: allmylinks,
            whatsapp: whatsapp,
            telegram: telegram,
            facebookUrl: facebookUrl,
            facebook: facebook,
            youtubeUrl: youtubeUrl,
            youtube: youtube,
            linkedInUrl: linkedInUrl,
            linkedIn: linkedIn,
        }
        await axios.post(`/api/users/contact/${id}/${token}`, newContact);
        
        window.location.pathname = '/login/';
    } catch (error) {
        textInfo.innerHTML = error.response.data.error;
    }
})();