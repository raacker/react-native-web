/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default class Clipboard {
  static isAvailable() {
    return (
      typeof document.queryCommandSupported === 'function' && document.queryCommandSupported('copy')
    );
  }

  static getString(): Promise<string> {
    return Promise.resolve('');
  }

  static setString(text: string) {
    let success = false;
    const body = document.body;

    if (body) {
      // add the text to a hidden node
      const node = document.createElement('span');
      node.textContent = text;
      node.style.opacity = '0';
      node.style.position = 'absolute';
      node.style.whiteSpace = 'pre-wrap';
      body.appendChild(node);

      // select the text
      const selection = window.getSelection();
      selection.removeAllRanges();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.addRange(range);

      // attempt to copy
      try {
        document.execCommand('copy');
        success = true;
      } catch (e) {}

      // remove selection and node
      selection.removeAllRanges();
      body.removeChild(node);
    }

    return success;
  }
}
