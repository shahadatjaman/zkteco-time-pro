'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';
import TableRow from './TableRow';
import TableSearch from './TableSearch';
import TableHeader from './TableHeader';
import { useInView } from 'react-intersection-observer';
import { FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

import UpdateScheduleModal from '../create/UpdateScheduleModal';

import ConfirmationDialog from '@/shared/ConfirmationDialog';
import useIsSmallDevice from '@/hooks/useIsSmallDevice';
import PageLayout from '@/shared/pageLayout/PageLayout';
import HeaderButtons from './HeaderButtons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import NoData from './NoData';

import {
  Dep,
  Schedule,
  useDeleteScheduleMutation,
  useGetSchedulesQuery,
} from '@/store/services/scheduleApi';
import { deleteASchedule, setSchedules } from '@/store/slices/scheduleSlice';

type ScrollEvent = React.UIEvent<HTMLElement>;

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
  const [allData, setAllData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<Schedule>();
  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(order);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isOpenToUpdate, setIsOpenToUpdate] = useState(false);
  const [isOpenToDelete, setIsOpenToDelete] = useState(false);

  const [schedule, setSchedule] = useState<any>();

  const { data: schedulesFromRootState } = useSelector((state: RootState) => state.schedules);

  const dispatch = useDispatch();

  const observer = useRef('');
  const [ref, inView] = useInView({ threshold: 0.5 });
  const debouncedSearch = useMemo(() => debounce((value: string) => setSearch(value), 300), []);
  const isSmall = useIsSmallDevice();

  const openModalToUpdate = () => setIsOpenToUpdate(true);
  const closeHandlerToUpdate = () => setIsOpenToUpdate(false);
  const openModalToDelete = () => setIsOpenToDelete(true);
  const closeHandlerToDelete = () => setIsOpenToDelete(false);

  const {
    data: schedules,
    isLoading,
    isError,
    isFetching,
    refetch,
    isSuccess,
  } = useGetSchedulesQuery();

  const [deleteSchedule, { isLoading: isLoadingDeleting }] = useDeleteScheduleMutation();

  const filteredAndSortedData = useMemo(() => {
    let result = [...allData];

    if (search) {
      const queryString = search.toLowerCase();
      result = result.filter(
        item =>
          item.dept.deptName.toLowerCase().includes(queryString) ||
          item.shiftName.toLowerCase().includes(queryString)
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

  const deleteHandler = async (_id: string) => {
    setAllData(prev => prev.filter(item => item._id !== _id));
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(_id);
      return newSet;
    });
    dispatch(deleteASchedule(_id));
  };

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
    setAllData(schedulesFromRootState);
  }, [schedulesFromRootState]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSchedules(schedules.data));
    }
  }, [isSuccess, schedules]);

  const onSelectDelItem = (item: Schedule) => {
    setDeleteItem(item);
    openModalToDelete();
  };

  const deleteScheduleHandler = async (_id: string) => {
    const response = await deleteSchedule(_id);

    if (response && response.data?.status === 200) {
      dispatch(deleteASchedule(_id));
      closeHandlerToDelete();
    }
  };

  const onConfirmDel = () => {
    if (deleteItem?._id) {
      deleteScheduleHandler(deleteItem._id);
    }
    closeHandlerToDelete();
  };

  const toggleSelectRow = (_id: string, checked: boolean): void => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(_id) : newSelected.delete(_id);
    setSelectedRows(newSelected);
  };

  const updateHandler = (data: Schedule) => {
    openModalToUpdate();
    setSchedule(data);
  };

  return (
    <PageLayout
      pageTitle="Schedule List"
      debouncedSearch={debouncedSearch}
      headerButtons={
        <HeaderButtons
          debouncedSearch={debouncedSearch}
          isLoadingFetch={isLoading}
          isSmall={isSmall}
          onRefresh={refetch}
          selectedItems={selectedRows}
          onDisSelect={onDisSelect}
        />
      }
    >
      <div className="max-w-full">
        <div className={`overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* <div className="mb-4">
            {selectedRows.size > 0 && (
              <span>{`${selectedRows.size} ${
                selectedRows.size === 1 ? 'item is' : 'items are'
              } selected`}</span>
            )}
          </div> */}
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
                {filteredAndSortedData.slice(0, visibleItems).map((item: Schedule) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    selected={selectedRows.has(item._id)}
                    onSelect={toggleSelectRow}
                    onSelectDelItem={onSelectDelItem}
                    onEdit={updateHandler}
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
                  className={`animate-spin rounded-full h-10 w-10 border-b-2 mx-auto ${
                    isDark ? 'border-blue-400' : 'border-blue-600'
                  }`}
                ></div>
                <p className="text-sm mt-2">Loading more data...</p>
              </div>
            )}

            <div ref={ref} className="p-4 text-center">
              {visibleItems < allData.length && (
                <motion.button
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  <FiRefreshCw className="inline-block" /> Loading more...
                </motion.button>
              )}
            </div>
          </div>

          <UpdateScheduleModal
            isOpen={isOpenToUpdate}
            onClose={closeHandlerToUpdate}
            schedule={schedule}
          />
          <ConfirmationDialog
            isOpen={isOpenToDelete}
            onClose={closeHandlerToDelete}
            onConfirm={onConfirmDel}
            cancelText="No"
            confirmText="Yes"
            message="Once deleted, this schedule cannot be recovered. This action is permanent."
            isLoading={isLoadingDeleting}
            title="Do you really want to delete this schedule?"
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default InfiniteTable;
