'use client';

import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Item {
  _id: string;
  userId: string;
  avatar: string;
  firstname: string;
  lastname: string;
  logDate: string;
  checkInAt: string;
  checkOutAt: string;
  status: string;
  role: string;
  verifyType: 'CARD';
}

interface TableRowProps {
  data: Item;
  selected: boolean;
  onSelect: (_id: string, selected: boolean) => void;
  onEdit: (data: Item) => void;
  onSelectDelItem: (data: Item) => void;
}

const TableRow: React.FC<TableRowProps> = memo(
  ({ data, selected, onSelect, onEdit, onSelectDelItem }) => {
    const isDark = true;

    const deleteHandler = (data: Item) => {
      onSelectDelItem(data);
    };

    return (
      <tr className={`transition-all duration-200 hover:bg-gray-700`}>
        <td className="p-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={e => onSelect(data._id, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td>
        <td className="p-4 font-semibold">{data.userId}</td>
        <td className="p-4 flex items-center">
          <img src={data.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <span className="ml-4">{data.firstname}</span>
        </td>
        <td className="p-4">{data.logDate}</td>
        <td className="p-4">{data.checkInAt}</td>
        <td className="p-4">{data.checkOutAt}</td>
        <td className="p-4">{data.status}</td>
        <td className="p-4">{data.role}</td>
        <td className="p-4">{data.verifyType}</td>
        <td className="p-4">
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(data)}
              className={`p-2 ${
                isDark ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-50'
              } rounded-full transition-colors duration-150`}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteHandler(data)}
              className={`p-2 ${
                isDark ? 'text-red-400 hover:bg-red-900' : 'text-red-600 hover:bg-red-50'
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
