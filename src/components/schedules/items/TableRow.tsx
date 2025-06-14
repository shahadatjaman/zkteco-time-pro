'use client';

import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Item {
  _id: string;
  dep: string;
  startAt: string;
  endAt: string;
  shiftName: string;
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
      <tr className="transition-all duration-200 hover:bg-gray-700">
        <td className="p-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={e => onSelect(data._id, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </td>
        <td className="p-4 text-left">{data.dep}</td>
        <td className="p-4 text-left">{data.shiftName}</td>
        <td className="p-4 text-left">{data.startAt}</td>
        <td className="p-4 text-left">{data.endAt}</td>
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
