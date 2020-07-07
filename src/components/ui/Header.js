import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
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

const menuOptions = [
  { name: "Services", link: "/services", index: 0 },
  { name: "Custom Software Development", link: "/customsoftware", index: 1 },
  { name: "Mobile Application Development", link: "/mobileapps", index: 2 },
  { name: "Website Development", link: "/websites", index: 3 },
];

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    let iterationComplete = false;
    const currentPath = window.location.pathname;
    const headerObj = headerLinks.find((link) => link.path === currentPath);
    if (headerObj && value !== headerObj.index) {
      setValue(headerObj.index);
      iterationComplete = true;
      setSelectedIndex(null);
    }
    if (!iterationComplete) {
      switch (currentPath) {
        case "/customsoftware":
          setValue(1);
          setSelectedIndex(1);
          break;

        case "/mobileapps":
          setValue(1);
          setSelectedIndex(2);
          break;

        case "/websites":
          setValue(1);
          setSelectedIndex(3);
          break;

        default:
          break;
      }
    }
  }, [value]);

  const handleChange = (_e, value) => {
    setValue(value);
  };

  const handleMenuItemClick = (i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
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
              <Tab
                className={classes.tab}
                component={Link}
                to={"/"}
                label="Home"
              />
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                className={classes.tab}
                component={Link}
                to={"/services"}
                label="Services"
                onMouseOver={(event) => handleClick(event)}
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/revolution"}
                label="The Revolution"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/about"}
                label="About"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to={"/contact"}
                label="Contact"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              classes={{ paper: classes.menu }}
              elevation={0}
            >
              {menuOptions.map((menu) => (
                <MenuItem
                  key={menu.index}
                  onClick={() => {
                    handleClose();
                    setValue(1);
                    setSelectedIndex(menu.index);
                    handleMenuItemClick(menu.index);
                  }}
                  component={Link}
                  to={menu.link}
                  classes={{ root: classes.menuItem }}
                  selected={menu.index === selectedIndex && value === 1}
                >
                  {menu.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
