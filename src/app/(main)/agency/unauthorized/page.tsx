import Unauthorized from '@/components/unauthorized'
import React from 'react'

interface AgencyUnauthorizedProps {

}

const AgencyUnauthorized = ({}: AgencyUnauthorizedProps) => {
  return (
    <div><Unauthorized /></div>
  )
}

export default AgencyUnauthorized