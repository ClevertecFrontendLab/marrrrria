import { Layout } from '../../components/layout'
import { LayoutDocument } from '../../components/layout-document'
import { contractData } from '../../data/contract-data'

export function ContractPage() {

  const contractPageContent = <LayoutDocument data={contractData} label="Договор оферты"/>

    return (
        <Layout content={contractPageContent}/>
    )
}
