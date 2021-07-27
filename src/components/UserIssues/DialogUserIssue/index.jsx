import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import RecordVoiceOverOutlinedIcon from "@material-ui/icons/RecordVoiceOverOutlined";
import MarkDownTextEditor from "../../MarkdownTextEditor";
import SendIcon from "@material-ui/icons/Send";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import green from "@material-ui/core/colors/green";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Box from "@material-ui/core/Box";

export default function DialogUserIssue({
  userIssueState,
  setUserIssueState,
  handleChangeMarkdown,
  handleChangeFinishedTask,
  handleUpdateTask,
  handleEditIssueComment,
}) {
  const accent = green["A400"];
  return (
    <Dialog
      open={userIssueState.openDialog}
      onClose={() => {
        setUserIssueState({
          ...userIssueState,
          openDialog: false,
        });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {userIssueState.isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "600px",
            height: "600px",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h4" gutterBottom>
              {userIssueState.fullInfoData.subject}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Описание задачи
            </Typography>
            <DialogContentText id="alert-dialog-description">
              {userIssueState.fullInfoData.description}
            </DialogContentText>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography variant="h6" gutterBottom>
                  Приоритет задачи
                </Typography>
                <DialogContentText id="alert-dialog-description">
                  {userIssueState.fullInfoData.priority &&
                    userIssueState.fullInfoData.priority.name}
                </DialogContentText>
              </div>
              <div>
                <Typography
                  style={{
                    color:
                      userIssueState.finishedTaskValue === "100"
                        ? accent
                        : "black",
                  }}
                  variant="h6"
                  gutterBottom
                >
                  Готовность задачи
                </Typography>
                <FormControl>
                  <NativeSelect
                    value={userIssueState.finishedTaskValue}
                    onChange={handleChangeFinishedTask}
                    name="age"
                    inputProps={{ "aria-label": "age" }}
                  >
                    <option value={0}>0</option>
                    <option value={20}>20%</option>
                    <option value={50}>50%</option>
                    <option value={70}>70%</option>
                    <option value={100}>100%</option>
                  </NativeSelect>
                </FormControl>
              </div>
            </div>
            <Typography variant="h6" gutterBottom>
              Комментарии к задаче
            </Typography>
            {userIssueState.fullInfoData.journals &&
            userIssueState.fullInfoData.journals.length > 0 ? (
              userIssueState.fullInfoData.journals.map((item) => {
                return (
                  <>
                    {item.notes.length === 0 ? null : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <RecordVoiceOverOutlinedIcon
                            style={{ marginRight: "10px" }}
                          />
                          {item.user.name}
                        </div>
                        <DialogContentText id="alert-dialog-description">
                          <Box
                            boxShadow={3}
                            bgcolor="background.paper"
                            m={1}
                            p={1}
                            style={{
                              width: "100%",
                              height: "auto",
                              overflow: "hidden",
                              wordWrap: "break-word",
                              backgroundColor: "#aaf3616b",
                            }}
                          >
                            {item.notes}
                            <div
                              style={{
                                display: "flex",
                                float: "right",
                                color: "#00c853",
                              }}
                            >
                              <EditOutlinedIcon
                                onClick={() =>
                                  handleEditIssueComment(item.notes, item.id)
                                }
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </Box>
                        </DialogContentText>
                      </>
                    )}
                  </>
                );
              })
            ) : (
              <p>Комментариев к задаче пока нет</p>
            )}
            <MarkDownTextEditor
              value={userIssueState.markDownValue}
              onChange={handleChangeMarkdown}
            />
            <div style={{ marginTop: "15px", float: "right" }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                onClick={() => handleUpdateTask(userIssueState.fullInfoData.id)}
              >
                Отправить
              </Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setUserIssueState({
                  ...userIssueState,
                  openDialog: false,
                });
              }}
              color="primary"
              autoFocus
            >
              Закрыть
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}
