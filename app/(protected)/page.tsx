'use client';

import { useSettings } from '@/providers/settings-provider';
import { Demo1LightSidebarPage } from './components/demo1';


export default function Page() {
  const { settings } = useSettings();

  if (settings?.layout === 'demo1') {
    return <Demo1LightSidebarPage />;
  } 
//   else if (settings?.layout === 'demo2') {
//     return <Demo2Page />;
//   }
}
