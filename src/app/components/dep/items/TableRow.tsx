'use client';

import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Department } from './InfiniteTable';
import { Avatar } from '@/shared/avatar';

interface Employees {
  firstname: string;
  lastname: string;
  avatar: string;
}

interface TableRowProps {
  data: Department;
  selected: boolean;
  onSelect: (_id: string, selected: boolean) => void;
  onEdit: (data: Department) => void;
  onSelectDelItem: (data: Department) => void;
}

const TableRow: React.FC<TableRowProps> = memo(
  ({ data, selected, onSelect, onEdit, onSelectDelItem }) => {
    const isDark = true;
    const deleteHandler = (data: Department) => {
      onSelectDelItem(data);
    };
    console.log('data', data.manager);
    return (
      <tr className="transition-all duration-200 hover:bg-gray-700">
        <td className="p-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={e => onSelect(data._id, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td>
        <td className="p-4 text-left">{data.deptName}</td>
        <td className="p-4 text-left">{data.description || 'empty'}</td>
        <td className="p-4 text-left">
          {/* {data.manager ? (
            <Avatar name={data.manager.firstname} src={data.manager?.avatar} size="md" />
          ) : (
            'Empty'
          )} */}

          {data?.manager ? (
            <div className="flex items-center gap-3">
              <Avatar name={data.manager.firstname} src={data.manager?.avatar} size="sm" />
              <span>{`${data.manager.firstname} ${data.manager.lastname}`}</span>
            </div>
          ) : (
            'empty'
          )}
        </td>
        <td className="p-4 text-left">{data?.status}</td>
        <td className="p-4 text-left">
          {data?.employees && data?.employees?.length > 0
            ? `${data?.employees.length} Employee(s)`
            : 'No Employees'}
        </td>

        <td className="p-4">
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(data)}
              className={`p-2 ${
                isDark
                  ? 'text-blue-400 cursor-pointer hover:bg-blue-900'
                  : 'text-blue-600 hover:bg-blue-50'
              } rounded-full transition-colors duration-150`}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteHandler(data)}
              className={`p-2 ${
                isDark
                  ? 'text-red-400 cursor-pointer hover:bg-red-900'
                  : 'text-red-600 hover:bg-red-50'
              } rounded-full transition-colors duration-150`}
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    );
  }
);

export default TableRow;
