/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var JobClassification = require('./jobClassification.model');

exports.register = function(socket) {
  JobClassification.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  JobClassification.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('jobClassification:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('jobClassification:remove', doc);
}