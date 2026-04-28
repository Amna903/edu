import { requireAppAuth } from '@/lib/auth/server-session';
import { redirect } from 'next/navigation';
import SupportPortal from '@/components/features/support/SupportPortal';

export default async function SupportPage() {
  const auth = await requireAppAuth();
  if (auth.role === 'admin') {
    redirect('/dashboard/admin/support');
  }
  return <SupportPortal />;
}
