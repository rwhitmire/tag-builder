'use strict'

const assert = require('assert')
const TagBuilder = require('../index')

describe('TagBuilder', () => {
  it('should create div', () => {
    const builder = new TagBuilder('div')
    var html = builder.toString()
    assert.equal(html, '<div></div>')
  })
  
  it('should create p', () => {
    const builder = new TagBuilder('p')
    var html = builder.toString()
    assert.equal(html, '<p></p>')
  })
  
  it('should handle self-closing tags', () => {
    const selfClosing = [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ]
    
    selfClosing.forEach(type => {
      const builder = new TagBuilder(type)
      const html = builder.toString()
      
      assert.equal(html, '<'+type+'>')
    })
  })
  
  it('provide static create method', () => {
    const html = TagBuilder
      .create('input')
      .toString()
      
    assert.equal(html, '<input>')
  })
  
  it('should set text', () => {
    const html = TagBuilder
      .create('div')
      .text('foo')
      .toString()
      
    assert.equal(html, '<div>foo</div>')
  })
  
  it('should set html', () => {
    const html = TagBuilder
      .create('div')
      .html('<div></div>')
      .toString()
      
    assert.equal(html, '<div><div></div></div>')
  })
  
  it('should set attributes', () => {
    const html = TagBuilder
      .create('div')
      .attr({ 'style': 'color: red;' })
      .toString()
      
    assert.equal(html, '<div style="color: red;"></div>')
  })
  
  it('should merge attributes', () => {
    const html = TagBuilder
      .create('div')
      .attr({ 'foo': 'bar' })
      .attr({ 'bar': 'baz' })
      .attr({ 'foo': 'baz' })
      .toString()
      
    assert.equal(html, '<div foo="baz" bar="baz"></div>')
  })
  
  it('should handle builder nesting', () => {
    const div = TagBuilder.create('div')
    const p = TagBuilder.create('p')
    const html = div.html(p).toString()
      
    assert.equal('<div><p></p></div>', html)
  })
  
  it('should encode text', () => {
    const html = TagBuilder
      .create('div')
      .text('< ')
      .appendText('>')
      .toString()
      
    assert.equal(html, '<div>&lt; &gt;</div>')
  })
  
  it('should add classes', () => {
    const html = TagBuilder
      .create('div')
      .addClass('foo')
      .addClass('foo')
      .addClass('bar')
      .toString()
      
    assert.equal(html, '<div class="foo bar"></div>')
  })
  
  it('should throw an error when tagName is empty', () => {
    assert.throws(() => { TagBuilder.create('') }, /tagName/);
  })
  
  it('should append html', () => {
    const ul = TagBuilder.create('ul')
    const li1 = TagBuilder.create('li').text('1')
    const li2 = TagBuilder.create('li').text('2')
    
    ul.appendHtml(li1)
    ul.appendHtml(li2)
    
    const html = ul.toString()
    assert.equal(html, '<ul><li>1</li><li>2</li></ul>')
  })
  
  it('should append text', () => {
    const html = TagBuilder
      .create('div')
      .appendText('foo')
      .appendText('bar')
      .toString()
      
    assert.equal(html, '<div>foobar</div>')
  })
  
  it('should set data-attributes', () => {
    const html = TagBuilder
      .create('span')
      .attr({'data-bind': 'value: foo'})
      .toString()
      
    assert.equal(html, '<span data-bind="value: foo"></span>')
  })
})
