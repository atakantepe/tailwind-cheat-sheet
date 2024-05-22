import React from 'react';

interface TopbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
const Topbar: React.FC<TopbarProps> = ({ isDarkMode, toggleTheme }) => {
    
    return (
        <>
            <div
                className="flex items-center justify-between w-full px-8 py-[1.23rem] backdrop-blur-[2px] text-zinc-950 dark:text-white rounded-[2rem] border border-zinc-300 dark:border-white/10 mb-[3.25rem]"
                style={{ background: isDarkMode ? 'linear-gradient(0deg, rgba(1, 6, 29, 0.12) 0%, rgba(0, 87, 255, 0.05) 0.01%, rgba(0, 117, 255, 0.07) 100%)':'#fff' }}
            >
                <div className="flex items-center gap-2 relative">
                    <div className="text-start text-zinc-950 dark:text-white text-lg leading-[normal] font-light">Tailwind CSS Cheat Sheet</div>
                    <span
                        className="absolute hidden md:flex top-[20px] right-[-13px] px-2 py-[0.18rem] rounded-[0.75rem] backdrop-blur-[5px] text-sm leading-[0.625rem] text-white/80 bg-black border border-zinc-300 dark:border-white/10"
                        style={{ background: isDarkMode ? 'linear-gradient(0deg, rgba(0, 45, 113, 0.22) 0%, rgba(0, 71, 176, 0.41) 100%)':'rgb(34 122 255)' }}
                    >
                        v 0.1.0
                    </span>
                </div>
                <div className="text-white/80 flex gap-3">
                    <a
                        href="https://github.com/atakantepe/tailwind-cheat-sheet"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center md:py-2 md:px-4 w-[42px] h-[42px] md:w-auto md:h-auto gap-2 border border-zinc-300 dark:border-white/10 rounded-full md:rounded-[0.85rem] backdrop-blur-[2px] hover:border-blue-700 dark:hover:border-white/40  transition-all duration-200"
                        style={{ background: isDarkMode ? 'linear-gradient(2deg, #022055 -48.06%, #021337 98.2%)':'rgb(34 122 255)' }}
                    >
                        <span className="text-white font-light md:flex hidden">Give a Star</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                            <path
                                d="M10.0899 1.5L12.6899 6.77L18.4999 7.61L14.2999 11.71L15.2899 17.5L10.0899 14.77L4.88993 17.5L5.87993 11.71L1.67993 7.61L7.48993 6.77L10.0899 1.5Z"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                    <a
                        href="https://x.com/atkntepe"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center md:py-2 md:px-4 w-[42px] h-[42px] md:w-auto md:h-auto gap-2 border border-zinc-300 dark:border-white/10 rounded-full md:rounded-[0.85rem] backdrop-blur-[2px] hover:border-blue-700 dark:hover:border-white/40 transition-all duration-200"
                        style={{ background: isDarkMode ? 'linear-gradient(2deg, #022055 -48.06%, #021337 98.2%)':'rgb(34 122 255)' }}
                    >
                        <span className="text-white font-light md:flex hidden">Follow Me</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-4" viewBox="0 0 512 512">
                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                        </svg>
                    </a>
                    <div className="border-l border-zinc-300 dark:border-white/10 pl-3">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-center w-[42px] h-[42px] border border-zinc-300 dark:border-white/10 rounded-full backdrop-blur-[2px] hover:border-blue-700 dark:hover:border-white/40 transition-all duration-200"
                            style={{ background: isDarkMode ? 'linear-gradient(2deg, #022055 -48.06%, #021337 98.2%)':'rgb(34 122 255)' }}
                        >
                            {isDarkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white h-4" viewBox="0 0 512 512">
                                    <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white h-4" viewBox="0 0 512 512">
                                    <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Topbar;
