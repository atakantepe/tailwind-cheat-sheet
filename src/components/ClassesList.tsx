import React, { useState, useEffect } from 'react';

interface ClassItem {
  [key: string]: string;
}

interface Subcategory {
  [key: string]: ClassItem;
}

interface Category {
  [key: string]: Subcategory;
}

const fetchCategory = async (category: string): Promise<Category> => {
  const response = await fetch(`src/data/${category}.json`);
  const data: Category = await response.json();
  return data;
};

const ClassesList: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: Category }>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  useEffect(() => {
    const categories = ['layout', 'flexboxGrid', 'spacing', 'sizing', 'typography', 'backgrounds', 'borders', 'effects', 'filters', 'tables', 'transitions and animations', 'transforms', 'interactivity', 'svg', 'accessibility'];
    const fetchData = async () => {
      const result: { [key: string]: Category } = {};
      for (const category of categories) {
        result[category] = await fetchCategory(category);
      }
      setData(result);
    };
    fetchData();
  }, []);



  const toggleSubcategory = (category: string, subcategory: string) => {
    setExpandedSubcategories(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [subcategory]: !prevState[category]?.[subcategory],
      },
    }));
  };

  const categories = Object.keys(data);
  const column1 = categories.filter((_, index) => index % 3 === 0);
  const column2 = categories.filter((_, index) => index % 3 === 1);
  const column3 = categories.filter((_, index) => index % 3 === 2);

  const renderColumn = (column: string[]) => (
    column.map((category) => (
      <div key={category} className="w-full flex flex-col items-start text-start p-5 gap-3 rounded-lg border border-white/10 backdrop-blur-[2px] text-white" style={{background:'linear-gradient(0deg, rgba(54, 84, 139, 0.18) 0%, rgba(0, 44, 125, 0.18) 0.01%, rgba(1, 45, 138, 0.18) 100%)'}}>
        <span className="block capitalize">
          {category}
        </span>
        <div className="">
            {Object.keys(data[category]).map((subcategory) => (
              <div key={subcategory} className="mb-2">
                <span onClick={() => toggleSubcategory(category, subcategory)} className="cursor-pointer">
                  {subcategory}
                </span>
                {expandedSubcategories[category]?.[subcategory] && (
                  <ul className="m-0 p-0">
                    {Object.entries(data[category][subcategory]).map(([className, classProperties]) => (
                      <li key={className}>{className}: {classProperties}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
      </div>
    ))
  );

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full sm:w-1/2 lg:w-4/12 p-4 flex flex-col gap-8">
        {renderColumn(column1)}
      </div>
      <div className="w-full sm:w-1/2 lg:w-4/12 p-4 flex flex-col gap-8">
        {renderColumn(column2)}
      </div>
      <div className="w-full  lg:w-4/12 p-4 flex flex-col gap-8">
        {renderColumn(column3)}
      </div>
    </div>
  );
};

export default ClassesList;
