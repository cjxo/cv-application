import { useState } from "react";
import "./App.css";

import { QuickProfilePanel, CVProfile } from "./visualization.jsx";
import {
  GeneralInforationInterface,
  DescriptionInterface,
  EducationExperienceInterface,
  WorkExperienceInterface,
  ListEditor
} from "./interface.jsx";

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    fullName: "Christian Joseph",
    occupation: "Web Developer",
    telephone: "123-456-789",
    email: "nice-email@legit.com",
    location: "1232 Legit St., Somewhere City",
    linkedIn: "https://www.linkedin.com/",
  });

  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  );

  const [schools, setSchools] = useState([
    {
      id: 0,
      name: "Some Epic School",
      from: "2010",
      to: "2018",
    },
    {
      id: 1,
      name: "Wellspring Christian Family Schools",
      from: "2019",
      to: "2022"
    }
  ]);

  const [work, setWork] = useState([
    {
      id: 0,
      name: "Epic Company Co.",
      role: "Product Design Manager",
      from: "2020",
      to: "2023",
      achievements: [
        {
          id: 0,
          value: "Working with the wider development team",
        },
        {
          id: 1,
          value: "Manage website design, content, and SEO Marketing, Branding and Logo Design",
        }
      ]
    },
  ]);

  const [skills, setSkills] = useState([
    { id: 0, data: "HTML" },
    { id: 1, data: "CSS" },
    { id: 2, data: "Javascript", },
    { id: 3, data: "React", },
    { id: 4, data: "Game Development" },
  ]);


  const [languages, setLanguages] = useState([
    { id: 0, data: "English", },
    { id: 1, data: "Tagalog", },
    { id: 2, data: "Japanese" }
  ]);

  const [selectedFieldId, setSelectedFieldId] = useState(0);
  const fieldEditLabels = [
    { id: 0, value: "General Information" },
    { id: 1, value: "Description" },
    { id: 2, value: "Educational Experience" },
    { id: 3, value: "Work Experience" },
    { id: 4, value: "Skills" },
    { id: 5, value: "Languages" }
  ];

  const handleSelectField = (id) => {
    setSelectedFieldId(id);
  };

  const renderableFromSelectedId = () => {
    switch (selectedFieldId) {
      case 0: return <GeneralInforationInterface generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />;
      case 1: return <DescriptionInterface description={description} setDescription={setDescription} />;
      case 2: return <EducationExperienceInterface schools={schools} setSchools={setSchools} />;
      case 3: return <WorkExperienceInterface workExperiences={work} setWorkExperiences={setWork} />;
      case 4: return <ListEditor list={skills} setList={setSkills} />;
      case 5: return <ListEditor list={languages} setList={setLanguages} />;
      default: return (<></>);
    }
  };

  return (
    <main className="cv-app">
      <section className="cv-editor-container">
        <nav>
          <ul className="field-edit-list">
            {
              fieldEditLabels.map(({ id, value }) => {
                return (
                  <li key={id}>
                    <button
                      className="field-edit-btn"
                      style={{
                        transform: id === selectedFieldId ? "scale(1.1)" : "",
                      }}
                      onClick={() => { handleSelectField(id) }}
                    >{value}</button>
                  </li>
                )
              })
            }
          </ul>
        </nav>

        <main className="interface-container">
          <h2>{fieldEditLabels[selectedFieldId].value}</h2>
          {renderableFromSelectedId()}
        </main>
      </section>

      <section className="the-cv">
        <QuickProfilePanel generalInfo={generalInfo} schools={schools} skills={skills} languages={languages} />
        <CVProfile generalInfo={generalInfo} description={description} work={work} />
      </section>
    </main>
  );
}

export default App;

// TODO:
// [X] add entry deletion
// [X] dont use a single file for clean code people
// [X] sumbit solution
