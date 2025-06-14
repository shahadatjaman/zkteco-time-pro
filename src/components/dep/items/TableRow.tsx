'use client';

import { memo } from 'react';

interface Employees {
  firstname: string;
  lastname: string;
  avatar: string;
}

interface Item {
  _id: string;
  deptName: string;
  description?: string;
  manager?: string;
  status: string;
  employees: Employees[];
}

interface TableRowProps {
  data: Item;
  selected: boolean;
  onSelect: (_id: string, selected: boolean) => void;
  onEdit: (data: Item) => void;
  onSelectDelItem: (data: Item) => void;
}

const TableRow: React.FC<TableRowProps> = memo(({ data, selected, onSelect }) => {
  const isDark = true;

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
      <td className="p-4 text-left">{data.description || '-'}</td>
      <td className="p-4 text-left">{data.manager || '-'}</td>
      <td className="p-4 text-left">{data.status}</td>
      <td className="p-4 text-left">
        {data.employees?.length > 0 ? `${data.employees.length} Employee(s)` : 'No Employees'}
      </td>
    </tr>
  );
});

export default TableRow;
