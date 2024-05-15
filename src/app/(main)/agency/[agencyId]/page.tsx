import React from 'react'


interface AgencyPageProps {
    params: {
        agencyId: string
    }
}

const AgencyPage = ({ params }: AgencyPageProps) => {
  return (
    <div>{params.agencyId}</div>
  )
}

export default AgencyPage