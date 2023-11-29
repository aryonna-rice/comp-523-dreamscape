import * as React from 'react';
import Table from './Table'
import AddUser from './AddUser'

export default function AllData() {
  return (<>

    <div className="table-container">
        <h1>All Data</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Table />
          <AddUser/>
        </div>
    </div>
    </>
  );
}