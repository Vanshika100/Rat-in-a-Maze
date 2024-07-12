import React, { useState } from 'react';

// Configurable constants
const MAZE_SIZE = { min: 3, max: 8, step: 1 };
const SPEED = { min: 50, max: 500, step: 50 };

export default function InputForm({ updateMaze, updateMazeSize, startVis, setSpeed }) {
	const [isRunning, setIsRunning] = useState(false);
	const [inputMazeSize, setInputMazeSize] = useState(5);
	const [inputSpeed, setInputSpeed] = useState(200);

	const handleMazeSizeChange = (e) => {
		const newSize = Math.max(MAZE_SIZE.min, Math.min(MAZE_SIZE.max, Number(e.target.value)));
		setInputMazeSize(newSize);
		updateMazeSize(newSize);
		updateMaze(prev => Array.from({ length: newSize }, () => Array(newSize).fill(0)));
	};

	const handleSpeedChange = (e) => {
		const newSpeed = Number(e.target.value);
		setSpeed(newSpeed);
		setInputSpeed(newSpeed);
	};

	const handleStartClick = async () => {
		setIsRunning(true);
		await startVis();
	};

	const handleReloadClick = () => window.location.reload();

	return (
		<div className="input-form">
			<div className="form-item">
				<label>Enter the maze size:</label>
				<input
					type="number"
					step={MAZE_SIZE.step}
					min={MAZE_SIZE.min}
					max={MAZE_SIZE.max}
					value={inputMazeSize}
					onChange={handleMazeSizeChange}
					disabled={isRunning}
				/>
				<span>{inputMazeSize} x {inputMazeSize}</span>
			</div>

			<div className="form-item">
				<label>Speed:</label>
				<input
					type="range"
					step={SPEED.step}
					min={SPEED.min}
					max={SPEED.max}
					value={inputSpeed}
					onChange={handleSpeedChange}
					disabled={isRunning}
				/>
				<span>{inputSpeed} ms</span>
			</div>

			<div className="form-item">
				<button
					className="btn"
					onClick={handleStartClick}
					disabled={isRunning}
				>
					Start
				</button>

				<button className="btn" onClick={handleReloadClick}>
					Reload
				</button>
			</div>
		</div>
	);
}
