import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FormEvent } from 'react'

type Props = {
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmitHandler: (e: FormEvent) => void
}

export default function CustomDailog({
    onChangeHandler,
    onSubmitHandler
}: Props) {
    return (
        <div className="mt-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="default">Додати новий Процесор</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-fit">
                    <DialogHeader>
                        <DialogTitle>Додати новий Процесор</DialogTitle>
                        <DialogDescription>
                            Заповніть усі поля
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="manufacturer"
                                className="text-right"
                            >
                                Виробник
                            </Label>
                            <Input
                                id="manufacturer"
                                name="manufacturer"
                                className="col-span-3"
                                placeholder="Введіть назву виробника"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">
                                Модель
                            </Label>
                            <Input
                                id="model"
                                name="model"
                                placeholder="Введіть назву моделі"
                                className="col-span-3"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="series" className="text-right">
                                Серія
                            </Label>
                            <Input
                                id="series"
                                name="series"
                                placeholder="Введіть серію"
                                className="col-span-3"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cores_value" className="text-right">
                                Кількість ядер
                            </Label>
                            <Input
                                id="cores_value"
                                name="cores_value"
                                placeholder="Введіть кількість ядер"
                                className="col-span-3"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="frequency" className="text-right">
                                Частота
                            </Label>
                            <Input
                                name="frequency"
                                placeholder="Введіть частоту роботи процесора у MHz"
                                className="col-span-3"
                                onChange={onChangeHandler}
                            />
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
