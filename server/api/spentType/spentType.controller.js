'use strict';

/**
 * Controlador para Tipo de Gasto
 */

var _ = require('lodash');
var SpentType = require('./spentType.model');

/**
 * Lista los tipos de gasto
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.index = function(req, res) {
  SpentType.find(function (err, spentTypes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(spentTypes);
  });
};

/**
 * Obtiene un tipo de gasto
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.show = function(req, res) {
  SpentType.findById(req.params.id, function (err, spentType) {
    if(err) { return handleError(res, err); }
    if(!spentType) { return res.status(404).send('Not Found'); }
    return res.json(spentType);
  });
};

/**
 * Crea un tipo de gasto
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.create = function(req, res) {
  SpentType.create(req.body, function(err, spentType) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(spentType);
  });
};

/**
 * Modifica un tipo de gasto
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SpentType.findById(req.params.id, function (err, spentType) {
    if (err) { return handleError(res, err); }
    if(!spentType) { return res.status(404).send('Not Found'); }
    var updated = _.merge(spentType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(spentType);
    });
  });
};

/**
 * Elimina un tipo de gasto
 * @param  {Request} req - Objeto para el request
 * @param  {Response} res - Objeto para respuesta
 * @return {Response} - Respuesta del request
 */
exports.destroy = function(req, res) {
  SpentType.findById(req.params.id, function (err, spentType) {
    if(err) { return handleError(res, err); }
    if(!spentType) { return res.status(404).send('Not Found'); }
    spentType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

/**
 * Maneja errores
 * @param  {Request} req - Objeto para el request
 * @param  {Object} err - Objeto de error
 * @return {Response} - Respuesta del request
 */
function handleError(res, err) {
  return res.status(500).send(err);
}
