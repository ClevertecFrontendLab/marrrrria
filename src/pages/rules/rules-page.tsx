import { Layout } from '../../components/layout';
import { LayoutDocument } from '../../components/layout-document';
import { rules } from '../../data/rules';

export function RulesPage() {
  const rulesPageContent = <LayoutDocument data={rules} label="Правила пользования"/>

  return (
    <Layout content={rulesPageContent}/>
  )
}
