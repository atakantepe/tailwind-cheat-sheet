import React, { useState, useEffect } from "react";
import ClassesCard from "./ClassesCard";

const ClassesList: React.FC = () => {
  // const [sections, setSections] = useState({});
  // const [openSection, setOpenSection] = useState(null);
  // const [openSubsection, setOpenSubsection] = useState(null);

  // useEffect(() => {
  //   const sectionNames = [
  //     "layout",
  //     "background",
  //     "accessibility",
  //     "effects",
  //     "filters",
  //     "borders",
  //     "flexboxGrid",
  //     "interactivity",
  //     "spacing",
  //     "sizing",
  //     "typography",
  //     "transforms",
  //     "transitionsAnimations",
  //     "svg",
  //     "tables",
  //     "other",
  //   ]; 

  //   Promise.all(
  //     sectionNames.map((section) =>
  //       fetch(`https://api.example.com/${section}`)
  //         .then(response => {
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           return response.json();
  //         })
  //         .then(data => setSections(data))
  //         .catch(error => console.log('Fetch error: ', error))
  //     )
  //   ).then((data) => {
  //     const newSections = data.reduce((result, sectionData, index) => {
  //       result[sectionNames[index]] = sectionData;
  //       return result;
  //     }, {});
  //     setSections(newSections);
  //   });
  // }, []);

  // const handleSectionClick = (section) => {
  //   setOpenSection(openSection === section ? null : section);
  //   setOpenSubsection(null);
  // };

  // const handleSubsectionClick = (subsection) => {
  //   setOpenSubsection(openSubsection === subsection ? null : subsection);
  // };

  return (
    <div className="flex flex-wrap">
      {/* {Object.entries(sections).map(([section, subsections]) => (
        <div key={section} className="w-full lg:w-4/12">
          <h2 onClick={() => handleSectionClick(section)}>{section}</h2>
          {openSection === section &&
            Object.entries(subsections).map(([subsection, classes]) => (
              <div key={subsection}>
                <h3 onClick={() => handleSubsectionClick(subsection)}>
                  {subsection}
                </h3>
                {openSubsection === subsection && (
                  <div>
                    {Object.entries(classes).map(([className, properties]) => (
                      <ClassesCard
                        key={className}
                        className={className}
                        properties={properties
                          .split(";")
                          .map((prop) => prop.trim())}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))} */}
    </div>
  );
};

export default ClassesList;
