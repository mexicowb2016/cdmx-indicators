/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var InstitutionalActivity = require('./institutionalActivity.model');

exports.register = function(socket) {
  InstitutionalActivity.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  InstitutionalActivity.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('institutionalActivity:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('institutionalActivity:remove', doc);
}