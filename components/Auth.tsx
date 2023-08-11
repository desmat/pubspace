'use client'

import ClientOnly from '@/components/ClientOnly';
import { doAuth } from "../services/auth";
// note: https://stackoverflow.com/questions/75438048/cant-resolve-encoding-module-error-while-using-nextjs-13-supabase

function DoAuth() {
  console.log(`>> components.DoAuth.render()`);
  doAuth();

  return null;
}

export default function Auth() {
  console.log(`>> components.Auth.render()`);
  return (
    <ClientOnly>
      <DoAuth />
    </ClientOnly>
  );
}
