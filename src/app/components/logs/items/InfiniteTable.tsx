'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import TableRow from './TableRow';
import TableSearch from './TableSearch';
import TableHeader from './TableHeader';
import { useInView } from 'react-intersection-observer';
import { FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

import ConfirmationDialog from '@/shared/ConfirmationDialog';
import useIsSmallDevice from '@/hooks/useIsSmallDevice';
import PageLayout from '@/shared/pageLayout/PageLayout';
import HeaderButtons from './HeaderButtons';
import { UserEntryType } from '../mobile/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  addLiveLogs,
  addLog,
  addLogs,
  AttendanceLog,
  deleteOne,
  initialStateOfLogState,
} from '@/store/slices/logSlice';
import { useGetUsersQuery } from '@/store/services/userApi';
import {
  useDeleteAttendanceLogMutation,
  useGetLogsQuery,
  useGetTodayLogsQuery,
} from '@/store/services/attendanceLogApi';
import NoData from '@/shared/DataNotFound';
import AttendanceLogModal from './IO';

interface Item {
  _id: string;
  userId: string;
  firstname: string;
  lastname: string;
  avatar: string;
  logDate: string;
  checkInAt: string;
  checkOutAt: string;
  status: string;
  role: string;
  verifyType: 'CARD';
}

const items: Item[] = [
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
  {
    _id: '1',
    userId: 'u101',
    firstname: 'Sha',
    lastname: 'Jam',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=48&h=48',
    logDate: '2025-05-26',
    checkInAt: '08:00',
    checkOutAt: '17:00',
    status: 'Present',
    role: 'Admin',
    verifyType: 'CARD',
  },
];

const ITEMS_PER_PAGE = 10;

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

const order: SortConfig = {
  key: '',
  direction: 'asc',
};

const LogsTable: React.FC = () => {
  const isDark = true;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [allData, setAllData] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<Item>();
  const [detailsItem, setDetailsItem] = useState<AttendanceLog>(initialStateOfLogState);

  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(order);
  const [isOpenToUpdate, setIsOpenToUpdate] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const [isOpenToDelete, setIsOpenToDelete] = useState(false);

  const { data } = useSelector((state: RootState) => state.log);

  const { data: logs, isLoading, isError, isFetching, refetch, isSuccess } = useGetLogsQuery();
  const [deleteAttendanceLog, { isLoading: isLoadingDel }] = useDeleteAttendanceLogMutation();

  const dispatch = useDispatch();

  const observer = useRef('');
  const [ref, inView] = useInView({ threshold: 0.5 });
  const debouncedSearch = useMemo(() => debounce((value: string) => setSearch(value), 300), []);
  const isSmall = useIsSmallDevice();

  const openModalToUpdate = () => setIsOpenToUpdate(true);
  const openDetails = () => setIsOpenDetails(true);
  const closeDetails = () => setIsOpenDetails(false);

  const closeHandlerToUpdate = () => setIsOpenToUpdate(false);
  const openModalToDelete = () => setIsOpenToDelete(true);
  const closeHandlerToDelete = () => setIsOpenToDelete(false);

  const filteredAndSortedData = useMemo(() => {
    let result = [...allData];

    if (search) {
      const queryString = search.toLowerCase();
      result = result.filter(
        item =>
          item.employee.firstname.toLowerCase().includes(queryString) ||
          item.userId.toLowerCase().includes(queryString) ||
          item.status.toLowerCase().includes(queryString) ||
          item.verifyType.toLowerCase().includes(queryString)
      );
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

  useEffect(() => {
    setAllData(data);
  }, [data]);

  useEffect(() => {
    if (logs?.status === 200) {
      dispatch(addLogs(logs.data));
    }
  }, [logs]);

  const toggleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedRows(new Set(allData.map((item: any) => item._id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  useEffect(() => {
    if (inView) {
      setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, allData.length));
    }
  }, [inView, filteredAndSortedData.length, allData.length]);

  const onSelectDelItem = (item: any) => {
    setDeleteItem(item);
    openModalToDelete();
  };

  const onConfirmDel = async () => {
    if (deleteItem?._id) {
      const response: any = await deleteAttendanceLog(deleteItem._id);

      if (response && response.data.modifiedCount === 1) {
        dispatch(deleteOne(deleteItem?._id));
        closeHandlerToDelete();
      }
    }
  };

  const toggleSelectRow = (_id: string, checked: boolean): void => {
    const newSelected = new Set(selectedRows);
    if (checked) newSelected.add(_id);
    else newSelected.delete(_id);
    setSelectedRows(newSelected);
  };

  const updateHandler = (data: any) => {
    openModalToUpdate();
  };

  const onsSelectDetails = (data: AttendanceLog) => {
    setDetailsItem(data);
    openDetails();
  };

  return (
    <PageLayout
      pageTitle="Log List"
      debouncedSearch={debouncedSearch}
      headerButtons={
        <HeaderButtons
          debouncedSearch={debouncedSearch}
          isLoadingFetch={false}
          isSmall={isSmall}
          onRefresh={refetch}
          selectedItems={selectedRows}
        />
      }
    >
      <div className={`max-w-full`}>
        <div
          className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="mb-4">
            {selectedRows.size > 0 && (
              <span>{`${selectedRows.size} ${
                selectedRows.size === 1 ? 'item is' : 'items are'
              } selected`}</span>
            )}
          </div>
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
                {filteredAndSortedData.slice(0, visibleItems).map((item: any) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    selected={selectedRows.has(item._id)}
                    onSelect={toggleSelectRow}
                    onSelectDelItem={onSelectDelItem}
                    onEdit={updateHandler}
                    onSelectDetails={onsSelectDetails}

                    // onSelectUser={function(data: UserEntryType): void {
                    //   throw new Error('Function not implemented.');
                    // }}
                  />
                ))}
              </tbody>
            </table>
            {filteredAndSortedData.slice(0, visibleItems).length === 0 && !isLoading && <NoData />}
            {isLoading && (
              <div
                className={`p-6 text-center border-t ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-gray-400'
                    : 'bg-gray-50 border-gray-100 text-gray-500'
                }`}
              >
                <div
                  className={` rounded-full h-10 w-10 border-b-2 mx-auto ${
                    isDark ? 'border-blue-400' : 'border-blue-600'
                  }`}
                ></div>
                <p className="text-sm mt-2">Loading more data...</p>
              </div>
            )}

            <AttendanceLogModal
              isOpen={isOpenDetails}
              onClose={closeDetails}
              employeeData={detailsItem}
            />
            <div ref={ref} className="p-4 text-center">
              {visibleItems < allData.length && (
                <motion.button
                  animate={{ rotate: true ? 360 : 0 }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <FiRefreshCw className="inline-block" /> Loading more...
                </motion.button>
              )}
            </div>
            <ConfirmationDialog
              isOpen={isOpenToDelete}
              onClose={() => closeHandlerToDelete()}
              onConfirm={onConfirmDel}
              cancelText="No"
              confirmText={`Yes`}
              message="Once deleted, this item cannot be recovered. This action is permanent."
              isLoading={isLoadingDel}
              title={`Do you really want to delete this item?`}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LogsTable;
