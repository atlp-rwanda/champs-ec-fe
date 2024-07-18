'use client';
import React, { useEffect, useRef, useState } from 'react';
import request from '@/utils/axios';
import {
  useQuery,
  useMutation,
  RefetchOptions,
  QueryObserverResult,
  useQueryClient,
} from '@tanstack/react-query';
import Swal from 'sweetalert2';

interface AssignRoleInterface {
  id: string;
  currentRole: string;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<any, Error>>;
}

const AssigningRole: React.FC<AssignRoleInterface> = ({
  id,
  currentRole,
  refetch,
}) => {
  const select = useRef<HTMLSelectElement | null>(null);
  const { isLoading, error, data } = useQuery<any>({
    queryKey: ['RolesList'],
    queryFn: () => request.get('/roles'),
  });
  var roles = data;

  const mutation = useMutation({
    mutationFn: (roleId: string) => {
      return request.patch(`/users/${id}/roles`, { roleId });
    },
    onError: (error) => console.log(error),
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: 'Success',
        text: 'Successfully Changed Role',
        icon: 'success',
      });
    },
  });

  const Assign = async () => {
    var role = select.current?.value as string;
    mutation.mutate(role);
  };

  return (
    <>
      {isLoading || mutation.isPending ? (
        <div>
          <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-5 h-5 animate-spin m-auto"></div>
        </div>
      ) : (
        <select
          ref={select}
          value={currentRole}
          className="capitalize focus:outline-none border border-blue-500 text-center text-black shadow outline-none text-[15px]  font-medium  border-2 focus:ring-black
              focus:border-black w-[15vh] p-[5px] cursor-pointer  py-1.5 "
          onChange={Assign}
        >
          {Array.isArray(roles) &&
            roles.map((value, index) => (
              <option
                key={index}
                value={value.id}
                className="option capitalize h-[30px] bg-primaryGrey focus:bg-primaryGrey text-black px-3 py-2"
              >
                <span>Role:{value.name}</span>
              </option>
            ))}
        </select>
      )}
    </>
  );
};

export default AssigningRole;
