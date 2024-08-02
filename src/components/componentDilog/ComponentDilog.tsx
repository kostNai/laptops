import { FormEvent } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../ui/dialog'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa6'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type Props = {
    open: boolean
    title: string
    componentFields: { title: string; name: string }[]
    setOpen: (open: boolean) => void
    onSubmitHandler: (e: FormEvent) => void
    onChangeHanler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ComponentDilog({
    onSubmitHandler,
    open,
    setOpen,
    title,
    componentFields,
    onChangeHanler
}: Props) {
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">
                        Додати <FaPlus className="ml-2" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-fit">
                    <DialogHeader>
                        <DialogTitle>Додати {title}</DialogTitle>
                        <DialogDescription>
                            Заповніть усі поля
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-8">
                        <div className="grid gap-4 py-4">
                            {componentFields.map((field) => (
                                <div
                                    className="grid grid-cols-4 items-center gap-4"
                                    key={field.title}
                                >
                                    <Label
                                        htmlFor="series"
                                        className="text-right"
                                    >
                                        {field.title}
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        className="col-span-3"
                                        onChange={onChangeHanler}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" onClick={onSubmitHandler}>
                            Додати
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
