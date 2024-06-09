const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');

const sendEmail = async (userName, userEmail, subjectSend, url, rol, adit) => {
    let subjectEmail = '';
    let htmlBody = '';

    // Crea un puerto entre la app y el correo de Google
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    // Todos los correos se escriben aquí
    if (subjectSend === 'verify') {
        subjectEmail = 'Verificación de usuario';
        htmlBody = 'verificar tu correo';
    } else if (subjectSend === 'resetPassword') {
        subjectEmail = 'Recuperar contraseña';
        htmlBody = 'recuperar tu contraseña';
    }
    // Cuando se crea una sección nueva
    if (subjectSend === 'projectPublish') {
        subjectEmail = 'Nueva sección creada'
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: subjectEmail,
            html: `<p>
            Hola ${rol} <span style="font-weight: bold;">${userName}</span>, <br> 
            Te felicito, has empezado una sección nueva en estas tierras silenciadas. Esperamos que tu voz y tu mirada, expandan estos caminos.<br> 
            Para empezar a compartir tu arte, solo debes darle click en <span style="font-weight: bolder;">tu perfil</span>, y seleccionar la sección de <span style="font-weight: bolder;">${adit}</span>; desde ahí podrás crear nuevas publicaciones, así como editar las que ya tienes publicadas.<br> 
            Si deseas mantener algo oculto, toca en el botón de <span style="font-weight: bolder;">Público</span> para desactivarlo de los demás Visitantes de la Calima.<br>
            Aqui abajo, te dejo un enlace directo para que puedas editar tu sección nueva:<br>
            <a href="${PAGE_URL}/${url}" style="color: black; font-weight: bolder;">${adit}</a><br><br>
            Saludos.
            </p>`,
        });
    }
    if (subjectSend === 'newPublish') {
        subjectEmail = 'Nueva publicación'
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: subjectEmail,
            html: `<p>
            Hola ${rol} <span style="font-weight: bold;">${userName}</span>, <br> 
            Desde estas tierras podemos ver la calima acercarse. Un nuevo fruto ha nacido de estos vetustos árboles y los Habitantes y Visitantes ansían poder conocerlo.<br>
            Ya que has creado una nueva publicación, puedes editarla y ver cómo va componiendo este proyecto que has creado. También puedes editar la visibilidad para dejarlo público o privado, así como leer los comentarios que otros visitantes quieran dejarte.<br> 
            Te dejo un enlace directo para que puedas ver tu nueva publicación:<br>
            <a href="${PAGE_URL}/${url}" style="color: black; font-weight: bolder;">${adit}</a><br><br>
            Saludos.
            </p>`,
        })
    }

    // Enviar correo
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: subjectEmail,
        html: `<p>
        Hola ${rol} <span style="font-weight: bold;">${userName}</span>, <br> 
        Te dejo un enlace donde puedes <a href="${PAGE_URL}/${url}" style="color: black; font-weight: bolder;">${htmlBody}</a>. <br> 
        Saludos.
        </p>`,
    });
};

module.exports = sendEmail;