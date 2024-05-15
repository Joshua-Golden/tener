import React from 'react'

import { addOnProducts, pricingCards } from '@/lib/constants'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db';
import PricingCard from './components/pricing-card';
import SubscriptionHelper from './components/subscription-helper';
import { BillingClient } from './components/client';
import { BillingColumn } from './components/columns';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/global/heading';
import { Badge } from '@/components/ui/badge';

interface AgencyBillingProps {
  params: { agencyId: string }
}

const AgencyBilling = async ({ params }: AgencyBillingProps) => {
  const addOns = await stripe.products.list({
    ids: addOnProducts.map((product: any) => product.id),
    expand: ['data.default_price'],
  })

  const agencySubscription = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    select: {
      customerId: true,
      Subscription: true,
    },
  })

  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  })

  const currentPlanDetails = pricingCards.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId
  )

  const charges = await stripe.charges.list({
    limit: 50,
    customer: agencySubscription?.customerId,
  })

  const allCharges = [
    ...charges.data.map((charge) => ({
      description: charge.description,
      id: charge.id,
      date: `${new Date(charge.created * 1000).toLocaleTimeString()} ${new Date(
        charge.created * 1000
      ).toLocaleDateString()}`,
      status: 'Paid',
      amount: `$${charge.amount / 100}`,
    })),
  ]

  const formattedData: BillingColumn[] = allCharges.map((item: any) => ({
    invoiceId: item.id,
    description: item.description,
    date: item.date,
    status: item.status,
    amount: item.amount,
  }))

  return (
    <>
      <SubscriptionHelper
        prices={prices.data}
        customerId={agencySubscription?.customerId || ''}
        planExists={agencySubscription?.Subscription?.active === true}
      />
      <Heading title='Billing' description='Manage your account billing settings' />
      <Separator className="" />
      { agencySubscription?.Subscription?.active === true ? ((
        <h2 className="text-2xl py-4">Current Plan</h2>
      )) : (
        <h2 className="text-2xl flex items-center justify-start text-left gap-2 py-4">Current Plan <Badge variant="secondary">Free Trial</Badge></h2>
      )}
      <div className="flex flex-col gap-8">
        <PricingCard
          planExists={agencySubscription?.Subscription?.active === true}
          prices={prices.data}
          customerId={agencySubscription?.customerId || ''}
          amt={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.price || '$0'
              : '$0'
          }
          buttonCta={
            agencySubscription?.Subscription?.active === true
              ? 'Change Plan'
              : 'Get Started'
          }
          highlightDescription="Want to modify your plan? You can do this here. If you have further question contact support@tener.app"
          highlightTitle="Plan Options"
          description={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.description || 'Lets get started'
              : 'Lets get started! Pick a plan that works best for you.'
          }
          duration="/ month"
          features={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.features || []
              : currentPlanDetails?.features ||
                pricingCards.find((pricing) => pricing.title === 'Starter')
                  ?.features ||
                []
          }
          title={
            agencySubscription?.Subscription?.active === true
              ? currentPlanDetails?.title || 'Starter'
              : 'Starter'
          }
        />
      </div>
      { agencySubscription?.Subscription?.active === true ? ((
        <h2 className="text-2xl py-4">Addons</h2>
      )) : (
        <h2 className="text-2xl flex items-center justify-start text-left gap-2 py-4">Addons <Badge variant="secondary">Free Trial</Badge></h2>
      )}
      <div className="flex flex-col gap-8">
        {addOns.data.map((addOn) => (
          <PricingCard
            planExists={agencySubscription?.Subscription?.active === true}
            prices={prices.data}
            customerId={agencySubscription?.customerId || ''}
            key={addOn.id}
            amt={
              //@ts-ignore
              addOn.default_price?.unit_amount
                ? //@ts-ignore
                  `$${addOn.default_price.unit_amount / 100}`
                : '$0'
            }
            buttonCta="Subscribe"
            description="Dedicated support line & teams channel for support"
            duration="/ month"
            features={[]}
            title={'24/7 priority support'}
            highlightTitle="Get support now!"
            highlightDescription="Get priority support and skip the long long with the click of a button."
          />
        ))}
      </div>
      <BillingClient data={formattedData} />
    </>
  )
}

export default AgencyBilling