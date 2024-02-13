import { DialogTitle } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from './ui/dialog'
import { DropdownMenuItem } from './ui/dropdown-menu'
import React from 'react'

type ModalProps = {
	children?: React.ReactNode
	dialogTrigger: React.ReactNode
	title?: string
	description?: string
	footerContent?: React.ReactNode
}
const Modal = ({ title = '', description = '', children = <></>, dialogTrigger, footerContent }: ModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild className="cursor-pointer">
				{dialogTrigger}
			</DialogTrigger>
			<DialogContent className="p-8">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold ">{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>{footerContent}</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
export default Modal
