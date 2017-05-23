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

class ReactDataTable extends PureComponent {
	constructor (props) {
		super(props);

		this._handlePagination = this._handlePagination.bind(this);
	}

	_handlePagination() {

	}

	render() {
    const { header, data, tableId } = this.props;
	  const tableHeader = header.map((header, headerIndex) => (
        <TableColumn
          key={`table-header-${headerIndex}`}
        >
          {header.title}
        </TableColumn>
    ));

		const tableRows = data.map(({ first_name, last_name, id, email, sex, phone_number }) => (
			<TableRow key={`${tableId}-${id}`}>
				<TableColumn>{first_name}</TableColumn>
				<TableColumn>{last_name}</TableColumn>
				<TableColumn>{email}</TableColumn>
				<TableColumn>{sex}</TableColumn>
				<TableColumn>{phone_number}</TableColumn>
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
          plain={false}
					baseId='table_id'
				>
					<TableHeader>
						<TableRow>
              {tableHeader}
						</TableRow>
					</TableHeader>
					<TableBody>
            {tableRows}
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
