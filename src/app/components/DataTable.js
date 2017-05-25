import React, { PureComponent }  from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import TextField from 'react-md/lib/TextFields';
import Card from 'react-md/lib/Cards/Card';
import Button from 'react-md/lib/Buttons/Button';

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

		this.handlePagination      = this.handlePagination.bind(this);
		this.handleColumnSort      = this.handleColumnSort.bind(this);
		this.constructActionButton = this.constructActionButton.bind(this);
		this.handleSearch          = this.handleSearch.bind(this);
	}

	handlePagination(newStart, rowsPerPage, currentPage) {
    this.props.handlePagination(newStart, rowsPerPage, currentPage);
  }

  handleColumnSort(data, ctx) {
	  const { key, sortable, sort } = data;
	  let sortData = { key, sortable, sort };
	  this.props.handleColumnSort(sortData);
  }

  handleSearch(data, ctx) {
	  this.props.handleSearch(data);
  }

  constructActionButton(col, c, item) {
    switch (col.type) {
      case 'button':
        return (<TableColumn
          key={`data-row-col-${c}-action`}
          className='md-data-table-actions'
          style={{padding: '0 !important'}}>
          {
            col.obj.map((_obj, _index) => {
                if (item.status && item.status === 'Inactive' && _obj.text === 'Switch') {
                  return (<Button
                    icon
                    disabled
                    tooltipLabel=''
                    key={`data-row-col-${_index}-action-button`}
                  >{_obj.icon}</Button>)
                }
                return (<Button
                  icon
                  primary={_obj.primary}
                  iconClassName={_obj.class}
                  tooltipLabel={_obj.text}
                  tooltipPosition='bottom'
                  key={`data-row-col-${_index}-action-button`}
                  onClick={_obj.handler.bind(this, item, _obj.text)}>{_obj.icon}</Button>)
              }
            )
          }
        </TableColumn>);
      default:
        return null
    }
  }

	render() {
    const { header, data, tableId, count, isFetching, page, rowsPerPage, search } = this.props;
	  const tableHeader = header.map((header, headerIndex) => (
        <TableColumn
          onClick={this.handleColumnSort.bind(this, header)}
          key={`table-header-${headerIndex}-${tableId}`}
          sorted={header.sortable}
        >
          {header.title}
        </TableColumn>
    ));

		const tableRows = data.map((rowItem, rowIndex) => (
			<TableRow key={`${tableId}-${rowIndex}`}>
        {
          header.map((item, itemIndex) => {
            return item.type ?
              this.constructActionButton(item, itemIndex, rowItem)
              :
              <TableColumn key={`row-item-${itemIndex}`}>{rowItem[item.key]}</TableColumn>
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
              value={search}
              onChange={this.handleSearch}
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
              plain={true}
              baseId='table_id'
            >
            <TableHeader>
              <TableRow
                autoAdjust={false}>
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
