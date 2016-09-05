'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

/**
 * Response for validation error
 * @param  {Response} res - Objeto para respuesta
 * @param  {Object} err - Descripcion del error
 * @return {Response} - Respuesta del request
 */
var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Obtiene la lista de usuarios
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Crea un usuario
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @param  {Function} next - Siguiente funcion a ejecutar
 * @return {Response} - Respuesta del request
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Obtiene un usuario
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @param  {Function} next - Siguiente funcion a ejecutar
 * @return {Response} - Respuesta del request
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Elimina un usuario
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Cambia el password del usuario
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @param  {Function} next - Siguiente funcion a ejecutar
 * @return {Response} - Respuesta del request
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Obtiene la informacion del usuario actual
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @param  {Function} next - Siguiente funcion a ejecutar
 * @return {Response} - Respuesta del request
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Callback de autenticacion
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @param  {Function} next - Siguiente funcion a ejecutar
 * @return {Response} - Respuesta del request
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
