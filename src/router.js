import React from 'react';
import { Router, Route, Switch, MemoryRouter } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/Login/Login'
// import Etable from './components/Etable/Etable'
// import niming from './components/vivew/niming'
// import xueyuan from './components/vivew/xueyuan'
// import xiangmu from './components/vivew/xiangmu'
// import Vip from './components/vivew/Vip'

function RouterConfig({ history }) {
  return (
    <MemoryRouter>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          {/* //注册登录 */}
          <Route path="/home" component={IndexPage} />


          {/* <Route path="/Etable" component={Etable}/>
        <Route path="/niming/:id" component={niming}/>
        <Route path="/xueyuan" component={xueyuan}/>
        <Route path="/xiangmu" component={xiangmu}/>
        <Route path="/Vip" component={Vip}/> */}

          {/* <Redirect
            to={{
              pathname: "/login"
            }}
          /> */}
        </Switch>

      </Router>
    </MemoryRouter>
  );
}

export default RouterConfig;
