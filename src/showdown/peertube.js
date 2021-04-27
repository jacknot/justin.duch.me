/**
 * Peertube Extension for my instance.
 * Uses image syntax to embed videos
 * Usage:
 * ![video][https://videos.duch.me/videos/watch/85fb80ef-28c0-488e-bc92-fb8906c36a68]
 *
 */

"use strict";

function parseDimensions(rest) {
  var width,
    height,
    d,
    defaultWidth,
    defaultHeight;

  defaultWidth = 560;
  defaultHeight = 315;

  if (rest) {
    width = (d = /width="(.+?)"/.exec(rest)) ? d[1] : defaultWidth;
    height = (d = /height="(.+?)"/.exec(rest)) ? d[1] : defaultHeight;
  }

  // add units so they can be used in css
  if (/^\d+$/gm.exec(width)) {
    width += 'px';
  }
  if (/^\d+$/gm.exec(height)) {
    height += 'px';
  }

  return {
    width: width,
    height: height
  };
}

export const peertube = () => [
  {
    type: "output",
    filter: (text) => {
      const imgRegex = /(?:<p>)?<img.*?src="(.+?)"(.*?)\/?>(?:<\/p>)?/gi;
      const regex = /https:\/\/videos\.duch\.me\/videos\/watch\/(.*)/i;
      let tag = '<iframe src="%1" width="%2" height="%3" sandbox="allow-same-origin allow-scripts allow-popups" frameborder="0" allowfullscreen></iframe>';
      return text.replace(imgRegex, function (match, url, rest) {
        let d = parseDimensions(rest),
          m, fUrl = '';

        if (m = regex.exec(url)) {
          fUrl = 'https://videos.duch.me/videos/embed/' + m[1];
        } else {
          return match;
        }

        return tag.replace(/%1/g, fUrl).replace('%2', d.width).replace('%3', d.height);;
      });
    }
  },
];
