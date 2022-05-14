import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";

const App: React.FC = () => {
	const [tasks, setTasks] = useState([{ id: "", title: "" }]);
	useEffect(() => {
		const unSub = db.collection("tasks").onSnapshot((snapshot) => {
			setTasks(
				snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
			);
		});
		return () => unSub();
	}, []);

	return (
		<div className="h-screen">
			{tasks.map((task) => (
				<h3>{task.title}</h3>
			))}
		</div>
	);
};

export default App;
