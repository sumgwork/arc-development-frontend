import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "8em",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: 25,
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 25,
    height: 45,
  },
}));

const headerLinks = [
  {
    path: "/",
    label: "Home",
    index: 0,
  },
  {
    path: "/services",
    label: "Services",
    index: 1,
  },
  {
    path: "/revolution",
    label: "The Revolution",
    index: 2,
  },
  {
    path: "/about",
    label: "About",
    index: 3,
  },
  {
    path: "/contact",
    label: "Contact",
    index: 4,
  },
];

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const headerObj = headerLinks.find((link) => link.path === currentPath);
    if (headerObj && value !== headerObj.index) {
      setValue(headerObj.index);
    }
  }, [value]);

  const handleChange = (_e, value) => {
    setValue(value);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              className={classes.tabContainer}
              onChange={handleChange}
              indicatorColor="primary"
            >
              {headerLinks.map((link) => (
                <Tab
                  key={link.index}
                  className={classes.tab}
                  component={Link}
                  to={link.path}
                  label={link.label}
                />
              ))}
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
