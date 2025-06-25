import { auth } from '@/auth'
import { Advantages, Community, Contact, Education, Feedbacks, Hero, Markets, Stats, Team } from '@/components/main'

export default async function Home() {
  const session = await auth()
  return (
    <>
      <Hero isLoggedIn={!!session?.user} />
      <Stats />
      <Team />
      <Education />
      <Markets />
      <Advantages />
      <Feedbacks />
      <Community />
      <Contact />
    </>
  )
}
