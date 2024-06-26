import { useState } from "react";

function ListDeletionPair({ key, handleDeleteEntry, children }) {
  return (
    <li 
      key={key}
      className="list-deletion-pair">
      <button style={{ alignSelf: "flex-start" }} onClick={handleDeleteEntry}>-</button>
      { children }
    </li>
  )
}

function GeneralInforationInterface({ generalInfo, setGeneralInfo }) {
  console.log(generalInfo);
  const setInfo = (field, e) => {
    const newObj = { ...generalInfo };
    setGeneralInfo(newObj);
    newObj[`${field}`] = e.target.value;
  };

  return (
    <div className="general-info">
      <div className="label-input-pair">
        <label htmlFor="info-name">Full Name:</label>
        <input 
          id="info-name"
          value={generalInfo.fullName}
          onInput={ (e) => setInfo("fullName", e) }
          maxLength={100}
        />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-occ">Occupation: </label>
        <input
          id="info-occ"
          value={generalInfo.occupation}
          onInput={ (e) => setInfo("occupation", e) }
          maxLength={50}
        />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-tele">Telephone: </label>
        <input
          id="info-tele"
          type="tel"
          value={generalInfo.telephone}
          onInput={ (e) => setInfo("telephone", e) }
          maxLength={30}
        />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-email">Email: </label>
        <input
          id="info-email"
          type="email"
          value={generalInfo.email}
          onInput={ (e) => setInfo("email", e) }
          maxLength={256}
        />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-loc">Location: </label>
        <input id="info-loc" value={generalInfo.location} onInput={ (e) => setInfo("location", e) } />
      </div>

      <div className="label-input-pair">
        <label htmlFor="info-linkedin">LinkedIn: </label>
        <input id="info-linkedin" value={generalInfo.linkedIn} onInput={ (e) => setInfo("linkedIn", e) } />
      </div>
    </div>
  )
}

function DescriptionInterface({ description, setDescription }) {
  return (
    <textarea
      value={description}
      onInput={(e) => { setDescription(e.target.value) }}
    >  
    </textarea>
  );
}

function ExperienceEntry(entries, listJSXRenderer, handleAddEntry) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
      gap: "20px",
    }}>
      <ul className="list-with-indent">
        {
          entries.map(entry => {
            return listJSXRenderer(entry)
          })
        }
      </ul>

      <button
        onClick={handleAddEntry}
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

function CancelOkPair({ onCancel }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button
        style={{ flexGrow: "1" }}
        className="btn-animate"
        type="button"
        onClick={onCancel}>Cancel</button>
      <button
        style={{ flexGrow: "1" }}
        className="btn-animate">Ok</button>
    </div>
  );
}

function EducationExperienceInterface({ schools, setSchools }) {
  const [addNewEntry, setAddNewEntry] = useState(false);

  const handleDeleteEntry = (elementToDelete) => {
    setSchools(schools.filter(element => element !== elementToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddNewEntry(false);

    const newSchool = {
      id: schools.length,
      name: e.target[0].value,
      from: e.target[1].value,
      to: e.target[2].value,
    };

    const found = schools.find(element => {
      return ((element.name === newSchool.name) && 
              (element.from === newSchool.from) &&
              (element.to === newSchool.to));
    });

    if (!found) {
      setSchools([ ...schools, newSchool]);
    }
  };

  const handleNewSchoolEntry = () => {
    setAddNewEntry(true);
  };

  if (addNewEntry) {
    return (
      <form
        className="educational-experience-entry"
        onSubmit={handleSubmit}>
        <div className="label-input-pair">
          <label htmlFor="inp-school-name">School Name: </label>
          <input id="inp-school-name" required />
        </div>

        <div className="inp-year-span-cont">
          <div>
            <label htmlFor="inp-school-year-from">From: </label>
            <input
              type="number"
              min="1900"
              max="9999"
              id="inp-school-year-from"
              required
              />
          </div>

          <div>
            <label htmlFor="inp-school-year-from">To: </label>
            <input
              type="number"
              min="1900"
              max="9999"
              id="inp-school-year-from"
              required
            />
          </div>
        </div>

        <CancelOkPair 
          onCancel={() =>setAddNewEntry(false) }
        />
      </form> 
    )
  }

  const mapFromSchoolsToListEntry = (element) => {
    const { id, name, from, to } = element;
    return (
      <>
        <ListDeletionPair
          key={id}
          handleDeleteEntry={() => handleDeleteEntry(element)}>
          <div>
            <h3 className="text-wrap">{name}</h3>
            <span style={{
              color: "grey",
              fontWeight: 300
            }}>{ from + " - " + to }
            </span>
          </div>
        </ListDeletionPair>
      </>
    );
  };

  return ExperienceEntry(schools, mapFromSchoolsToListEntry, handleNewSchoolEntry);
}

// TODO: Handle On ADD
function WorkExperienceInterface({ workExperiences, setWorkExperiences }) {
  const [achievements, setAchievements] = useState([]);
  const [addNewAchievement, setAddNewAchievement] = useState(false);
  const [addNewEntryFlag, setAddNewEntryFlag] = useState(false);

  const handleDeleteEntry = (elementToDelete) => {
    setWorkExperiences(workExperiences.filter(element => element !== elementToDelete));
  };

  const handleAchievementDeletion = (achievementToDelete) => {
    setAchievements(achievements.filter(achievement => achievement !== achievementToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddNewEntryFlag(false);
    
    const form = e.target;
    const newExperience =  {
      id: workExperiences.length,
      name: form[0].value,
      role: form[1].value,
      from: form[2].value,
      to: form[3].value,
      achievements: [...achievements]
    };

    const found = workExperiences.find(element => {
      return ((element.name === newExperience.name) &&
              (element.role === newExperience.role) &&
              (element.from === newExperience.from) &&
              (element.to === newExperience.to) &&
              ((element.achievements.every(item => newExperience.achievements.includes(item)) &&
                newExperience.achievements.every(item => element.achievement.includes(item)))));
    });

    if (!found) {
      setWorkExperiences([...workExperiences, newExperience]);
    }

    setAchievements([]);
  };

  const handleAddNewAchievement = (e) => {
    setAddNewAchievement(true);
  };

  const getNewInputAchievementRenderables = () => {
    const handleOnInput = (e) => {
      if (e.key === "Escape") {
        setAddNewAchievement(false);
        return;
      }
      
      if ((e.key === "Enter") && (e.target.value)) {
        setAddNewAchievement(false);

        if (!achievements.find(element => element.value === e.target.value)) {
          console.log("Hi");
          setAchievements([...achievements, { id: achievements.length, value: e.target.value }]);
        }
      }
    };

    if (!addNewAchievement) {
      return (
      <button 
          className="btn-animate"
          type="button"
          style={{
            padding: "6px 10px",
            borderRadius: "4px"
          }}
          onClick={handleAddNewAchievement}>
          +
        </button>
      );
    } else {
      return (
        <input onKeyDown={handleOnInput} autoFocus onBlur={() => setAddNewAchievement(false)} />
      );
    }
  };

  if (!addNewEntryFlag) {
    const mapFromWorkExperienceToListEntry = (element) => {
      const { id, name, role, from, to, achievements } = element;
      return (
        <ListDeletionPair
          key={id}
          handleDeleteEntry={() => handleDeleteEntry(element)}>
          <div className="experience-desc">
            <h3 className="text-wrap">
              { name }
            </h3>
            <div style={{color: "#555555" }}>{`${from} - ${to}`}</div>
            <div className="role">{ role }</div>
            <ul className="list-with-indent">
              {
                achievements.map(achievement => {
                  return (
                    <li key={id} className="text-wrap" style={{ listStyle: "circle" }}>
                      { achievement.value }
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </ListDeletionPair>
      );
    };

    return ExperienceEntry(
      workExperiences,
      mapFromWorkExperienceToListEntry,
      () => { setAddNewEntryFlag(true) }
    );
  }
  
  return (
    <form
      className="educational-experience-entry"
      onSubmit={handleSubmit}>
      <div className="label-input-pair">
        <label htmlFor="inp-school-name">Company Name: </label>
        <input id="inp-school-name" required />
      </div>

      <div className="label-input-pair">
        <label htmlFor="inp-school-name">Position: </label>
        <input id="inp-school-name" required />
      </div>

      <div className="inp-year-span-cont">
        <div>
          <label htmlFor="inp-school-year-from">From: </label>
          <input
            type="number"
            min="1900"
            max="9999"
            id="inp-school-year-from"
            required
            />
        </div>

        <div>
          <label htmlFor="inp-school-year-from">To: </label>
          <input
            type="number"
            min="1900"
            max="9999"
            id="inp-school-year-from"
            required
          />
        </div>
      </div>

      <div>Achievements: </div>
      <ul className="list-with-indent">
        {
          achievements.map(achievement => {
            const { id, value } = achievement;
            return (
              <ListDeletionPair 
                key={id}
                handleDeleteEntry={() => handleAchievementDeletion(achievement)}
              >
                <div style={{alignSelf: "center"}}>{ value }</div>
              </ListDeletionPair>
            );
          })
        }

        <li>
          { getNewInputAchievementRenderables() }
        </li>
      </ul>
      <CancelOkPair 
        onCancel={() => { setAddNewEntryFlag(false); setAchievements([]) } }
      />
    </form> 
  )
}

function ListEditor({ list, setList }) {
  const [addList, setAddList] = useState(false);

  const handleDeleteEntry = (entryToDelete) => {
    setList(list.filter(element => element !== entryToDelete));
  };
  
  const handleOnInput = (e) => {
    if (e.key === "Escape") {
      setAddList(false);
      return;
    }
    
    if ((e.key === "Enter") && (e.target.value)) {
      setAddList(false);
      if (!list.find(element => element.data === e.target.value)) {
        setList([...list, { id: list.length, data: e.target.value }]);
      }
    }
  };

  const getInputRenderables = () => {
    if (!addList) {
      return (
        <button
          className="btn-animate"
          type="button"
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "2px solid black"
          }}
          onClick={() => setAddList(true)}
        >
          +
        </button>
      )
    } else {
      return <input onKeyDown={handleOnInput} autoFocus onBlur={() => setAddList(false)} />;
    }
  };
  
  return (
    <div>
      <ul className="list-with-indent">
        {
          list.map(achivement => {
            return (
              <ListDeletionPair
                key={achivement.key}
                handleDeleteEntry={() => handleDeleteEntry(achivement)}>
                <div style={{ alignSelf: "center" }}>{achivement.data}</div>
              </ListDeletionPair>
            );
          })
        }
        <li style={{listStyle:"none"}}>{getInputRenderables()}</li>
      </ul>
    </div>
  );
}

export {
  GeneralInforationInterface,
  DescriptionInterface,
  EducationExperienceInterface,
  WorkExperienceInterface,
  ListEditor
};
