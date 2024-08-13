import RegisterForm from '@/components/registerForm/RegisterForm'
import { Suspense } from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default function RegiaterPage() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Suspense fallback={<FaSpinner />}>
                <RegisterForm />
            </Suspense>
        </div>
    )
}
