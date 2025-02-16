import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/classname';
import { IoChevronDown } from 'react-icons/io5';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useCommunitiesQuery } from '@/hooks/query/useCommunities';

interface DropdownProps {
  value: string;
  onChange?: (value: string) => void;
  title: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
}

export const CommunityDropdown: React.FC<DropdownProps> = ({
  title = 'Community',
  className,
  triggerClassName,
  menuClassName,
  onChange,
  value,
}) => {
  const { data: communityList, isLoading, error } = useCommunitiesQuery();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mdUp = useBreakpoint('md');
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return <LoadingDropdown />;
  }

  if (error) {
    return <ErrorDropdown />;
  }

  const handleSelectItem = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange?.(value);
  };

  const getName = (id: string | null) => {
    const community = communityList?.find((item) => item.id === id);
    return community?.name || '';
  };

  return (
    <>
      {isOpen && !mdUp && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
      )}
      <div ref={dropdownRef} className={cn('dropdown dropdown-end', className)}>
        <div
          tabIndex={0}
          role="button"
          className={cn('btn flex w-full min-w-8 justify-between', triggerClassName)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{getName(selectedValue) || title}</span>
          <IoChevronDown
            className={cn('h-5 w-5 transition-transform', {
              'rotate-180': isOpen,
            })}
          />
        </div>
        <ul
          tabIndex={0}
          className={cn(
            'menu dropdown-content z-[11] rounded-lg bg-base-100 p-0 shadow',
            {
              block: isOpen,
              hidden: !isOpen,
            },
            menuClassName,
          )}
        >
          {communityList?.map((item) => (
            <li key={item.id}>
              <a
                onClick={() => handleSelectItem(item.id)}
                className={cn('flex h-11 justify-between rounded-none p-0 px-4 py-2', {
                  active: selectedValue === item.id,
                })}
              >
                {item.name}
                {selectedValue === item.id && (
                  <Image src="/icons/check-icon.svg" height={20} width={20} alt="Selected" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const LoadingDropdown: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
    </div>
  );
};

const ErrorDropdown: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-red-500">Error loading communities</div>
    </div>
  );
};
