// Create web server
const express = require('express');
const router = express.Router();
const commentModel = require('../models/commentModel');

// Get all comments
router.get('/', (req, res) => {
    commentModel.getAllComments((err, data) => {
        res.json(data);
    });
});

// Get comment by id
router.get('/:id', (req, res) => {
    commentModel.getCommentById(req.params.id, (err, data) => {
        res.json(data);
    });
});

// Create a new comment
router.post('/', (req, res) => {
    const comment = {
        id: req.body.id,
        content: req.body.content,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    };

    commentModel.insertComment(comment, (err, data) => {
        if (data && data.insertId) {
            res.json({
                success: true,
                message: 'Comment created',
                data: data
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error creating comment'
            });
        }
    });
});

// Update a comment
router.put('/:id', (req, res) => {
    const comment = {
        id: req.params.id,
        content: req.body.content,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    };

    commentModel.updateComment(comment, (err, data) => {
        if (data && data.message) {
            res.json(data);
        } else {
            res.json({
                success: false,
                message: 'Error updating comment'
            });
        }
    });
});

// Delete a comment
router.delete('/:id', (req, res) => {
    commentModel.deleteComment(req.params.id, (err, data) => {
        if (data && data.message === 'deleted' || data.message === 'not exists') {
            res.json({
                success: true,
                data
            });
        } else {
            res.status(500).json({
                message: 'Error deleting comment'
            });
        }
    });
});

module