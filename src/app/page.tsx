
import { db } from '@/server/db';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


export default async function HomePage() {
  const { userId , redirectToSignIn } = await auth(); 
  if (!userId) return redirectToSignIn()
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if(!user) {
    redirect('/CompleteAccount')
  }else {
    redirect(`/${user.role.toLocaleLowerCase()}`)
  }
  return (
    <main>
      {/* <p>Welcome, User ID: {userId}</p> */}
    </main>
  );
}