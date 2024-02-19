import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { hasPermission } from '@/utils/utils'
import { Loader2 } from 'lucide-react'
import AddTaskForm from './AddTaskForm'

interface CustomDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	isTaskTable?: boolean
	status: {
		isFetching: boolean
		isLoading: boolean
	}
}

export function CustomDataTable<TData, TValue>({
	data,
	columns,
	isTaskTable = false,
	status,
}: CustomDataTableProps<TData, TValue>) {
	// react table related state
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	// react table config
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),

		state: {
			sorting,
			columnFilters,
		},
	})

	return (
		<>
			<div className="flex items-center py-4 justify-between  ">
				{/* filter input */}
				<Input
					placeholder={`Filter by ${table.getAllColumns()[0].id}`}
					value={(table.getColumn(table.getAllColumns()[0].id)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(table.getAllColumns()[0].id)?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>

				{isTaskTable && hasPermission('CREATE_TASK') && (
					<Dialog>
						{/* add task pop up form */}
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-2xl">Create task</DialogTitle>
								<DialogDescription>Fill in the form below to create a new Task.</DialogDescription>
								<AddTaskForm />
							</DialogHeader>
						</DialogContent>
						<DialogTrigger asChild>
							<Button>Add task</Button>
						</DialogTrigger>
					</Dialog>
				)}
			</div>
			<Table className="rounded-md border ">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="max-h-[200x] overflow-y-scroll">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow className="!h-6">
							<TableCell colSpan={columns?.length} className="h-24 text-center">
								{status.isLoading || status.isFetching ? (
									<Loader2 className="animate-spin" size={30} />
								) : (
									'No results.'
								)}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={columns?.length}>
							<div className="flex justify-between">
								<Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
									Previous
								</Button>

								<Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
									Next
								</Button>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	)
}
export default CustomDataTable
