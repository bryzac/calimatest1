const publishsRouter = require('express').Router();
const User = require('../models/user');
const Project = require('../models/project');
const Publish = require('../models/publish');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utilities/sendEmail');

//AddPublish: Obtenemos información de la publicación 
publishsRouter.get('/:id', async (request, response) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.status(404).json({ error: 'Usuario no ingresado' })
        }

        console.log(request.params.id)

        const pathName = request.rawHeaders[21].split('/')[4];
        const project = await Project.findById(pathName);
        const user = await User.findById(request.user._id);
        
        if (!user.projects.includes(pathName)) {
            return response.status(400).json({ error: 'Usuario no es propietario' })
        };

        return response.status(200).json({ name: project.name });
        
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

publishsRouter.post('/:id', async (request, response) => {
    try {
        const {
            title,
            dedicatory,
            epigraph,
            epigraphBy,
            text,
            image,
            date,
            additional,
            nominations,
            awards,
            link,
            public
        } = request.body;
        
        const token = request.cookies?.accessToken;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        const pathName = request.rawHeaders[27].split('/')[4];
        const project = await Project.findById(pathName);
        
        const newPublish = new Publish ({
            title,
            dedicatory,
            epigraph,
            epigraphBy,
            text,
            image,
            date,
            additional,
            nominations,
            awards,
            link,
            public,
            user: user._id,
            project: project._id
        });

        const savedPublish = await newPublish.save();
        project.publish = project.publish.concat(savedPublish._id);
        user.publish = user.publish.concat(savedPublish._id);
        await project.save();
        await user.save();
        
        // Enviar correo
        const subjectSend = 'newPublish';
        const url = `project/${project}/`
        sendEmail(user.name, user.email, subjectSend, url, user.rol, title);

        return response.status(201).json(savedPublish);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

publishsRouter.get('/edit/:id', async (request, response) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.status(404).json({ error: 'Usuario no ingresado' })
        }
        
        const pathName = request.rawHeaders[21].split('/')[4];
        const publish = await Publish.findById(pathName);
        const user = await User.findById(request.user._id);
        
        if (!user.publish.includes(pathName)) {
            return response.status(400).json({ error: 'Usuario no es propietario' })
        };

        return response.status(200).json(publish);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

publishsRouter.patch('/edit/:id', async (request, response) => {
    try {
        const userRequest = request.user;
        const publish = request.params.id;
        const user = await User.findById(userRequest.id);
        const { title, dedicatory, epigraph, epigraphBy, text, image, date, additional, nominations, awards, link, public } = request.body;
        
        if (user.publish.includes(publish)) {
            await Publish.findByIdAndUpdate(
                publish,
                { title, dedicatory, epigraph, epigraphBy, text, image, date, additional, nominations, awards, link, public }
            );
        } else {
            console.log(error);
            return response.sendStatus(400);    
        }

        return response.sendStatus(200);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

module.exports = publishsRouter;
