// import { useState } from 'react'
import { observer } from 'mobx-react-lite'
// import { NexGenTableStore } from "./NexGenTableStore";
import  "./NexGenTable.scss";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Table } from 'react-bootstrap';

export interface NexGenTableProps<T> {
 columns: ColumnDef<T>[],
 data: T[]
}

const NexGenTable = <T,>({ columns, data }:NexGenTableProps<T>) => {
  // const [nexGenTableStore] = useState(() => new NexGenTableStore());
  const nexTable = useReactTable<T>({
    columns, data,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table size="sm" className="table-nowrap" responsive>
      <thead>
         {nexTable.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
      </thead>
      <tbody>
         {nexTable.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
      <tfoot>
          {nexTable.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
    </Table>
  );
};

export default observer(NexGenTable);