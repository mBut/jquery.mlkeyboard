function KeyShift() {
  Key.call(this, arguments);

  this.id = "mlkeyboard-"+arguments[1]+"-shift";
  this.default_value = 'shift';
}

KeyShift.prototype = new Key();
KeyShift.prototype.constructor = KeyShift;

KeyShift.prototype.isActive = function() {
  return this.keyboard.active_shift;
};

KeyShift.prototype.defaultClickAction = function() {
  this.keyboard.toggleShift();
};