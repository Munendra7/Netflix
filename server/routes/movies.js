const router = require('express').Router();
const { prisma } = require('../db');

router.get('/movies/list', async (req, res) => {
    const count = await prisma.Movie.count();
    const movies = await prisma.Movie.findMany({
        take: 10,
        skip: parseInt(req.query.offset) || 0  
    });
    return res.json({movies, count});
});

router.get('/movie/:id', async(req, res) => {
    try
    {
        const id = req.params.id;
        const movie = await prisma.Movie.findUnique({ 
            where:{
                id: parseInt(id)
            }
        });
        res.send(movie??{});
    }

    catch(e)
    {
        res.status(400).send(e);
    }
    
});

module.exports = router;
