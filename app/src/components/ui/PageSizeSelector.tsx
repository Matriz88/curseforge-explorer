import { PAGINATION } from '../../config/constants';

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  options?: readonly number[];
}

export const PageSizeSelector = ({
  pageSize,
  onPageSizeChange,
  options = PAGINATION.PAGE_SIZE_OPTIONS,
}: PageSizeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="page-size" className="text-sm text-gray-400">
        Items per page:
      </label>
      <select
        id="page-size"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-3 py-1 border border-gray-700 rounded-md bg-gray-900 text-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
