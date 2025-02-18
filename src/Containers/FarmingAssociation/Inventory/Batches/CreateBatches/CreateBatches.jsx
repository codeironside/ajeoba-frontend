import React, { useState } from "react";
import CreateBatch from "./CreateBatch/CreateBatch";
import { typeOfBatchOptions } from "../../../../../Constant/AppConstant";
import CreateLayout from "../../../../../Components/CreateLayout/CreateLayout";

const CreateBatches = () => {
  const [batchType, setBatchType] = useState(typeOfBatchOptions[0].value);

  const batchTypeSelectHandler = (option) => {
    setBatchType(option);
  };

  return (
    <CreateLayout
      displayText="Create Batch"
      options={typeOfBatchOptions}
      defaultValue={batchType}
      selectHandler={batchTypeSelectHandler}
      backNavigation="/inventory?activeTab=1"
    >
      <CreateBatch batchType={batchType} />
    </CreateLayout>
  );
};

export default CreateBatches;
