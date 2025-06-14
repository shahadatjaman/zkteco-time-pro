'use client';

import { FC, ReactNode, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FiDownload, FiPlus, FiRefreshCw } from 'react-icons/fi';
import Link from 'next/link';
import { RiDeleteBin5Line } from 'react-icons/ri';

import CreateShiftModal from '@/components/schedules/create/Modal';
import TableSearch from './TableSearch';
import ConfirmationDialog from '@/shared/ConfirmationDialog';
import { deleteMultipleSchedules } from '@/store/slices/scheduleSlice';

interface IHeaderButtons {
  selectedItems: Set<string>;
  onRefresh: () => void;
  isLoadingFetch: boolean;
  isSmall: boolean;
  debouncedSearch: any;
  onDisSelect: () => void;
}

const HeaderButtons: FC<IHeaderButtons> = ({
  selectedItems,
  onRefresh,
  isLoadingFetch,
  isSmall,
  debouncedSearch,
  onDisSelect,
}) => {
  const [isOpenToCreate, setIsOpenToCreate] = useState(false);
  const [isOpenToDel, setIsOpenToDel] = useState(false);

  const dispatch = useDispatch();
  const isDark = true;

  const deleteHandler = async () => {
    dispatch(deleteMultipleSchedules([...selectedItems]));
    onDisSelect();
    setIsOpenToDel(false);
  };

  const onOpenToCreate = () => {
    setIsOpenToCreate(true);
  };
  const onCloseToCreate = () => {
    setIsOpenToCreate(false);
  };

  const openModalToDel = () => {
    setIsOpenToDel(true);
  };

  const closeModalToDel = () => {
    setIsOpenToDel(false);
  };

  console.log('selectedItems', selectedItems);
  return (
    <div className="flex gap-4">
      {selectedItems.size === 0 && (
        <div
          onClick={() => onOpenToCreate()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transform hover:scale-105 transition-all"
        >
          <FiPlus />
          {isSmall ? '' : ` Add New Schedule`}
        </div>
      )}

      {selectedItems.size > 0 && (
        <button
          onClick={() => openModalToDel()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transform"
        >
          <RiDeleteBin5Line /> {isSmall ? '' : `Delete (${selectedItems.size})`}
        </button>
      )}

      <button
        onClick={() => onRefresh()}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600"
      >
        <FiRefreshCw className={`${isLoadingFetch ? 'animate-spin' : ''}`} />{' '}
        {isSmall ? '' : `Refresh`}
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
        <FiDownload /> Export CSV
      </button>
      <TableSearch isDark={true} debouncedSearch={debouncedSearch} />

      <CreateShiftModal isOpen={isOpenToCreate} onClose={onCloseToCreate} />
      <ConfirmationDialog
        isOpen={isOpenToDel}
        onClose={closeModalToDel}
        onConfirm={deleteHandler}
        cancelText="No"
        confirmText="Yes"
        message={`Once deleted, The schedule${
          selectedItems.size > 1 ? "'s" : ''
        } cannot be recovered. This action is permanent.`}
        isLoading={false}
        title={`Do you really want to delete this schedule${selectedItems.size > 1 ? "'s" : ''}?`}
      />
    </div>
  );
};

export default HeaderButtons;
