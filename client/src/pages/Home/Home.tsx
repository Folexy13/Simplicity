import React, { useContext } from "react";
import "./Home.scss";
import { Layout, Uploader } from "../../shared/components";
import { RenderFilePreview } from "../../shared/components/Uploader/Uploader";
import FileContext from "../../shared/context";

const Home: React.FC = () => {
  const { selectedFile, fileContent } = useContext(FileContext);
  console.log(fileContent);
  return (
    <Layout>
      <div className="homepage">
        <h2 style={{ textAlign: selectedFile ? "unset" : "inherit" }}>
          Add School Note
        </h2>
        <p style={{ width: selectedFile ? "500px" : "inherit" }}>
          Upload/Drag and Drop your class note to summarize it,generate pratice
          questions/assignments and lot more...
        </p>

        <div
          className="file_section"
          style={{ width: selectedFile ? "1200px" : "inherit" }}
        >
          <div>
            <Uploader file />

            {selectedFile && (
              <div className="btn-flex">
                <button>Summarize</button>
                <button>Generate Question</button>
                <button>Find Relevant Book</button>
              </div>
            )}
          </div>
          {selectedFile && <RenderFilePreview pdfFile={selectedFile} />}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
