import createPersistStore from '$lib/stores/persist';

const defaultState = {
  intro: true,
  page: 'post',
  showTabBar: false,
  pageNotifications: {
    msg: true,
    ent: true
  },
  msgPage: 'introductions',
  startTransition: false,
  showCredits: false,
  finish: false,
};

const storyState = createPersistStore('spe_001_state', defaultState);

export default storyState;
