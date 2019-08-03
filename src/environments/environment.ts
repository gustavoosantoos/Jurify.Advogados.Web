// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authentication: {
    provider: 'https://jurify-autenticador.azurewebsites.net/',
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
    autenticador: 'https://jurify-autenticador.azurewebsites.net/api/',
    advogados: 'https://jurify-advogados.azurewebsites.net/api/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
