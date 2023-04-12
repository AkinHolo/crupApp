import express from 'express'

const router = express.Router();

router.get('/', getPosts)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/likePost', likePost)

export default router;