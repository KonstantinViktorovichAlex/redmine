import React, { useContext, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ButtonAdd } from "../ButtonAdd";
import { useStyles } from "./styles";
import { CreateIssue } from "./CreateIssue";
import ProjectIssuesList from "../ProjectIssuesList";
import { contextData } from "../../pages/home-page/context";

export const CardsProject = () => {
  const classes = useStyles();
  const [openProject, setOpenProject] = useState(false);
  const [openIssuesProject, setOpenIssuesProject] = useState(false);
  const [idProject, setIdProject] = useState(null);

  const { projectsData, blackTheme } = useContext(contextData);

  const handleChangeIdProject = (id) => {
    setIdProject(id);
    setOpenProject(true);
  };

  const handleOpenIssuesProject = (id) => {
    setIdProject(id);
    setOpenIssuesProject(true);
  };

  const handleAddProject = () => {
    console.log("click");
  };

  return (
    <>
      {openProject ? (
        <CreateIssue
          idProject={idProject}
          setOpenProject={setOpenProject}
          blackTheme={blackTheme}
        />
      ) : openIssuesProject ? (
        <ProjectIssuesList
          idProject={idProject}
          setOpenIssuesProject={setOpenIssuesProject}
          blackTheme={blackTheme}
        />
      ) : (
        <div style={{ display: "flex" }}>
          {projectsData &&
            projectsData.map((item) => {
              return (
                <Card className={blackTheme ? classes.rootBlack : classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      variant="h5"
                      component="h3"
                      gutterBottom
                    >
                      {item.name}.
                    </Typography>

                    <Typography
                      className={classes.description}
                      variant="body1"
                      component="p"
                    >
                      {item.description}.
                    </Typography>

                    <div className={classes.dateWrapper}>
                      <div>
                        <Typography
                          className={
                            blackTheme ? classes.posBlack : classes.pos
                          }
                          color="textPrimary"
                          variant="body1"
                          component="p"
                        >
                          {`дата создания: ${new Date(
                            item.created_on
                          ).toLocaleString()}`}
                          .
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          className={
                            blackTheme ? classes.posBlack : classes.pos
                          }
                          color="textPrimary"
                          variant="body1"
                          component="p"
                        >
                          {`дата изменения: ${new Date(
                            item.updated_on
                          ).toLocaleString()}`}
                          .
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className={blackTheme ? classes.blackButton : null}
                      onClick={() => handleChangeIdProject(item.id)}
                    >
                      Создать задачу
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className={blackTheme ? classes.blackButton : null}
                      onClick={() => handleOpenIssuesProject(item.id)}
                    >
                      Просмотр задач
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          <ButtonAdd title={"Создать проект"} click={handleAddProject} />
        </div>
      )}
    </>
  );
};
