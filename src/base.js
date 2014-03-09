(function($){
  @@include('key.js')
  @@include('key_delete.js')
  @@include('key_tab.js')
  @@include('key_caps_lock.js')
  @@include('key_return.js')
  @@include('key_shift.js')
  @@include('key_space.js')
  @@include('keyboard.js')

  $.fn.mlKeyboard = function(options) {
    var keyboard = new Keyboard(options);
    keyboard.init();

    this.each(function(){
      keyboard.setUpFor($(this));
    });
  };

})(jQuery);

@@include('layouts/en_us.js')
@@include('layouts/ru.js')
@@include('layouts/es.js')