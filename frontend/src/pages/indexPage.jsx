import { Link } from "react-router-dom";
import Header from "../Header";

export default function IndexPage () {
    return (
        <>
        <div>
          index page here
  
        </div>
        <div className="m-4 flex items-center justify-between gap-2 border border-secondary rounded-full pl-4 shadow-md shadow-gray-200">
          <div className="text-gray-400">Search Classifieds</div>
          <button className="bg-primary text-white border rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </>
    );
}