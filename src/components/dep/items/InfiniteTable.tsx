'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import TableRow from './TableRow';
import TableSearch from './TableSearch';
import TableHeader from './TableHeader';
import { useInView } from 'react-intersection-observer';
import { FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

import useIsSmallDevice from '@/hooks/useIsSmallDevice';
import PageLayout from '@/shared/pageLayout/PageLayout';
import HeaderButtons from './HeaderButtons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import NoData from './NoData';

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

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

const order: SortConfig = {
  key: '',
  direction: 'asc',
};
const dummyDepartments = [
  {
    _id: '1',
    deptName: 'Engineering',
    description: 'Handles all technical and product development tasks',
    manager: 'Alice Johnson',
    status: 'Active',
    employees: [
      {
        firstname: 'John',
        lastname: 'Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
  {
    _id: '2',
    deptName: 'Human Resources',
    description: 'Manages recruitment and employee welfare',
    manager: 'Bob Lee',
    status: 'Active',
    employees: [
      {
        firstname: 'Emily',
        lastname: 'Stone',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ],
  },
  {
    _id: '3',
    deptName: 'Marketing',
    description: 'Responsible for brand promotion and campaigns',
    manager: 'Clara Nguyen',
    status: 'Inactive',
    employees: [],
  },
  {
    _id: '4',
    deptName: 'Finance',
    description: 'Handles financial planning and reporting',
    manager: 'Daniel Kim',
    status: 'Active',
    employees: [
      {
        firstname: 'Mike',
        lastname: 'Brown',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      {
        firstname: 'Sara',
        lastname: 'Williams',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      {
        firstname: 'Alex',
        lastname: 'Taylor',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
    ],
  },
];

const ITEMS_PER_PAGE = 10;

const InfiniteTable: React.FC = () => {
  const isDark = true;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [allData, setAllData] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(order);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // const { data } = useSelector((state: RootState) => state.departments); // Assuming `departments` slice

  const dispatch = useDispatch();

  const [ref, inView] = useInView({ threshold: 0.5 });
  const debouncedSearch = useMemo(() => debounce((value: string) => setSearch(value), 300), []);
  const isSmall = useIsSmallDevice();

  const filteredAndSortedData = useMemo(() => {
    let result = [...allData];

    if (search) {
      const queryString = search.toLowerCase();
      result = result.filter(item => item.deptName.toLowerCase().includes(queryString));
    }

    if (sortConfig.key) {
      result.sort((a: any, b: any) => {
        if (sortConfig.direction === 'asc') {
          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        }
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      });
    }

    return result;
  }, [allData, search, sortConfig]);

  const handleSort = (key: any) => {
    setSortConfig(({ key: currentKey, direction }) => ({
      key,
      direction: currentKey === key && direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const toggleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedRows(new Set(allData.map(item => item._id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const onDisSelect = () => {
    setSelectedRows(new Set());
  };

  useEffect(() => {
    if (inView) {
      setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, allData.length));
    }
  }, [inView, allData.length]);

  useEffect(() => {
    setAllData(dummyDepartments);
  }, [dummyDepartments]);

  const toggleSelectRow = (_id: string, checked: boolean): void => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(_id) : newSelected.delete(_id);
    setSelectedRows(newSelected);
  };

  return (
    <PageLayout
      pageTitle="Department List"
      debouncedSearch={debouncedSearch}
      headerButtons={
        <HeaderButtons
          debouncedSearch={debouncedSearch}
          isLoadingFetch={false}
          isSmall={isSmall}
          onRefresh={() => {}}
          selectedItems={selectedRows}
          onDisSelect={onDisSelect}
        />
      }
    >
      <div className="max-w-full">
        <div className={`overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div
            className={`${allData.length > 0 ? 'min-h-screen ' : 'min-h-[50vh]'} overflow-y-auto`}
          >
            <table className="w-full">
              <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} sticky top-0 z-10`}>
                <TableHeader
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  selectedRows={selectedRows}
                  data={allData}
                  toggleSelectAll={toggleSelectAll}
                  isDark={isDark}
                />
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedData.slice(0, visibleItems).map((item: Item) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    selected={selectedRows.has(item._id)}
                    onSelect={toggleSelectRow}
                    onEdit={() => {}}
                    onSelectDelItem={() => {}}
                  />
                ))}
              </tbody>
            </table>
            {filteredAndSortedData.slice(0, visibleItems).length === 0 && <NoData />}

            <div ref={ref} className="p-4 text-center">
              {visibleItems < allData.length && (
                <motion.button
                  animate={{ rotate: true ? 360 : 0 }}
                  transition={{ duration: 1, repeat: true ? Infinity : 0 }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <FiRefreshCw className="inline-block" /> Loading more...
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InfiniteTable;
