'use client';

import { memo } from 'react';
import { FaEdit, FaPhone, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

import { Avatar } from '../../../../shared/avatar/index';

import Link from 'next/link';
import { UserEntryType } from '../mobile/types';
import { Department } from '../../dep/items/InfiniteTable';

interface Item {
  _id: string;
  userId: string;
  firstname: string;
  avatar: string;
  lastname: string;
  gender: string;
  blood: string;
  religion: string;
  dept: Department;
  className: string;
  phone: string;
  dateOfAdmission: string;
}

interface TableRowProps {
  data: Item;
  selected: boolean;
  onSelect: (_id: string, selected: boolean) => void;
  onEdit: (data: Item) => void;
  onSelectDelItem: (data: Item) => void;
  onSelectUser: (data: UserEntryType) => void;
}

const TableRow: React.FC<TableRowProps> = memo(
  ({ data, selected, onSelect, onEdit, onSelectDelItem, onSelectUser }) => {
    const isDark = true;

    const deleteHandler = (data: Item) => {
      onSelectDelItem(data);
    };

    return (
      <tr className={`transition-all duration-200  hover:bg-gray-700`}>
        {/* <td className="p-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={e => onSelect(data._id, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td> */}
        <td className={`p-4 font-semibold ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          {data.userId}
        </td>
        <td onClick={() => onSelectUser(data)} className="p-4 truncate max-w-xs">
          {data && data?.avatar ? (
            <div className="flex items-center gap-3">
              <img
                src={data.avatar}
                alt={`${data.firstname} ${data.lastname}`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{`${data.firstname} ${data.lastname}`}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar name={data.firstname} />
              <span>{`${data.firstname} ${data.lastname}`}</span>
            </div>
          )}
        </td>
        <td onClick={() => onSelectUser(data)} className="p-4 text-left">
          {data.gender}
        </td>
        <td onClick={() => onSelectUser(data)} className="p-4 text-left">
          {data.blood}
        </td>
        <td onClick={() => onSelectUser(data)} className="p-4 text-left">
          {data.religion}
        </td>
        <td onClick={() => onSelectUser(data)} className="p-4 text-left">
          {data.dept.deptName}
        </td>

        <td onClick={() => onSelectUser(data)} className="p-4 text-left">
          {' '}
          {data.phone && (
            <Link href={``} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
              <FaPhone /> {data.phone}
            </Link>
          )}
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
