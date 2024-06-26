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
    <div className="icon-name-pair text-wrap-wider">
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

function QuickProfilePanel({ generalInfo, schools, skills, languages }) {
  const createEducationData = (education, yearSpan) => {
    return (
      <>
        <h3 className="text-wrap-wider">{education}</h3>
        <span style={{
            color: "grey",
            fontWeight: 300
          }}>{yearSpan}</span>
      </>
    )
  };

  const education = schools.map(({ id, name, from, to }) => {
    return {
      id: id,
      data: createEducationData(name, from + " - " + to)
    }
  }); 

  return (
    <section className="quick-profile-panel">
      <ul className="personal-info-group">
        <IconNamePair icon={ImgPhone} altVal="phone number icon" value={generalInfo.telephone} />
        <IconNamePair icon={ImgEmail} altVal="email icon" value={generalInfo.email} />
        <IconNamePair icon={ImgMapMarker} altVal="map marker icon" value={generalInfo.location} />
        <IconNamePair icon={ImgLinkedIn} altVal="linkedin icon" value={generalInfo.linkedIn} />
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

function createWorkExperienceEntry({ id, name, role, from, to, achievements }) {
  return (
    <section key={id} className="work-experience-entry">
      <section className="year-span">
        <div>{from}</div>
        <div>-</div>
        <div>{to}</div>
      </section>
      <div className="hori-divider"></div>
      <section className="experience-desc">
        <h2 className="company-name">{name}</h2>
        <div className="role">{role}</div>
        <ul className="creator-achievements">
          {
            achievements.map(achievement => {
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

function CVProfile({ generalInfo, description, work }) {
  const profile = (
    <p
      style={{
        maxHeight: "200px",
        overflowY: "auto"
      }}>
      {description}
    </p>
  );

  const workExperiences = work.map(workExperience => createWorkExperienceEntry(workExperience));

  return (
    <section className="cv-profile">
      <header>
        <h1 className="creator-name">{generalInfo.fullName}</h1>
        <h3 className="creator-occupation">{generalInfo.occupation}</h3>
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

export { AchievementCategory, IconNamePair, QuickProfilePanel, CreatorSummary, CVProfile };
