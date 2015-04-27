# jQuery MLKeyboard

**ML Keyboard** is a jQuery virtual keyboard with features to change input layouts on the flight.

#### [Demo](http://mbut.github.io/jquery.mlkeyboard/)

## Usage
* Download <code>jquery.ml-keyboard.min.js</code> and <code>jquery.ml-keyboard.css</code> files and add to your project.
* Activate the plugin on the input fields with prefered layot <code>$('input').mlKeyboard({layout: 'es_ES'});</code>.
* It's ready.

### Options
The following options are available to pass into ML Keyboard on initialization.

* (string) **layout:** set layout which is applicable to all input fields. By default it has value 'en_US' what is equal to American English layout.

* (boolean) **active_shift:** when user first time focus on input field virtual keyboards shift is active. Default value - true.

* (boolean) **active_caps:** initial virtual keyboards caps lock state. Default value - false.

* (boolean) **is_hidden:** to create keyboard always visible this value should be changed to false. Default value - true.

* (integer) **open_speed:** is speed at what keyboard shows. Default value - 300.

* (integer) **close_speed:** is speed at what keyboard hides back. Devault value - 100.

* (boolean) **enabled:** - change it to false if you want temporary disable keyboard. This param is useful when defines as input data attribute (read below how to set up single inputs with data attributes).

To change behaviour of single input field special data attribute should be added to it's tag name <code>data-mlkeyboard-&lt;option&gt;="value"</code> where <code>option</code> is the same attribute like it's described before.

###### Currently possible layouts</h5>
* **en_US** - English
* **es_ES** - Spanish
* **it_IT** - Italian
* **pt_PT** - Portuguese
* **ru_RU** - Russian
