'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import TableRow from './TableRow';
import TableSearch from './TableSearch';
import TableHeader from './TableHeader';
import { useInView } from 'react-intersection-observer';
import { FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { useDispatch, useSelector } from 'react-redux';

import ConfirmationDialog from '@/shared/ConfirmationDialog';
import useIsSmallDevice from '@/hooks/useIsSmallDevice';
import UserProfile from '../profile';
import { UserEntryType } from '../mobile/types';
import PageLayout from '@/shared/pageLayout/PageLayout';
import HeaderButtons from './HeaderButtons';

interface Item {
  _id: string;
  userId: string;
  firstname: string;
  lastname: string;
  avatar: string;
  gender: string;
  blood: string;
  religion: string;
  role: string;
  phone: string;
}

interface Item {
  _id: string;
  userId: string;
  firstname: string;
  lastname: string;
  avatar: string;
  gender: string;
  blood: string;
  religion: string;
  role: string;
  phone: string;
}

const items: Item[] = [
  {
    _id: '1',
    userId: 'u101',
    firstname: 'John',
    lastname: 'Doe',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    gender: 'male',
    blood: 'O+',
    religion: 'Christianity',
    role: 'admin',
    phone: '123-456-7890',
  },
  {
    _id: '2',
    userId: 'u102',
    firstname: 'Jane',
    lastname: 'Smith',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    gender: 'female',
    blood: 'A-',
    religion: 'Islam',
    role: 'user',
    phone: '987-654-3210',
  },
  {
    _id: '3',
    userId: 'u103',
    firstname: 'Ali',
    lastname: 'Khan',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    gender: 'male',
    blood: 'B+',
    religion: 'Islam',
    role: 'moderator',
    phone: '555-123-4567',
  },
];

const defaultUserData: UserEntryType = {
  _id: '',
  firstname: 'John',
  lastname: 'Smith',
  gender: 'Male',
  blood: 'O+',
  religion: 'Christianity',
  role: 'Senior Developer',
  phone: '+1 (555) 123-4567',
  userId: '14254',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
};

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

const order: SortConfig = {
  key: '',
  direction: 'asc',
};
const ITEMS_PER_PAGE = 10;

const InfiniteTable: React.FC = () => {
  const isDark = true;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [allData, setAllData] = useState<Item[]>([...items]);
  const isLoadingStudents = false;
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<Item>();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [profile, setProfile] = useState<UserEntryType>(defaultUserData);

  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState<string>('');

  const [sortConfig, setSortConfig] = useState<SortConfig>(order);

  const observer = useRef('');
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const debouncedSearch = useMemo(() => debounce((value: string) => setSearch(value), 300), []);
  const isSmall = useIsSmallDevice();

  const dispatch = useDispatch();
  const [isOpenToUpdate, setIsOpenToUpdate] = useState(false);
  const [isOpenToDelete, setIsOpenToDelete] = useState(false);

  const openModalToUpdate = () => {
    setIsOpenToUpdate(true);
  };

  const closeHandlerToUpdate = () => {
    setIsOpenToUpdate(false);
  };

  const openModalToDelete = () => {
    setIsOpenToDelete(true);
  };

  const closeHandlerToDelete = () => {
    setIsOpenToDelete(false);
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...allData];

    if (search) {
      result = result.filter(item => {
        const fullName = `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`;

        const queryString = search.toLowerCase();
        return (
          item.firstname.toLowerCase().includes(queryString) ||
          item.lastname.toLowerCase().includes(queryString) ||
          item.lastname.toLowerCase().includes(queryString) ||
          fullName.includes(queryString) ||
          item.phone.includes(queryString) ||
          item.userId.includes(queryString)
        );
      });
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

  const deleteHandler = async (_id: string) => {};

  const handleSort = (key: any) => {
    setSortConfig(({ key: currentKey, direction }) => ({
      key,
      direction: currentKey === key && direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const toggleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedRows(new Set(allData.map((item: any) => item._id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (inView) {
      setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, allData.length));
    }
  }, [inView, filteredAndSortedData.length, allData.length]);

  const onSelectDelItem = (item: any) => {
    setDeleteItem(item);
    openModalToDelete();
  };

  const onConfirmDel = () => {
    if (deleteItem?._id) {
      deleteHandler(deleteItem?._id);
    }
  };

  const onCloseProfile = () => {
    setIsOpenProfile(false);
  };

  const toggleSelectRow = (_id: string, checked: boolean): void => {
    const newSelected = new Set(selectedRows);

    if (checked) {
      newSelected.add(_id);
    } else {
      newSelected.delete(_id);
    }
    setSelectedRows(newSelected);
  };

  const getUser = (data: UserEntryType): void => {
    setProfile(data);
    setIsOpenProfile(true);
  };

  const updateHandler = (data: any) => {
    openModalToUpdate();
  };

  return (
    <PageLayout
      pageTitle="User List"
      debouncedSearch={debouncedSearch}
      headerButtons={
        <HeaderButtons
          debouncedSearch={debouncedSearch}
          isLoadingFetch={false}
          isSmall={isSmall}
          onRefresh={() => {}}
          selectedItems={selectedRows}
        />
      }
    >
      <div className={`max-w-full`}>
        <div className={`overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* <div className="mb-4">
            {selectedRows.size > 0 && (
              <span>{`${selectedRows.size} ${
                selectedRows.size === 1 ? 'item is' : 'items are'
              } selected`}</span>
            )}
          </div> */}
          <div className={`${allData.length > 0 ? 'min-h-screen ' : ''} overflow-y-auto`}>
            <table className="w-full">
              <thead
                className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} sticky top-0 z-10 shadow-sm`}
              >
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
                {!isLoadingStudents &&
                  filteredAndSortedData
                    .slice(0, visibleItems)
                    .map((item: any) => (
                      <TableRow
                        key={item._id}
                        data={item}
                        selected={selectedRows.has(item._id)}
                        onSelect={toggleSelectRow}
                        onSelectDelItem={onSelectDelItem}
                        onEdit={updateHandler}
                        onSelectUser={getUser}
                      />
                    ))}
              </tbody>
            </table>
            {isLoadingStudents && (
              <div
                className={`p-6 text-center border-t ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-gray-400'
                    : 'bg-gray-50 border-gray-100 text-gray-500'
                }`}
              >
                <div
                  className={`animate-spin rounded-full h-10 w-10 border-b-2 mx-auto ${
                    isDark ? 'border-blue-400' : 'border-blue-600'
                  }`}
                ></div>
                <p className="text-sm mt-2">Loading more data...</p>
              </div>
            )}
          </div>

          <ConfirmationDialog
            isOpen={isOpenToDelete}
            onClose={() => closeHandlerToDelete()}
            onConfirm={onConfirmDel}
            cancelText="No"
            confirmText={`Yes`}
            message="Once deleted, this user cannot be recovered. This action is permanent."
            isLoading={false}
            title={`Do you really want to delete this user?`}
          />
          <UserProfile isOpen={isOpenProfile} onClose={onCloseProfile} user={profile} />
          {visibleItems < allData.length && (
            <div ref={ref} className="p-4 text-center">
              <motion.button
                animate={{ rotate: loading ? 360 : 0 }}
                transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                className="text-blue-600 dark:text-blue-400"
              >
                <FiRefreshCw className="inline-block" /> Loading more...
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default InfiniteTable;
