import React from "react";
import { format } from "date-fns";

const DateCell = ({ value }: { value: Date }) => {
  return <span>{format(value, "EE, MMM d, yyy")}</span>;
};

export default DateCell;
