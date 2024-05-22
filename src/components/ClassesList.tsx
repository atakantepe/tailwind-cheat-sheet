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
    const [expandedSubcategories, setExpandedSubcategories] = useState<{
        [key: string]: { [key: string]: boolean };
    }>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    useEffect(() => {
        const categories = ['layout', 'flexboxGrid', 'spacing', 'sizing', 'typography', 'backgrounds', 'borders', 'effects', 'filters', 'tables', 'transitions and animations', 'transforms', 'interactivity', 'svg', 'accessibility', 'other'];
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
        setExpandedSubcategories((prevState) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [subcategory]: !prevState[category]?.[subcategory]
            }
        }));
    };

    const renderClassProperties = (classProperties: ClassItem) => {
        return classProperties
            .split(';')
            .filter((prop) => prop.trim())
            .map((prop, index) => <div key={index}>{prop.trim()};</div>);
    };

    const filterData = (data: { [key: string]: Category }, query: string) => {
        if (!query) return data;
        const filteredData: { [key: string]: Category } = {};

        Object.keys(data).forEach((category) => {
            const subcategories = data[category];
            const filteredSubcategories: Subcategory = {};

            Object.keys(subcategories).forEach((subcategory) => {
                const classItems = subcategories[subcategory];
                const filteredClassItems: ClassItem = {};

                Object.entries(classItems).forEach(([className, classProperties]) => {
                    if (className.toLowerCase().includes(query.toLowerCase()) || classProperties.toLowerCase().includes(query.toLowerCase())) {
                        filteredClassItems[className] = classProperties;
                    }
                });

                if (Object.keys(filteredClassItems).length > 0) {
                    filteredSubcategories[subcategory] = filteredClassItems;
                }
            });

            if (Object.keys(filteredSubcategories).length > 0) {
                filteredData[category] = filteredSubcategories;
            }
        });

        return filteredData;
    };

    const filteredData = filterData(data, searchQuery);

    const categories = Object.keys(filteredData);
    const column1_3 = categories.filter((_, index) => index % 3 === 0);
    const column2_3 = categories.filter((_, index) => index % 3 === 1);
    const column3_3 = categories.filter((_, index) => index % 3 === 2);

    const column1_2 = categories.filter((_, index) => index % 2 === 0);
    const column2_2 = categories.filter((_, index) => index % 2 === 1);

    const column1_1 = categories;

    const renderColumn = (column: string[]) =>
        column.map((category) => (
            <div
                key={category}
                className="w-full flex flex-col items-start text-start p-5 gap-3 rounded-md border border-white/10 backdrop-blur-[2px] text-white"
                style={{
                    background: 'linear-gradient(0deg, rgba(54, 84, 139, 0.18) 0%, rgba(0, 44, 125, 0.18) 0.01%, rgba(1, 45, 138, 0.18) 100%)'
                }}
            >
                <span className="block capitalize mb-2">{category}</span>
                <div className="w-full p-[0.875rem] rounded-md bg-[rgba(255,255,255,0.05)] border border-white/10">
                    {Object.keys(filteredData[category]).map((subcategory) => (
                        <div key={subcategory} className={`mb-2  ${expandedSubcategories[category]?.[subcategory] ? 'border-b border-white/10 pb-2' : ''}`}>
                            <div onClick={() => toggleSubcategory(category, subcategory)} className={`cursor-pointer pb-2 ${expandedSubcategories[category]?.[subcategory] ? 'border-b-0' : 'border-b border-white/10'}`}>
                                <span className="text-sm font-light leading-[normal] capitalize">{subcategory}</span>
                            </div>
                            {expandedSubcategories[category]?.[subcategory] && (
                                <div className="max-h-[360px] overflow-auto pt-3">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="w-full border-b border-[#1B3678]">
                                                <th className="text-start font-normal text-sm text-white/80 px-2 py-1">Class</th>
                                                <th className="text-start font-normal text-sm text-white/80 px-2 py-1">Properties</th>
                                            </tr>
                                        </thead>
                                        <tbody className="backdrop-blur-[6px]">
                                            {expandedSubcategories[category]?.[subcategory] &&
                                                Object.entries(filteredData[category][subcategory]).map(([className, classProperties]) => (
                                                    <tr
                                                        key={className}
                                                        className=" backdrop-blur-[1px] border-b border-[rgba(81,142,255,0.20)]"
                                                        style={{
                                                            background: 'linear-gradient(90deg, rgba(169, 199, 255, 0.01) 0%, rgba(1, 83, 236, 0.02) 100%)'
                                                        }}
                                                    >
                                                        <td className="text-start font-light text-sm text-[#dae7ff] px-2 py-2 select-all whitespace-nowrap">{className}</td>
                                                        <td className="text-start font-light text-sm text-[#72afff] px-2 py-2 select-all">{renderClassProperties(classProperties)}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ));

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                <h3 className="text-white">Search</h3>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search classes or properties" className="mb-4 p-2 border border-gray-300 rounded" />
            </div>
            <div className="lg:flex w-full">
                <div className="w-4/12 hidden xl:flex p-4  flex-col gap-8">{renderColumn(column1_3)}</div>
                <div className="w-4/12 hidden xl:flex p-4  flex-col gap-8">{renderColumn(column2_3)}</div>
                <div className="w-4/12 hidden xl:flex p-4  flex-col gap-8">{renderColumn(column3_3)}</div>
                <div className="w-1/2 hidden lg:flex xl:hidden p-4 flex-col gap-8">{renderColumn(column1_2)}</div>
                <div className="w-1/2 hidden lg:flex xl:hidden p-4 flex-col gap-8">{renderColumn(column2_2)}</div>
                <div className="w-full flex lg:hidden p-4  flex-col gap-8">{renderColumn(column1_1)}</div>
            </div>
        </div>
    );
};

export default ClassesList;
