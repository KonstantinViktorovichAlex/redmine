import React, { useEffect, useState } from "react";
import { getInitialStateHomePage } from "./initialStateHomePage";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styled";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Grid from "@material-ui/core/Grid";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CardTravelOutlinedIcon from "@material-ui/icons/CardTravelOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import Badge from "@material-ui/core/Badge";
import { Loader } from "../../components/Loader";
import { CardsProject } from "../../components/CardsProject";
import UserIssues from "../../components/UserIssues";
import Button from "@material-ui/core/Button";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import { GroupList } from "../../components/Group";
import { contextData } from "./context";
import { getData } from "./getData";
import { Error } from "../../components/Error";
import { isError } from "./initialErrorState";
import Switch from "@material-ui/core/Switch";
import Brightness3OutlinedIcon from "@material-ui/icons/Brightness3Outlined";
import Brightness5OutlinedIcon from "@material-ui/icons/Brightness5Outlined";

export const HomePage = ({ setAuthorization }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [stateHomePage, setStateHomePage] = useState(getInitialStateHomePage);
  const [errorState, setErrorState] = useState(isError);

  useEffect(() => {
    getData(stateHomePage, setStateHomePage);
  }, []);

  const handleDrawerOpen = () => {
    setStateHomePage({
      ...stateHomePage,
      openMenu: true,
    });
  };

  const handleDrawerClose = () => {
    setStateHomePage({
      ...stateHomePage,
      openMenu: false,
    });
  };

  const handleChangeMenu = (text) => {
    if (text === "Проекты") {
      setStateHomePage({
        ...stateHomePage,
        projectsPage: true,
        groupPage: false,
        userIssuesPage: false,
      });
    } else if (text === "Задачи") {
      setStateHomePage({
        ...stateHomePage,
        projectsPage: false,
        groupPage: false,
        userIssuesPage: true,
      });
    } else if (text === "Наблюдатели") {
      setStateHomePage({
        ...stateHomePage,
        projectsPage: false,
        userIssuesPage: false,
        groupPage: true,
      });
    }
  };

  const handleExit = () => {
    setAuthorization(false);
    localStorage.removeItem("user");
  };

  const switchTheme = (event) => {
    setStateHomePage({
      ...stateHomePage,
      blackTheme: event.target.checked,
    });
  };

  return (
    <div className={stateHomePage.blackTheme ? classes.bodyPage : null}>
      {stateHomePage.isLoading ? <Loader /> : null}
      {errorState.error ? <Error errorStatus={errorState.errorStatus} /> : null}
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={
            stateHomePage.blackTheme
              ? { backgroundColor: "#222b36" }
              : { backgroundColor: "" }
          }
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: stateHomePage.openMenu,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: stateHomePage.openMenu,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Grid className={classes.headerText}>
              <Typography variant="h6" noWrap>
                Redmine Web
              </Typography>
              <Typography variant="body1">
                <Grid style={{ display: "flex", alignItems: "center" }}>
                  <Brightness5OutlinedIcon className={classes.iconLight} />
                  <Switch
                    checked={stateHomePage.blackTheme}
                    onChange={switchTheme}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <Brightness3OutlinedIcon className={classes.iconBlack} />
                  <AccountCircleOutlinedIcon style={{ marginRight: "10px" }} />
                  {stateHomePage.userName}
                  <Button
                    onClick={handleExit}
                    variant="contained"
                    style={{ marginLeft: "30px" }}
                    color="secondary"
                  >
                    Выход
                  </Button>
                </Grid>
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={
            stateHomePage.blackTheme
              ? clsx(classes.drawer, {
                  [classes.blackDrawerOpen]: stateHomePage.openMenu,
                  [classes.blackDrawerClose]: !stateHomePage.openMenu,
                })
              : clsx(classes.drawer, {
                  [classes.drawerOpen]: stateHomePage.openMenu,
                  [classes.drawerClose]: !stateHomePage.openMenu,
                })
          }
          classes={
            stateHomePage.blackTheme
              ? {
                  paper: clsx({
                    [classes.blackDrawerOpen]: stateHomePage.openMenu,
                    [classes.blackDrawerClose]: !stateHomePage.openMenu,
                  }),
                }
              : {
                  paper: clsx({
                    [classes.drawerOpen]: stateHomePage.openMenu,
                    [classes.drawerClose]: !stateHomePage.openMenu,
                  }),
                }
          }
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Проекты", "Задачи", "Наблюдатели"].map((text) => (
              <ListItem
                button
                key={text}
                data-atr={text}
                onClick={() => handleChangeMenu(text)}
              >
                <ListItemIcon>
                  {text === "Проекты" ? (
                    <CardTravelOutlinedIcon
                      className={
                        stateHomePage.blackTheme ? classes.listIconBlack : null
                      }
                    />
                  ) : text === "Задачи" ? (
                    <Badge
                      badgeContent={stateHomePage.dataIssues.length}
                      color="secondary"
                    >
                      <AccessTimeOutlinedIcon
                        className={
                          stateHomePage.blackTheme
                            ? classes.listIconBlack
                            : null
                        }
                      />
                    </Badge>
                  ) : text === "Наблюдатели" ? (
                    <PeopleAltOutlinedIcon
                      className={
                        stateHomePage.blackTheme ? classes.listIconBlack : null
                      }
                    />
                  ) : (
                    <InboxIcon
                      className={
                        stateHomePage.blackTheme ? classes.listIconBlack : null
                      }
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <contextData.Provider
            value={{
              dataGroup: stateHomePage.dataGroup,
              projectsData: stateHomePage.dataProjects,
              issuesData: stateHomePage.dataIssues,
              setStateHomePage: setStateHomePage,
              stateHomePage: stateHomePage,
              errorState: errorState,
              setErrorState: setErrorState,
              blackTheme: stateHomePage.blackTheme,
            }}
          >
            {stateHomePage.projectsPage ? (
              <CardsProject />
            ) : stateHomePage.userIssuesPage ? (
              <UserIssues />
            ) : stateHomePage.groupPage ? (
              <GroupList />
            ) : null}
          </contextData.Provider>
        </main>
      </div>
    </div>
  );
};
