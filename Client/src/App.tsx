
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faBriefcase, faChartPie, faCodeCompare } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import { Route, Routes, Navigate, Link } from 'react-router-dom'
import Trending from './Pages/Trending';
import Inventory from './Pages/Inventory';
import Portfolio from './Pages/Portfoilio';
import Compare from './Pages/Compare';
import { useContext } from 'react';
import { UserContext } from './Provider/UserProvider';
import { UserContextType } from './Models/UserContextType';
import { Context } from 'telegraf';




function App() {
  const userContext=useContext(UserContext) as UserContextType;
  userContext.parseUserInfo();
  
  return (
    
      <div className="flex flex-col h-full text-slate-300">
      <div className=" bg-slate-800 flex">
        <div className='flex items-center flex-col justify-center ml-8'>
          <img alt="logo" src="logo.png"
            className=' h-16 w-16 rounded-full'/>
        </div>
        <div className='flex  flex-row items-center justify-center gap-4 flex-1'>
          <Link to="/trending" className=' flex justify-center items-center flex-col w-[80px] h-[80px] rounded-md hover:bg-slate-700 hover:text-stone-100 text-sm ease-linear duration-200'>
            <FontAwesomeIcon icon={faArrowTrendUp} size="xl" />
            <p>Trending</p>
          </Link>
          <Link to="/inventory" className=' flex justify-center items-center flex-col w-[80px] h-[80px] rounded-md hover:bg-slate-700 hover:text-stone-100 text-sm ease-linear duration-200'>
            <FontAwesomeIcon icon={faBriefcase} size="xl" />
            <p>Inventory</p>
          </Link>
          <Link to="/comparison" className=' flex justify-center items-center flex-col w-[80px] h-[80px] rounded-md hover:bg-slate-700 hover:text-stone-100 text-sm ease-linear duration-200'>
            <FontAwesomeIcon icon={faCodeCompare} size="xl" />
            <p>Comparison</p>
          </Link>
          <Link to="/portfolio" className=' flex justify-center items-center flex-col w-[80px] h-[80px] rounded-md hover:bg-slate-700 hover:text-stone-100 text-sm ease-linear duration-200'>
            <FontAwesomeIcon icon={faChartPie} size="xl" />
            <p>Portfolio</p>
          </Link>
        </div>
        <div className='flex items-center flex-col justify-center mr-8'>
          {userContext.isAuthenticated?<img alt="source" src={`https://avatars.akamai.steamstatic.com/${userContext.imageHash}`}
            className=' h-14 w-14 rounded-full'/>: 
            <div onClick={()=>{userContext.login()}} className='h-14 w-14 rounded-full bg-slate-800 flex items-center hover:cursor-pointer'>LOGIN</div>}
            {userContext.isAuthenticated?<div className='hover:cursor-pointer' onClick={()=>{userContext.logout()}}>LOGOUT</div>:null}
        </div>
      </div>
      <div className="h-full bg-slate-900 overflow-scroll grid grid-cols-[1fr_auto_1fr]">
          <div></div>
          <Routes>
            <Route path="/trending" element={<Trending />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/comparison" element={<Compare />} />
            <Route path="*" element={<Navigate to="/trending" />} />
          </Routes>
          <div></div>
      </div>
    </div>
    
  );
}

export default App;
