export default theme => ({
  loginContainer: {},
  loginLanguagePickerContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    margin: theme.spacing(1)
  },
  loginBox: {},
  loginBoxHeader: {
    height: " 50px",
    background: `url("./img/logo-login-2.png") no-repeat center;`,
    backgroundSize: "contain",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  loginBoxBody: {
    width: "400px",
    margin: "auto"
  },
  "@global": {
    body: {
      backgroundColor: theme.palette.background.paper
    }
  }
});
