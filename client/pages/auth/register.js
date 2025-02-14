import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import Register from '../../components/auth/Register';
import { reqRegisterAuth } from '../../modules/auth/actions';

import '../../less/auth.less';

class RegisterPage extends React.Component {
  static getInitialProps (ctx) {
    return {
      namespacesRequired: ['common']
    };
  }

  constructor (props) {
    super(props);
    this.state = {
      name: 'TTB',
      email: 'ttb@gmail.com',
      password: '1234567',
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.props.registerAuth({ name, email, password }, this.props.router);
  };

  render () {
    return (
      <React.Fragment>
        <Register
          onSubmit={this.onSubmit}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth : state.auth,
    alert: state.alert
  }
};

const mapDispatchToProps = dispatch => {
  return {
    registerAuth: (data, router) => {
      dispatch(reqRegisterAuth(data, router));
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
);
