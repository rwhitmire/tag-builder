# tag-builder

Fluent html tag building library.

## Install
```
npm install --save tag-builder
```

## Examples

``` js
const assert = require('assert')
const TagBuilder = require('tag-builder')

const div = new TagBuilder('div')
const html = div.text('hello world').toString()
  
assert.equal(html, '<div>hello world</div>')
```

``` js
const html = TagBuilder
  .create('input')
  .attr({
    'type': 'password',
    'name': 'password',
    'required': null
  })
  .addClass('form-control')
  .toString()
  
assert.equal(html, '<input type="password" name="password" class="form-control" required>')
```

``` js
const ul = TagBuilder.create('ul')
const li1 = TagBuilder.create('li').text('1')
const li2 = TagBuilder.create('li').text('2')

ul.appendHtml(li1)
ul.appendHtml(li2)

const html = ul.toString()
assert.equal(html, '<ul><li>1</li><li>2</li></ul>')
```

See [tests](https://github.com/rwhitmire/tag-builder/blob/master/test/index.test.js) for more examples.

## API

All methods except `toString()` return a TagBuilder instance and are chainable.

#### `create(tagName: string)`
Returns a TagBuilder instance.

#### `html(html: any)`
Sets innerHTML of the element. You may pass either a string
or TagBuilder instance to this method.

#### `appendHtml(html: any)`
Appends provided html to inner content.  You may pass either a string
or TagBuilder instance to this method.

#### `text(text: string)`
Sets html encoded innerText of the element.

#### `appendText(text: string)`
Appends html encoded text to inner content.

#### `attr(attributes: object)`
Merges attributes hash onto the tag.

#### `addClass(className: string)`
Merges className onto the tag.

#### `toString()`
Returns html string.
