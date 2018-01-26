// @flow
import Home from './components/layout/Home';
import { NotFound } from './components';
import Welcome from './components/layout/Welcome';
import ProjectManager from './containers/ProjectManager';
import TuLingRobot from './containers/TuLingRobot';
import StatisticsAccessTimes from './containers/StatisticsAccessTimes';
import ImageViewer from './containers/ImageViewer';

const routes = {
  path: '/',
  component: Home,
  indexRoute: { component: Welcome },
  childRoutes: [
    { path: '/projectManager', component: ProjectManager },
    { path: '/tuLingRobot', component: TuLingRobot },
    { path: '/statisticsAccessTimes', component: StatisticsAccessTimes },
    { path: '/imageViewer', component: ImageViewer },
    { path: '*', component: NotFound },
  ],
};

export default routes;
