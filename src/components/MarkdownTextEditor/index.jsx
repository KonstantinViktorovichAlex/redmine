import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useEffect } from "react";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function MarkDownTextEditor({ value, onChange, blackTheme }) {
  const [selectedTab, setSelectedTab] = React.useState("write");

  useEffect(() => {
    if (blackTheme) {
      document.querySelector(".mde-header").style.backgroundColor = "#e0cdcd33";
      document.querySelector(".mde-header").style.color = "white";
      document.querySelector(".mde-text").style.color = "white";
      document.querySelector(".mde-text").style.backgroundColor = "#17000000";
    } else {
      document.querySelector(".mde-header").style.backgroundColor = "white";
      document.querySelector(".mde-text").style.backgroundColor = "white";
      document.querySelector(".mde-text").style.color = "black";
    }
  }, [blackTheme]);

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  );
}
