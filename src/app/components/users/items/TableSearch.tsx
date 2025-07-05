import { memo } from 'react';
import { FaSearch } from 'react-icons/fa';
import Filters from './FIlters';
interface TableSearchProps {
  debouncedSearch: (value: string) => void;
  isDark: boolean;
}

const TableSearch: React.FC<TableSearchProps> = memo(({ debouncedSearch, isDark }) => (
  <div className="flex gap-4">
    {/* <Filters isDark={isDark} /> */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        onChange={e => debouncedSearch(e.target.value)}
        className={`pl-10 pr-4 py-2 rounded-lg ${
          isDark ? 'bg-gray-700 text-white' : 'bg-white'
        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  </div>
));

export default TableSearch;
