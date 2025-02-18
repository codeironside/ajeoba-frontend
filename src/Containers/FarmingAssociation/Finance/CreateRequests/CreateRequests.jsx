import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateLayout from "../../../../Components/CreateLayout/CreateLayout";
import { typeOfRequestOptions } from "../../../../Constant/AppConstant";
import CreateRequest from "./CreateRequest/CreateRequest";

const CreateRequests = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const [requestType, setRequestType] = useState(
    activeTab === "1"
      ? typeOfRequestOptions[1].value
      : typeOfRequestOptions[0].value
  );

  const requestTypeSelectHandler = (option) => {
    setRequestType(option);
  };
  return (
    <CreateLayout
      displayText="Create Request"
      options={typeOfRequestOptions}
      defaultValue={requestType}
      selectHandler={requestTypeSelectHandler}
      backNavigation={`/finance?activeTab=${activeTab}`}
    >
      <CreateRequest requestType={requestType} />
    </CreateLayout>
  );
};

export default CreateRequests;
