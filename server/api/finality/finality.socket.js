/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Finality = require('./finality.model');

exports.register = function(socket) {
  Finality.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Finality.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('finality:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('finality:remove', doc);
}