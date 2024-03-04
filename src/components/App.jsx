import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from './Container';
import Header from './Header';
import Loader from './Loader';
import Cast from './MovieDetails/Cast';
import Reviews from './MovieDetails/Reviews';

const HomePage = lazy(
  () => import('../pages/HomePage' /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(
  () => import('../pages/MoviesPage' /* webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(
  () =>
    import(
      '../pages/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
    )
);

const App = () => (
  <Container>
    <Header />
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          exact
          path="/goit-react-woolf-hw-05-movies/"
          element={<HomePage />}
        />
        <Route
          path="/goit-react-woolf-hw-05-movies/movies/:movieId"
          element={<MovieDetailsPage />}
        >
          <Route path={`cast`} element={<Cast />} />
          <Route path={`review`} element={<Reviews />} />
        </Route>
        <Route
          path="/goit-react-woolf-hw-05-movies/movies"
          element={<MoviesPage />}
        />
      </Routes>
    </Suspense>
  </Container>
);

export default App;
