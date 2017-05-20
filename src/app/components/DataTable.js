import React, { PureComponent }  from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import Card from 'react-md/lib/Cards/Card';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';
// import Button from 'react-md/lib/Buttons/Button';
// import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const movies = [{
	"id": 1,
	"title": "Grass-roots zero defect hardware",
	"year": "11/21/2016"
}, {
	"id": 2,
	"title": "Seamless systematic structure",
	"year": "5/16/2017"
}, {
	"id": 3,
	"title": "Multi-layered static internet solution",
	"year": "2/14/2017"
}, {
	"id": 4,
	"title": "Operative asynchronous capability",
	"year": "1/27/2017"
}, {
	"id": 5,
	"title": "Intuitive full-range flexibility",
	"year": "5/5/2017"
}, {
	"id": 6,
	"title": "Proactive 5th generation encryption",
	"year": "10/24/2016"
}, {
	"id": 7,
	"title": "User-centric optimal open system",
	"year": "4/30/2017"
}, {
	"id": 8,
	"title": "Phased zero administration moderator",
	"year": "6/8/2016"
}, {
	"id": 9,
	"title": "Synergized well-modulated knowledge base",
	"year": "5/15/2017"
}, {
	"id": 10,
	"title": "Pre-emptive bi-directional hardware",
	"year": "6/1/2016"
}];

class ReactDataTable extends PureComponent {
	constructor (props) {
		super(props);

		this._handlePagination = this._handlePagination.bind(this);
	}

	_handlePagination() {

	}

	render() {
		const rows = movies.map(({ title, year, id }) => (
			<TableRow key={id}>
				<TableColumn>{title}</TableColumn>
				<TableColumn numeric>{year}</TableColumn>
				<TableColumn>{title}</TableColumn>
			</TableRow>
		));
		return (
			<Card tableCard style={{margin: "1em"}}>
				<DataTable
					baseId='table_id'
				>
					<TableHeader>
						<TableRow>
							<TableColumn
								tooltipLabel="The movie's title"
							>
								Title
							</TableColumn>
							<TableColumn
								numeric
								tooltipLabel="The year the movie was released"
							>
								Year
							</TableColumn>
							<TableColumn className="prevent-grow">
								<IconSeparator label="Comments" iconBefore>
									<FontIcon>chat</FontIcon>
								</IconSeparator>
							</TableColumn>
						</TableRow>
					</TableHeader>
					<TableBody>{rows}</TableBody>
					<TablePagination
						onPagination={this._handlePagination}
						rows={10}
						rowsPerPageItems={[10, 50, 100, 150, 250, 500]}
						page={1}
						rowsPerPage={10}
					/>
				</DataTable>
			</Card>
		);
	}
}

export default ReactDataTable;