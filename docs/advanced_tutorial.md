# How to extend layouts

**ML Keyboard** is a jQuery virtual keyboard with features to change input layouts on the flight.

#### [Demo](http://mbut.github.io/jquery.mlkeyboard/)

## Requirements
* [GRUNT](http://gruntjs.com/)  
* [RubyGems](https://rubygems.org/) - required to install sass

##Steps
- Add new layout file
- Edit layout file
- Add new entry in base.js
- Grunt all

## Add new layout file
the best and simply way to add a new layout is copying and renaming existent file

``cp en_US.js it_IT.js``

Now the file just created can be modified with the new layout schema.

## Edit layout file

Let's modify the file you just created for Italian keyboard (language code it_IT).

The first thing to do is to change the language code from **en_US** to **it_IT** and key after key write the new configuration.

As you can see the **d** is for DOWN and **u** is for UP.

You can also add a set of more chars per key like this:

```javascript
{d: 'e',u: 'é', m: [
    {d: 'e', u: 'é'},
    {d: '[', u: '{'}
  ]}
````

The layout complete:

```javascript
mlKeyboard.layouts.it_IT = [
  {d: '\\', u: '|'},
  {d: '1',u: '!'},
  {d: '2',u: '"'},
  {d: '3',u: '£'},
  {d: '4',u: '$'},
  {d: '5',u: '%'},
  {d: '6',u: '&'},
  {d: '7',u: '/'},
  {d: '8',u: '('},
  {d: '9',u: ')'},
  {d: '0',u: '='},
  {d: ''',u: '?'},
  {d: 'ì',u: '^'},
  {}, // Delete
  {}, // Tab
  {d: 'q',u: 'Q'},
  {d: 'w',u: 'W'},
  {d: 'e',u: 'E'},
  {d: 'r',u: 'R'},
  {d: 't',u: 'T'},
  {d: 'y',u: 'Y'},
  {d: 'u',u: 'U'},
  {d: 'i',u: 'I'},
  {d: 'o',u: 'O'},
  {d: 'p',u: 'P'},
  {d: 'e',u: 'é', m: [
    {d: 'e', u: 'é'},
    {d: '[', u: '{'}
  ]},
  {d: '+',u: '*', m: [
    {d: '+', u:'*'},
    {d: ']', u: '}'}
  ]},
  {}, // Caps lock
  {d: 'a',u: 'A'},
  {d: 's',u: 'S'},
  {d: 'd',u: 'D'},
  {d: 'f',u: 'F'},
  {d: 'g',u: 'G'},
  {d: 'h',u: 'H'},
  {d: 'j',u: 'J'},
  {d: 'k',u: 'K'},
  {d: 'l',u: 'L'},
  {d: 'ò',u: 'ç', m:[
    {d: 'ò',u: 'ç'},
    {d:'@', u 'Ç'}
  ]},
  {d: 'à',u: '°', m:[
    {d: 'à',u: '°'},
    {d:'#', u '∞'}
  ]},
  {d: 'ù'',u: '§'},
  {}, // Return
  {}, // Left shift
  {d: '<', u:'>'},
  {d: 'z',u: 'Z'},
  {d: 'x',u: 'X'},
  {d: 'c',u: 'C'},
  {d: 'v',u: 'V'},
  {d: 'b',u: 'B'},
  {d: 'n',u: 'N'},
  {d: 'm',u: 'M'},
  {d: ',',u: ';'},
  {d: '.',u: ':'},
  {d: '-',u: '_'},
  {}, // Right shift
  {}  // Space
];
```
## Add new entry in base.js

Add this:

```javascript
@@include('layouts/it_IT.js')
```

to the end of src/base.js file

## Grunt all

From command line perform

```bash
grunt
```
> Remember to execute npm install after cloned the repository

and now you can use your layout with

```javascript
$('input').mlKeyboard({layout: 'it_IT'});
```
