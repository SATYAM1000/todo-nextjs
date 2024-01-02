/** @format */
"use client";
import { Button } from "@/components/Button";
import Todo from "@/components/Todo";
import Image from "next/image";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface sampleType {
	task: string;
	isChecked: true | false;
}

const sampleTodos: sampleType[] = [
	{
		task: "Buy Groceries",
		isChecked: true,
	},
	{
		task: "Clean the house",
		isChecked: false,
	},
	{
		task: "Finish work report",
		isChecked: false,
	},
	{
		task: "Exercise for 30 minutes",
		isChecked: true,
	},
];

export default function Home() {
	const [task, setTask] = useState("");
	const [todos, setTodos] = useState(sampleTodos);
	const [animationParent] = useAutoAnimate();

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (task.trim() === "") {
			alert("Task is empty!!");
			return;
		} else if (todos.find((mapTask) => mapTask.task === task)) {
			alert("Task alreasy exist");
			return;
		}
		setTodos([...todos, { task: task, isChecked: false }]);
		setTask("");
	}

	function handleToggleTask(task: sampleType) {
		const upDatedTodos = todos.map((d) => {
			if (task === d) {
				return { ...d, isChecked: !d.isChecked };
			}
			return d;
		});

		setTodos(upDatedTodos);
	}

	function handleRemoveTask(task: sampleType) {
		const updatedTodos = todos.filter((d) => {
			if (task === d) {
				return false;
			}
			return true;
		});

		setTodos(updatedTodos);
	}

	const unCheckedTodos = todos.filter((d) => !d.isChecked);
	const checkedTodos = todos.filter((d) => d.isChecked);

	return (
		<main className=" flex min-h-screen flex-col items-center justify-between py-10 sm:p-24 ">
			<section className="max-w-[800px] w-full p-1">
				<form className="flex gap-2 mb-4" onSubmit={handleFormSubmit}>
					<input
						type="text"
						className="border border-gray-300 rounded h-11 px-4 w-full focus:outline-none focus:border-green-400 "
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<Button>Add Todo</Button>
				</form>
				<div ref={animationParent} className="flex flex-col gap-4 ">
					{todos.map((data, index) => {
						if (!data.isChecked) {
							return (
								<Todo
									onToggleTask={() => handleToggleTask(data)}
									key={index}
									task={data.task}
									isChecked={data.isChecked}
									removeTask={() => handleRemoveTask(data)}
								/>
							);
						}
					})}

					{unCheckedTodos.length > 0 && checkedTodos.length > 0 && (
						<div className="w-[95%] mx-auto h-[0.5px] rounded-full bg-gray-200 "></div>
					)}

					{todos.map((data, index) => {
						if (data.isChecked) {
							return (
								<Todo
									onToggleTask={() => handleToggleTask(data)}
									key={index}
									task={data.task}
									isChecked={data.isChecked}
									removeTask={() => handleRemoveTask(data)}
								/>
							);
						}
					})}
				</div>
			</section>
		</main>
	);
}
