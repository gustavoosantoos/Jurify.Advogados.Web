export const environment = {
  production: true,
  authentication: {
    provider: 'http://jurify-autenticador.azurewebsites.net/',
    client_id: 'jurify.web.lawyers',
    client_secret: 'jurify.web.lawyers',
    scope: 'jurify.api.lawyers',
    grant_type: 'password'
  },
  storage: {
    token_identifier: 'jurify.web.lawyers.key',
    user_info_identifier: 'jurify.web.lawyers.user'
  },
  endpoints: {
    autenticador: 'http://jurify-autenticador.azurewebsites.net/api/',
    advogados: 'http://jurify-advogados.azurewebsites.net/api/'
  }
};
