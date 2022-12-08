import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScheduleTable from '../ScheduleTable/ScheduleTable';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SchedulePagination from '../Pagination/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import Stack from '@mui/material/Stack';

import './style.css';

function SearchStack({ query, setQuery }) {
	return (
		<div className="search-bar">
			<Stack direction="row" spacing={2}>
				<Search query={query} setQuery={setQuery} />
				<DateFilter query={query} setQuery={setQuery} />
				<TimeFilter query={query} setQuery={setQuery} />
			</Stack>
		</div>
	);
}

function DateFilter({ query, setQuery }) {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					label="Start Date"
					inputFormat="YYYY/MM/DD"
					value={query.start_date}
					onChange={(newValue) => {
						setQuery({ ...query, offset: 0, start_date: newValue });
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
				<DatePicker
					label="End Date"
					inputFormat="YYYY/MM/DD"
					value={query.end_date}
					onChange={(newValue) => {
						setQuery({ ...query, offset: 0, end_date: newValue });
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</>
	);
}

function TimeFilter({ query, setQuery }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<TimePicker
				label="Start Time"
				value={query.start_time}
				onChange={(newValue) => {
					setQuery({ ...query, offset: 0, start_time: newValue });
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
			<TimePicker
				label="End Time"
				value={query.end_time}
				onChange={(newValue) => {
					setQuery({ ...query, offset: 0, end_time: newValue });
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
}
const Search = ({ query, setQuery }) => {
	return (
		<TextField
			className="search"
			id="outlined-basic"
			label="Name, Coach, Category..."
			variant="outlined"
			onChange={(event) => {
				setQuery({ ...query, offset: 0, search: event.target.value });
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
};

const StudioSchedule = () => {
	const { studioID } = useParams();
	const [classes, setClasses] = useState([]);
	const [query, setQuery] = useState({
		offset: 0,
		search: '',
		start_date: null,
		end_date: null,
		start_time: null,
		end_time: null,
	});
	const [totalItem, setTotalItem] = useState(1);
	const [reload, setReload] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		let start_date_query = '';
		let end_date_query = '';
		let start_time_query = '';
		let end_time_query = '';

		if (query.start_date) {
			let start_date = new Date(query.start_date);
			if (start_date != 'Invalid Date')
				start_date_query = `${start_date.getFullYear()}-${
					start_date.getMonth() + 1
				}-${start_date.getDate()}`;
		}
		if (query.end_date) {
			let end_date = new Date(query.end_date);
			if (end_date != 'Invalid Date')
				end_date_query = `${end_date.getFullYear()}-${
					end_date.getMonth() + 1
				}-${end_date.getDate()}`;
		}
		if (query.start_time) {
			let start_time = new Date(query.start_time);
			if (start_time != 'Invalid Date')
				start_time_query = `${start_time.getHours()}:${start_time.getMinutes()}`;
		}
		if (query.end_time) {
			let end_time = new Date(query.end_time);
			if (end_time != 'Invalid Date')
				end_time_query = `${end_time.getHours()}:${end_time.getMinutes()}`;
		}

		const url = `http://127.0.0.1:8000/studios/${studioID}/classes?search=${
			query.search
		}&offset=${query.offset}${
			start_date_query ? `&start_date=${start_date_query}` : ''
		}${end_date_query ? `&end_date=${end_date_query}` : ''}${
			start_time_query ? `&start_time=${start_time_query}` : ''
		}${end_time_query ? `&end_time=${end_time_query}` : ''}`;

		fetch(url)
			.then((response) => {
				if (response.status === 404) {
					navigate('/studios');
				}
				return response.json();
			})
			.then((json) => {
				setClasses(json.results);
				setTotalItem(json.count);
			});
	}, [studioID, query, reload]);

	return (
		<>
			<h1 className="schedule-title">Class Schedule</h1>
			{classes.length === 0 ? (
				<h2 className="no-class-messages">
					Sorry, there are no classes available in this studio.
				</h2>
			) : null}

			<SearchStack query={query} setQuery={setQuery} />
			<ScheduleTable
				className="schedule-table"
				classes={classes}
				isUser={false}
				isHitory={true}
				reload={reload}
				setReload={setReload}
			/>
			<SchedulePagination
				lastpage={Math.ceil(totalItem / 10)}
				query={query}
				setQuery={setQuery}
			/>
		</>
	);
};

export default StudioSchedule;
