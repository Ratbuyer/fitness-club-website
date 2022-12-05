import { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnrollDialog from '../Enroll/EnrollDiaglog';
import DropDialog from '../Drop/DropDialog';
import SessionDialog from './SessionDialog';

import './style.css';

const ClassButton = ({ row, isUser, isHitory }) => {
	if (isUser) {
		return isHitory ? null : <DropDialog session={row} />;
	} else {
		return row.enrolled_num < row.classInfo.capacity ? (
			<EnrollDialog session={row} />
		) : (
			<Button variant="outlined" color="error">
				Full
			</Button>
		);
	}
};

export const KeywordsToString = (keywords) => {
	let str = '';
	for (let i = 0; i < keywords.length; i++) {
		str += keywords[i];
		if (i !== keywords.length - 1) {
			str += ' . ';
		}
	}
	str += '';
	return <>{str}</>;
};

function ScheduleTable({ classes, isUser, isHitory }) {
	const [showDialog, setShowDialog] = useState(false);
	const [session, setSession] = useState(null);

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Coach</TableCell>
							<TableCell align="center">Category</TableCell>
							<TableCell align="center">Date</TableCell>
							<TableCell align="center">Time</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{classes.map((row) => (
							<TableRow
								key={row.id}
								hover
								onClick={() => {
									setShowDialog(true);
									setSession(row);
								}}
							>
								<TableCell align="center">{row.classInfo.name}</TableCell>
								<TableCell align="center">{row.classInfo.coach}</TableCell>
								<TableCell align="center">
									{KeywordsToString(row.classInfo.keywords)}
								</TableCell>
								<TableCell align="center">{row.date}</TableCell>
								<TableCell align="center">
									{row.start_time.slice(0, -3) +
										' - ' +
										row.end_time.slice(0, -3)}
								</TableCell>
								<TableCell align="center" onClick={(e) => e.stopPropagation()}>
									<ClassButton row={row} isUser={isUser} isHitory={isHitory} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{showDialog && (
				<SessionDialog
					session={session}
					showDialog={showDialog}
					setShowDialog={setShowDialog}
					isUser={isUser}
					isHitory={isHitory}
				/>
			)}
		</>
	);
}

export default ScheduleTable;