import {NgModule} from '@angular/core';
import {InMemoryCache} from '@apollo/client/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '@env';
import {setContext} from '@apollo/client/link/context';
import {AuthService} from '@app/auth/services/auth.service';

const uri = environment.apiServers.financeStats + '/graphql';

// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  exports: [],
  providers: [
    // { // todo not working wiht angular 13?
    //   provide: APOLLO_OPTIONS,
    //   useFactory: createApollo,
    //   deps: [HttpLink],
    // },
    // ListTransactionsGQL,
  ],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink, authService: AuthService) {
    const base = httpLink.create({
      uri,
    });
    const authLink = setContext((_, {headers}) => {
      // get the authentication token from local storage if it exists
      const token = authService.getToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        }
      };
    });

    apollo.create({
      link: authLink.concat(base),
      cache: new InMemoryCache()
    });
  }
}
