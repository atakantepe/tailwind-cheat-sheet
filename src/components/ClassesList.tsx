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

interface ClassesListProps {
    isDarkMode: boolean;
  }

const fetchCategory = async (category: string): Promise<Category> => {
    const response = await fetch(`src/data/${category}.json`);
    const data: Category = await response.json();
    return data;
};

const ClassesList: React.FC<ClassesListProps> = ({ isDarkMode }) => {    const [data, setData] = useState<{ [key: string]: Category }>({});
    const [expandedSubcategories, setExpandedSubcategories] = useState<{
        [key: string]: { [key: string]: boolean };
    }>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchOption, setSearchOption] = useState<string>('All');

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
        return String(classProperties)
            .split(';')
            .filter((prop: string) => prop.trim())
            .map((prop: string, index: number) => <div key={index}>{prop.trim()};</div>);
    };

    const filterData = (data: { [key: string]: Category }, query: string, option: string) => {
        if (!query) return data;
        const filteredData: { [key: string]: Category } = {};

        Object.keys(data).forEach((category) => {
            const subcategories = data[category];
            const filteredSubcategories: Subcategory = {};

            Object.keys(subcategories).forEach((subcategory) => {
                const classItems = subcategories[subcategory];
                const filteredClassItems: ClassItem = {};

                Object.entries(classItems).forEach(([className, classProperties]) => {
                    if (option === 'All' && (className.toLowerCase().includes(query.toLowerCase()) || String(classProperties).toLowerCase().includes(query.toLowerCase()))) {
                        filteredClassItems[className] = String(classProperties);
                    } else if (option === 'Only class' && className.toLowerCase().includes(query.toLowerCase())) {
                        filteredClassItems[className] = String(classProperties);
                    } else if (option === 'Only property' && String(classProperties).toLowerCase().includes(query.toLowerCase())) {
                        filteredClassItems[className] = String(classProperties);
                    }
                });

                if (Object.keys(filteredClassItems).length > 0) {
                    filteredSubcategories[subcategory] = filteredClassItems;
                }
            });

            if (Object.keys(filteredSubcategories).length > 0) {
                filteredData[category] = filteredSubcategories as unknown as Category;
            }
        });

        return filteredData;
    };

    const filteredData = filterData(data, searchQuery, searchOption);

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
                className="w-full flex flex-col items-start text-start p-5 gap-3 rounded-md border border-zinc-300 dark:border-white/10 backdrop-blur-[2px] text-zinc-950 dark:text-white"
                style={{ background: isDarkMode ? 'linear-gradient(0deg, rgba(1, 6, 29, 0.12) 0%, rgba(0, 87, 255, 0.05) 0.01%, rgba(0, 117, 255, 0.07) 100%)':'#fff' }}
            >
                <span className="block capitalize mb-2">{category}</span>
                <div className="w-full p-[0.875rem] rounded-md   bg-blue-50/10 dark:bg-[rgba(255,255,255,0.05)] border border-zinc-300 dark:border-white/10">
                    {Object.keys(filteredData[category]).map((subcategory) => (
                        <div key={subcategory} className={`mb-2  ${expandedSubcategories[category]?.[subcategory] ? 'border-b border-zinc-300 dark:border-white/10 pb-2' : ''}`}>
                            <div onClick={() => toggleSubcategory(category, subcategory)} className={`cursor-pointer pb-2 ${expandedSubcategories[category]?.[subcategory] ? 'border-b-0' : 'border-b border-zinc-200 dark:border-white/10'}`}>
                                <span className="text-sm font-light leading-[normal] capitalize">{subcategory}</span>
                            </div>
                            {expandedSubcategories[category]?.[subcategory] && (
                                <div className="max-h-[360px] overflow-auto pt-3">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="w-full border-b border-zinc-200 dark:border-[#1B3678]">
                                                <th className="text-start font-normal text-sm text-zinc-950 dark:text-white/80 px-2 py-1">Class</th>
                                                <th className="text-start font-normal text-sm text-zinc-950 dark:text-white/80 px-2 py-1">Properties</th>
                                            </tr>
                                        </thead>
                                        <tbody className="backdrop-blur-[6px]">
                                            {expandedSubcategories[category]?.[subcategory] &&
                                                Object.entries(filteredData[category][subcategory]).map(([className, classProperties]) => (
                                                    <tr
                                                        key={className}
                                                        className=" backdrop-blur-[1px] border-b border-zinc-200 dark:border-[rgba(81,142,255,0.20)]"
                                                        style={{
                                                            background: isDarkMode ?'linear-gradient(90deg, rgba(169, 199, 255, 0.01) 0%, rgba(1, 83, 236, 0.02) 100%)':'#fff'
                                                        }}
                                                    >
                                                        <td className="text-start font-light text-sm text-blue-500 dark:text-[#dae7ff] px-2 py-2 select-all whitespace-nowrap">{className}</td>
                                                        <td className="text-start font-light text-sm text-blue-700 dark:text-[#72afff] px-2 py-2 select-all">{renderClassProperties(classProperties)}</td>
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
            <div className="flex flex-col w-full px-4 max-w-[700px] mx-auto">
                <div className="flex w-full flex-col gap-4">
                    <h1 className="text-zinc-950 dark:text-white text-3xl font-light mb-8">Tailwind CSS Cheat Sheet </h1>
                </div>
                <div className="w-full relative mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="mb-4 px-5 py-2.5 text-md leading-6 pr-[310px] border border-zinc-300 dark:border-white/10 backdrop-blur-[2px] rounded-full w-full hover:border-zinc-400 dark:hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-white/60 text-zinc-950 dark:text-white "
                        style={{ background: isDarkMode? 'linear-gradient(0deg, rgba(54, 84, 139, 0.18) 0%, rgba(0, 44, 125, 0.18) 0.01%, rgba(1, 45, 138, 0.18) 100%)':'#fff' }}
                    />
                    <div className="md:absolute md:py-0 py-4 flex justify-end w-full md:w-auto right-[16px] top-[50%] -mt-5 items-center gap-2">
                        <label className="flex items-center gap-1 text-zinc-950 dark:text-white/80">
                            <input type="radio" value="All" checked={searchOption === 'All'} onChange={(e) => setSearchOption(e.target.value)} />
                            All
                        </label>
                        <label className="flex items-center gap-1 text-zinc-950 dark:text-white/80">
                            <input type="radio" value="Only class" checked={searchOption === 'Only class'} onChange={(e) => setSearchOption(e.target.value)} className="" />
                            ClassOnly
                        </label>
                        <label className="flex items-center gap-1 text-zinc-950 dark:text-white/80">
                            <input type="radio" value="Only property" checked={searchOption === 'Only property'} onChange={(e) => setSearchOption(e.target.value)} className="" />
                            StyleOnly
                        </label>
                    </div>
                </div>
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
