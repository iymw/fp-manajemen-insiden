'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { ApiReturn } from '@/types/api';
import { Inventory } from '@/types/entities/user';
import clsxm from '@/lib/clsxm';
import { getToken } from '@/lib/cookies';

export default withAuth(DashboardInventoryPage, ['authed']);

function DashboardInventoryPage() {
    const tokens = getToken();
    const {
        data: inventoryResponse,
        isLoading
    } = useQuery<ApiReturn<Inventory[]>>({ queryKey: ['/inventory'] });

    const columns: ColumnDef<Inventory>[] = [
        {
            accessorKey: 'no',
            header: 'No',
            cell: (props) => <span>{props.row.index + 1}</span>,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (props) => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => value.includes(row.getValue(_id)),
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: (props) => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => value.includes(row.getValue(_id)),
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: (props) => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => value.includes(row.getValue(_id)),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            // @ts-expect-error - hmm
            cell: (props) => <span>{`${props.getValue().toFixed(2)}`}</span>,
            filterFn: (row, _id, value) => value.includes(row.getValue(_id)),
        },
        {
            accessorKey: 'supplier',
            header: 'Supplier',
            cell: (props) => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => value.includes(row.getValue(_id)),
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: (info) => {
                const createdAt = info.row.original.createdAt;
                if (!createdAt) {
                    return (
                        <Typography
                            as='td'
                            className={clsxm('truncate whitespace-nowrap py-3 px-10 lg:text-[16px] text-[14px]')}
                        >
                            {' '}
                        </Typography>
                    );
                } else {
                    const dateTime = createdAt.toString();
                    const date = dateTime.split('T')[0];
                    const time = dateTime.split('T')[1].split('.')[0];
                    const formattedTime = `${date} - ${time}`;

                    return (
                        <Typography
                            as='td'
                            className={clsxm('truncate whitespace-nowrap py-3 lg:text-[16px] text-[14px]')}
                        >
                            {formattedTime}
                        </Typography>
                    );
                }
            },
            filterFn: (row, _id, value) => value.includes(row.getValue(_id)),
        },
    ];

    return (
        tokens !== undefined ? (
            <DashboardLayout>
                <section className='w-full bg-typo-surface px-10 py-10 min-h-screen flex flex-col gap-4 items-start'>
                    <Typography variant='btn' font='epilogue' weight='medium'>
                        INVENTORY DASHBOARD
                    </Typography>
                    <Typography as='h5' variant='h5' font='epilogue' weight='semibold'>
                        INVENTORY Management
                    </Typography>

                    <Table
                        className='text-black'
                        data={inventoryResponse?.data ?? []}
                        columns={columns}
                        isLoading={isLoading}
                        withFilter
                        withPaginationControl
                        withPaginationCount
                    />
                </section>
            </DashboardLayout>
        ) : (
            <></>
        )
    );
}
