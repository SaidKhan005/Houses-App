
// configuration file for our app to work with 3rd party okta security

export const oktaConfig = {
    clientId: '0oahknepvjijXV3Vt5d7',
    issuer: 'https://dev-03909819.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}