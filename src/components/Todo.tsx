/** @format */

import { cn } from "@/lib/utils";
import React from "react";
import { MdDelete } from "react-icons/md";

type Props = {
	onToggleTask: () => void;
	removeTask: () => void;
	isChecked: boolean;
	task: string;
};

const Todo = ({isChecked,task,onToggleTask,removeTask}: Props) => {
	return (
		<div className="flex justify-between gap-4 ">
			<button onClick={onToggleTask} className="flex items-start gap-1 p-2 border rounded ">
				<input checked={isChecked} type="checkbox" className="mt-1.5" />
				<label className={cn("cursor-pointer",isChecked && 'line-through')}>
					{task}
				</label>
			</button>
			<MdDelete onClick={removeTask} className="text-2xl text-red-400 cursor-pointer" />
		</div>
	);
};

export default Todo;
