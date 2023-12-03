const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан несуществующий id'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        return Movie.deleteOne(movie)
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      }
      throw new ForbiddenError('Удалить карточку с указанным _id нельзя');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан несуществующий id'));
      }
      return next(err);
    });
};
