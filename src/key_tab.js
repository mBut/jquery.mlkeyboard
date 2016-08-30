function KeyTab() {
  Key.call(this, arguments);

  this.id = "mlkeyboard-tab";
  this.default_value = 'tab';
}

KeyTab.prototype = new Key();
KeyTab.prototype.constructor = KeyTab;

KeyTab.prototype.defaultClickAction = function() {
  this.keyboard.hideKeyboard();
  $(":input").eq($(":input").index(this.keyboard.$current_input)+1).focus();
};
