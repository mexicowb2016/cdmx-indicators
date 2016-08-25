/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sector = require('./sector.model');

exports.register = function(socket) {
  Sector.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sector.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sector:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sector:remove', doc);
}