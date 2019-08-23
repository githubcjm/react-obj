import React from 'react';
import { connect } from 'dva';
import 'antd-mobile/dist/antd-mobile.css';

// import Header from '../components/Headers/Header'
// import Main from '../components/main/main'
import Notice from '../components/Notice/Notice'
// import Search from '../components/Search/Search'
function IndexPage() {
  return (
    <div>
      {/* <Header /> */}
      {/* <Main /> */}
      <Notice />
      {/* <Search /> */}
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
