import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
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
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
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
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: 50,
    width: 50,
    color: "white",
  },
  drawer: {
    backgroundColor: theme.palette.common.arcBlue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerItemSelected: {
    opacity: 1,
  },
  drawerItemEstimates: {
    background: theme.palette.common.arcOrange,
    color: "black",
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const headerOptions = [
    {
      link: "/",
      name: "Home",
      activeIndex: 0,
    },
    {
      link: "/services",
      name: "Services",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaHaspopup: anchorEl ? true : undefined,
      mouseOver: (event) => handleClick(event),
    },
    {
      link: "/revolution",
      name: "The Revolution",
      activeIndex: 2,
    },
    {
      link: "/about",
      name: "About",
      activeIndex: 3,
    },
    {
      link: "/contact",
      name: "Contact",
      activeIndex: 4,
    },
  ];

  const menuOptions = [
    { name: "Services", link: "/services", selectedIndex: 0, activeIndex: 1 },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
      selectedIndex: 1,
      activeIndex: 1,
    },
    {
      name: "Mobile Application Development",
      link: "/mobileapps",
      selectedIndex: 2,
      activeIndex: 1,
    },
    {
      name: "Website Development",
      link: "/websites",
      selectedIndex: 3,
      activeIndex: 1,
    },
  ];

  useEffect(() => {
    [...menuOptions, ...headerOptions].forEach((route) => {
      switch (window.location.pathname) {
        case route.link:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, selectedIndex, headerOptions, menuOptions]);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        className={classes.tabContainer}
        onChange={handleChange}
        indicatorColor="primary"
      >
        {headerOptions.map((route) => (
          <Tab
            key={route.activeIndex}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaHaspopup}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: theme.zIndex.modal + 2 }}
        keepMounted
      >
        {menuOptions.map((menu) => (
          <MenuItem
            key={menu.selectedIndex}
            onClick={() => {
              handleClose();
              setValue(menu.selectedIndex);
              setSelectedIndex(menu.index);
              handleMenuItemClick(menu.index);
            }}
            component={Link}
            to={menu.link}
            classes={{ root: classes.menuItem }}
            selected={
              menu.selectedIndex === selectedIndex && value === menu.activeIndex
            }
          >
            {menu.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {headerOptions.map((item) => (
            <ListItem
              key={item.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                setValue(item.activeIndex);
              }}
              divider
              button
              component={Link}
              to={item.link}
              selected={value === item.activeIndex}
            >
              <ListItemText
                className={
                  value === item.activeIndex
                    ? classnames([
                        classes.drawerItemSelected,
                        classes.drawerItem,
                      ])
                    : classes.drawerItem
                }
                disableTypography
                primary={item.name}
              />
            </ListItem>
          ))}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            selected={value === 5}
            className={
              value === 5
                ? classnames([
                    classes.drawerItemSelected,
                    classes.drawerItem,
                    classes.drawerItemEstimates,
                  ])
                : classnames([classes.drawerItem, classes.drawerItemEstimates])
            }
          >
            <ListItemText
              className={
                value === 5
                  ? classnames([classes.drawerItemSelected, classes.drawerItem])
                  : classnames([
                      classes.drawerItem,
                      classes.drawerItemEstimates,
                    ])
              }
              disableTypography
              primary="Free Estimate"
            />
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
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
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
