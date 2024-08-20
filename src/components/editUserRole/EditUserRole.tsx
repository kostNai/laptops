import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Button } from '../ui/button'
import { UserType } from '@/types'
import { useSession } from 'next-auth/react'
import { useFormState } from 'react-dom'
import { editUser } from '@/lib/actions'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { mutateData } from '@/lib/fetcher'
type Props = {
    isAdmin: boolean
    setIsAdmin: (isAdmin: boolean) => void
    user: UserType
}
const initialState = { message: '', success: false, token: '' }
export default function EditUserRole({ isAdmin, setIsAdmin, user }: Props) {
    const { data: session, status, update } = useSession()
    const token = session?.user?.access_token

    const editUserWithId = editUser.bind(null, user?.id?.toString()!, token!)

    const [state, formAction] = useFormState(editUserWithId, initialState)

    useEffect(() => {
        state.message && !state.success ? toast.error(state.message) : false
        state.success && toast.success(state.message)
        update({ access_token: state.token })
        mutateData(`http://127.0.0.1:8000/api/users/${user.id}`)
        console.log(typeof user.is_admin)
    }, [state])
    return (
        <div className="flex gap-8 items-center">
            <p>Адмін - {user?.is_admin ? <span>так</span> : <span>ні</span>}</p>
            {!isAdmin && (
                <Button
                    variant="link"
                    className="text-link-hover-color"
                    onClick={() => setIsAdmin(true)}
                >
                    Змінити
                </Button>
            )}
            {isAdmin && (
                <form action={formAction} className="flex gap-4">
                    <Select name="is_admin">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Змінити роль" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Змінити роль</SelectLabel>
                                <SelectItem value="true">Адмін</SelectItem>
                                <SelectItem value="false">
                                    Користувач
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="success">Ок</Button>
                    <Button
                        variant="destructive"
                        onClick={() => setIsAdmin(false)}
                    >
                        Відмінити
                    </Button>
                </form>
            )}
        </div>
    )
}
