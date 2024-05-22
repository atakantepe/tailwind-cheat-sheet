import './App.css';
import ClassesList from './components/ClassesList';
function App() {
    return (
        <>
            <div>
                <div
                    className="flex items-center justify-between w-full px-8 py-[1.3rem] backdrop-blur-[2px] text-white rounded-[2rem] border border-white/10 mb-[3.25rem]"
                    style={{ background: 'linear-gradient(0deg, rgba(1, 6, 29, 0.12) 0%, rgba(0, 87, 255, 0.05) 0.01%, rgba(0, 117, 255, 0.07) 100%)' }}
                >
                    <div className="flex items-center gap-2 relative">
                        <div className="text-white text-lg leading-[normal] font-light">Tailwind CSS Cheat Sheet</div>
                        <span
                            className="absolute top-[20px] right-[-13px] px-2 py-[0.18rem] rounded-[0.75rem] backdrop-blur-[5px] text-sm leading-[0.625rem] text-white/80 bg-black border border-white/10"
                            style={{ background: 'linear-gradient(0deg, rgba(0, 45, 113, 0.22) 0%, rgba(0, 71, 176, 0.41) 100%)' }}
                        >
                            v 0.1.0
                        </span>
                    </div>
                    <div className="text-white/80 flex gap-3">
                        <a
                            href="https://github.com/atakantepe/tailwind-cheat-sheet"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center py-2 px-4 gap-2 border border-white/10 rounded-[0.85rem] backdrop-blur-[2px] hover:border-white/40 transition-all duration-200"
                            style={{ background: 'linear-gradient(2deg, #022055 -48.06%, #021337 98.2%)' }}
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
                            className="flex items-center py-2 px-4 gap-2 border border-white/10 rounded-[0.85rem] backdrop-blur-[2px] hover:border-white/40 transition-all duration-200"
                            style={{ background: 'linear-gradient(2deg, #022055 -48.06%, #021337 98.2%)' }}
                        >
                            <span className="text-white font-light md:flex hidden">Follow Me</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-4" viewBox="0 0 512 512">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <ClassesList />
            </div>
        </>
    );
}

export default App;
