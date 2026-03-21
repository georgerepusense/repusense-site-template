import { getClientData } from '@/lib/repusense'
import BarberTemplate from '@/templates/barber/page'
import DivingTemplate from '@/templates/diving/page'

export default async function Home() {
  const client = await getClientData()

  switch (client.business_type) {
    case 'Barber Shop':
      return <BarberTemplate client={client} />
    case 'Diving':
    case 'Κατάδυση':
      return <DivingTemplate client={client} />
    default:
      return <BarberTemplate client={client} />
  }
}
