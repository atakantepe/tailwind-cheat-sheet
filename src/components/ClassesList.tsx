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
  const response = await fetch(`./dist/${category}.json`);
  const data: Category = await response.json();
  return data;
};

const ClassesList: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: Category }>({});
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
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

  const toggleCategory = (category: string) => {
    setExpandedCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

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
      <div key={category} className="mb-6">
        <h2 onClick={() => toggleCategory(category)} className="cursor-pointer text-lg font-semibold">
          {category}
        </h2>
        {expandedCategories[category] && (
          <div className="ml-4">
            {Object.keys(data[category]).map((subcategory) => (
              <div key={subcategory} className="mb-4">
                <h3 onClick={() => toggleSubcategory(category, subcategory)} className="cursor-pointer text-md font-medium">
                  {subcategory}
                </h3>
                {expandedSubcategories[category]?.[subcategory] && (
                  <ul className="ml-4 list-disc">
                    {Object.entries(data[category][subcategory]).map(([className, classProperties]) => (
                      <li key={className}>{className}: {classProperties}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  );

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full sm:w-1/2 md:w-4/12 p-8">
        {renderColumn(column1)}
      </div>
      <div className="w-full sm:w-1/2 md:w-4/12 p-8">
        {renderColumn(column2)}
      </div>
      <div className="w-full sm:w-1/2 md:w-4/12 p-8">
        {renderColumn(column3)}
      </div>
    </div>
  );
};

export default ClassesList;
