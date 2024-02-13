import { ColumnDef } from '@tanstack/react-table'

export type Task = {
	_id: string
	title: string
	description: string
	author: string
	priority: 'Low' | 'Normal' | 'Urgent'
	status: 'To Do' | 'In Progress' | 'Completed' | 'Canceled'
	deadline: string
}

export interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export type User = {
	_id: string
	username: string
	role: {
		_id: string
		name: string
		permissions: Permission[]
	}
}

export type Author = {
	_id: string
	username: string
	email: string
}

export interface Role {
	_id: string
	name: string
	permissions: Permission[]
}

export interface Permission {
	_id: string
	name: string
}
