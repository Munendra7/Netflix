const { prisma } = require('./db');
const movies = require('./movies.json');

const seedMovies = async () => {
    for (let movie of movies) {
        await prisma.movie.create({
            data: {
                title: movie.title,
                poster: movie.poster,
                videoUrl: movie.videoUrl,
                description: "Sample description"
            }
        });
    }
}

seedMovies();