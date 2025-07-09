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
import { useDeleteDepartmentMutation, useGetDepartmentsQuery } from '@/store/services/deptApi';
import { deleteADepartment, setDepartments } from '@/store/slices/deptSlice';
import ConfirmationDialog from '@/shared/ConfirmationDialog';
import UpdateDeptModal from '../create/UpdateDeptModal';
import { User } from '@/store/slices/userSlice';

export interface Department {
  _id: string;
  deptName: string;
  description?: string;
  status?: string;
  manager?: User[] | any; // Manager's user ID
  employees?: string[]; // List of employee user IDs
}

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
  const [allData, setAllData] = useState<Department[]>([]);
  const [isOpenToDelete, setIsOpenToDelete] = useState(false);
  const [isOpenToUpdate, setIsOpenToUpdate] = useState(false);

  const [deleteItem, setDeleteItem] = useState<Department>();

  const [department, setDepartment] = useState<Department>();

  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(order);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const { data: deptFromRootState } = useSelector((state: RootState) => state.dept);

  const { data, isLoading, isError, isFetching, refetch, isSuccess } = useGetDepartmentsQuery();
  const [deleteDepartment, { isLoading: isLoadingDele }] = useDeleteDepartmentMutation();

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
    if (data) {
      setAllData(data);
      dispatch(setDepartments(data));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    setAllData(deptFromRootState);
  }, [deptFromRootState]);

  const toggleSelectRow = (_id: string, checked: boolean): void => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(_id) : newSelected.delete(_id);
    setSelectedRows(newSelected);
  };

  const openModalToDelete = () => {
    setIsOpenToDelete(true);
  };

  const closeHandlerToDelete = () => {
    setIsOpenToDelete(false);
  };

  const closeHandlerToUpdate = () => {
    setIsOpenToUpdate(false);
  };

  const onSelectDelItem = (item: any) => {
    setDeleteItem(item);
    openModalToDelete();
  };

  const openModalToUpdate = (data: any) => {
    setDepartment(data);
    setIsOpenToUpdate(true);
  };

  const updateHandler = (data: any) => {
    openModalToUpdate(data);
  };

  const onConfirmDel = async () => {
    if (deleteItem?._id) {
      const res: any = await deleteDepartment(deleteItem?._id);

      if (res && res.data && res.data.status === 200 && deleteItem._id) {
        dispatch(deleteADepartment(deleteItem._id));
        closeHandlerToDelete();
      }
    }
  };

  return (
    <PageLayout
      pageTitle="Department List"
      debouncedSearch={debouncedSearch}
      headerButtons={
        <HeaderButtons
          debouncedSearch={debouncedSearch}
          isLoadingFetch={isLoading}
          isSmall={isSmall}
          onRefresh={() => refetch()}
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
                {filteredAndSortedData.slice(0, visibleItems).map((item: Department) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    selected={selectedRows.has(item._id)}
                    onSelect={toggleSelectRow}
                    onEdit={updateHandler}
                    onSelectDelItem={onSelectDelItem}
                  />
                ))}
              </tbody>
            </table>
            {filteredAndSortedData.slice(0, visibleItems).length === 0 && !isLoading && <NoData />}

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

            <ConfirmationDialog
              isOpen={isOpenToDelete}
              onClose={() => closeHandlerToDelete()}
              onConfirm={onConfirmDel}
              cancelText="No"
              confirmText={`Yes`}
              message="Once deleted, this department cannot be recovered. This action is permanent."
              isLoading={false}
              title={`Do you really want to delete this department?`}
            />

            {department && (
              <UpdateDeptModal
                department={department}
                isOpen={isOpenToUpdate}
                onClose={closeHandlerToUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InfiniteTable;
