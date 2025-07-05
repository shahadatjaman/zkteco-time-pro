'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import PageHeader from './PageHeader';

interface IPageLayout {
  children: ReactNode;
  pageTitle: string;
  debouncedSearch?: any;
  headerButtons?: any;
}

const PageLayout: React.FC<IPageLayout> = ({
  children,
  pageTitle,
  debouncedSearch,
  headerButtons,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    setSearchQuery('');
  };

  const handleBack = () => {
    // Add navigation logic here
    console.log('Back button clicked');
  };

  return (
    <div className="w-full lg:pt-20 lg:px-10 rounded-lg mx-auto bg-[#1f2937] dark:text-white">
      <div className="w-full mx-auto lg:mb-6 sm:mb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <PageHeader title={pageTitle} />
          {/* <HeaderButtons
            isLoadingFetch={false}
            isSmall={false}
            onRefresh={() => {}}
            selectedItems={new Set()}
            debouncedSearch={debouncedSearch}
          /> */}
          {headerButtons}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
