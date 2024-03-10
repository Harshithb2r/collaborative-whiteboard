import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://127.0.0.1:4000/',
  realm: 'myrealm',
  clientId: 'myclient',
});

export default keycloak;