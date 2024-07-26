import NoPetRegirestedPage from '~src/layouts/app/pages/NoPetRegirested';

export default {
  pathname: '/pet-weight',
  element: () => {
    const $content = document.createElement('div');
    $content.classList.add('home__content-page');
    $content.style.backgroundColor = 'orange';
    const noPetRegirestedPage = new NoPetRegirestedPage();
    noPetRegirestedPage.mount($content);
    return $content;
  },
};