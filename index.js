/* global escape */

'use strict'

const selfClosing = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

function TagBuilder(tagName) {
  if(!tagName) {
    throw new Error('tagName parameter is required')
  }

  this._tagName = tagName
  this._content = ''
  this._classNames = {}
  this._attr = {}
}

TagBuilder.create = function(tagName) {
  return new TagBuilder(tagName)
}

TagBuilder.prototype.html = function(html) {
  this._content = html
  return this
}

TagBuilder.prototype.appendHtml = function(html) {
  this._content += html
  return this
}

TagBuilder.prototype.text = function(text) {
  this._content = encodeText(text)
  return this
}

TagBuilder.prototype.appendText = function(text) {
  this._content += encodeText(text)
  return this
}

TagBuilder.prototype.attr = function(attr) {
  this._attr = Object.assign({}, this._attr, attr)
  return this
}

TagBuilder.prototype.addClass = function(className) {
  this._classNames[className] = ''
  return this
}

TagBuilder.prototype.toString = function() {
  const attr = stringifyAttr(this._attr)
  const classNames = stringifyClassNames(this._classNames)

  var tag = `<${this._tagName}${classNames}${attr}>`

  if(!isSelfClosing(this._tagName)) {
    tag = `${tag}${this._content}</${this._tagName}>`
  }

  return tag
}

function isSelfClosing(tag) {
  return selfClosing.indexOf(tag) != -1
}

function stringifyClassNames(classNames) {
  var str = ''

  for(var key in classNames){
    str += key + ' '
  }

  str = str.trim()

  if(str.length == 0) return ''

  return stringifyAttr({'class': str})
}

function stringifyAttr(attr) {
  var str = ''

  for (var key in attr) {
    if (attr[key] === null) {
      str += ` ${key}`;
    } else {
      str += ` ${key}="${attr[key]}"`
    }
  }

  str = str.trim()

  // prepend a space if attributes exist
  if(str.length > 0) {
    str = ` ${str}`
  }

  return str
}

function encodeText(text) {
  return text
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
}

module.exports = TagBuilder
