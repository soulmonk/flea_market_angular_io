import {NgModule} from '@angular/core';
import {InMemoryCache} from '@apollo/client/core';
import {Apollo, APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '@env';
import {setContext} from '@apollo/client/link/context';
import {AuthService} from '@app/auth/services/auth.service';

const uri = environment.apiServers.financeStats + '/graphql';

export function createApollo(httpLink: HttpLink, authService: AuthService) {
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
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [ApolloModule],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
    // ListTransactionsGQL,
  ],
})
export class GraphQLModule {
  constructor() {}
}
