import React from 'react';
import { ComponentForList } from 'shared/getComponents';

const getServiceName = sink => {
  if (typeof sink !== 'string') return '';

  const startIndex = sink?.lastIndexOf('/') + 1;
  const nextDot = sink?.indexOf('.');
  return sink?.substring(startIndex, nextDot);
};

export function SubscriptionsList({ serviceName, namespace }) {
  const params = {
    hasDetailsView: true,
    fixedPath: true,
    resourceUrl: `/apis/eventing.kyma-project.io/v1alpha1/namespaces/${namespace}/subscriptions`,
    resourceType: 'subscriptions',
    namespace,
    isCompact: true,
    showTitle: true,
    createFormProps: { serviceName },
    filter: subscription => {
      return getServiceName(subscription.spec.sink) === serviceName;
    },
  };

  return (
    <ComponentForList
      name="subscriptionsList"
      params={params}
      key="subscriptions"
      nameForCreate="SubscriptionsCreate"
    />
  );
}