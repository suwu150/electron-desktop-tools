import debug from 'debug';

const log = debug('mx-dsl:service/analytics');

const analytics = {
  track(pathname) {
    log('### track ### ', pathname);
  }
};

export default analytics;
