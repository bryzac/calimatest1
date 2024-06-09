const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utilities/sendEmail');
const Contact = require('../models/contact');

usersRouter.post('/', async (request, response) => {
    // Solicita al body todos los datos
    const { name, email, phone, nickname, country, icon, password } = request.body;
    
    // En caso de que traten de acceder sin todos los datos
    if (!name || !email || !phone || !country || !icon || !password) {
        return response.status(400).json({ error: 'Todos los espacios son requeridos' });
    }
    // En caso de que el email ya esté registrado
    const userExist = await User.findOne({ email });
    if (userExist) {
        return response.status(400).json({ error: 'El email ya se encuentra en uso' });
    }

    // Encriptar contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Mandar nuevo user
    const newUser = new User ({
        name,
        email,
        phone,
        nickname,
        country,
        icon,
        passwordHash,
        birthday: '',
        birthplace: '',
        sentence: '',
        nextProjects: '',
        semblance: '',
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });

    // Enviar correo
    const subjectSend = 'verify';
    const url = `verify/${savedUser.id}/${token}`;
    sendEmail(savedUser.name, savedUser.email, subjectSend, url, savedUser.rol, '');

    return response.status(201).json('Usuario creado. Por favor, verifica tu correo');
});

usersRouter.get('/visitantes', async (request, response) => {
    const visitantes = await User.find({ rol: 'Visitante' });
    
    const visitantesMap = visitantes.map(visitante => [
        {
            _id: visitante._id,
            name: visitante.name,
            nickname: visitante.nickname,
            icon: visitante.icon
        }
    ]);
    return response.status(200).json(visitantesMap);
});

//Profile: Obtiene la información del usuario para mostrarlo en su perfil
usersRouter.get('/profile/:id', async (request, response) => {
    try {
        const pathName = request.params.id;
        const user = await User.findById(pathName);
        const { name, id, semblance } = user;

        const contacts = await Contact.find({ user: id });
        const { instagram, twitter, linktr, allmylinks, whatsapp, telegram, facebookUrl, facebook, youtubeUrl, youtube, linkedInUrl, linkedIn } = contacts[0];

        return response.status(200).json({ name: name, id: id, semblance: semblance, instagram: instagram, twitter: twitter, linktr: linktr, allmylinks: allmylinks, whatsapp: whatsapp, telegram: telegram, facebookUrl: facebookUrl, facebook: facebook, youtubeUrl: youtubeUrl, youtube: youtube, linkedInUrl: linkedInUrl, linkedIn: linkedIn });
    } catch (error) {
        console.log(error);
        return response.status(404).json({ error: 'Usuario no encontrado' });
    }
});

usersRouter.get('/habitantes', async (request, response) => {
    const habitantes = await User.find({ rol: 'Habitante'});
    const admins = await User.find({ rol: 'Admin'});
    
    const habitantesMap = habitantes.map(habitante => [
        {
            _id: habitante._id,
            name: habitante.name,
            nickname: habitante.nickname,
            semblance: habitante.semblance
        }
    ]);
    const adminsMap = admins.map(admin => [
        {
            _id: admin._id,
            name: admin.name,
            nickname: admin.nickname,
            semblance: admin.semblance
        }
    ]);
    return response.status(200).json({habitantesMap, adminsMap})
});

usersRouter.get('/home', async (request, response) => {
    const habitantes = await User.find({rol: 'Habitante'});
    const admins = await User.find({rol: 'Admin'});

    const habitantesMap = habitantes.map(habitante => [
        {
            _id: habitante._id,
            name: habitante.name,
            nickname: habitante.nickname,
            icon: habitante.icon
        }
    ]);
    const adminsMap = admins.map(admin => [
        {
            _id: admin._id,
            name: admin.name,
            nickname: admin.nickname,
            icon: admin.icon
        }
    ]);
    return response.status(200).json({habitantesMap, adminsMap})
})

module.exports = usersRouter;