// eslint-disable-next-line import/no-extraneous-dependencies
import $ from 'jquery';

// eslint-disable-next-line no-unused-vars
import test from './test';

$('body').append('<div>mine div</div>');

// eslint-disable-next-line no-unused-vars
function treeShaking() {
  return 'treeShaking';
  // eslint-disable-next-line no-console, no-unreachable
  console.log('%c Line:12 🍪 treeShaking', 'color:#2eafb0', 'treeShaking');
}
