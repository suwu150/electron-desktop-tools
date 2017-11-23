// @flow
import Home from './components/layout/Home';
import { NotFound } from './components';
import Welcome from './components/layout/Welcome';
import ProjectManager from './containers/ProjectManager';

const routes = {
  path: '/',
  component: Home,
  indexRoute: { component: Welcome },
  childRoutes: [
    { path: '/projectManager', component: ProjectManager },
    { path: '*', component: NotFound },
  ],
};

export default routes;
