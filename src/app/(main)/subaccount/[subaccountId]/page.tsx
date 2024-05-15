import React from 'react'

interface SubaccountPageProps {
    params: { subaccountId: string }
}

const SubaccountPage = ({ params }: SubaccountPageProps) => {
  return (
    <div>SubaccountPage {params.subaccountId}</div>
  )
}

export default SubaccountPage