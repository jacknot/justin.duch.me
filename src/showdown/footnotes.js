'use strict';

const converter = new (require('showdown').Converter)();

module.exports = () => [
  // References - E.g:
  // I am the text in the body[^1].
  // [^1]: I am a reference
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/mg,
      (str, name, rawContent, _, padding) => {
        const content = converter.makeHtml(rawContent.replace(new RegExp(`^${padding}`, 'gm'), ''));
        return `<div class="reference" id="reference-${name}"><a href="#reference-${name}-backlink"><sup>[${name}]</sup></a>:${content}</div>`;
      }
    )
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/mg,
      (str, name, _, content) =>
        `<small class="reference" id="reference-${name}"><a href="#reference-${name}-backlink"><sup>[${name}]</sup></a>: ${content}</small>`
    )
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /\[\^([\d\w]+)\]/mg,
      (str, name) => `<a href="#reference-${name}" id="reference-${name}-backlink"><sup>[${name}]</sup></a>`
    )
  },
  // Footnotes - E.g:
  // Help I am trapped in this code(1).
  // (1): I'm not actually trapped
  // http://rauschma.github.io/html_demos/footnotes.html
  {
    type: 'lang',
    filter: text => text.replace(
      /^\(\^([\d\w]+)\):\s*(.*)$/mg,
      (str, name, content) => {
        return `<div class="footnote-body" id="footnote-${name}-body">${content}</div>`;
      }
    )
  },
  {
    type: 'lang',
    filter: text => text.replace(
      /\(\^([\d\w]+)\)/mg,
      (str, name) => `<a class="footnote-link" href="#footnote-${name}" id="footnote-${name}"><sup>(${name})</sup></a>`
    )
  }
];
