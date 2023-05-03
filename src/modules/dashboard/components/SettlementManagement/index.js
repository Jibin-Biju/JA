import React, { Fragment } from "react";
import BalanceRow from "./subcomponents/BalanceRow";
import SettlementManagementTable from "./subcomponents/Table";

function SettlementManagement() {
  return (
    <Fragment>
      <BalanceRow />
      <SettlementManagementTable />
    </Fragment>
  );
}

export default SettlementManagement;
