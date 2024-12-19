import { PermissionList } from './permission-list';

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    permission: PermissionList;
};

export type Bank = {
    _id: string;
    name: string;
    branch: string;
    accountNumber: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
};

export type Inventory = {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    supplier: string;
    createdAt: string;
    updatedAt: string;
};