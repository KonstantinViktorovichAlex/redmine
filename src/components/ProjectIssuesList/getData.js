import { useEffect, useState } from "react";
import { getIssuesProjectData } from "../../services/projects/projects";

export const useDataProjectIssues = (idProject) => {
  const [dataIssues, setDataIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")).api_key) {
      const key = JSON.parse(localStorage.getItem("user")).api_key;
      const getDataProjectIssues = async () => {
        try {
          setIsLoading(true);
          getIssuesProjectData(idProject, key).then((result) => {
            setDataIssues(result.data.issues);
          });
        } catch (e) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      getDataProjectIssues();
    }
  }, []);

  return {
    dataIssues,
    isLoading,
    isError,
  };
};
