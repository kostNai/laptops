import Link from "next/link";

export default function Header() {
  return (
   <header className='mt8 mx-32 flex justify-between items-center py-8 px-4 bg-gray-600 text-white rounded-b-xl'>
    <div>
        <Link href={'/'}>Laptops by Sanya</Link>
    </div>
    <nav className="flex gap-16">
        <Link href={'/'} className='hover:text-red-400 transition duration-300'>Home</Link>
        <Link href={'/about'} className='hover:text-red-400 transition duration-300'>About</Link>
        <Link href={'/catalog'} className='hover:text-red-400 transition duration-300'>Catalog</Link>
        <Link href={'/contacts'}className='hover:text-red-400 transition duration-300' >Contacts</Link>
    </nav>
    <div className="flex gap-8">
        <Link href={'/login'} className='hover:text-red-400 transition duration-300'>Login</Link>
        <Link href={'/register'}className='hover:text-red-400 transition duration-300'>Register</Link>
    </div>
   </header>
  )
}
