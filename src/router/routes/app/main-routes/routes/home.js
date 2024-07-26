import NoPetRegirestedPage from '~src/layouts/app/pages/NoPetRegirested';

export default {
  pathname: '/',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};