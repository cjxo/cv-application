import { useState } from "react";
import "./App.css";
import ImgPhone from "./assets/phone.svg";
import ImgEmail from "./assets/email.svg";
import ImgMapMarker from "./assets/map-marker.svg";
import ImgLinkedIn from "./assets/linkedin.svg";
import ImgAccount from "./assets/account.svg";
import ImgBriefcase from "./assets/briefcase.svg";

// IDK WHATS A GOOD NAME!
function AchievementCategory({ name, array }) {
  return (
    <div>
      <h2 className="achievement-name">{name}</h2>
      <ul className="achievement-list">
        {
          array.map(achivement => {
            return (
              <li key={achivement.key}>
                {achivement.data}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

function IconNamePair({ icon, altVal, value, width="18px", height="18px", padding="4px" }) {
  return (
    <div className="icon-name-pair">
      <img
        src={icon}
        alt={altVal}
        style ={{
          width,
          height,
          padding,
          backgroundColor: "rgb(230, 230, 230)",
      }}/>

      <span>{value}</span>
    </div>
  )
}

function QuickProfilePanel() {
  const createEducationData = (education, yearSpan) => {
    return (
      <>
        <h3>{education}</h3>
        <span style={{
            color: "grey",
            fontWeight: 300
          }}>{yearSpan}</span>
      </>
    )
  };

  const skills = [
    { id: 0, data: "HTML" },
    { id: 1, data: "CSS" },
    { id: 2, data: "Javascript", },
    { id: 3, data: "React", },
    { id: 4, data: "Game Development" },
  ];

  const languages = [
    { id: 0, data: "English", },
    { id: 1, data: "Tagalog", },
    { id: 2, data: "Japanese" }
  ];

  const education = [
    {
      id: 0,
      data: createEducationData("Some Epic School", "2010 - 2018")
    },
    {
      id: 1,
      data: createEducationData("Wellspring Christian Family Scools", "2019 - 2022"),
    }
  ];

  return (
    <section className="quick-profile-panel">
      <ul className="personal-info-group">
        <IconNamePair icon={ImgPhone} altVal="phone number icon" value="123-456-789"/>
        <IconNamePair icon={ImgEmail} altVal="email icon" value="nice-email@legit.com"/>
        <IconNamePair icon={ImgMapMarker} altVal="map marker icon" value="1232 Legit St., Somewhere City"/>
        <IconNamePair icon={ImgLinkedIn} altVal="linkedin icon" value="https://www.linkedin.com/"/>
      </ul>

      <section className="achievement-group">
        <AchievementCategory name="Education" array={education} />
        <AchievementCategory name="Skills" array={skills} />
        <AchievementCategory name="Languages" array={languages} />
      </section>
    </section>
  );
}

function CreatorSummary({ icon, altVal, name, value }) {
  return (
    <section className="creator-summary">
      <IconNamePair
        icon={icon}
        altVal={altVal}
        value={name}
        width="24px"
        height="24px"
      />
      {value}
    </section>
  );
}

function createWorkExperienceEntry({ company, role, achivements, yearSpan }) {
  return (
    <section className="work-experience-entry">
      <section className="year-span">
        <div>{yearSpan.from}</div>
        <div>-</div>
        <div>{yearSpan.to}</div>
      </section>
      <div className="hori-divider"></div>
      <section className="experience-desc">
        <h2 className="company-name">{company}</h2>
        <div className="role">{role}</div>
        <ul className="creator-achievements">
          {
            achivements.map(achievement => {
              return (
                <li key={achievement.key}>
                  {achievement.value}
                </li>
              )
            })
          }
        </ul>
      </section>
    </section>
  )
}

function CVProfile() {
  const profile = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </p>
  );

  const workExperiences = [
    {
      company: "Epic Company Co.",
      role: "Product Design Manager",
      achivements: [
        {
          id: 0,
          value: "Working with the wider development team",
        },
        {
          id: 1,
          value: "Manage website design, content, and SEO Marketing, Branding and Logo Design"
        }
      ],
      yearSpan: { from: 2020, to: 2023 },
    },
  ].map(workExperience => createWorkExperienceEntry(workExperience));

  return (
    <section className="cv-profile">
      <header>
        <h1 className="creator-name">Christian Joseph</h1>
        <h3 className="creator-occupation">Web Developer</h3>
      </header>

      <CreatorSummary
        icon={ImgAccount}
        altVal="account icon"
        name="Profile"
        value={profile}
      />

      <CreatorSummary
        icon={ImgBriefcase}
        altVal="briefcase icon"
        name="Work Experience"
        value={workExperiences}
      />
    </section>
  )
}

function GeneralInforationInterface() {
  return (
    <div className="general-info">
      <div className="label-input-pair">
        <label htmlFor="info-name">Full Name:</label>
        <input id="info-name" />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-occ">Occupation: </label>
        <input id="info-occ" />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-tele">Telephone: </label>
        <input id="info-tele" type="tel"/>
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-email">Email: </label>
        <input id="info-email" type="email"/>
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-loc">Location: </label>
        <input id="info-loc" />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-linkedin">LinkedIn: </label>
        <input id="info-linkedin" />
      </div>
    </div>
  )
}

function DescriptionInterface() {
  return (
    <textarea></textarea>
  );
}

function EducationExperienceInterface() {
  const [addNewEntry, setAddNewEntry] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddNewEntry(false);
  };

  const handleOnClick = () => {
    setAddNewEntry(true);
  };

  if (addNewEntry) {
    return (
      <form
        className="educational-experience-entry"
        onSubmit={handleSubmit}>
        <div className="label-input-pair">
          <label htmlFor="inp-school-name">School Name: </label>
          <input id="inp-school-name" />
        </div>

        <div className="inp-year-span-cont">
          <div>
            <label htmlFor="inp-school-year-from">From: </label>
            <input
              type="number"
              min="1900"
              max="9999"
              id="inp-school-year-from"
              />
          </div>

          <div>
            <label htmlFor="inp-school-year-from">To: </label>
            <input
              type="number"
              min="1900"
              max="9999"
              id="inp-school-year-from"
            />
          </div>
        </div>

        <button className="btn-animate">Ok</button>
      </form> 
    )
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
      gap: "20px",
    }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingLeft: "24px",
          flexGrow: "1",
          overflowY: "scroll"
        }}>
        <li style={{ listStyleType: "circle" }}>
          <h3>Some Epic School</h3>
          <span style={{
              color: "grey",
              fontWeight: 300
            }}>2020 - 2023</span>
        </li>
      </ul>

      <button
        onClick={handleOnClick}
        className="btn-animate"
        style={{
          padding: "8px 32px",
          border: "2px solid black",
          marginTop: "auto",
          marginLeft: "auto",
      }}>New</button>
    </div>
  );
}

function WorkExperienceInterface() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <form
      className="educational-experience-entry"
      onSubmit={handleSubmit}>
      <div className="label-input-pair">
        <label htmlFor="inp-school-name">Company Name: </label>
        <input id="inp-school-name" />
      </div>

      <div className="label-input-pair">
        <label htmlFor="inp-school-name">Position: </label>
        <input id="inp-school-name" />
      </div>

      <div className="inp-year-span-cont">
        <div>
          <label htmlFor="inp-school-year-from">From: </label>
          <input
            type="number"
            min="1900"
            max="9999"
            id="inp-school-year-from"
            />
        </div>

        <div>
          <label htmlFor="inp-school-year-from">To: </label>
          <input
            type="number"
            min="1900"
            max="9999"
            id="inp-school-year-from"
          />
        </div>
      </div>

      <div>Achievements: </div>
      <ul style={{
        paddingLeft: "24px",
      }}>
        <li
          style={{
            paddingLeft: "8px",
            listStyleType: "circle",
          }}>
          <input />
        </li>
      </ul>
      <button className="btn-animate">Ok</button>
    </form> 
  )
}

function App() {
  const [selectedFieldId, setSelectedFieldId] = useState(0);
  const fieldEditLabels = [
    { id: 0, value: "General Information" },
    { id: 1, value: "Description" },
    { id: 2, value: "Educational Experience" },
    { id: 3, value: "Work Experience" }
  ];

  const handleSelectField = (id) => {
    setSelectedFieldId(id);
  };

  const renderableFromSelectedId = () => {
    switch (selectedFieldId) {
      case 0: return <GeneralInforationInterface />;
      case 1: return <DescriptionInterface />;
      case 2: return <EducationExperienceInterface />;
      case 3: return <WorkExperienceInterface />;
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
                      style={{ transform: id === selectedFieldId ? "scale(1.1)" : "" }}
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
        <QuickProfilePanel />
        <CVProfile />
      </section>
    </main>
  );
}

export default App;