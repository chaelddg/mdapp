import React, { PureComponent }  from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import Card from 'react-md/lib/Cards/Card';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';
// import CircularProgress from 'react-md/lib/Progress/CircularProgress';
// import Button from 'react-md/lib/Buttons/Button';

const movies = [
  {
    "id": 1,
    "title": "Grass-roots zero defect hardware",
    "year": "11/21/2016"
  },
  {
    "id": 2,
    "title": "Seamless systematic structure",
    "year": "5/16/2017"
  },
  {
    "id": 3,
    "title": "Multi-layered static internet solution",
    "year": "2/14/2017"
  },
  {
    "id": 4,
    "title": "Operative asynchronous capability",
    "year": "1/27/2017"
  },
  {
    "id": 5,
    "title": "Intuitive full-range flexibility",
    "year": "5/5/2017"
  },
  {
    "id": 6,
    "title": "Proactive 5th generation encryption",
    "year": "10/24/2016"
  },
  {
    "id": 7,
    "title": "User-centric optimal open system",
    "year": "4/30/2017"
  },
  {
    "id": 8,
    "title": "Phased zero administration moderator",
    "year": "6/8/2016"
  },
  {
    "id": 9,
    "title": "Synergized well-modulated knowledge base",
    "year": "5/15/2017"
  },
  {
    "id": 10,
    "title": "Pre-emptive bi-directional hardware",
    "year": "6/1/2016"
  }
];

class ReactDataTable extends PureComponent {
	constructor (props) {
		super(props);

		this._handlePagination = this._handlePagination.bind(this);
	}

	_handlePagination() {

	}

	render() {

	  const headers = [{title: 'Title', label: 'The movie\'s title'},{title: 'Year', label: 'The movie\'s year'}, {title: 'Comment', label: 'The movie\'s comment'}].map((header, headerIndex) => (
        <TableColumn
          key={`table-header-${headerIndex}`}
        >
          {header.title}
        </TableColumn>
    ));

		const rows = movies.map(({ title, year, id }) => (
			<TableRow key={id}>
				<TableColumn>{title}</TableColumn>
				<TableColumn numeric>{year}</TableColumn>
				<TableColumn>{title}</TableColumn>
			</TableRow>
		));
		return (
			<Card>
        <TableCardHeader
          title="Nutrition"
          visible={false}
        >
        </TableCardHeader>
				<DataTable
          plain={true}
					baseId='table_id'
				>
					<TableHeader>
						<TableRow>
              {headers}
						</TableRow>
					</TableHeader>
					<TableBody>
            {rows}
          </TableBody>
					<TablePagination
						onPagination={this._handlePagination}
						rows={10}
					/>
				</DataTable>
			</Card>
		);
	}
}

export default ReactDataTable;
