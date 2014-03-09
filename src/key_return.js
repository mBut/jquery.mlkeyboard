function KeyReturn() {
  Key.call(this, arguments);

  this.id = "mlkeyboard-return";
  this.default_value = 'return';
}

KeyReturn.prototype = new Key();
KeyReturn.prototype.constructor = KeyReturn;

KeyReturn.prototype.defaultClickAction = function() {
  var e = $.Event("keypress", {
    which: 13,
    keyCode: 13
  });
  this.keyboard.$current_input.trigger(e);
};