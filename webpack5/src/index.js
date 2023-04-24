import './index.less';
// eslint-disable-next-line import/no-extraneous-dependencies
import $ from 'jquery';


// eslint-disable-next-line no-console
console.log('%c Line:2 🌮', 'color:#465975', 'Webpack 5');

const myTest = () => {
  // eslint-disable-next-line no-console
  console.log('%c Line:19 🥥', 'color:#f5ce50', '99999');
};

myTest();

$('body').append('<div>Webpack 5</div>');


// eslint-disable-next-line no-undef
document.getElementById('btn').onclick = () => {
  import(/* webpackChunkName:'test', webpackPrefetch:true */ './test').then(
    ({ anta }) => {
      anta();
    }
  );
};
