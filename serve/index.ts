import ApolloClient from 'apollo-boost';

const MangaApi = new ApolloClient({
  uri: 'https://node.westmanga.info/graphql',
});

const AnimeApi = new ApolloClient({
  uri: 'https://node.westmanga.info/anime',
});


export {MangaApi,AnimeApi}