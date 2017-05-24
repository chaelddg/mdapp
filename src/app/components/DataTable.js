import React, { PureComponent }  from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import TextField from 'react-md/lib/TextFields';
import Card from 'react-md/lib/Cards/Card';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TablePagination from 'react-md/lib/DataTables/TablePagination';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';

class ReactDataTable extends PureComponent {
	constructor (props) {
		super(props);

		this.handlePagination = this.handlePagination.bind(this);
	}

	handlePagination(newStart, rowsPerPage, currentPage) {
    this.props.handlePagination(newStart, rowsPerPage, '', '', currentPage);
  }

	render() {
    const { header, data, tableId, count, isFetching, page, rowsPerPage } = this.props;
	  const tableHeader = header.map((header, headerIndex) => (
        <TableColumn
          key={`table-header-${headerIndex}-${tableId}`}
          sorted={true}
        >
          {header.title}
        </TableColumn>
    ));

		const tableRows = data.map((rowItem, rowIndex) => (
			<TableRow key={`${tableId}-${rowIndex}`}>
        {
          header.map((item, itemIndex) => {
            return <TableColumn key={`row-item-${itemIndex}`}>{rowItem[item.key]}</TableColumn>
          })
        }
			</TableRow>
		));

		return (
			<Card>
        <TableCardHeader
          title="Nutrition"
          visible={false}
          children={[
            <TextField
              leftIcon={<FontIcon>search</FontIcon>}
              id={`table-search-${tableId}`}
              label='Search'
              style={{marginRight: '10px'}}
              className={`md-cell--3 ${this.props.className}`}
              inputClassName='md-text-field--toolbar'
            />
          ]}
        >
        </TableCardHeader>
        {
          isFetching ?
            <h3 style={{textAlign: 'center', padding: '2em'}}>Fetching ...</h3>
            :
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
              onPagination={this.handlePagination}
              rowsPerPageItems={[10, 50, 100, 150, 250, 500]}
              rows={count}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </DataTable>
        }
			</Card>
		);
	}
}

export default ReactDataTable;
