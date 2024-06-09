const commentsRouter = require('express').Router();
const User = require('../models/user');
const Project = require('../models/project');
const Publish = require('../models/publish');
const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utilities/sendEmail');


commentsRouter.post('/:id', async (request, response) => {
    try {
        const token = request.cookies?.accessToken;
        if (!token) {
            return response.status(200).json({ error: 'Usuario no ingresado' });
        }

        const {
            text,
            isAsk,
            publish,
            askTo,
            askName,
            askText
        } = request.body;

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        const publishTo = await Publish.findById(publish);

        const newComment = new Comment ({
            text,
            isAsk,
            publish: publishTo._id,
            user: user._id,
            name: user.name,
            askTo: askTo,
            askName: askName,
            askText: askText
        });
        const savedComment = await newComment.save();
        user.comment = user.comment.concat(savedComment._id);
        publishTo.comment = publishTo.comment.concat(savedComment._id);
        await user.save();
        await publishTo.save();

        return response.status(200).json({ savedComment, publish: publishTo.comment });
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
});

module.exports = commentsRouter;