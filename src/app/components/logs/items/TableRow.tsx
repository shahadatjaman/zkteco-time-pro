'use client';

import { AttendanceLog } from '@/store/slices/logSlice';
import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Status } from './styles';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Avatar } from '@/shared/avatar';
import convertDateFormat from '@/utils';

interface TableRowProps {
  data: AttendanceLog;
  selected: boolean;
  onSelect: (_id: string, selected: boolean) => void;
  onEdit: (data: AttendanceLog) => void;
  onSelectDelItem: (data: AttendanceLog) => void;
  onSelectDetails: (data: AttendanceLog) => void;
}

const TableRow: React.FC<TableRowProps> = memo(
  ({ data, selected, onSelect, onEdit, onSelectDelItem, onSelectDetails }) => {
    const isDark = true;

    const deleteHandler = (data: AttendanceLog) => {
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
          <Avatar name={data.employee.firstname} src={data.employee.avatar || ''} size="md" />

          <span className="ml-4">{data.employee.firstname}</span>
        </td>
        <td className="p-4">{convertDateFormat(data.logDate)}</td>
        <td className="p-4">{data.checkInAt}</td>
        <td className="p-4">{data.checkOutAt}</td>
        <td className="p-4">
          <AiOutlineCaretDown
            onClick={() => onSelectDetails(data)}
            className="cursor-pointer"
            fontSize={22}
          />
        </td>

        <td className="p-4">
          <Status status={data.status}>{data.status}</Status>
        </td>
        <td className="p-4">{data.employee.roles}</td>
        <td className="p-4">{data.shiftId?.shiftName}</td>
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
              } rounded-full transition-colors duration-150 cursor-pointer`}
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
