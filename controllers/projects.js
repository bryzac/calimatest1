const projectsRouter = require('express').Router();
const User = require('../models/user');
const Project = require('../models/project');
const Publish = require('../models/publish');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utilities/sendEmail');

//Profile: Publica un nuevo proyecto
projectsRouter.post('/publish', async (request, response) => {
    try {
        const { name, icon, artistic } = request.body;
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.status(200).json({ error:'Debes iniciar sesión' });
        }
        
        if (!name || !icon || !artistic) {
            return response.status(400).json({ error: 'Todos los espacios son requeridos' });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
    
        const newProject = new Project ({
            name,
            icon,
            artistic,
            user: user._id
        });
    
        const savedProject = await newProject.save();
        user.projects = user.projects.concat(savedProject._id);
        await user.save();

        // Enviar correo
        const subjectSend = 'projectPublish';
        const url = `project/${savedProject._id}/`
        sendEmail(user.name, user.email, subjectSend, url, user.rol, name);

        return response.status(201).json(savedProject);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
        
    }
});

//Project
projectsRouter.get('/:id', async (request, response) => {
    try {
        const pathName = request.params.id;
        const project = await Project.findById(pathName);
        const { name } = project;

        const token = request.cookies?.accessToken;
        let decoded;
        let user;
        let logged = false;
        
        if (token) {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);            
            user = await User.findById(decoded.id);
            logged = true;
        }
        let isOwner = false;

        if (user?._id.toString() === project.user._id.toString()) {
            isOwner = true;
        };

        const publishs = await Publish.find({ project: project });
        const comments = await Comment.find({ publish: publishs });

        return response.status(200).json({ name: name, publishs: publishs, isOwner, comments: comments, logged });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
        
    }
});

//Profile: Mostramos los proyectos del usuario en su perfil
projectsRouter.get('/profile/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const projects = await Project.find({ user: id });
        const token = request.cookies?.accessToken;
        
        let decoded;
        let user;
        if (token) {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);            
            user = await User.findById(decoded.id);
        }

        //Si es el propietario del perfil, se confirmará como tal
        let isOwner = false;
        if (user?._id.toString() === id) {
            isOwner = true;
        };

        return response.status(200).json({ projects, isOwner });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

module.exports = projectsRouter;