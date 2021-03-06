import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Field, reduxForm } from "redux-form";
import { TextField, withStyles } from "@material-ui/core";
import loginService from "../../service/login/loginService";
import textFieldToReduxForm from "../../service/redux-form/textFieldToReduxForm";
import LanguagePicker from "../common/pickers/language";
import LoadingButton from "../common/loading-button/LoadingButton";
import styles from "./styles";

const TextFieldRf = textFieldToReduxForm(TextField);

class Login extends PureComponent {
  static contextTypes = {
    t: PropTypes.func.isRequired
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = { isLoading: false };

  login(data) {
    this.setState({ isLoading: true });

    loginService
      .login(data.username, data.password)
      .then(() => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { t } = this.context;
    const { classes } = this.props;
    return (
      <div className={classes.loginContainer}>
        <div className={classes.loginLanguagePickerContainer}>
          <LanguagePicker />
        </div>
        <LoginForm
          t={t}
          submitLogin={data => this.login(data)}
          isLoading={this.state.isLoading}
          classes={classes}
        />
      </div>
    );
  }
}

let LoginForm = ({ t, handleSubmit, submitLogin, isLoading, classes }) => (
  <form onSubmit={handleSubmit(data => submitLogin(data))}>
    <div className={classes.loginBox}>
      <div className={classes.loginBoxHeader}>
        <div className="logo" />
      </div>
      <div className={classes.loginBoxBody}>
        <fieldset>
          <div className="login-field">
            <section>
              <Field
                name="username"
                type="text"
                className="text-username"
                floatingLabelText={t("login.username")}
                id="usernameID"
                fullWidth
                component={TextFieldRf}
              />
            </section>
          </div>
          <div className="login-field">
            <section>
              <Field
                name="password"
                className="text-password"
                floatingLabelText={t("login.password")}
                type="password"
                fullWidth
                component={TextFieldRf}
              />
            </section>
          </div>
          <div style={{ textAlign: "center", paddingTop: "30px" }}>
            <LoadingButton
              color="primary"
              type="submit"
              isLoading={isLoading}
            >
              {t("login.access")}
            </LoadingButton>
          </div>
        </fieldset>
      </div>
    </div>
  </form>
);

LoginForm = reduxForm({
  form: "loginForm"
})(LoginForm);

export default withRouter(withStyles(styles)(Login));
