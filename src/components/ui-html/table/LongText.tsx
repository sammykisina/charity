import React from "react";

const LongText = ({ value }: { value: string }) => {
  const description_length = value.length;

  return (
    <div>
      {description_length > value.substring(0, 30).length ? (
        <p>{value.substring(0, 35)}...</p>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};

export default LongText;
