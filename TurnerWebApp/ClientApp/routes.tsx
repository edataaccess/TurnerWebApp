import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchTitles } from './components/FetchTitles';
import { FetchTitleData } from './components/FetchTitleData';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/fetchtitles' component={ FetchTitles } />
    <Route path='/fetchtitledata' component={ FetchTitleData } />
</Layout>;
