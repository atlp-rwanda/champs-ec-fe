"use client"
import React, { useState } from 'react';
import Button, { BackButton } from '@/components/Button';
import AssigningRole from '@/components/AssigningRoles';
import requestAxios from '@/utils/axios';
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

type usersTable = {
  No: number,
  id: string,
  firstName: string,
  email: string,
  roleId: string,
  phone: string,
}

type PaginationState = {
  pageIndex: number
  pageSize: number
}


const UsersPageAdmin = () => {
  const { isLoading, refetch, error, data } = useQuery<any>({
    queryKey: ['AdminUserList'],
    queryFn: () => requestAxios.get('/users'),
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 7
  })
  var usersData = data?.users ?? []

  const columns: ColumnDef<usersTable>[] = [
    {
      header: 'No',
      accessorFn: (val: any, index: number) => index + 1,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Username',
      accessorFn: row => row.firstName,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Email',
      accessorFn: row => row.email,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Phone',
      accessorFn: row => row.phone,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      id: 'Action',
      header: () => <div className='text-center'>Action</div>,
      accessorFn: row => row.id,
      cell: (row: any) => (
        <div className='w-full flex justify-center gap-4 my-1.5' >
          <AssigningRole id={row.getValue()} currentRole={row.row.original.roleId} refetch={refetch} />
          <Button
            name="Assign"
          />
        </div>
      )
    },
  ]


  const table = useReactTable({
    data: usersData,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    }
  })

  return (
    <>
      <div className='w-full flex'>
        <div className='w-[100%] sm:w-[70%] min-h-[600px] mx-auto mt-10 p-5 border border-primaryGrey shadow rounded-[10px]'>
          {!data ? (
            <div className='capitalize flex flex-col items-center w-full h-full font-bold text-gray-400 text-3xl'>
              <img src='/empty.avif' alt="Not found" />
              Users not found
            </div>
          ) : (
            <>
              <h1 className='font-bold text-[20px] flex gap-1'>Users:<span className='text-primaryBlue hidden sm:block'> {Object.keys(usersData).length}</span></h1>
              <div className='w-[100%] sm:w-[80%] m-auto mt-9 w-full'>
                {isLoading ? (
                  <div className='flex w-full min-h-[400px] justify-center items-center'>
                    <div className="border-t-4 border-b-4 border-black rounded-full w-10 h-10 animate-spin m-auto"></div>
                  </div>
                ) : (
                  <>
                    <table className='text-black border-t-1 text-left w-[100%] h-[300px] border-spacing-4'>
                      <thead className='text-[20px]'>
                        {table.getHeaderGroups().map(headerGroup =>
                        (<tr key={headerGroup.id}>
                          {
                            headerGroup.headers.map(header =>
                              <th key={header.id} className='border-b'>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              </th>
                            )
                          }
                        </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map(row => (
                          <tr key={row.id} className='border-b indent-0'>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='flex gap-2 w-full justify-center mt-5 py-5 cursor-pointer'>
                      < div className='flex gap-3' >
                        <BackButton handle={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()} />
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        < BackButton handle={() => table.nextPage()} isDisabled={!table.getCanNextPage()} rotate />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div >
      </div >
    </>
  );
};

export default UsersPageAdmin;
