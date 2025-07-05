import { JSX, memo } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

type TableHeaderProps = {
  onSort: (key: string) => void;
  sortConfig: SortConfig;
  selectedRows: Set<string | number>;
  data: Array<{ _id: string | number }>;
  toggleSelectAll: (checked: boolean) => void;
  isDark: boolean;
};

const TableHeader = memo(
  ({
    onSort,
    sortConfig,
    selectedRows,
    data,
    toggleSelectAll,
    isDark,
  }: TableHeaderProps): JSX.Element => {
    const columns = [
      { key: 'deptName', label: 'Department' },
      { key: 'description', label: 'Description' },
      { key: 'manager', label: 'Manager' },
      { key: 'status', label: 'Status' },
      { key: 'employees', label: 'Employees' },
      { key: '', label: 'Action' },
    ];

    return (
      <tr>
        <th className="p-4 sticky left-0">
          <input
            type="checkbox"
            onChange={e => toggleSelectAll(e.target.checked)}
            checked={selectedRows.size === data.length && data.length > 0}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </th>
        {columns.map(column => (
          <th
            key={column.key}
            className={`p-4 text-left font-semibold ${
              isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
            } cursor-pointer`}
            onClick={() => onSort(column.key)}
          >
            <div className="flex items-center gap-2">{column.label}</div>
          </th>
        ))}
      </tr>
    );
  }
);

export default TableHeader;
