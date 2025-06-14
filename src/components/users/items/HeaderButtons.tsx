'use client';

import { FC, ReactNode, useState } from 'react';

import { useSelector } from 'react-redux';

import { FiDownload, FiPlus, FiRefreshCw } from 'react-icons/fi';
import Link from 'next/link';
import { RiDeleteBin5Line } from 'react-icons/ri';

import CreateUserModal from '@/components/users/create/Modal';
import TableSearch from './TableSearch';

interface IHeaderButtons {
  selectedItems: Set<string>;
  onRefresh: () => void;
  isLoadingFetch: boolean;
  isSmall: boolean;
  debouncedSearch: any;
}

const HeaderButtons: FC<IHeaderButtons> = ({
  selectedItems,
  onRefresh,
  isLoadingFetch,
  isSmall,
  debouncedSearch,
}) => {
  const [isOpenToCreate, setIsOpenToCreate] = useState(false);
  const [isOpenToDel, setIsOpenToDel] = useState(false);

  const isDark = true;

  const deleteHandler = async () => {};

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

  return (
    <div className="flex gap-4">
      {selectedItems.size === 0 && (
        <div
          onClick={() => onOpenToCreate()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transform hover:scale-105 transition-all"
        >
          <FiPlus />
          {isSmall ? '' : ` Add New User`}
        </div>
      )}

      {selectedItems.size > 0 && (
        <button
          onClick={() => openModalToDel()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transform"
        >
          <RiDeleteBin5Line /> {isSmall ? '' : `Delete`}
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

      <CreateUserModal isOpen={isOpenToCreate} onClose={onCloseToCreate} />
    </div>
  );
};

export default HeaderButtons;
