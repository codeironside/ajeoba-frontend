import React, { useState } from "react";

import SelectSubscription from "./SelectSubscription";
import RandomSubscription from "./RandomSubscription";

import { subscriptionMethodOptions } from "../../../../Constant/AppConstant";
import CreateLayout from "../../../../Components/CreateLayout/CreateLayout";

const SelectedSubDashboard = () => {
  localStorage.removeItem("userSubTypeData");
  const [selectedSubscriptionOption, setSelectedSubscriptionOption] = useState(
    subscriptionMethodOptions[0].value
  );

  const handleSubscriptionOptionChange = (option) => {
    setSelectedSubscriptionOption(option);
  };

  return (
    <CreateLayout
      displayText="Activate Subscription"
      options={subscriptionMethodOptions}
      defaultValue={selectedSubscriptionOption}
      selectHandler={handleSubscriptionOptionChange}
      backNavigation="/subscriptions"
    >
      {selectedSubscriptionOption === "selectfarmer" ? (
        <SelectSubscription
          selectedSubscriptionOption={selectedSubscriptionOption}
        />
      ) : (
        <RandomSubscription />
      )}
    </CreateLayout>
  );
};

export default SelectedSubDashboard;
