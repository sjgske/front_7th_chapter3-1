import React, { useState, useEffect } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface TableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;
  entityType?: 'user' | 'post';
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const DataTable: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return newDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData = searchable && searchTerm
    ? tableData.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns = columns || (tableData[0] ? Object.keys(tableData[0]).map(key => ({ key, header: key, width: undefined })) : []);

  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    if (entityType === 'user') {
      if (columnKey === 'role') {
        return <Badge userRole={value} showIcon />;
      }
      if (columnKey === 'status') {
        const badgeStatus =
          value === 'active' ? 'published' :
          value === 'inactive' ? 'draft' : 'rejected';
        return <Badge status={badgeStatus} showIcon />;
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="default" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const variant =
          value === 'development' ? 'primary' :
          value === 'design' ? 'info' :
          value === 'accessibility' ? 'danger' :
          'secondary';
        return <Badge variant={variant} shape="pill">{value}</Badge>;
      }
      if (columnKey === 'status') {
        return <Badge status={value} showIcon />;
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="default" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === 'draft' && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button
                size="sm"
                variant="default"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-[300px]"
          />
        </div>
      )}

      <table className={cn("w-full text-sm", bordered && "border border-gray-300")}>
        <thead className="bg-gray-50">
          <tr>
            {actualColumns.map((column) => (
              <th
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={cn(
                  "px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider",
                  sortable && "cursor-pointer hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={cn(
                onRowClick && "cursor-pointer",
                hover && "hover:bg-gray-50",
                striped && rowIndex % 2 === 1 && "bg-gray-50"
              )}
            >
              {actualColumns.map((column) => (
                <td key={column.key} className="px-4 py-3 whitespace-nowrap">
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              "px-3 py-1.5 border border-gray-300 bg-white rounded",
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-gray-50"
            )}
          >
            이전
          </button>
          <span className="px-3 py-1.5">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "px-3 py-1.5 border border-gray-300 bg-white rounded",
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-gray-50"
            )}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};
